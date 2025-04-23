
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseTypeList = () => {
  const { courseTypes, deleteCourseType, updateCourseType } = useContext(AppContext);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (courseType) => {
    setEditingId(courseType.id);
    setEditName(courseType.name);
  };

  const handleUpdate = (id) => {
    updateCourseType({ id, name: editName });
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Course Types</h2>
      <ul className="space-y-2">
        {courseTypes.map(courseType => (
          <li key={courseType.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            {editingId === courseType.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              <span>{courseType.name}</span>
            )}
            <div className="space-x-2">
              {editingId === courseType.id ? (
                <button
                  onClick={() => handleUpdate(courseType.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(courseType)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteCourseType(courseType.id)}
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

export default CourseTypeList;