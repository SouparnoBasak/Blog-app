import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Blogs from "./Components/Blogs";
import CreateBlog from "./Components/CreateBlog";
import { ToastContainer, toast } from "react-toastify";
import BlogDetail from "./Components/BlogDetail";
import EditBlog from "./Components/EditBlog";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-dark text-center py-2 shadow-lg mb-4">
        <h1 className="text-white">My Blog App</h1>
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
