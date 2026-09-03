import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../services/api";

function CreateJob() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.role !== "recruiter") {
                alert("Access restricted to recruiters only.");
                navigate("/jobs");
            }
        } catch (e) {
            navigate("/login");
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createJob({
                title,
                company,
                description,
                skills,
                location,
                salary,
                experience
            });

            alert("Job posted successfully!");
            navigate("/recruiter/dashboard");

        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to post job.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Post a New Job
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Fill out the fields below to publish your opening on JobSphere
                </p>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Frontend Developer"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Technologies Inc."
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Location & Salary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location *
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Remote / New York, NY"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Salary Range
                            </label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="$80,000 - $100,000 / yr"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Experience & Skills */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Experience Required
                            </label>
                            <input
                                type="text"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                placeholder="2-4 Years"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Required Skills *
                            </label>
                            <input
                                type="text"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder="React, Node.js, CSS"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description *
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detailed description of responsibilities, requirements, and benefits..."
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            rows="5"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Publishing Job..." : "Post Job"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default CreateJob;