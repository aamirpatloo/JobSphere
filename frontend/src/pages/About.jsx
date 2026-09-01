function About() {
  return (
    <div className="bg-gray-50 min-h-[85vh] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About JobSphere</h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          JobSphere is a modern, lightweight, and beginner-friendly job matching platform designed to connect talent with recruiters effortlessly.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mb-3">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
          <li><strong>For Job Seekers:</strong> Create comprehensive profile cards, search jobs by title/location/skills, submit applications, and track application statuses.</li>
          <li><strong>For Recruiters:</strong> Post new job listings, manage existing postings, review applicants' profiles, and update candidate hiring statuses.</li>
          <li><strong>Clean Architecture:</strong> Built using React, Vite, Tailwind CSS, Node.js, Express, MongoDB Atlas, and JWT authentication.</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
          💡 <strong>Goal:</strong> Delivering a reliable, beginner-friendly, and professional job search application without unnecessary complexity.
        </div>
      </div>
    </div>
  );
}

export default About;