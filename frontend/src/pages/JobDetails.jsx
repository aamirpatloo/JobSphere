import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobById, applyJob, getMyApplications } from "../services/api";

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [hasApplied, setHasApplied] = useState(false);

    const token = localStorage.getItem("token");
    let user = null;
    if (token) {
        try {
            user = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
            user = null;
        }
    }

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getJobById(id);
                setJob(data.job);

                // Check if current user has already applied
                if (token && user?.role === "jobseeker") {
                    try {
                        const appsData = await getMyApplications();
                        const existing = appsData.applications.find(
                            app => app.job && app.job._id === id
                        );
                        if (existing) {
                            setHasApplied(true);
                        }
                    } catch (appErr) {
                        console.error("Error checking application status:", appErr);
                    }
                }
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load job details");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id, token]);

    const handleApply = async () => {
        if (!token) {
            alert("Please login to apply for this job.");
            navigate("/login");
            return;
        }

        if (user?.role === "recruiter") {
            alert("Recruiters cannot apply for jobs. Please log in as a Job Seeker.");
            return;
        }

        setApplying(true);
        setError("");
        setSuccessMsg("");

        try {
            await applyJob(id);
            setSuccessMsg("Application submitted successfully!");
            setHasApplied(true);
        } catch (err) {
            setError(err.message || "Failed to submit application");
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
                Loading job details...
            </div>
        );
    }

    if (error && !job) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
                <p className="text-red-600 text-lg mb-4">{error}</p>
                <Link to="/jobs" className="text-blue-600 hover:underline">
                    Back to Jobs List
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                <Link to="/jobs" className="text-sm font-medium text-blue-600 hover:underline mb-6 inline-block">
                    ← Back to all jobs
                </Link>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm border border-green-200">
                        {successMsg}
                    </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                            {job.title}
                        </h1>
                        <p className="text-lg font-semibold text-blue-600">
                            🏢 {job.company}
                        </p>
                    </div>

                    <div>
                        {hasApplied ? (
                            <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold text-sm">
                                ✓ Application Submitted
                            </span>
                        ) : (
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
                            >
                                {applying ? "Submitting..." : "Apply Now"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Job Overview Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-8 text-sm">
                    <div>
                        <span className="block text-xs font-semibold text-gray-500">LOCATION</span>
                        <span className="font-medium text-gray-800">📍 {job.location}</span>
                    </div>

                    <div>
                        <span className="block text-xs font-semibold text-gray-500">SALARY</span>
                        <span className="font-medium text-gray-800">💰 {job.salary || "Not disclosed"}</span>
                    </div>

                    <div>
                        <span className="block text-xs font-semibold text-gray-500">EXPERIENCE</span>
                        <span className="font-medium text-gray-800">⏳ {job.experience || "Any experience"}</span>
                    </div>

                    <div>
                        <span className="block text-xs font-semibold text-gray-500">POSTED ON</span>
                        <span className="font-medium text-gray-800">
                            📅 {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-md border border-blue-100"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Job Description</h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                        {job.description}
                    </div>
                </div>

                {/* Posted By */}
                {job.postedBy && (
                    <div className="pt-6 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
                        <span>Posted by: {job.postedBy.name} ({job.postedBy.email})</span>
                    </div>
                )}

            </div>
        </div>
    );
}

export default JobDetails;
