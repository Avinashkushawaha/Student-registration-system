// src/context/AppContext.jsx
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [studentRegistrations, setStudentRegistrations] = useState([]);

  // Course Types CRUD
  const addCourseType = (type) => {
    setCourseTypes([...courseTypes, type]);
  };

  const updateCourseType = (id, updatedCourseType) => {
    setCourseTypes(prev => prev.map(ct => ct.id === id ? { ...ct, ...updatedCourseType } : ct));
  };

  const deleteCourseType = (id) => {
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
  };

  // Courses CRUD
  const addCourse = (course) => {
    setCourses([...courses, course]);
  };

  const updateCourse = (id, updatedCourse) => {
    setCourses(courses.map(c => c.id === id ? updatedCourse : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // Course Offerings CRUD
  const addCourseOffering = (offering) => {
    setCourseOfferings([...courseOfferings, offering]);
  };

  const updateCourseOffering = (id, updatedOffering) => {
    setCourseOfferings(courseOfferings.map(co => co.id === id ? updatedOffering : co));
  };

  const deleteCourseOffering = (id) => {
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
  };

  // Student Registrations CRUD
  const registerStudent = (registration) => {
    setStudentRegistrations([...studentRegistrations, registration]);
  };

  const deleteStudentRegistration = (id) => {
    setStudentRegistrations(studentRegistrations.filter(sr => sr.id !== id));
  };

  const updateStudentRegistration = (id, updatedData) => {
    setStudentRegistrations(studentRegistrations.map(sr => sr.id === id ? { ...sr, ...updatedData } : sr));
  };

  return (
    <AppContext.Provider value={{
      courseTypes, addCourseType, updateCourseType, deleteCourseType,
      courses, addCourse, updateCourse, deleteCourse,
      courseOfferings, addCourseOffering, updateCourseOffering, deleteCourseOffering,
      studentRegistrations, registerStudent, deleteStudentRegistration,updateStudentRegistration, 
    }}>
      {children}
    </AppContext.Provider>
  );
};