import React from "react";
import { Link } from "react-router-dom";

import home from "../../images/home.png";
import noti from "../../images/noti.png";
import comment from "../../images/comment.png";

const InfoLogo = () => {
  return (
    <div className="d-flex gap-3 justify-content-between p-2 myText">
      <Link to={"/"}>
        <img className="" style={{ width: "25px" }} src={home} alt="" />
        <span className=" myText">Home</span>
      </Link>
      <img className="" style={{ width: "25px" }} src={noti} alt="" />

      <Link to="/chats" className="">
        <img className="" style={{ width: "25px" }} src={comment} alt="" />
        <span className=" myText">Chats</span>
      </Link>
    </div>
  );
};

export default InfoLogo;
