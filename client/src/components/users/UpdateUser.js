import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { updateUserInfo } from "../../api/api";

const UpdateUser = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.loggedUser.user);
  const [updateMsg, setUpdateMsg] = useState(null);

  const [userData, setUserData] = useState({
    userId: user._id,
    name: user.name,
    image: user.image,
    coverImage: user.coverImage,
    about: user.about,
    livesin: user.livesin,
    relationship: user.relationship,
    worksAt: user.worksAt,
  });

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setUpdateMsg("User info is Updating...");

    await updateUserInfo(user._id, userData)
      .then((res) => {
        navigate("/profile");
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
          <label htmlFor="name">Name</label>
          <input
            className="input-group border-0 p-2 m-2 rounded"
            value={userData.name}
            type="text"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="name">About</label>
          <input
            className="input-group border-0 p-2 m-2 rounded"
            value={userData.about}
            type="text"
            onChange={(e) =>
              setUserData({ ...userData, about: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="name">Lives In</label>
          <input
            className="input-group border-0 p-2 m-2 rounded"
            value={userData.livesin}
            type="text"
            onChange={(e) =>
              setUserData({ ...userData, livesin: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="name">Relationship Status</label>
          <input
            className="input-group border-0 p-2 m-2 rounded"
            value={userData.relationship}
            type="text"
            onChange={(e) =>
              setUserData({ ...userData, relationship: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="name">Work Status</label>
          <input
            className="input-group border-0 p-2 m-2 rounded"
            value={userData.worksAt}
            type="text"
            onChange={(e) =>
              setUserData({ ...userData, worksAt: e.target.value })
            }
          />
        </div>
        <label htmlFor="image">Profile Picture</label>
        <div className=" border text-warning p-2 m-2 w-100  rounded">
          <FileBase
            // className="form-control mb-2"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUserData({ ...userData, image: base64 })}
          />
        </div>
        <label htmlFor="image">Cover Picture</label>
        <div className=" border text-warning p-2 m-2 w-100  rounded">
          <FileBase
            // className="form-control mb-2"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setUserData({ ...userData, coverImage: base64 })
            }
          />
        </div>
        <button className="btn btn-sm w-100 text-white fw-bold btn-warning p-2 m-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
