import { useState, useEffect } from "react";
import authServices from "../services/auth-services";
import AuthServices from "../services/auth-services";
const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>You have to login first to see.</div>}
      {currentUser && (
        <div>
          <h2>Your Profole：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>Name :{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>User ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Email: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Role: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
