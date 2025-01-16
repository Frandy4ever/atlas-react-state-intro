import React, { createContext, useContext, useState } from "react";

const EnrolledCoursesContext = createContext();

// Create a custom hook for easier access to the context
export const useEnrolledCourses = () => useContext(EnrolledCoursesContext);

// Create the provider component
export const EnrolledCoursesProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Enroll in a course
  const enrollCourse = (course) => {
    if (!enrolledCourses.some((enrolled) => enrolled.courseNumber === course.courseNumber)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  // Drop a course
  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prev) =>
      prev.filter((course) => course.courseNumber !== courseNumber)
    );
   };
   
   // Drop all courses 
   const dropAllCourses = () => {
      setEnrolledCourses([]);
   };

  // Value provided to the context
  const value = {
    enrolledCourses,
    enrollCourse,
     dropCourse,
    dropAllCourses,
  };

  return (
    <EnrolledCoursesContext.Provider value={value}>
      {children}
    </EnrolledCoursesContext.Provider>
  );
};
