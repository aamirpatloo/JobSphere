function Home() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="mb-6 text-5xl font-bold text-gray-900">
        Find Your Dream Job
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        Connect with companies, discover opportunities, and build your career
        with JobSphere.
      </p>

      <div className="flex gap-4">
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Find Jobs
        </button>

        <button className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50">
          Hire Talent
        </button>
      </div>
    </section>
  );
}

export default Home;