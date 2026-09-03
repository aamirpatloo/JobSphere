import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Brand Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                            <span>🌐</span>
                            <span>JobSphere</span>
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <Link
                            to="/"
                            className={`hover:text-blue-600 ${location.pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            className={`hover:text-blue-600 ${location.pathname === "/about" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                        >
                            About
                        </Link>

                        <Link
                            to="/jobs"
                            className={`hover:text-blue-600 ${location.pathname === "/jobs" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                        >
                            Jobs
                        </Link>

                        {/* Unauthenticated Navigation */}
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {/* Job Seeker Navigation */}
                        {user && user.role === "jobseeker" && (
                            <>
                                <Link
                                    to="/applications"
                                    className={`hover:text-blue-600 ${location.pathname === "/applications" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                                >
                                    My Applications
                                </Link>

                                <Link
                                    to="/profile"
                                    className={`hover:text-blue-600 ${location.pathname === "/profile" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 transition"
                                >
                                    Logout ({user.name})
                                </button>
                            </>
                        )}

                        {/* Recruiter Navigation */}
                        {user && user.role === "recruiter" && (
                            <>
                                <Link
                                    to="/recruiter/dashboard"
                                    className={`hover:text-blue-600 ${location.pathname === "/recruiter/dashboard" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/create-job"
                                    className={`hover:text-blue-600 ${location.pathname === "/create-job" ? "text-blue-600 font-semibold" : "text-gray-700"}`}
                                >
                                    Post Job
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 transition"
                                >
                                    Logout ({user.name})
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;