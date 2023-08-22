import React from "react";
import PostShare from "./PostShare";
import TimelinePost from "./TimelinePost";

const PostSide = () => {
  return (
    <div className="d-flex flex-column gap-4">
      <PostShare />
      <TimelinePost />
    </div>
  );
};

export default PostSide;
