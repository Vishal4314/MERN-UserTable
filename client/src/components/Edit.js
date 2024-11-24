import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
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

  // const fetchUser = async () => {
  //   try {
  //     const response = await fetch(`/getUser/${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const res = await response.json();
  //     setInputValue(res.user);
  //   } catch (error) {
  //     console.log("error while getting single user", error);
  //     alert("error while getting single user");
  //   }
  // };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/getUser/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await response.json();
        setInputValue(res.user);
      } catch (error) {
        console.log("error while getting single user", error);
        alert("error while getting single user");
      }
    };
    fetchUser();
  }, [id]);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInpVal) => {
      return {
        ...prevInpVal,
        [name]: value,
      };
    });
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const { name, email, age, mobile, work, address, description } = inputValue;
    try {
      const response = await fetch(`/updateUser/${id}`, {
        method: "PATCH",
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
      if (!response.ok) {
        alert(`error in updating user, status: ${response.status}`);
      }
      // const res = await response.json();
      alert("user updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("error in updating user", error);
    }
  };

  return (
    <div>
      <div className="container">
        <NavLink to="/">EditPageHome</NavLink>
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
              onClick={handleUpdateUser}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
