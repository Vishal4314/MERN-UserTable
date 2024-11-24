import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInpVal) => {
      return {
        ...prevInpVal,
        [name]: value,
      };
    });
  };

  const handleAddUser = async (event) => {
    event.preventDefault();

    const { name, email, age, mobile, work, address, description } = inputValue;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        address,
        description,
      }),
    });
    const data = await res.json();

    if (res.status === 404 || !data) {
      alert("error");
    } else {
      alert("data added successfully");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Name</label>
            <input
              onChange={handleFormInputChange}
              name="name"
              value={inputValue.name}
              className="form-control"
              type="text"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Email</label>
            <input
              onChange={handleFormInputChange}
              name="email"
              value={inputValue.email}
              className="form-control"
              type="email"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Age</label>
            <input
              onChange={handleFormInputChange}
              name="age"
              value={inputValue.age}
              className="form-control"
              type="number"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Mobile</label>
            <input
              onChange={handleFormInputChange}
              name="mobile"
              value={inputValue.mobile}
              className="form-control"
              type="number"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Work</label>
            <input
              onChange={handleFormInputChange}
              name="work"
              value={inputValue.work}
              className="form-control"
              type="text"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label className="form-label">Address</label>
            <input
              onChange={handleFormInputChange}
              name="address"
              value={inputValue.address}
              className="form-control"
              type="text"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label className="form-label">Description</label>
            <textarea
              onChange={handleFormInputChange}
              name="description"
              value={inputValue.description}
              className="form-control"
              type="text"
              cols="30"
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddUser}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
