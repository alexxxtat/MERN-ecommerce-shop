import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import AuthServices from "../services/auth-services";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthServices.logout(); //remove local storage
    window.alert("logout successed, Direct to home page");
    setCurrentUser(null);
  };
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Homepage
                  </Link>
                </li>
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Enroll
                    </Link>
                  </li>
                )}
                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link onClick={handleLogout} className="nav-link" to="/">
                      Logout
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/course">
                      Courses
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role === "instructor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postCourse">
                      Add new course
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role === "student" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/enroll">
                      Enrollment
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
