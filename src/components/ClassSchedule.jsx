import { useEnrolledCourses } from "../customs/EnrolledCoursesContext";
import { useState } from "react";

export default function ClassSchedule() {
  // Access context
  const { enrolledCourses, dropCourse, dropAllCourses } = useEnrolledCourses();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDropAll = () => {
    dropAllCourses();
    setShowModal(false);
  };

  // Determine table class based on enrollment status
  const tableClassName = enrolledCourses.length > 0 ? "no-border-radius" : "";

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <p className="enrollment">Classes Enrolled: {enrolledCourses.length}</p>

      {/* Drop All Button below <h3> */}
      {enrolledCourses.length > 0 && (
        <>
          <button
            className="drop-all-button"
            onClick={() => setShowModal(true)}
          >
            Drop All Courses
          </button>

          {/* Confirmation Modal */}
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Drop All Courses</h2>
                <p>
                  Are you sure you want to drop all courses?
                  <br /> This action cannot be undone.
                </p>
                <div className="pagination">
                  <button className="drop-all" onClick={handleConfirmDropAll}>
                    Drop All
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Always render the table */}
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.length > 0 ? (
            // Render enrolled courses if available
            enrolledCourses.map((course) => (
              <tr key={course.courseNumber}>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>
                  <button onClick={() => dropCourse(course.courseNumber)}>
                    Drop
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // Render a single row if no courses are enrolled
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No enrolled courses.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
