import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 px-8 py-6 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-xl font-bold">JobSphere</h2>
          <p className="text-sm text-gray-400">
            Connecting talent with opportunities.
          </p>
        </div>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>

          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>

          <Link to="/register" className="hover:text-blue-400">
            Register
          </Link>
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      <p className="text-center text-sm text-gray-400">
        © 2026 JobSphere. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;