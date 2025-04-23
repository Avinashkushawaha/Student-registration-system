// src/components/CourseOfferings/CourseOfferingList.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseOfferingList = () => {
  const { 
    courseOfferings, 
    deleteCourseOffering, 
    updateCourseOffering,
    courses,
    courseTypes
  } = useContext(AppContext);
  
  const [editingId, setEditingId] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseTypeId, setSelectedCourseTypeId] = useState('');

  const handleEdit = (offering) => {
    console.log("Editing offering:", offering);
    setEditingId(offering.id);
    setSelectedCourseId(offering.courseId);
    setSelectedCourseTypeId(offering.courseTypeId);
  };

  const handleUpdate = (id) => {
    console.log("Updating with:", selectedCourseId, selectedCourseTypeId);
    const updatedOffering = { 
      id, 
      courseId: selectedCourseId, 
      courseTypeId: selectedCourseTypeId 
    };
    updateCourseOffering(id, updatedOffering);
    setEditingId(null);
  };

  const getCourseName = (id) => courses.find(c => c.id === id)?.name || 'Unknown';
  const getCourseTypeName = (id) => courseTypes.find(ct => ct.id === id)?.name || 'Unknown';

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Course Offerings</h2>
      <ul className="space-y-2">
        {courseOfferings.map(offering => (
          <li key={offering.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            {editingId === offering.id ? (
              <div className="flex space-x-2">
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
                <select
                  value={selectedCourseTypeId}
                  onChange={(e) => setSelectedCourseTypeId(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Select Course Type</option>
                  {courseTypes.map(courseType => (
                    <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <span>
                {getCourseTypeName(offering.courseTypeId)} - {getCourseName(offering.courseId)}
              </span>
            )}
            <div className="space-x-2">
              {editingId === offering.id ? (
                <button
                  onClick={() => handleUpdate(offering.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(offering)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCourseOffering(offering.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseOfferingList;