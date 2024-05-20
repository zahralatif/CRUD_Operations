import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState();


  useEffect(() => {
    const getProductsById = () => {
      axios
        .get(`https://6649fdf0a300e8795d409dfc.mockapi.io/api/tasks/${id}`)
        .then((response) => setItem(response.data))
        .catch((error) => console.error(error));
    };
    getProductsById();
  }, []);

  const editHandler = async () => {
    //* editHandler function will be called when we click on edit button
    try {
      await axios.put(
        //* await is used to wait for the promise to resolve
        `https://6649fdf0a300e8795d409dfc.mockapi.io/api/tasks/${id}`,
        item
      ); //*post request to the server to create a new product
      toast.success("Successfully updated a product.");
      navigate('/')
    } catch (error) {
      //*if there is an error then this block of code will run
      toast.error("Error occured while updating a product.");
    }
  };
  return (
    <div className="col-lg-4 mx-auto mt-5">
      {item ? (
        <div>
          {" "}
          <h4 className="mb-4">Edit a product</h4>
          <input
            onChange={(e) => setItem({ ...item, title: e.target.value })} //* setting the item object as the body of the request
            className="form-control mb-3"
            type="text"
            placeholder="Title"
            defaultValue={item.title}
          />
          <input
            onChange={(e) => setItem({ ...item, image: e.target.value })} //* setting the item object as the body of the request
            className="form-control mb-3"
            type="text"
            placeholder="Image"
            defaultValue={item.image}
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
            onChange={(e) => setItem({ ...item, category: e.target.value })} //* setting the item object as the body of the request
            className="form-control mb-3"
            type="text"
            placeholder="Category"
            defaultValue={item.category}
          />
          <input
            onChange={(e) => setItem({ ...item, price: e.target.value })} //* setting the item object as the body of the request
            className="form-control mb-3"
            type="text"
            placeholder="Price"
            defaultValue={item.price}
          />
          <button onClick={editHandler} className="btn btn-success w-100">
            Edit
          </button>
          <Link to="/">Back to Home</Link>{" "}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Edit;
