import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { fetchBlogs } from "./features/blogSlice";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
      <Router>
        <Header blogs={blogs} />
        <Routes>
          <Route path="/" element={<BlogList/>} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;
