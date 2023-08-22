import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { deleteChatAction, fetchChats } from "../components/chats/chatSlice";
import Conversation from "../components/chats/Conversation";
import ChatBox from "../components/chats/ChatBox";
import { deleteChat, getUsers } from "../api/api";
import { addAllUser } from "../components/users/usersSlice";
import UserDetails from "../components/users/userDetails";
import InfoLogo from "../components/infoSide/InfoLogo";
import { BiLogIn } from "react-icons/bi";

// Chats components start
const Chats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useRef();
  const [dltMessage, setDltMessage] = useState("");

  const { userChats, loggedUser } = useSelector((state) => state);
  const { chats, isLoading } = userChats;
  const { user, allUsers } = loggedUser;
  const [currentChat, setCurrentChat] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  //
  //
  //
  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://social-media-mern-socket.onrender.com:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      // console.log(data); receive message
      setReceivedMessage(data);
    });
  }, []);
  //
  //
  // if local storage dont have active user then navigate to login
  useEffect(() => {
    const initialUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!initialUser) {
      navigate("/auth");
    } else {
      getUsers().then((data) => {
        const users = data.payload.filter(
          (el) => el._id !== initialUser.user._id
        );
        dispatch(addAllUser(users));
        dispatch(fetchChats(initialUser.user._id));
      });
    }
  }, [dispatch, navigate]);
  //
  //
  //
  const checkOnline = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  //
  //
  //
  const handleDelete = async (id) => {
    try {
      const res = await deleteChat(id);
      dispatch(deleteChatAction(res.payload));
      setDltMessage("Chat is deleted Successfully");
      setTimeout(() => {
        setDltMessage("");
      }, 3000);
    } catch (error) {
      setDltMessage(error.response.data.message);
      setTimeout(() => {
        setDltMessage("");
      }, 3000);
    }
  };
  //
  //
  //
  return (
    <div className="chat container-fluid bg-info-subtle pb-5">
      {user ? (
        <div className="container ">
          <div className="bg-primary my-5 rounded">
            <h2 className="p-2 text-white text-center">Your Chat</h2>
          </div>
          <div
            style={{ boxSizing: "border-box" }}
            className="row justify-content-center"
          >
            <div className="col-12 col-lg-3 bg-white p-3 rounded m-1">
              <h3 className="text-center border-bottom">Chats</h3>
              <div
                style={{
                  maxHeight: "490px",
                  overflowY: "scroll",
                  boxSizing: "border-box",
                }}
                className="d-flex flex-column"
              >
                {isLoading && (
                  <span className="text-center text-danger">Loading...</span>
                )}
                {dltMessage && (
                  <span className="text-center text-danger">{dltMessage}</span>
                )}

                {/* Chats conversation */}
                {chats &&
                  chats.map((chat) => (
                    <div
                      className="bg-white mt-1 rounded shadow-sm"
                      key={chat._id}
                      onClick={() => setCurrentChat(chat)}
                    >
                      <Conversation
                        key={chat._id}
                        chat={chat}
                        currentUser={user._id}
                        online={checkOnline(chat)}
                        handleDelete={handleDelete}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-12 col-lg-5 bg-white p-3 rounded m-1">
              <ChatBox
                chat={currentChat}
                currentUser={user._id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
              />
            </div>
            <div
              style={{
                maxHeight: "520px",
                overflowY: "scroll",
                boxSizing: "border-box",
              }}
              className="col-12 col-lg-3 bg-white p-3 rounded m-1"
            >
              <InfoLogo />
              <hr />
              <h5 className="text-center  fw-bold">Suggested friends</h5>
              {/* {allUsers && allUsers.length === 0 && (
              <span className=" text-primary">Loading...</span>
            )} */}
              {allUsers &&
                allUsers.map((el) => (
                  <UserDetails key={el._id} currentUser={user._id} user={el} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="position-relative" style={{ height: "75vh" }}>
          <Link style={{ textDecoration: "none" }} to="/auth">
            <h3 className="position-absolute top-50">
              Please log in or Sign up <BiLogIn />
            </h3>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Chats;
