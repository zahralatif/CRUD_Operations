import { useEffect, useState } from "react";
import axios from "axios"; //*axios is a promise based HTTP client for the browser and node.js
import { CiEdit, CiTrash } from "react-icons/ci";
import toast from "react-hot-toast"; //*react-hot-toast is a super easy toast library for React
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState(); //*useState is a hook that allows you to have state variables in functional components

  useEffect(() => {
    //*useEffect is a hook that allows you to perform side effects in functional components
    const getTasks = () => {
      axios
        .get("https://6649fdf0a300e8795d409dfc.mockapi.io/api/tasks") //*get request to the server
        .then((response) => setTasks(response.data)) //*response is the data that we get from the server
        .catch((error) => console.error(error)); //*error is the error that we get from the server
    };
    getTasks();
  }, []);
  //! [] is for life cycle. if we don't pass any value in array, it will run only once when component is mounted.and if we don't write [] then it will run every time when component is mounted or updated.

  if (tasks && tasks.length === 0) {
    return (
      <div className="col-lg-10 mx-auto mt-5">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <h4>All products ({tasks && tasks.length})</h4>
          <Link to="/create" className="btn btn-success">
            Create new product
          </Link>{" "}
          {/*//*Link is used to navigate to the create page*/}
        </div>
        <hr />
        <div className="alert alert-danger w-25 m-auto mt-5 text-center">
          No data available...
        </div>
      </div>
    ); //*if tasks length is 0 then it will show No data available, otherwise it will show the table
  }

  const deleteHandler = async (id) => {
    //*async is used to make the function asynchronous
    //*deleteHandler function will be called when we click on delete button
    try {
      await axios.delete(
        //* await is used to wait for the promise to resolve
        `https://6649fdf0a300e8795d409dfc.mockapi.io/api/tasks/${id}`
      ); //*delete request to the server with the id of the task that we want to delete
      setTasks((prevData) => prevData.filter((item) => item.id !== id)); //*it will filter the task that we want to delete from the tasks list and set the new tasks list
      toast.success("Task deleted successfully!"); //*toast message will be shown when task is deleted successfully
    } catch (error) {
      console.error(error); //*error message will be shown when task is not deleted successfully
      toast.error("Failed to delete task..."); //*toast message will be shown when task is not deleted successfully
    }
  };

  return (
    <div className="col-lg-10 mx-auto mt-5">
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <h4>All products ({tasks && tasks.length})</h4>
        <Link to="/create" className="btn btn-success">
          Create new product
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map((task) => {
              //*if tasks is not null then it will map the tasks to the table
              return (
                //*if tasks is not null then it will map the tasks to the table
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>
                    <img
                      src={task.image}
                      alt={task.title}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{task.title}</td>
                  <td>{task.category}</td>
                  <td>{task.price}$</td>
                  <td>
                    <Link to={`/edit/${task.id}`} className="btn btn-warning me-1"> {/*//*Link is used to navigate to the edit page*/}
                      <CiEdit />
                    </Link>
                    <button
                      onClick={() => deleteHandler(task.id)} //*when we click on delete button, it will call deleteHandler function and pass the task.id as a parameter to it
                      className="btn btn-danger ms-1"
                    >
                      <CiTrash />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <Spinner />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
