import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { addMessages, getMessages, getUserById } from "../../api/api";
import defaultpic from "../../images/defaultpic.jpeg";

//
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");

  const handleChange = (newMessage) => {
    setNewMessages(newMessage);
  };

  // fetch user info
  useEffect(() => {
    try {
      const userId = chat?.members?.find((id) => id !== currentUser);
      const getUserData = async () => {
        const { payload } = await getUserById(userId);
        setUserData(payload);
      };

      if (chat !== null) getUserData();
    } catch (error) {
      console.log(error);
    }
  }, [chat, chat?.members, currentUser]);

  // fetch messages
  useEffect(() => {
    try {
      const masseges = async () => {
        const { payload } = await getMessages(chat._id);
        setMessages(payload);
      };

      if (chat !== null) masseges();
    } catch (error) {
      console.log(error);
    }
  }, [chat]);

  const handleSendMsg = async (e) => {
    e.preventDefault();

    const messageData = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessages,
    };

    try {
      const receiverId = chat.members.find((id) => id !== currentUser);
      // send message to socket server
      setSendMessage({ ...messageData, receiverId });

      const { payload } = await addMessages(messageData);
      setMessages([...messages, payload]);
      setNewMessages("");
    } catch (error) {
      console.log(error);
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    // console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessage]);

  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      style={{ height: "490px", overflowY: "scroll", boxSizing: "border-box" }}
      className=" p-3 bg-white rounded"
    >
      {chat ? (
        <>
          <div className="d-flex">
            {userData && (
              <>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                  src={chat && userData?.image ? userData.image : defaultpic}
                  alt=""
                />
                <span className="text-uppercase mt-2 ms-2 fw-bold ">
                  {userData.name}
                </span>
              </>
            )}
          </div>

          {/* chat box messages */}
          <div className="d-flex flex-column ">
            {messages &&
              messages.map((msg) => (
                <div key={msg._id}>
                  <div
                    className={
                      msg.senderId === currentUser
                        ? " w-100 bg-info p-2 mt-1 text-end rounded"
                        : " w-100 bg-info-subtle p-2  mt-1 text-start rounded"
                    }
                  >
                    <p className="p-0 m-0">{msg.text}</p>
                    {msg.createdAt && (
                      <p
                        style={{ fontSize: "12px" }}
                        className="p-0 m-0 text-muted"
                      >
                        {formatDistanceToNow(new Date(msg.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>

          {/* chat sender */}
          <div className="d-flex mt-3">
            <div className="mt-1">
              <button className="btn btn-info">+</button>
            </div>
            <div className="w-75">
              <InputEmoji value={newMessages} onChange={handleChange} />
            </div>
            <div className=" mt-1">
              <button onClick={handleSendMsg} className=" btn btn-info">
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <span>Tap on chat to start conversation</span>
      )}
    </div>
  );
};

export default ChatBox;
