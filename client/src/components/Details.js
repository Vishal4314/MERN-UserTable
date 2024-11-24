import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WorkIcon from "@mui/icons-material/Work";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await fetch(`/getUser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      setUser(res.user);
    } catch (error) {
      console.log("error in fetching data of single user from backend", error);
      alert("error while fteching single user from backend");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`/deleteUser/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      alert(res.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("error in deleting User");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {user.name}</h1>
      <Card sx={{ maxWidth: 600 }} variant="outlined">
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${user._id}`}>
              <button className="btn btn-primary mx-2">
                <EditIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteUser(user._id);
              }}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img style={{ width: 50 }} src="/profile.png" alt="profileImg" />
              <h3 className="mt-3">
                Name: <span>{user.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{user.age}</span>
              </h3>
              <p className="mt-3">
                {" "}
                <MailOutlineIcon />
                Email: <span>{user.email}</span>
              </p>
              <p className="mt-3">
                <WorkIcon /> Occupation: <span>{user.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon /> Mobile: <span>{user.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon /> Location: <span>{user.address}</span>
              </p>
              <p className="mt-3">
                Description: <span>{user.description}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
