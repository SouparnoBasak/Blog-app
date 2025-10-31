import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [keyword, setKeyword] = useState();
  const fetchBlogs = async () => {
    const res = await fetch(
      "https://blog-app-production-57e8.up.railway.app/api/blogs/"
    );
    const result = await res.json();
    setBlogs(result.data);
    console.log(result);
  };
  const searchBlogs = async (e) => {
    e.preventDefault();
    console.log(keyword);
    const res = await fetch(
      "https://blog-app-production-57e8.up.railway.app/api/blogs?keyword=" +
        keyword
    );
    const result = await res.json();
    setBlogs(result.data);
  };
  const resetSearch = () => {
    fetchBlogs();
    setKeyword("");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-center py-3 mb-2">
        <form onSubmit={(e) => searchBlogs(e)}>
          <div className="d-flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search Blogs"
            />
            <button className="btn btn-dark ms-2">Search</button>
            <button
              type="button"
              onClick={() => resetSearch()}
              className="btn btn-success ms-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between py-3 mb-2">
        <h4>Blogs</h4>
        <a href="/create" className="btn btn-dark">
          Create
        </a>
      </div>
      <div className="row">
        {blogs &&
          blogs.map((blog) => {
            return (
              <BlogCard
                blogs={blogs}
                setBlogs={setBlogs}
                blog={blog}
                key={blog.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Blogs;
