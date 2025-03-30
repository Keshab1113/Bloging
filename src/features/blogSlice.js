import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
});

const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        blogs: [],
        likes: {},
        comments: {},
        status: "idle",
        error: null,
    },
    reducers: {
        toggleLike: (state, action) => {
            const blogId = action.payload;
            state.likes[blogId] = state.likes[blogId] ? state.likes[blogId] + 1 : 1;
        },
        addComment: (state, action) => {
            const { blogId, name, text } = action.payload;
            if (!state.comments[blogId]) {
                state.comments[blogId] = [];
            }
            state.comments[blogId].push({ id: Date.now(), name, text });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { toggleLike, addComment } = blogSlice.actions;
export default blogSlice.reducer;
