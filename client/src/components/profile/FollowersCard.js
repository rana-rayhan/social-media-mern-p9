import React from "react";
import { useSelector } from "react-redux";
import FollowUser from "./FollowUser";

const FollowersCard = () => {
  const { allUsers } = useSelector((state) => state.loggedUser);

  return (
    <div
      style={{ maxHeight: "80vh" }}
      className="FollowersCard overflow-scroll bg-white p-3"
    >
      <h5 className="fw-bolder text-center m-0 p-0">Users you can follow</h5>
      <hr className="m-0 p-0" />
      <div>
        {allUsers &&
          allUsers.map((person) => (
            <div key={person._id}>
              <FollowUser person={person} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FollowersCard;
