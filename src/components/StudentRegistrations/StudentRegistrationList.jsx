// src/components/StudentRegistrations/StudentRegistrationList.jsx
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const StudentRegistrationList = () => {
  const { 
    studentRegistrations, 
    deleteStudentRegistration, 
    courseOfferings,
    courses,
    courseTypes
  } = useContext(AppContext);
  
  const [studentName, setStudentName] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [filterCourseTypeId, setFilterCourseTypeId] = useState('');

  const handleRegister = () => {
    if (!studentName || !selectedOfferingId) return;
    
    const newRegistration = {
      id: Date.now().toString(),
      studentName,
      courseOfferingId: selectedOfferingId,
      date: new Date().toISOString()
    };
    
    registerStudent(newRegistration);
    setStudentName('');
    setSelectedOfferingId('');
  };

  const getOfferingName = (offeringId) => {
    const offering = courseOfferings.find(co => co.id === offeringId);
    if (!offering) return 'Unknown';
    
    const course = courses.find(c => c.id === offering.courseId);
    const courseType = courseTypes.find(ct => ct.id === offering.courseTypeId);
    
    return `${courseType?.name || 'Unknown'} - ${course?.name || 'Unknown'}`;
  };

  const filteredOfferings = filterCourseTypeId 
    ? courseOfferings.filter(co => co.courseTypeId === filterCourseTypeId)
    : courseOfferings;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Student Registrations</h2>
      
      <div className="mb-4 space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border p-1 rounded flex-1"
          />
          <select
            value={selectedOfferingId}
            onChange={(e) => setSelectedOfferingId(e.target.value)}
            className="border p-1 rounded flex-1"
          >
            <option value="">Select Course Offering</option>
            {filteredOfferings.map(offering => (
              <option key={offering.id} value={offering.id}>
                {getOfferingName(offering.id)}
              </option>
            ))}
          </select>
          <button
            onClick={handleRegister}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Register
          </button>
        </div>
        
        <div>
          <label className="block mb-1">Filter by Course Type:</label>
          <select
            value={filterCourseTypeId}
            onChange={(e) => setFilterCourseTypeId(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">All Course Types</option>
            {courseTypes.map(courseType => (
              <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Registered Students</h3>
      <ul className="space-y-2">
        {studentRegistrations.map(registration => (
          <li key={registration.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            <div>
              <span className="font-medium">{registration.studentName}</span> - 
              <span className="ml-2">{getOfferingName(registration.courseOfferingId)}</span>
              <span className="text-sm text-gray-500 ml-2">
                {new Date(registration.date).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => deleteStudentRegistration(registration.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentRegistrationList;