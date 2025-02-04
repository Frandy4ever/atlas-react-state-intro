import { useEffect, useState } from "react";
import { useEnrolledCourses } from "../customs/EnrolledCoursesContext";

export default function SchoolCatalog() {
  // State for managing courses and UI behavior
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5; // Number of rows per page

  // Access context functions
  const { enrollCourse } = useEnrolledCourses();

  useEffect(() => {
    // Fetch courses data
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
  }, []);

  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) => {
    const query = search.toLowerCase();
    return (
      (course.courseNumber || "").toLowerCase().includes(query) ||
      (course.courseName || "").toLowerCase().includes(query)
    );
  });

  // Sort the filtered courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn] || "";
    const bValue = b[sortColumn] || "";

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return sortDirection === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    }
  });

  // Paginate the sorted courses
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCourses = sortedCourses.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Handle sorting when a column header is clicked
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < Math.ceil(sortedCourses.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to the first page whenever the search query or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortColumn, sortDirection]);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Render table only when data is ready */}
      {!loading && !error && (
        <>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Course Number or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Courses Table */}
          <table>
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("trimester")}
                  className={sortColumn === "trimester" ? "active-column" : ""}
                >
                  Trimester{" "}
                  {sortColumn === "trimester" && (
                    <span className="sort-arrow">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("courseNumber")}
                  className={
                    sortColumn === "courseNumber" ? "active-column" : ""
                  }
                >
                  Course Number{" "}
                  {sortColumn === "courseNumber" && (
                    <span className="sort-arrow">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("courseName")}
                  className={sortColumn === "courseName" ? "active-column" : ""}
                >
                  Course Name{" "}
                  {sortColumn === "courseName" && (
                    <span className="sort-arrow">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("semesterCredits")}
                  className={
                    sortColumn === "semesterCredits" ? "active-column" : ""
                  }
                >
                  Semester Credits{" "}
                  {sortColumn === "semesterCredits" && (
                    <span className="sort-arrow">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  onClick={() => handleSort("totalClockHours")}
                  className={
                    sortColumn === "totalClockHours" ? "active-column" : ""
                  }
                >
                  
                  Total Clock Hours{" "}
                  {sortColumn === "totalClockHours" && (
                    <span className="sort-arrow">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <tr key={`${course.trimester}-${course.courseNumber}`}>
                    <td>{course.trimester}</td>
                    <td>{course.courseNumber}</td>
                    <td>{course.courseName}</td>
                    <td>{course.semesterCredits}</td>
                    <td>{course.totalClockHours}</td>
                    <td>
                      <button onClick={() => enrollCourse(course)}>
                        Enroll
                      </button>
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

          {/* Pagination Buttons */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(sortedCourses.length / rowsPerPage)
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
