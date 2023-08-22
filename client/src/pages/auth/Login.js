import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  base_url,
  fetchTimelinePost,
  fetchUserPost,
  getUserById,
  getUsers,
} from "../../api/api";
import {
  addAllUser,
  addLoggedUser,
  userPosts,
  userTimelinePosts,
} from "../../components/users/usersSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
      getUserById(user.user._id).then((data) => {
        dispatch(addLoggedUser(data.payload));
        navigate("/");
      });
    }
  }, [dispatch, navigate]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(null);
    setLoading(true);
    axios
      .post(`${base_url}/api/auth/login`, userData)
      .then((res) => {
        const user = res.data.payload;
        // set user to local storage
        localStorage.setItem("loggedUser", JSON.stringify(user));
        getUserById(user.user._id).then((data) => {
          dispatch(addLoggedUser(data.payload));
        });
        fetchTimelinePost(user.user._id).then((res) => {
          dispatch(userTimelinePosts(res.payload));
        });
        // get all user for friend suggestions
        return getUsers();
      })
      .then((data) => {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        const users = data.payload.filter((el) => el._id !== user.user._id);
        dispatch(addAllUser(users));

        // fetch user post
        return fetchUserPost(user.user._id);
      })
      .then((post) => {
        dispatch(userPosts(post.payload));
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        setIsError(error.response.data.message);
      });
  };

  return (
    <div className="container p-4">
      <h4 className="text-center">Please login</h4>
      <Link
        className="text-decoration-none text-muted text-center"
        to={"/signup"}
      >
        <p>If you dont't have account, please signup</p>
      </Link>
      <form className="col-6 m-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          {loading && <p className="text-danger fw-bold">Loading...</p>}
          {isError && (
            <p className=" text-danger text-center fw-bold">{isError}</p>
          )}
          <label htmlFor="email" className="form-label">
            Email address
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
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
