import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { toast } from "react-toastify";

const EditBlog = () => {
  const [html, setHtml] = useState("");
  const [imageId, setImageId] = useState("");
  const [blog, setBlog] = useState([]);
  const params = useParams();

  const navigate = useNavigate();

  function onChange(e) {
    setHtml(e.target.value);
  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:8000/api/save-temp-image", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.status == false) {
      alert(result.errors.image);
      e.target.value = null;
    }
    setImageId(result.image.id);
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const fetchBlog = async () => {
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id);
    const result = await res.json();
    setBlog(result.data);
    setHtml(result.data.description);
    reset(result.data);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const formSubmit = async (data) => {
    const newData = { ...data, description: html, image_Id: imageId };
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();
    if (result.status == false) {
      alert(result.errors);
    } else {
      toast("Blog Updated Succesfuly!");
      navigate("/");
    }
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between py-3 mb-2">
        <h4>Update Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Title"
              />
              {errors.title && (
                <p className="invalid-feedback">Title field is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDesc")}
                className="form-control"
                cols="30"
                rows="2"
                placeholder="Short Description"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <Editor
                containerProps={{ style: { height: "400px" } }}
                value={html}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                name=""
                id=""
                className="form-control"
              />
              {blog.image && (
                <img
                  className="w-25"
                  src={`http://localhost:8000/uploads/blogs/${blog.image}`}
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Author
              </label>
              <input
                {...register("author", { required: true })}
                type="text"
                className={`form-control ${errors.author && "is-invalid"}`}
                placeholder="Author"
              />
              {errors.author && (
                <p className="invalid-feedback">Author field is required</p>
              )}
            </div>
            <button className="btn btn-dark">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
