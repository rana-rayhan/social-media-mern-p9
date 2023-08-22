import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../components/chats/chatSlice";
import loggedUserSlice from "../components/users/usersSlice";
//
// configuring store and provide in index file
const store = configureStore({
  reducer: {
    userChats: chatReducer,
    loggedUser: loggedUserSlice,
  },
});

export default store;
