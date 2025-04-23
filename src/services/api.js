// src/services/api.js
const API = {
    // Simulate network delay
    simulateNetworkDelay: () => new Promise(resolve => setTimeout(resolve, 500)),
  
    // Course Types API
    courseTypes: {
      getAll: async () => {
        await API.simulateNetworkDelay();
        const data = JSON.parse(localStorage.getItem('courseTypes') || '[]');
        return { data, status: 200 };
      },
      create: async (courseType) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courseTypes') || [])
        const newCourseType = { ...courseType, id: Date.now().toString() };
        localStorage.setItem('courseTypes', JSON.stringify([...existing, newCourseType]));
        return { data: newCourseType, status: 201 };
      },
      update: async (id, updatedCourseType) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courseTypes') || []);
        const updated = existing.map(ct => ct.id === id ? updatedCourseType : ct);
        localStorage.setItem('courseTypes', JSON.stringify(updated));
        return { data: updatedCourseType, status: 200 };
      },
      delete: async (id) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courseTypes') || []);
        const filtered = existing.filter(ct => ct.id !== id);
        localStorage.setItem('courseTypes', JSON.stringify(filtered));
        return { status: 204 };
      }
    },
  
    // Courses API
    courses: {
      getAll: async () => {
        await API.simulateNetworkDelay();
        const data = JSON.parse(localStorage.getItem('courses') || '[]');
        return { data, status: 200 };
      },
      create: async (course) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courses') || []);
        const newCourse = { ...course, id: Date.now().toString() };
        localStorage.setItem('courses', JSON.stringify([...existing, newCourse]));
        return { data: newCourse, status: 201 };
      },
      update: async (id, updatedCourse) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courses') || []);
        const updated = existing.map(c => c.id === id ? updatedCourse : c);
        localStorage.setItem('courses', JSON.stringify(updated));
        return { data: updatedCourse, status: 200 };
      },
      delete: async (id) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courses') || []);
        const filtered = existing.filter(c => c.id !== id);
        localStorage.setItem('courses', JSON.stringify(filtered));
        return { status: 204 };
      }
    },
  
    // Course Offerings API
    courseOfferings: {
      getAll: async () => {
        await API.simulateNetworkDelay();
        const data = JSON.parse(localStorage.getItem('courseOfferings') || '[]');
        return { data, status: 200 };
      },
      create: async (offering) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courseOfferings') || []);
        const newOffering = { ...offering, id: Date.now().toString() };
        localStorage.setItem('courseOfferings', JSON.stringify([...existing, newOffering]));
        return { data: newOffering, status: 201 };
      },
      update: async (id, updatedOffering) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courseOfferings') || []);
        const updated = existing.map(o => o.id === id ? updatedOffering : o);
        localStorage.setItem('courseOfferings', JSON.stringify(updated));
        return { data: updatedOffering, status: 200 };
      },
      delete: async (id) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('courseOfferings') || []);
        const filtered = existing.filter(o => o.id !== id);
        localStorage.setItem('courseOfferings', JSON.stringify(filtered));
        return { status: 204 };
      }
    },
  
    // Student Registrations API
    studentRegistrations: {
      getAll: async () => {
        await API.simulateNetworkDelay();
        const data = JSON.parse(localStorage.getItem('studentRegistrations') || '[]');
        return { data, status: 200 };
      },
      create: async (registration) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('studentRegistrations') || []);
        const newRegistration = { ...registration, id: Date.now().toString() };
        localStorage.setItem('studentRegistrations', JSON.stringify([...existing, newRegistration]));
        return { data: newRegistration, status: 201 };
      },
      delete: async (id) => {
        await API.simulateNetworkDelay();
        const existing = JSON.parse(localStorage.getItem('studentRegistrations') || []);
        const filtered = existing.filter(r => r.id !== id);
        localStorage.setItem('studentRegistrations', JSON.stringify(filtered));
        return { status: 204 };
      }
    },
  
    // Error handling wrapper
    withErrorHandling: async (fn, ...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error('API Error:', error);
        return { 
          error: error.message || 'An unknown error occurred',
          status: 500 
        };
      }
    }
  };
  
  export default API;