import { useEnrolledCourses } from "../customs/EnrolledCoursesContext";

export default function ClassSchedule() {
  const { enrolledCourses, dropCourse, dropAllCourses } = useEnrolledCourses(); // Access context

  // Determine table class based on enrollment status
  const tableClassName = enrolledCourses.length > 0 ? "no-border-radius" : "";

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <h3>Enrolled Courses: {enrolledCourses.length}</h3>

      {/* Drop All Button below <h3> */}
      {enrolledCourses.length > 0 && (
        <button className="drop-all-button" onClick={dropAllCourses}>
          Drop All
        </button>
      )}

      {/* Always render the table */}
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Action</th>
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
