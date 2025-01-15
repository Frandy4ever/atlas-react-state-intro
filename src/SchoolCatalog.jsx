import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  // To store and track various data changes.
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch data when the component mounts.
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Ensures the program runs once.

  // Conditional rendering based on loading or error state.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filter courses based on search query (insensitive)
  const filteredCourses = courses.filter((course) => {
    const query = search?.toLowerCase();
    return (
      (course.courseNumber || "").toLowerCase().includes(query) ||
      (course.name || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      {/* Search Input  */}
      <input
        type="text"
        placeholder="Search by Course Number or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={`${course.trimester}-${course.courseNumber}`}>
                <td>{course.trimester}</td>
                <td>{course.courseNumber}</td>
                <td>{course.name}</td>
                <td>{course.semesterCredits}</td>
                <td>{course.totalClockHours}</td>
                <td>
                  <button>Enroll</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No courses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
