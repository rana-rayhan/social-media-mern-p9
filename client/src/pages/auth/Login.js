import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./style.css"; // Import your custom CSS

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
  // const [loading, setLoading] = useState(false);
  // const [isError, setIsError] = useState(null);

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
    // setIsError(null);
    // setLoading(true);
    axios
      .post(`${base_url}/api/auth/login`, userData)
      .then((res) => {
        toast.success("Please wait...");
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
        // setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        // setLoading(false);
        // setIsError(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="container-fluid loginPage">
      <Toaster />
      <div className="row d-flex d-md-flex justify-content-center align-items-center h-100">
        {/* Login form */}
        <div className="col-12 col-md-6 d-flex d-md-flex justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="bg-warning p-4 m-4 shadow-lg"
          >
            <h4 className="text-center fw-bold">LOGIN</h4>
            <div className="">
              <label htmlFor="email" className="form-label fs-6 p-0 m-0">
                Email
              </label>
              <input
                required
                value={userData.email}
                placeholder="example@gmail.com"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fs-6 p-0 m-0">
                Password
              </label>
              <input
                required
                value={userData.password}
                placeholder="Example@24"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button type="submit" className="btn btn-success w-50 me-1">
                Login
              </button>
              <Link
                className="btn btn-outline-success text-black w-50 ms-1"
                to={"/signup"}
              >
                SignUp
              </Link>
            </div>
            <span className="form-text">
              We'll never share your email with anyone else.
            </span>
          </form>
        </div>
        {/* Login form End */}

        {/* Info desk start */}
        <div className="col-12 col-md-6">
          {/*  Login text start*/}
          {/* <div>
            {loading && (
              <h3 className="text-danger fw-bold text-capitalize text-center">
                Loading...
              </h3>
            )}
            {isError && (
              <p className="text-danger text-center text-sm-center">
                {isError}
              </p>
            )}
          </div> */}
          {/* Login text end */}

          <p className="m-0 p-0 w-75 text-muted fw-bold">
            Unlock the full potential of our platform by creating an account to
            share your content or explore pre-made posts using our demo
            credentials.
          </p>
          <span className="text-danger fw-bold">
            Pre-made email: <span className="">test@gmail.com</span>
          </span>
          <br />
          <span className="text-danger fw-bold">
            Pre-made password: Test71@
          </span>
          <hr className="w-75" />
        </div>
        {/* Info desk end */}
      </div>
    </div>
  );
};

export default Login;
