import React, { useState } from "react";
import { Toast } from "react-bootstrap";

import defaultpic from "../../images/defaultpic.jpeg";
import { addConversation } from "../../api/api";
import { createChat } from "../chats/chatSlice";
import { useDispatch } from "react-redux";

const UserDetails = ({ user, currentUser }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChatApi = async (e) => {
    e.preventDefault();
    try {
      const chat = await addConversation(currentUser, user._id);
      dispatch(createChat(chat.payload));
    } catch (error) {
      const errorMessage = error.response.data.message;
      setErrorMessage(errorMessage); // Set the error message
      setShowToast(true); // Show the toast

      setTimeout(() => {
        setShowToast(false); // off the toast
      }, 3000);
    }
  };

  return (
    <>
      <div className="row p-2 mt-1 border rounded">
        <div className="col-3">
          <div className="d-flex position-relative">
            <div className="rounded-4">
              <img
                style={{ width: "40px", height: "40px" }}
                src={user?.image ? user.image : defaultpic}
                alt="Null"
                className=" rounded-5"
              />
            </div>
          </div>
        </div>
        <div className="col-9">
          {user && (
            <div className="d-flex flex-column">
              <span className="text-uppercase m-0 p-0 fw-bold d-inline">
                {user.name}
              </span>
              <span
                style={{ fontSize: "10px" }}
                className="text-uppercase m-0 p-0 d-inline"
              >
                {user.email}
              </span>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={handleChatApi}
            className=" btn btn-sm btn-outline-primary w-50"
          >
            Sent message
          </button>
        </div>
      </div>
      {/* Toast component */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default UserDetails;
