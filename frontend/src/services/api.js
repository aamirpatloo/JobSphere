const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authentication
export const registerUser = async (name, email, password, role) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }
    return data;
};

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }
    return data;
};

export const getAuthProfile = async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user auth profile");
    }
    return data;
};

// Profile
export const getProfile = async () => {
    const response = await fetch(`${API_URL}/profile`, {
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
    }
    return data;
};

export const saveProfile = async (profileData) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(profileData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to save profile");
    }
    return data;
};

// Jobs
export const getJobs = async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.title) queryParams.append("title", filters.title);
    if (filters.skills) queryParams.append("skills", filters.skills);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.experience) queryParams.append("experience", filters.experience);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetch(`${API_URL}/jobs${queryString}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch jobs");
    }
    return data;
};

export const getRecruiterJobs = async () => {
    const response = await fetch(`${API_URL}/jobs/my`, {
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch recruiter jobs");
    }
    return data;
};

export const getJobById = async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch job details");
    }
    return data;
};

export const createJob = async (jobData) => {
    const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(jobData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to post job");
    }
    return data;
};

export const updateJob = async (id, jobData) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(jobData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update job");
    }
    return data;
};

export const deleteJob = async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to delete job");
    }
    return data;
};

// Applications
export const applyJob = async (jobId) => {
    const response = await fetch(`${API_URL}/applications/${jobId}`, {
        method: "POST",
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to apply for job");
    }
    return data;
};

export const getMyApplications = async () => {
    const response = await fetch(`${API_URL}/applications/my`, {
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch applications");
    }
    return data;
};

export const getJobApplicants = async (jobId) => {
    const response = await fetch(`${API_URL}/applications/job/${jobId}`, {
        headers: { ...getAuthHeader() }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch job applicants");
    }
    return data;
};

export const updateApplicationStatus = async (applicationId, status) => {
    const response = await fetch(`${API_URL}/applications/${applicationId}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
    }
    return data;
};