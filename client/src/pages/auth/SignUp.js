import React, { useEffect, useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";

import { base_url } from "../../api/api";
import { addLoggedUser } from "../../components/users/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
      dispatch(addLoggedUser(user));
      navigate("/");
    }
  }, [dispatch, navigate]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${base_url}/api/auth/register`, userData);

      setMessage("You are registered successfully, please login");
      setTimeout(() => {
        setMessage("");
      }, 9000);
    } catch (error) {
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 9000);
    }
  };

  return (
    <div className=" container p-4">
      {message && <p className=" text-danger text-center fw-bold">{message}</p>}
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            value={userData.name}
            type="text"
            className="form-control"
            id="name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            type="password"
            className="form-control"
            id="confirmPassword"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="image" className="form-label d-block">
            Profile
          </label>
          <FileBase
            // className="form-control mb-2"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUserData({ ...userData, image: base64 })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
