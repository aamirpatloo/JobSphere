import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRecruiterJobs, deleteJob } from "../services/api";

function RecruiterDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const fetchMyJobs = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getRecruiterJobs();
            setJobs(data.jobs || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to fetch recruiter jobs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchMyJobs();
    }, [token, navigate]);

    const handleDelete = async (jobId, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"? This will also remove all associated applications.`)) {
            return;
        }

        try {
            await deleteJob(jobId);
            setSuccessMsg(`Job "${title}" deleted successfully.`);
            setJobs(jobs.filter(j => j._id !== jobId));
        } catch (err) {
            console.error(err);
            alert(err.message || "Failed to delete job.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
                Loading recruiter dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Recruiter Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Manage your job postings and view applicant submissions
                        </p>
                    </div>

                    <Link
                        to="/create-job"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition text-center shadow-sm"
                    >
                        + Post New Job
                    </Link>
                </div>

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

                {jobs.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-lg mb-4">You have not posted any job listings yet.</p>
                        <Link
                            to="/create-job"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition"
                        >
                            Post Your First Job
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {job.title}
                                        </h2>
                                        <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded">
                                            {job.company}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
                                        <span>📍 {job.location}</span>
                                        {job.salary && <span>💰 {job.salary}</span>}
                                        {job.experience && <span>⏳ {job.experience}</span>}
                                    </div>

                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                                    <Link
                                        to={`/jobs/${job._id}/applicants`}
                                        className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-semibold px-3.5 py-2 rounded-lg border border-purple-200 transition"
                                    >
                                        👥 View Applicants
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/jobs/edit/${job._id}`}
                                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition"
                                        >
                                            ✏️ Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(job._id, job.title)}
                                            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded-lg border border-red-200 transition"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default RecruiterDashboard;
