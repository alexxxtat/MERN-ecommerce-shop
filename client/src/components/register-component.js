import React, { useState } from "react";
import AuthServices from "../services/auth-services";
import { useNavigate, useNavigation } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthServices.register(userName, email, password, role)
      .then(() => {
        window.alert("Register Successed, Will direct  to login page");
        navigate("/login");
      })
      .catch((e) => {
        console.log(e.response.data);
        setMessage(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleChangeUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email：</label>
          <input
            onChange={handleChangeEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password：</label>
          <input
            onChange={handleChangePassword}
            type="password"
            className="form-control"
            name="password"
            placeholder="atleast 6 characters"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Role：</label>
          <input
            onChange={handleChangeRole}
            type="text"
            className="form-control"
            placeholder="student or instructor"
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Enroll</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
