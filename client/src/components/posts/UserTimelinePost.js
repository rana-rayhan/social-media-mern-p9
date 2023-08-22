import React, { useState } from "react";
import { deleteUserPost, likeUserPost } from "../../api/api";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  deleteUserPostAction,
  deleteUserTimelinePost,
} from "../users/usersSlice";

const UserTimelinePost = ({ post, currentUser }) => {
  const dispatch = useDispatch();
  const [dlt, setDlt] = useState(null);

  const [isLiked, setLiked] = useState(post.likes.includes(currentUser));
  const [isUserPost] = useState(post.userId.includes(currentUser));
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLike = async (id, currentUser) => {
    setLiked((p) => !p);

    isLiked
      ? setLikeCount((prev) => prev - 1)
      : setLikeCount((prev) => prev + 1);
    await likeUserPost(id, currentUser)
      .then(() => {})
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const handleDelete = async (id, currentUser) => {
    await deleteUserPost(id, currentUser)
      .then((res) => {
        dispatch(deleteUserTimelinePost(id));
        dispatch(deleteUserPostAction(id));
        return res;
      })
      .catch((err) => {
        setDlt(err.response.data.message);
        setTimeout(() => {
          setDlt(null);
        }, 3000);
      });
  };
  return (
    <div className="d-flex flex-column p-3 bg-white rounded-2">
      {dlt && (
        <h5 className="text-center text-danger overflow-hidden d-inline">
          {dlt}
        </h5>
      )}
      <span className="text-muted mb-2">Author: {post.name}</span>

      <div className="m-auto">
        <img
          style={{ maxHeight: "350px" }}
          src={post.image}
          alt=""
          className="img-fluid rounded-2"
        />
      </div>
      <div>
        <p className=" mt-2 fs-5">{post.desc}</p>
      </div>
      <div className="d-flex justify-content-between">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleLike(post._id, currentUser)}
          className=""
        >
          <button className="btn btn-warning btn-sm px-3 text-white fw-bold">
            {likeCount}
            <span className=" mx-1">
              {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            </span>
          </button>
        </div>
        <div>like</div>
        <div className={isUserPost ? "d-block" : "d-none"}>
          <Link className="" to="/post-update" state={post}>
            <button className="btn btn-warning btn-sm px-3 text-white">
              Update
            </button>
          </Link>
        </div>
        <div className="">
          <button
            className="btn btn-warning btn-sm px-3 text-white fw-bold"
            onClick={() => handleDelete(post._id, currentUser)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTimelinePost;
