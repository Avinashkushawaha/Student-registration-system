// src/components/Courses/CourseList.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseList = () => {
  const { courses, deleteCourse, updateCourse } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (course) => {
    setEditingId(course.id);
    setEditName(course.name);
  };

  const handleUpdate = (id) => {
    const updatedCourse = { id, name: editName };
    updateCourse(id, updatedCourse);
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      <ul className="space-y-2">
        {courses.map(course => (
          <li key={course.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            {editingId === course.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              <span>{course.name}</span>
            )}
            <div className="space-x-2">
              {editingId === course.id ? (
                <button
                  onClick={() => handleUpdate(course.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCourse(course.id)}
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

export default CourseList;