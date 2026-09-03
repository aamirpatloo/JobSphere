import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getJobApplicants, updateApplicationStatus } from "../services/api";

function JobApplicants() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [jobTitle, setJobTitle] = useState("");
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusUpdating, setStatusUpdating] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchApplicants = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getJobApplicants(jobId);
                setJobTitle(data.jobTitle || "");
                setApplicants(data.applications || []);
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load job applicants.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId, token, navigate]);

    const handleStatusChange = async (appId, newStatus) => {
        setStatusUpdating(appId);
        try {
            await updateApplicationStatus(appId, newStatus);
            setApplicants(applicants.map(app => 
                app._id === appId ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to update status.");
        } finally {
            setStatusUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
                Loading job applicants...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">

                <Link
                    to="/recruiter/dashboard"
                    className="text-sm font-medium text-blue-600 hover:underline mb-4 inline-block"
                >
                    ← Back to Recruiter Dashboard
                </Link>

                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Applicants for {jobTitle || "Job"}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Review submitted applications and manage candidate status
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                {applicants.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-lg">No job seekers have applied to this position yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {applicants.map((app) => (
                            <div
                                key={app._id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-100 gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {app.user ? app.user.name : "Unknown User"}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            📧 {app.user ? app.user.email : "N/A"}
                                        </p>
                                    </div>

                                    {/* Status Select Control */}
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-semibold text-gray-500">
                                            APPLICATION STATUS:
                                        </label>
                                        <select
                                            value={app.status}
                                            disabled={statusUpdating === app._id}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            className="border border-gray-300 rounded-lg text-sm font-semibold px-3 py-2 bg-white focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="Applied">Applied</option>
                                            <option value="Reviewing">Reviewing</option>
                                            <option value="Shortlisted">Shortlisted</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                            <option value="Selected">Selected</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Applicant Profile Highlights */}
                                {app.profile ? (
                                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                        <div>
                                            <span className="font-semibold text-gray-900 block text-xs">PHONE</span>
                                            <span>{app.profile.phone || "Not provided"}</span>
                                        </div>

                                        <div>
                                            <span className="font-semibold text-gray-900 block text-xs">STATUS / LOCATION</span>
                                            <span>
                                                {app.profile.employmentStatus || "N/A"}
                                                {app.profile.location ? ` • ${app.profile.location}` : ""}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="font-semibold text-gray-900 block text-xs">EDUCATION</span>
                                            <span>{app.profile.education || "Not specified"}</span>
                                        </div>

                                        <div>
                                            <span className="font-semibold text-gray-900 block text-xs">SKILLS</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {app.profile.skills && app.profile.skills.length > 0 ? (
                                                    app.profile.skills.map((s, idx) => (
                                                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                                                            {s}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span>None listed</span>
                                                )}
                                            </div>
                                        </div>

                                        {app.profile.experience && (
                                            <div className="md:col-span-2">
                                                <span className="font-semibold text-gray-900 block text-xs mb-1">EXPERIENCE</span>
                                                <p className="bg-gray-50 p-3 rounded text-xs text-gray-600 whitespace-pre-line">
                                                    {app.profile.experience}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="pt-4 text-xs text-gray-400 italic">
                                        Applicant has not created a detailed profile card yet.
                                    </div>
                                )}

                                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 text-right">
                                    Submitted on {new Date(app.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default JobApplicants;
