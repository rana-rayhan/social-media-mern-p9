import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserById, getUserById, unfollowUserById } from "../../api/api";
import { addLoggedUser } from "../users/usersSlice";

import defaultpic from "../../images/defaultpic.jpeg"

const FollowUser = ({ person }) => {
  const { user } = useSelector((state) => state.loggedUser);
  const isFollowing = person.followers.includes(user._id);
  const [following, setFollowing] = useState(isFollowing);
  const dispatch = useDispatch();

  const handleFollowToggle = (id, user) => {
    if (following) {
      unfollowUserById(id, user)
        .then((res) => {
          getUserById(user._id).then((data) => {
            dispatch(addLoggedUser(data.payload));
          });
          setFollowing(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      followUserById(id, user)
        .then((res) => {
          getUserById(user._id).then((data) => {
            dispatch(addLoggedUser(data.payload));
          });

          setFollowing(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };

  return (
    <div key={person._id} className="follower overflow-scroll">
      <div>
        <img
          src={person.image ? person.image : defaultpic}
          alt="null"
          className="followerImage"
        />
        <div className="name">
          <span className="text-uppercase">{person.name}</span>
          <span>{person.email}</span>
        </div>
      </div>
      <button
        onClick={() => handleFollowToggle(person._id, user)}
        className="button fc-button btn btn-sm px-3 text-white btn-warning"
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowUser;
