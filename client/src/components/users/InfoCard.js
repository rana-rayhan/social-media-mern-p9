import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const InfoCard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/auth");
  };
  const user = useSelector((state) => state.loggedUser.user);
  return (
    <div>
      <div className="bg-white p-3 rounded">
        <div className="d-flex justify-content-between">
          <p className="text-warning fw-bold text-center fs-4">Your info</p>
          <Link to="/update-user" state={user} className="text-warning fs-5">
            <FaEdit />
          </Link>
        </div>
        <p>
          <span className="d-inline fw-bold text-warning">Name: </span>
          {user.name}
        </p>
        <p>
          <span className="d-inline fw-bold text-warning">About: </span>
          {user.about}
        </p>
        <p>
          <span className="d-inline fw-bold text-warning"> Lives in: </span>
          {user.livesin}
        </p>
        <p>
          <span className="d-inline fw-bold text-warning">Status: </span>
          {user.relationship}
        </p>
        <p>
          <span className="d-inline fw-bold text-warning">Work at: </span>
          {user.worksAt}
        </p>
        <button
          onClick={handleLogout}
          className="btn w-100 btn-sm btn-warning text-white fw-bold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
