const API_BASE_URL = 'http://localhost:4000/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (username, email, password) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};

// User API
export const userAPI = {
  getProfile: async (userId) => {
    return apiRequest(`/users/${userId}`);
  },

  updateProfile: async (userId, profileData) => {
    return apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  searchUsers: async (searchTerm) => {
    return apiRequest(`/users/search?q=${encodeURIComponent(searchTerm)}`);
  },
};

// Project API
export const projectAPI = {
  getProjects: async () => {
    return apiRequest('/projects');
  },

  createProject: async (projectData) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  getProject: async (projectId) => {
    return apiRequest(`/projects/${projectId}`);
  },

  updateProject: async (projectId, projectData) => {
    return apiRequest(`/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject: async (projectId) => {
    return apiRequest(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  },
};

// Checkin API
export const checkinAPI = {
  getCheckins: async () => {
    return apiRequest('/checkins');
  },

  createCheckin: async (checkinData) => {
    return apiRequest('/checkins', {
      method: 'POST',
      body: JSON.stringify(checkinData),
    });
  },

  getProjectCheckins: async (projectId) => {
    return apiRequest(`/checkins/project/${projectId}`);
  },
};
