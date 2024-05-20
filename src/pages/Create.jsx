import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Create = () => {
  const [item, setItem] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
  });

  const createHandler = async () => {
    //*createHandler function will be called when we click on create button
    try {
      await axios.post(
        "https://6649fdf0a300e8795d409dfc.mockapi.io/api/tasks", //*post request to the server to create a new product
        item //* setting the item object as the body of the request
      );
      toast.success("Successfully created a product.");
      setItem({ ...item, title: "", image: "", category: "", price: "" }); //*set the item object as the body of the request
    } catch (error) {
      //*if there is an error then this block of code will run
      toast.error("Error occured while creating a product.");
    }
  };

  return (
    <div className="col-lg-4 mx-auto mt-5">
      <h4 className="mb-4">Create a product</h4>
      <input
        onChange={(e) => setItem({ ...item, title: e.target.value })} //* setting the item object as the body of the request
        className="form-control mb-3"
        type="text"
        placeholder="Title"
        value={item.title}
      />
      <input
        onChange={(e) => setItem({ ...item, image: e.target.value })}
        className="form-control mb-3"
        type="text"
        placeholder="Image"
        value={item.image}
      />
      {item.image !== "" ? (
        <img
          className="form-control mb-3 w-50"
          src={item.image}
          alt={item.title}
        />
      ) : (
        <div className="form-control mb-3 w-100 text-center">
          No image available..
        </div>
      )}
      <input
        onChange={(e) => setItem({ ...item, category: e.target.value })}
        className="form-control mb-3"
        type="text"
        placeholder="Category"
        value={item.category}
      />
      <input
        onChange={(e) => setItem({ ...item, price: e.target.value })}
        className="form-control mb-3"
        type="text"
        placeholder="Price"
        value={item.price}
      />
      <button onClick={createHandler} className="btn btn-success w-100">
        Create
      </button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Create;
