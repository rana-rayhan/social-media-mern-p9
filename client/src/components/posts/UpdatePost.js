import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FileBase from "react-file-base64";
import { updateUserPost } from "../../api/api";

const UpdatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;
  const [updateMsg, setUpdateMsg] = useState(null);

  const [postData, setPostData] = useState({
    userId: post.userId,
    desc: post.desc,
    image: post.image,
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    setUpdateMsg("Post Updating...");

    await updateUserPost(post._id, postData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setUpdateMsg(err.response.data.message);
      });
  };

  return (
    <div className="row p-4">
      <form
        onSubmit={handlePostSubmit}
        className="col-6 align-content-center m-auto"
      >
        {updateMsg && (
          <p className=" text-center text-danger fs-3">{updateMsg}</p>
        )}
        <div>
          <input
            className="input-group border-0 p-2 m-2 rounded"
            value={postData.desc}
            type="text"
            onChange={(e) => setPostData({ ...postData, desc: e.target.value })}
          />
        </div>
        <div className=" border text-warning p-2 m-2 w-100  rounded">
          <FileBase
            // className="form-control mb-2"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </div>
        <button className="btn btn-sm w-100 text-white fw-bold btn-warning p-2 m-2">Update</button>
      </form>
    </div>
  );
};

export default UpdatePost;
