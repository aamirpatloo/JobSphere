import { useEffect, useState } from "react";

function Profile() {
    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");

    useEffect(() => {
    const fetchProfile = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return;
            }

            const profile = data.profile;

            setPhone(profile.phone || "");
            setSkills(profile.skills?.join(", ") || "");
            setEducation(profile.education || "");
            setExperience(profile.experience || "");
            setEmploymentStatus(profile.employmentStatus || "");

        } catch (error) {
            console.error(error);
        }
    };

    fetchProfile();
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        phone,
                        skills: skills
                            .split(",")
                            .map((skill) => skill.trim()),
                        education,
                        experience,
                        employmentStatus
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Profile saved successfully!");

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">

                <h1 className="text-3xl font-bold mb-6">
                    JobSeeker Profile
                </h1>

                <form onSubmit={handleSubmit}>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Phone
                        </label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full border p-2 rounded"
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
                            placeholder="C++, React, MongoDB"
                            className="w-full border p-2 rounded"
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            Separate skills using commas
                        </p>
                    </div>

                    {/* Education */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Education
                        </label>

                        <input
                            type="text"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            placeholder="B.Tech Software Engineering"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Experience */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Experience
                        </label>

                        <textarea
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Describe your experience"
                            className="w-full border p-2 rounded"
                            rows="4"
                        />
                    </div>

                    {/* Employment Status */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">
                            Employment Status
                        </label>

                        <select
                            value={employmentStatus}
                            onChange={(e) =>
                                setEmploymentStatus(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        >
                            <option value="">
                                Select status
                            </option>
                            <option value="Student">
                                Student
                            </option>
                            <option value="Fresher">
                                Fresher
                            </option>
                            <option value="Employed">
                                Employed
                            </option>
                            <option value="Unemployed">
                                Unemployed
                            </option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Save Profile
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Profile;