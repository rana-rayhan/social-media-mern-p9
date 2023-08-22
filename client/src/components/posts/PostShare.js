import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import "./post.css";
import { createPostById } from "../../api/api";
import { addTimelinePosts, addUserPosts } from "../users/usersSlice";
import defaultpic from "../../images/defaultpic.jpeg";

const PostShare = () => {
  const { user } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    userId: "", // Initialize userId as an empty string
    desc: "",
    image: "",
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      ...userData,
      name: user.name,
      userId: user._id,
    };

    await createPostById(updatedUserData)
      .then((res) => {
        dispatch(addTimelinePosts(res.payload));
        dispatch(addUserPosts(res.payload));
      })
      .catch((err) => {
        console.log(err);
      });

    setUserData({
      desc: "",
      image: "",
    });
  };

  return (
    <form className="PostShare" onSubmit={handlePostSubmit}>
      <img src={user.image ? user.image : defaultpic} alt="" />
      <div>
        <input
          value={userData.desc}
          onChange={(e) => setUserData({ ...userData, desc: e.target.value })}
          type="text"
          placeholder="What's happening"
        />
        <div className="postOptions">
          <div className="option col-6" style={{ color: "var(--photo)" }}>
            <FileBase
              type="file"
              value={userData.image}
              multiple={false}
              onDone={({ base64 }) =>
                setUserData({ ...userData, image: base64 })
              }
            />
          </div>

          <div
            className="option d-none d-lg-block"
            style={{ color: "var(--shedule)" }}
          >
            Schedule
          </div>
          <button
            type="submit"
            className="btn btn-warning btn-sm px-4 text-white"
          >
            Share
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostShare;
