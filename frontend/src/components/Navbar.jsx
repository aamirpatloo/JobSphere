import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow">

            <Link to="/" className="text-2xl font-bold">
                JobSphere
            </Link>

            <div className="flex gap-6">

                <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600"
                >
                    Home
                </Link>

                <Link
                    to="/about"
                    className="text-gray-700 hover:text-blue-600"
                >
                    About
                </Link>

                {/* Jobs */}
                <Link
                    to="/jobs"
                    className="text-gray-700 hover:text-blue-600"
                >
                    Jobs
                </Link>

                <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600"
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Register
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;