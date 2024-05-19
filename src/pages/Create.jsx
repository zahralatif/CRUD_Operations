// import { useState } from "react";
import { Link } from "react-router-dom";

const Create = () => {
  // const [item, setItem] = useState({
  //   title: "",
  //   image: "",
  //   category: "",
  //   price: "",
  // });
  return (
    <div className="col-lg-4 mx-auto mt-5">
      <h4 className="mb-4">Create a product</h4>
      <input className="form-control mb-3" type="text" placeholder="Title" />
      <input className="form-control mb-3" type="text" placeholder="Image" />
      <input className="form-control mb-3" type="text" placeholder="Category" />
      <input className="form-control mb-3" type="text" placeholder="Price" />
      <button className="btn btn-success w-100">Create</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Create;
