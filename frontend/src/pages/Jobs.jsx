import { useEffect, useState } from "react";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/jobs"
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Failed to fetch jobs");
                    return;
                }

                setJobs(data.jobs);

            } catch (error) {
                console.error(error);
                setError("Something went wrong");
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Available Jobs
                </h1>

                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                {jobs.length === 0 && !error && (
                    <p>No jobs available.</p>
                )}

                <div className="grid gap-6 md:grid-cols-2">

                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white p-6 rounded-lg shadow"
                        >
                            <h2 className="text-xl font-bold mb-2">
                                {job.title}
                            </h2>

                            <p className="font-medium mb-2">
                                {job.company}
                            </p>

                            <p className="text-gray-600 mb-2">
                                📍 {job.location}
                            </p>

                            <p className="mb-2">
                                <strong>Experience:</strong>{" "}
                                {job.experience || "Not specified"}
                            </p>

                            <p className="mb-2">
                                <strong>Salary:</strong>{" "}
                                {job.salary || "Not specified"}
                            </p>

                            <p className="mb-3">
                                <strong>Skills:</strong>{" "}
                                {job.skills.join(", ")}
                            </p>

                            <p className="text-gray-700">
                                {job.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Jobs;