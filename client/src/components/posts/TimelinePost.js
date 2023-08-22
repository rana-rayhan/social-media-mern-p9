import React from "react";
import { useSelector } from "react-redux";
import UserTimelinePost from "./UserTimelinePost";

const TimelinePost = () => {
  const { user, timelinePosts } = useSelector((state) => state.loggedUser);

  return (
    <div style={{maxHeight:"710px"}} className="d-flex flex-column gap-3 overflow-scroll">
      {timelinePosts &&
        timelinePosts.map((post) => (
          <div key={post._id}>
            <UserTimelinePost post={post} currentUser={user._id} />
          </div>
        ))}
    </div>
  );
};

export default TimelinePost;
