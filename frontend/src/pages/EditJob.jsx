import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById, updateJob } from "../services/api";

function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");

    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJob = async () => {
            setFetching(true);
            setError("");
            try {
                const data = await getJobById(id);
                const job = data.job;
                setTitle(job.title || "");
                setCompany(job.company || "");
                setDescription(job.description || "");
                setSkills(Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "");
                setLocation(job.location || "");
                setSalary(job.salary || "");
                setExperience(job.experience || "");
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load job details.");
            } finally {
                setFetching(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            await updateJob(id, {
                title,
                company,
                description,
                skills,
                location,
                salary,
                experience
            });

            alert("Job updated successfully!");
            navigate("/recruiter/dashboard");

        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to update job.");
        } finally {
            setSaving(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
                Loading job details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">

                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Edit Job Listing
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Update details for this job posting
                </p>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Salary
                            </label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Experience Required
                            </label>
                            <input
                                type="text"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skills (comma separated)
                            </label>
                            <input
                                type="text"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            rows="5"
                            required
                        />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {saving ? "Saving Changes..." : "Update Job"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/recruiter/dashboard")}
                            className="bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default EditJob;
