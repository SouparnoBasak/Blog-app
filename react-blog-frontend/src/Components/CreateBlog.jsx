import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [html, setHtml] = useState("");
  const [imageId, setImageId] = useState("");

  const navigate = useNavigate();

  function onChange(e) {
    setHtml(e.target.value);
  }
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      "https://blog-app-production-57e8.up.railway.app/api/save-temp-image",
      {
        method: "POST",
        body: formData,
      }
    );

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
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const newData = { ...data, description: html, image_Id: imageId };
    console.log(newData);
    const res = await fetch(
      "https://blog-app-production-57e8.up.railway.app/api/blogs",
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    const result = await res.json();
    if (result.status == false) {
      alert(result.errors);
    } else {
      toast("Blog Added Succesfuly!");
      navigate("/");
    }
  };

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between py-3 mb-2">
        <h4>Create Blog</h4>
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
            <button className="btn btn-dark">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
