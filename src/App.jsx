import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar'
import CourseTypeList from './components/CourseTypes/CourseTypeList';
import CourseTypeForm from './components/CourseTypes/CourseTypeForm';
import CourseList from './components/Courses/CourseList';
import CourseForm from './components/Courses/CourseForm';

import CourseOfferingForm from './components/CourseOfferings/CourseOfferingForm';

import StudentRegistrationForm from './components/StudentRegistrations/StudentRegistrationForm';


function App() {
  

  return (
    <>
     <AppProvider>
      <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
        <Routes>
              <Route path="/course-types" element={
                <div className="space-y-8">
                  <CourseTypeForm />
                  <CourseTypeList />
                </div>
              } />
              <Route path="/courses" element={
                <div className="space-y-8">
                  <CourseForm />
                  <CourseList />
                </div>
              } />
              <Route path="/course-offerings" element={
                <div className="space-y-8">
                  <CourseOfferingForm />
                </div>
              } />
              <Route path="/student-registrations" element={
                <div className="space-y-8">
                  <StudentRegistrationForm />
                </div>
              } />
              {/* <Route path="*" element={
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
                  <p className="mt-4 text-lg text-gray-600">The page you're looking for doesn't exist.</p>
                </div>
              } /> */}
            </Routes>
        </div>
        </div>
      </Router>
      </AppProvider>
    </>
  )
}

export default App
