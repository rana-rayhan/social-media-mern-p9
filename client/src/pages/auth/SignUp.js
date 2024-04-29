import React, { useEffect, useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import { base_url } from "../../api/api";
import { addLoggedUser } from "../../components/users/usersSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./style.css"; // Import the same "Login.css" file for styling

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");

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
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${base_url}/api/auth/register`, userData);

      toast.success("Registered successfully. Please login.");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
      // setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid loginPage">
      <Toaster />
      <div className="row d-flex d-md-flex justify-content-center align-items-center h-100">
        {/* Sign Up form */}
        <div className="col-12 col-md-6 d-flex d-md-flex justify-content-center">
          <form
            encType="multipart/form-data"
            className="bg-warning p-4 m-4 shadow-lg"
            onSubmit={handleSubmit}
          >
            <h4 className="text-center fw-bold">Sign Up</h4>

            <div className="mb-2">
              <label htmlFor="password" className="form-label fs-6 p-0 m-0">
                Name
              </label>
              <input
                required
                autoComplete="full name"
                value={userData.name}
                type="text"
                placeholder="Your full name"
                className="form-control"
                id="name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label fs-6 p-0 m-0">
                Email
              </label>
              <input
                required
                autoComplete="email"
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

            <div className="mb-2">
              <label htmlFor="password" className="form-label fs-6 p-0 m-0">
                Password
              </label>
              <input
                required
                autoComplete="password"
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

            <div className="mb-2">
              <label htmlFor="image" className="form-label d-none">
                Profile
              </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setUserData({ ...userData, image: base64 })
                }
              />
            </div>
            <div className="d-flex justify-content-center mb-2">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-success w-50 me-1"
              >
                {loading ? "Signup..." : "Signup"}
              </button>
              <Link className="btn btn-outline-success w-50 ms-1" to={"/login"}>
                Login
              </Link>
            </div>
            <span className="form-text">
              We'll never share your email with anyone else.
            </span>
          </form>
        </div>
        {/* Sign Up form end */}

        {/* Info desk */}
        <div className="col-12 col-md-6 d-flex d-md-flex justify-content-center">
          {/* Info desk start */}
          <div className="col-12 col-md-6 w-100">
            {/*  Login text start*/}
            {/* <div className="">
              {message && (
                <p className="text-danger text-center text-sm-center">
                  {message}
                </p>
              )}
            </div> */}
            {/* Login text end */}

            <p className="m-0 p-0 w-75 text-muted fw-bold">
              Unlock the full potential of our platform by creating an account
              to share your content or explore pre-made posts using our demo
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
        {/* Info desk end */}
      </div>
    </div>
  );
};

export default SignUp;
