import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import cover from "../../images/cover.jpg";
import defaultpic from "../../images/defaultpic.jpeg";

const ProfileCard = () => {
  const user = useSelector((state) => state.loggedUser.user);
  const { posts } = useSelector((state) => state.loggedUser);
  const ProfilePage = true;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          style={{ maxHeight: "150px" }}
          src={user.coverImage ? user.coverImage : cover}
          alt=""
        />
        <img src={user.image ? user.image : defaultpic} alt="" />
      </div>

      <div className="ProfileName">
        <span>{user.name}</span>
        <span>{user.about}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      <span>
        <Link
          style={{ textDecoration: "none" }}
          className="text-warning"
          to="/profile"
        >
          My Profile
        </Link>
      </span>
    </div>
  );
};

export default ProfileCard;
