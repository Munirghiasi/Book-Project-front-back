import { useEffect, useState } from "react";
import { getCourses } from "../services/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // optional challenge

  useEffect(() => {
    // Guard: ignore the result if the effect was cleaned up
    // (e.g. React Strict Mode's extra setup/cleanup cycle).
    let ignore = false;

    async function fetchCourses() {
      try {
        const response = await getCourses();
        if (ignore) return;
        if (!Array.isArray(response.data)) {
          throw new Error("Expected an array of courses");
        }
        setCourses(response.data);
        setError("");
      } catch (err) {
        if (!ignore) {
          console.error("Error loading courses:", err);
          setCourses([]);
          setError("Unable to load courses. Check the backend and try again.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchCourses();
    return () => {
      ignore = true;
    };
  }, []);

  const term = search.trim().toLowerCase();
  const visibleCourses = term
    ? courses.filter(
        (c) =>
          String(c.title).toLowerCase().includes(term) ||
          String(c.code).toLowerCase().includes(term)
      )
    : courses;

  // Order: loading -> error -> empty result -> populated table.
  function renderCourseList() {
    if (loading) {
      return <p className="mb-0">Loading courses…</p>;
    }
    if (error) {
      return (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      );
    }
    if (courses.length === 0) {
      return <p className="mb-0">No courses available.</p>;
    }
    return (
      <>
        <div className="row g-2 align-items-center mb-3">
          <div className="col-md-6">
            <strong>Total courses: {courses.length}</strong>
            {term && (
              <span className="text-muted ms-2">
                (showing {visibleCourses.length})
              </span>
            )}
          </div>
          <div className="col-md-6">
            <input
              type="search"
              className="form-control"
              placeholder="Search by title or code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Title</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-warning me-2">
                      Edit
                    </button>
                    <button type="button" className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {visibleCourses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No courses match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Course Management</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <strong>Add New Course</strong>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Course Code</label>
                <input type="text" className="form-control"
                  placeholder="e.g. CS401" />
              </div>
              <div className="col-md-5">
                <label className="form-label">Course Title</label>
                <input type="text" className="form-control"
                  placeholder="Course title" />
              </div>
              <div className="col-md-2">
                <label className="form-label">Credits</label>
                <input type="number" className="form-control" min="1" />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="button" className="btn btn-primary w-100">
                  Add Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header"><strong>Course List</strong></div>
        <div className="card-body">{renderCourseList()}</div>
      </div>
    </div>
  );
}

export default Courses;
