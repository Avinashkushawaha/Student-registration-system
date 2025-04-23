


import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const StudentRegistrationForm = () => {
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
  const { 
    registerStudent, 
    updateStudentRegistration, 
    deleteStudentRegistration,
    courseOfferings, 
    courseTypes,
    courses,
    studentRegistrations
  } = useContext(AppContext);

  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [filterCourseTypeId, setFilterCourseTypeId] = useState('');
  const [filteredOfferings, setFilteredOfferings] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editId, setEditId] = useState(null); // ⭐ Edit mode tracking

  useEffect(() => {
    

    if (filterCourseTypeId) {
      setFilteredOfferings(
        courseOfferings.filter(co => co.courseTypeId === filterCourseTypeId)
      );
    } else {
      setFilteredOfferings(courseOfferings);
    }

    if (selectedOfferingId && !filteredOfferings.some(o => o.id === selectedOfferingId)) {
      setSelectedOfferingId('');
    }
  }, [filterCourseTypeId, courseOfferings, selectedOfferingId, filteredOfferings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!studentName.trim()) return setError('Student name is required');
    if (!email.trim()) return setError('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Invalid email');
    if (!phone.trim()) return setError('Phone number is required');
    if (!/^\d{10}$/.test(phone)) return setError('Invalid phone number');
    if (!selectedOfferingId) return setError('Select a course offering');

    const isDuplicate = studentRegistrations?.some(
      reg => reg.courseOfferingId === selectedOfferingId &&
             reg.email.toLowerCase() === email.toLowerCase() &&
             reg.id !== editId
    );
    if (isDuplicate) return setError('Student already registered for this course');

    if (editId) {
      updateStudentRegistration({
        id: editId,
        studentName,
        email,
        phone,
        courseOfferingId: selectedOfferingId,
        date: new Date().toISOString(),
      });
      setSuccessMessage('Student updated successfully');
    } else {
      registerStudent({
        id: Date.now().toString(),
        studentName,
        email,
        phone,
        courseOfferingId: selectedOfferingId,
        date: new Date().toISOString()
      });
      setSuccessMessage('Student registered successfully');
    }

    setStudentName('');
    setEmail('');
    setPhone('');
    setEditId(null);
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setStudentName(student.studentName);
    setEmail(student.email);
    setPhone(student.phone);
    setSelectedOfferingId(student.courseOfferingId);
    setEditMode(true);
    setEditingId(student.id)
    setSuccessMessage('');
    setError('');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      deleteStudentRegistration(id);
    }
  };

  const getOfferingName = (offering) => {
    const course = courses.find(c => c.id === offering.courseId);
    const courseType = courseTypes.find(ct => ct.id === offering.courseTypeId);
    return `${courseType?.name || 'Unknown'} - ${course?.name || 'Unknown'}`;
  };

  const registeredStudents = studentRegistrations?.filter(
    s => s.courseOfferingId === selectedOfferingId
  ) || [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Student' : 'Student Registration'}</h2>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select
            value={filterCourseTypeId}
            onChange={(e) => setFilterCourseTypeId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Course Types</option>
            {courseTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>

          <select
            value={selectedOfferingId}
            onChange={(e) => setSelectedOfferingId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={filteredOfferings.length === 0}
          >
            <option value="">-- Select Course --</option>
            {filteredOfferings.map(offering => (
              <option key={offering.id} value={offering.id}>
                {getOfferingName(offering)}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (10 digits)"
              className="w-full p-2 border border-gray-300 rounded-md"
              maxLength="10"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            <span className="mr-2">{editId ? '✓' : '+'}</span>
            {editId ? 'Update Student' : 'Register Student'}
          </button>
        </form>
      </div>

      {selectedOfferingId && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Student Registrations</h3>
          {registeredStudents.length === 0 ? (
            <p className="text-gray-500">No students registered for this course.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">#</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Phone</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {registeredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{student.studentName}</td>
                      <td className="py-3 px-4">{student.email}</td>
                      <td className="py-3 px-4">{student.phone}</td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          className="text-blue-600"
                          onClick={() => handleEdit(student)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(student.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
