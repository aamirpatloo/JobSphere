import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>JobSphere</h2>

      <Link to="/">Home</Link> |{" "}
      <Link to="/about">About</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navbar;