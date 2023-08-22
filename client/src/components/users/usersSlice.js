import { createSlice } from "@reduxjs/toolkit";

// Get the initial user from local storage
const { user, token } = JSON.parse(localStorage.getItem("loggedUser")) || {};

// Slice based on logged user
const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: {
    user: user,
    token: token,
    allUsers: [],
    posts: [],
    timelinePosts: [],
  },
  reducers: {
    addLoggedUser: (state, action) => {
      state.user = action.payload;
    },
    addAllUser: (state, action) => {
      state.allUsers = action.payload;
    },

    // post action start ---***
    userPosts: (state, action) => {
      state.posts = action.payload;
    },
    addUserPosts: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    deleteUserPostAction: (state, action) => {
      const filter = [...state.posts].filter(
        (post) => post._id !== action.payload
      );
      state.posts = filter;
    },
    // post action end ---***

    // timeline post action start ---***
    userTimelinePosts: (state, action) => {
      state.timelinePosts = action.payload;
    },
    addTimelinePosts: (state, action) => {
      state.timelinePosts = [action.payload, ...state.timelinePosts];
    },
    deleteUserTimelinePost: (state, action) => {
      const filter = [...state.timelinePosts].filter(
        (post) => post._id !== action.payload
      );
      state.timelinePosts = filter;
    },
    // timeline post action end ---***
  },
});

export const {
  addLoggedUser,
  addAllUser,
  userPosts,
  followUserCount,
  userTimelinePosts,
  deleteUserTimelinePost,
  addTimelinePosts,
  addUserPosts,
  deleteUserPostAction,
} = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
