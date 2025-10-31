import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const [blog, setBlog] = useState([]);
  const params = useParams();
  const fetchBlog = async () => {
    const res = await fetch(
      "https://blog-app-production-57e8.up.railway.app/api/blogs/" + params.id
    );
    const result = await res.json();
    setBlog(result.data);
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="container">
      <div className="d-flex justify-content-between py-3 mb-2">
        <h2>{blog.title}</h2>
        <div>
          <a href="/" className="btn btn-dark">
            Back to blogs
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <p>
            by <strong>{blog.author}</strong> on {blog.date}
          </p>
          {blog.image && (
            <img
              className="w-75"
              src={`http://localhost:8000/uploads/blogs/${blog.image}`}
            />
          )}
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
