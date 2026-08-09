import { useState } from "react";

function CreateJob() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [experience, setExperience] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/jobs",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        company,
                        description,
                        skills: skills
                            .split(",")
                            .map((skill) => skill.trim()),
                        location,
                        salary,
                        experience
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Job posted successfully!");

            // Clear form
            setTitle("");
            setCompany("");
            setDescription("");
            setSkills("");
            setLocation("");
            setSalary("");
            setExperience("");

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Post a Job
                </h1>

                <form onSubmit={handleSubmit}>

                    {/* Job Title */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Job Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Frontend Developer"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Company */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Company
                        </label>

                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="ABC Technologies"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the job..."
                            className="w-full border p-2 rounded"
                            rows="5"
                            required
                        />
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Skills
                        </label>

                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="React, JavaScript, CSS"
                            className="w-full border p-2 rounded"
                            required
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            Separate skills using commas
                        </p>
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Location
                        </label>

                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Bangalore"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Salary */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Salary
                        </label>

                        <input
                            type="text"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="6-8 LPA"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Experience */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">
                            Experience
                        </label>

                        <input
                            type="text"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="0-2 years"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Post Job
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateJob;