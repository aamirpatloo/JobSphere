import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">
                My Profile
            </h1>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default Profile;