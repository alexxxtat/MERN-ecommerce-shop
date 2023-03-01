import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Learning System</h1>
            <p className="col-md-8 fs-4">
              This system uses React.js as the front-end framework, and Node.js
              and MongoDB as the back-end server. Such projects are called MERN
              projects, and they are one of the most popular ways of creating
              modern websites.
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              Details
            </button>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-white bg-dark rounded-3">
              <h2>As a Student</h2>
              <p>
                Students can enroll in the courses they like. This site is for
                practice purposes only, please do not provide any personal
                information such as credit card numbers.
              </p>
              <button className="btn btn-outline-light" type="button">
                Log in as a member, or register an account
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>As an instructor</h2>
              <p>
                You can become an instructor by signing up and start making
                online courses. This site is for practice purposes only, please
                do not provide any personal information such as credit card
                numbers.
              </p>
              <button className="btn btn-outline-secondary" type="button">
                Start a course
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2023 Alex Chou
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
