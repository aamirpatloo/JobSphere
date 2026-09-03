import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../services/api";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filter states
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");

    const fetchJobsData = async (filterParams = {}) => {
        setLoading(true);
        setError("");
        try {
            const data = await getJobs(filterParams);
            setJobs(data.jobs || []);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobsData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobsData({ title, location, skills });
    };

    const handleClearSearch = () => {
        setTitle("");
        setLocation("");
        setSkills("");
        fetchJobsData({});
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Available Jobs
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Browse open positions or filter by your preferred criteria
                        </p>
                    </div>
                </div>

                {/* Filter Search Form */}
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Job Title / Keywords
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Developer"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Remote, Bangalore"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Skills
                        </label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="e.g. React, Node"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition"
                        >
                            Search
                        </button>
                        {(title || location || skills) && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-lg text-sm transition"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 mb-6 text-sm">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12 text-gray-500">
                        Loading jobs...
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-lg">No jobs matching your search criteria.</p>
                        <button
                            onClick={handleClearSearch}
                            className="mt-4 text-blue-600 hover:underline font-medium text-sm"
                        >
                            View all jobs
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition"
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
                                        {job.experience && <span>⏳ {job.experience}</span>}
                                        {job.salary && <span>💰 {job.salary}</span>}
                                    </div>

                                    {job.skills && job.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {job.skills.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        Posted {new Date(job.createdAt).toLocaleDateString()}
                                    </span>

                                    <Link
                                        to={`/jobs/${job._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                                    >
                                        View & Apply
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Jobs;