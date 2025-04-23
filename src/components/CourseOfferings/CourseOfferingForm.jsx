// src/components/CourseOfferings/CourseOfferings.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseOfferingForm = () => {
  const { 
    courseOfferings, 
    addCourseOffering, 
    updateCourseOffering,
    deleteCourseOffering,
    courses,
    courseTypes
  } = useContext(AppContext);
  
  // Form state for creating new offerings
  const [newCourseId, setNewCourseId] = useState('');
  const [newCourseTypeId, setNewCourseTypeId] = useState('');
  const [error, setError] = useState('');

  // State for editing existing offerings
  const [editingId, setEditingId] = useState(null);
  const [editCourseId, setEditCourseId] = useState('');
  const [editCourseTypeId, setEditCourseTypeId] = useState('');

  // Get display names for courses and types
  const getCourseName = (id) => courses.find(c => c.id === id)?.name || 'Unknown Course';
  const getCourseTypeName = (id) => courseTypes.find(ct => ct.id === id)?.name || 'Unknown Type';

  // Create a new course offering
  const handleCreate = (e) => {
    e.preventDefault();
    
    if (!newCourseId || !newCourseTypeId) {
      setError('Please select both a course and a course type');
      return;
    }

    const newOffering = {
      id: Date.now().toString(),
      courseId: newCourseId,
      courseTypeId: newCourseTypeId,
      // Add creation date if needed
      createdAt: new Date().toISOString()
    };
    
    addCourseOffering(newOffering);
    setNewCourseId('');
    setNewCourseTypeId('');
    setError('');
  };

  // Start editing an offering
  const handleEdit = (offering) => {
    setEditingId(offering.id);
    setEditCourseId(offering.courseId);
    setEditCourseTypeId(offering.courseTypeId);
    setError('');
  };

  // Update an existing offering
  const handleUpdate = (id) => {
    if (!editCourseId || !editCourseTypeId) {
      setError('Please select both a course and a course type');
      return;
    }

    const updatedOffering = { 
      id, 
      courseId: editCourseId, 
      courseTypeId: editCourseTypeId 
    };
    
    updateCourseOffering(id, updatedOffering);
    setEditingId(null);
    setError('');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setError('');
  };

  // Delete an offering with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      deleteCourseOffering(id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Course Offerings Management</h1>
      
      {/* Create New Offering Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Offering</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Type (e.g., Individual, Group, Special)
              </label>
              <select
                value={newCourseTypeId}
                onChange={(e) => setNewCourseTypeId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select Course Type --</option>
                {courseTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course (e.g., Hindi, English, Urdu)
              </label>
              <select
                value={newCourseId}
                onChange={(e) => setNewCourseId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select Course --</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>

          {error && !editingId && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            Create Course Offering
          </button>
        </form>
      </div>

      {/* Current Offerings Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Current Course Offerings</h2>
        
        {courseOfferings.length === 0 ? (
          <p className="text-gray-500 italic">No course offerings have been created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courseOfferings.map(offering => (
                  <tr key={offering.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === offering.id ? (
                        <select
                          value={editCourseTypeId}
                          onChange={(e) => setEditCourseTypeId(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Type</option>
                          {courseTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-medium">{getCourseTypeName(offering.courseTypeId)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === offering.id ? (
                        <select
                          value={editCourseId}
                          onChange={(e) => setEditCourseId(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Course</option>
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                          ))}
                        </select>
                      ) : (
                        <span>{getCourseName(offering.courseId)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {editingId === offering.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(offering.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(offering)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(offering.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseOfferingForm;