// src/components/Courses/CourseForm.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseForm = () => {
  const { addCourse } = useContext(AppContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!name.trim()) {
      setError('Course name is required');
      return;
    }
    
    if (name.length > 50) {
      setError('Course name must be less than 50 characters');
      return;
    }

    // Clear any previous errors
    setError('');
    
    // Create new course
    const newCourse = {
      id: Date.now().toString(),
      name: name.trim()
    };
    
    addCourse(newCourse);
    setName('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            placeholder="e.g., Hindi, English, Urdu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;