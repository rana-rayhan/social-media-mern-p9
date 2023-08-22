import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

import defaultpic from "../../images/defaultpic.jpeg";
import { getUserById } from "../../api/api";

const Conversation = ({ chat, currentUser, online, handleDelete }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const userId = chat.members.find((id) => id !== currentUser);
      const getUserData = async () => {
        const { payload } = await getUserById(userId);
        setUserData(payload);
      };
      getUserData();
    } catch (error) {
      console.log(error);
    }
  }, [chat.members, currentUser]);

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        className="row p-2 border-bottom rounded"
      >
        <div className="col-3">
          <div className="d-flex position-relative">
            <div
              style={{ position: "absolute", bottom: "-5px", left: "31px" }}
              className=""
            >
              <span
                style={{ fontSize: "100px" }}
                className={online ? "text-info" : "d-none"}
              >
                .
              </span>
            </div>
            <div className="rounded-4">
              <img
                style={{ width: "50px", height: "50px" }}
                src={userData?.image ? userData.image : defaultpic}
                alt=""
                className=" rounded-5"
              />
            </div>
          </div>
        </div>
        <div className="col-9">
          {userData && (
            <div className="d-flex flex-column">
              <span className="text-uppercase m-0 p-0 fw-bold d-inline">
                {userData.name}
              </span>
              <div className="d-flex justify-content-between">
                <span className="m-0 p-0 text-muted">
                  {online ? "Online" : "Oflline"}
                </span>
                <button
                  onClick={() => handleDelete(chat._id)}
                  className="border-0 btn text-danger pointer-event"
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Conversation;
