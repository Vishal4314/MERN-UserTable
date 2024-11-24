import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const usersData = await res.json();
      setUsers(usersData.data);
    } catch (error) {
      console.log(error);
      alert("error in getting data");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/deleteUser/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert(`Failed To DELETE User, status: ${response.status}`);
      } else {
        const res = await response.json();
        alert(res.message);
        fetchData();
      }
    } catch (error) {
      console.log("error while deleting user", error);
      alert("error in deleting User");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const usersContent = users.map((user, index) => {
    return (
      <tr key={user._id}>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.work}</td>
        <td>{user.mobile}</td>
        <td className="d-flex justify-content-between">
          <NavLink to={`/view/${user._id}`}>
            <button className="btn btn-success">
              <RemoveRedEyeIcon />
            </button>
          </NavLink>
          <NavLink to={`/edit/${user._id}`}>
            <button className="btn btn-primary">
              <EditIcon />
            </button>
          </NavLink>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteUser(user._id)}
          >
            <DeleteOutlineIcon />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="mt-5">
      <div className="container">
        <div className="mt-2 add_btn mb-2">
          <NavLink to={"/register"} className="btn btn-primary">
            Add Data
          </NavLink>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Job</th>
              <th scope="col">Number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{usersContent}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
