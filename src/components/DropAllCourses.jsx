import React, { useState } from "react";
import { useEnrolledCourses } from "../customs/EnrolledCoursesContext";


export default function DropAllCourses() {
  const { dropAllCourses } = useEnrolledCourses();
  const [showPopup, setShowPopup] = useState(false);

  const handleDropAll = () => {
    dropAllCourses();
    setShowPopup(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Drop All Button */}
      <button
        className="drop-all-button"
        onClick={() => setShowPopup((prev) => !prev)}
      >
        Drop All
      </button>

      {/* Pop-Up Window */}
      {showPopup && (
        <div className="popup">
          <p>Are you sure you want to drop all courses? This action cannot be undone.</p>
          <div className="popup-actions">
            <button className="confirm-button" onClick={handleDropAll}>
              Yes, Drop All
            </button>
            <button className="cancel-button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
