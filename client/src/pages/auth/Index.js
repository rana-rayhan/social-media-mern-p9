import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const Index = () => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(true);

  const handleLoginClick = () => {
    setLogin(true);
    setSignup(false);
  };

  const handleSignupClick = () => {
    setLogin(false);
    setSignup(true);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row flex-column mt-5">
          <div className="col-6 bg-white m-auto rounded py-3 mb-3">
            <h2 className="text-center">Chap App</h2>
          </div>
          <div className="col-6 bg-white m-auto rounded py-3">
            <div className="row">
              <div className="d-flex justify-content-evenly mb-3">
                <button
                  onClick={handleLoginClick}
                  className={`btn border-0 btn-sm-group rounded-5 w-75 mx-1 ${
                    login ? "disabled" : "bg-info"
                  }`}
                  disabled={login}
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className={`btn border-0 btn-sm-group rounded-5 w-75 mx-1 ${
                    signup ? " disabled" : "bg-info"
                  }`}
                  disabled={signup}
                >
                  SignUp
                </button>
              </div>

              <div className="col-12">{login && <Login />}</div>
              <div className="col-12">{signup && <SignUp />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
