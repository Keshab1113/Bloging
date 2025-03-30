# Blog Website

## Description
This is a React-based blog website that fetches country-related data from the [REST Countries API](https://restcountries.com/v3.1/all) and displays information about various countries. Users can like blog posts, add comments with their names, and view an interactive Google Map.

## Features
- Fetch country data from REST Countries API
- Display country details including name, region, population, and borders
- Interactive Google Map for each country
- Like and comment functionality on blog posts
- Redux Toolkit for state management
- Responsive UI using Tailwind CSS

## Technologies Used
- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **API:** REST Countries API
- **Maps:** Google Maps API
- **Icons:** React Icons

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment Variables
Create a `.env` file in the root directory and add the following:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Start the Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

## Project Structure
```
📂 src
 ┣ 📂 components
 ┃ ┣ 📜 BlogPost.jsx   # Blog Post Component
 ┃ ┣ 📜 MapContainer.jsx  # Google Maps Component
 ┣ 📂 redux
 ┃ ┣ 📜 blogSlice.js   # Redux Slice for Blogs
 ┣ 📜 App.jsx          # Main App Component
 ┣ 📜 main.jsx         # Entry Point
```

## Redux Setup
### blogSlice.js
```javascript
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
        status: "idle",
        error: null,
        likes: {},
        comments: {}
    },
    reducers: {
        toggleLike: (state, action) => {
            const blogId = action.payload;
            state.likes[blogId] = (state.likes[blogId] || 0) + 1;
        },
        addComment: (state, action) => {
            const { blogId, name, text } = action.payload;
            if (!state.comments[blogId]) {
                state.comments[blogId] = [];
            }
            state.comments[blogId].push({ id: Date.now(), name, text });
        }
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
```

## Components
### BlogPost.jsx
```javascript
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, addComment } from "../redux/blogSlice";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useState } from "react";

const BlogPost = ({ blog }) => {
    const dispatch = useDispatch();
    const likes = useSelector((state) => state.blogs.likes[blog.cca3] || 0);
    const comments = useSelector((state) => state.blogs.comments[blog.cca3] || []);
    const [commentName, setCommentName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        dispatch(toggleLike(blog.cca3));
    };

    const handleAddComment = () => {
        if (commentName.trim() !== "" && commentText.trim() !== "") {
            dispatch(addComment({ blogId: blog.cca3, name: commentName, text: commentText }));
            setCommentName("");
            setCommentText("");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold">{blog.name.common}</h2>
            <p className="text-gray-600">{blog.region} | {blog.subregion}</p>

            <div className="flex items-center gap-4 mt-3">
                <button onClick={handleLike} className="flex items-center gap-1 text-red-500">
                    {likes > 0 ? <FaHeart /> : <FaRegHeart />}
                    <span>{likes}</span>
                </button>
                <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1 text-blue-500">
                    <FaComment />
                    <span>{comments.length}</span>
                </button>
            </div>

            {showComments && (
                <div className="mt-3 border-t pt-3">
                    <h3 className="font-semibold">Comments</h3>
                    <ul className="mt-2 space-y-2">
                        {comments.map((comment) => (
                            <li key={comment.id} className="text-sm bg-gray-100 p-2 rounded-md">
                                <strong>{comment.name}</strong>: {comment.text}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 flex flex-col gap-2">
                        <input type="text" placeholder="Your Name" className="border p-2 rounded w-full" value={commentName} onChange={(e) => setCommentName(e.target.value)} />
                        <input type="text" placeholder="Write a comment..." className="border p-2 rounded w-full" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        <button onClick={handleAddComment} className="bg-blue-500 text-white px-3 py-2 rounded">Post</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPost;
```

## License
This project is licensed under the MIT License.