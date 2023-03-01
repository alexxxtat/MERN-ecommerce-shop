import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoursesService from "../services/courses.service";
const CourseComponent = ({ currentUser, setCurrentUSer }) => {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CoursesService.get(_id)
          .then((data) => {
            console.log(data.data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CoursesService.getEnrolledCourses(_id)
          .then((data) => {
            // console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You have to login to see this page</p>
          <button className="btn btn-primary btn-lg " onClick={handleButton}>
            Login
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>Welcome to instrocutor course page</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>Welcome to student course page</h1>
        </div>
      )}
      {currentUser && courseData && courseData != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Course Name: {course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    Number of Sudent:{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    Price: ${course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
