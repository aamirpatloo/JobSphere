import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyApplications } from "../services/api";

function MyApplications() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchApplications = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getMyApplications();
                setApplications(data.applications || []);
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [token, navigate]);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Applied":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "Reviewing":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "Shortlisted":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "Accepted":
            case "Selected":
                return "bg-green-100 text-green-800 border-green-200";
            case "Rejected":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
                Loading your applications...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Applications
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Track the status of jobs you have applied for
                        </p>
                    </div>

                    <Link
                        to="/jobs"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition text-center"
                    >
                        Browse More Jobs
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                {applications.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-lg mb-4">You haven't submitted any job applications yet.</p>
                        <Link
                            to="/jobs"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition"
                        >
                            Explore Available Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {app.job ? app.job.title : "Job Listing Removed"}
                                        </h2>
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                                                app.status
                                            )}`}
                                        >
                                            {app.status}
                                        </span>
                                    </div>

                                    {app.job && (
                                        <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
                                            <span className="font-medium text-gray-800">🏢 {app.job.company}</span>
                                            <span>📍 {app.job.location}</span>
                                            {app.job.salary && <span>💰 {app.job.salary}</span>}
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-400 mt-2">
                                        Applied on {new Date(app.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {app.job && (
                                    <Link
                                        to={`/jobs/${app.job._id}`}
                                        className="text-sm text-blue-600 hover:underline font-medium border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 text-center hover:bg-blue-100 transition"
                                    >
                                        View Job Details
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default MyApplications;
