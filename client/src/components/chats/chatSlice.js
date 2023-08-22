import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { base_url } from "../../api/api";
//
// fetch users chat
export const fetchChats = createAsyncThunk("chats/fetchChats", async (id) => {
  const res = await axios.get(`${base_url}/api/chat/${id}`);
  return res.data.payload;
});

//
//
// create slice for chats
const chatSlice = createSlice({
  name: "chats",
  initialState: {
    isLoading: false,
    isError: null,
    chats: [],
  },

  reducers: {
    createChat: (state, action) => {
      state.chats = [...state.chats, action.payload];
    },
    deleteChatAction: (state, action) => {
      const filterChat = [...state.chats].filter(
        (chat) => chat._id !== action.payload._id
      );
      state.chats = filterChat;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.isLoading = false;
      state.chats = [];
      state.isError = action.error.message;
    });
  },
});

export const { createChat, deleteChatAction } = chatSlice.actions;

export default chatSlice.reducer;
