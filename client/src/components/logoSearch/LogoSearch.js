import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import logo from "../../images/logo.png";

const LogoSearch = () => {
  return (
    <div className="d-flex gap-2 ">
      <Link to="/">
        <img
          className="img-thumbnail border-0 bg-transparent"
          src={logo}
          alt=""
        />
      </Link>
      <div
        style={{ backgroundColor: "#ebebeb" }}
        className="d-flex gap-1 p-2 rounded"
      >
        <input
          style={{ outline: "none" }}
          className="bg-transparent border-0"
          type="text"
          placeholder="#Explore"
        />
        <div
          style={{ cursor: "pointer" }}
          className="text-white bg-warning px-2 py-1 rounded"
        >
          <BsSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
