import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, saveProfile } from "../services/api";

function Profile() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [userAuthInfo, setUserAuthInfo] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfileData = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getProfile();
                if (data.profile) {
                    const prof = data.profile;
                    setPhone(prof.phone || "");
                    setSkills(Array.isArray(prof.skills) ? prof.skills.join(", ") : prof.skills || "");
                    setEducation(prof.education || "");
                    setExperience(prof.experience || "");
                    setEmploymentStatus(prof.employmentStatus || "");
                    setBio(prof.bio || "");
                    setLocation(prof.location || "");
                    if (prof.user) setUserAuthInfo(prof.user);
                } else if (data.user) {
                    setUserAuthInfo(data.user);
                }
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccessMsg("");

        try {
            await saveProfile({
                phone,
                skills,
                education,
                experience,
                employmentStatus,
                bio,
                location
            });
            setSuccessMsg("Profile saved successfully!");
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong saving your profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">

                <div className="border-b border-gray-100 pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Job Seeker Profile
                    </h1>
                    {userAuthInfo && (
                        <p className="text-sm text-gray-600 mt-1">
                            Logged in as <span className="font-semibold">{userAuthInfo.name}</span> ({userAuthInfo.email})
                        </p>
                    )}
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

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Phone & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1 234 567 8900"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location / City
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="New York, NY"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Key Skills
                        </label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="React, JavaScript, Node.js, MongoDB"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Separate skills using commas
                        </p>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Education
                        </label>
                        <input
                            type="text"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            placeholder="B.S. in Computer Science"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Employment Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employment Status
                        </label>
                        <select
                            value={employmentStatus}
                            onChange={(e) => setEmploymentStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select status</option>
                            <option value="Student">Student</option>
                            <option value="Fresher">Fresher</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed / Looking for Work</option>
                        </select>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Brief description about your background and interests..."
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            rows="3"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work Experience
                        </label>
                        <textarea
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Describe your previous roles, projects, or achievements..."
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500"
                            rows="4"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {saving ? "Saving Profile..." : "Save Profile"}
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Profile;