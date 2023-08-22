import axios from "axios";

// base url
export const base_url = "http://localhost:4000";

// get user by
export const getUsers = async () => {
  const res = await axios.get(`http://localhost:4000/api/users/`);
  return res.data;
};
// get user by id
export const getUserById = async (userId) => {
  const res = await axios.get(`http://localhost:4000/api/users/${userId}`);
  return res.data;
};

// fetch messages
export const getMessages = async (chatId) => {
  const res = await axios.get(`http://localhost:4000/api/messages/${chatId}`);
  return res.data;
};
// post messages
export const addMessages = async (messages) => {
  const res = await axios.post(`http://localhost:4000/api/messages/`, messages);
  return res.data;
};
// post conversation
export const addConversation = async (senderId, receiverId) => {
  const res = await axios.post(`http://localhost:4000/api/chat/`, {
    senderId,
    receiverId,
  });
  return res.data;
};
// delete chat || conversation
export const deleteChat = async (chatId) => {
  const res = await axios.delete(`http://localhost:4000/api/chat/${chatId}`);
  return res.data;
};
// delete post || conversation
export const deleteUserPost = async (id, userId) => {
  const res = await axios.delete(`http://localhost:4000/api/posts/${id}`, {
    data: { userId },
  });
  return res.data;
};
// like post || conversation
export const likeUserPost = async (id, userId) => {
  const res = await axios.put(`http://localhost:4000/api/posts/like/${id}`, {
    userId,
  });
  return res.data;
};
// Update post || conversation
export const updateUserPost = async (id, postData) => {
  const res = await axios.put(
    `http://localhost:4000/api/posts/${id}`,
    postData
  );
  return res.data;
};
// Update user info || conversation
export const updateUserInfo = async (id, userData) => {
  const res = await axios.put(
    `http://localhost:4000/api/users/${id}`,
    userData
  );
  return res.data;
};

// fetch post || post
export const fetchUserPost = async (id) => {
  const res = await axios.get(`http://localhost:4000/api/posts/user/${id}`);
  return res.data;
};
// fetch post || post
export const fetchTimelinePost = async (id) => {
  const res = await axios.get(
    `http://localhost:4000/api/posts/timelinepost/${id}`
  );
  return res.data;
};

// create post || post
export const createPostById = async (userData) => {
  const res = await axios.post(`http://localhost:4000/api/posts/`, userData);
  return res.data;
};

// follow user  || follow
export const followUserById = async (id, user) => {
  const res = await axios.put(
    `http://localhost:4000/api/users/follow/${id}`,
    user
  );
  return res.data;
};

// follow user  || follow
export const unfollowUserById = async (id, user) => {
  const res = await axios.put(
    `http://localhost:4000/api/users/unfollow/${id}`,
    user
  );
  return res.data;
};
