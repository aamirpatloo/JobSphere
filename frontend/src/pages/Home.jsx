import { Link } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      user = null;
    }
  }

  return (
    <div className="bg-gray-50 min-h-[85vh] flex flex-col justify-center">
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide text-blue-700 bg-blue-100 rounded-full">
          The Simple Job Matching Platform
        </span>

        <h1 className="mb-6 text-5xl font-extrabold text-gray-900 leading-tight">
          Connect Opportunities with <span className="text-blue-600">Top Talent</span>
        </h1>

        <p className="mb-8 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          JobSphere makes job search and hiring straightforward, simple, and effective. Discover opportunities or publish open positions in seconds.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/jobs"
            className="rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white hover:bg-blue-700 shadow-md transition"
          >
            Explore Jobs
          </Link>

          {!user ? (
            <Link
              to="/register"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition"
            >
              Get Started Free
            </Link>
          ) : user.role === "recruiter" ? (
            <Link
              to="/create-job"
              className="rounded-lg border border-blue-600 bg-blue-50 px-6 py-3.5 font-semibold text-blue-600 hover:bg-blue-100 shadow-sm transition"
            >
              Post a Job
            </Link>
          ) : (
            <Link
              to="/profile"
              className="rounded-lg border border-blue-600 bg-blue-50 px-6 py-3.5 font-semibold text-blue-600 hover:bg-blue-100 shadow-sm transition"
            >
              My Profile
            </Link>
          )}
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Job Search</h3>
            <p className="text-sm text-gray-600">
              Filter positions by title, required skills, location, or experience level effortlessly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-4">
              📄
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Applications</h3>
            <p className="text-sm text-gray-600">
              Apply to open roles with a single click and track application statuses in real-time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-4">
              🏢
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Recruiter Tools</h3>
            <p className="text-sm text-gray-600">
              Post roles, review applicant profiles, and update candidate statuses cleanly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;