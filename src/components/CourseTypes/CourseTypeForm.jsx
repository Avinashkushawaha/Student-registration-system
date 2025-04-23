

import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CourseTypeForm = () => {
  const { addCourseType, updateCourseType } = useContext(AppContext);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingId) {
      updateCourseType({ id: editingId, name });
    } else {
      addCourseType({ id: Date.now().toString(), name });
    }

    setName('');
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? 'Edit Course Type' : 'Add New Course Type'}
      </h2>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          placeholder="Course Type Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 rounded flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default CourseTypeForm;



