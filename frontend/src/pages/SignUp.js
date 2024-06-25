import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    numberphone: "",
    confirmPasswonrd: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <div>
      <Row>
        <Col sm={6} className="flex items-center justify-center">
          <img
            src="https://i.pinimg.com/564x/7d/17/88/7d1788bdb070b9813fc5ab531a634618.jpg"
            style={{ borderRadius: "30px" }}
          />
        </Col>
        <Col sm={6}>
          <section
            id="signup"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              backgroundColor: "#f0f0f0",
            }}
          >
            <div
              className="container"
              style={{ maxWidth: "400px", padding: "20px", margin: "0 auto" }}
            >
              <div
                className="bg-white"
                style={{
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
                  <img
                    src={data.profilePic || loginIcons}
                    alt="login icons"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <form>
                    <label>
                      <div
                        className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full"
                        style={{
                          backgroundColor: "rgba(128, 128, 128, 0.5)",
                          padding: "8px 0",
                          position: "absolute",
                          bottom: "0",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        Upload Photo
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        style={{ display: "none" }}
                        onChange={handleUploadPic}
                      />
                    </label>
                  </form>
                </div>

                <form
                  className="pt-6 flex flex-col gap-2"
                  onSubmit={handleSubmit}
                >
                  <div className="grid">
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Name :{" "}
                    </label>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        required
                        style={{
                          width: "100%",
                          height: "100%",
                          outline: "none",
                          background: "transparent",
                          color: "#333",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid">
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Email :{" "}
                    </label>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        required
                        style={{
                          width: "100%",
                          height: "100%",
                          outline: "none",
                          background: "transparent",
                          color: "#333",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid">
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Address:{" "}
                    </label>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter address"
                        name="address"
                        value={data.address}
                        onChange={handleOnChange}
                        required
                        style={{
                          width: "100%",
                          height: "100%",
                          outline: "none",
                          background: "transparent",
                          color: "#333",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid">
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Number Phone:{" "}
                    </label>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter number phone"
                        name="numberphone"
                        value={data.numberphone}
                        onChange={handleOnChange}
                        required
                        style={{
                          width: "100%",
                          height: "100%",
                          outline: "none",
                          background: "transparent",
                          color: "#333",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Password :{" "}
                    </label>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={data.password}
                        name="password"
                        onChange={handleOnChange}
                        required
                        style={{
                          width: "100%",
                          height: "100%",
                          outline: "none",
                          background: "transparent",
                          color: "#333",
                        }}
                      />
                      <div
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#333",
                          marginLeft: "8px",
                        }}
                        onClick={() => setShowPassword((preve) => !preve)}
                      >
                        <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Confirm Password :{" "}
                    </label>
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter confirm password"
                        value={data.confirmPassword}
                        name="confirmPassword"
                        onChange={handleOnChange}
                        required
                        style={{
                          width: "100%",
                          height: "100%",
                          outline: "none",
                          background: "transparent",
                          color: "#333",
                        }}
                      />
                      <div
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#333",
                          marginLeft: "8px",
                        }}
                        onClick={() =>
                          setShowConfirmPassword((preve) => !preve)
                        }
                      >
                        <span>
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#e3342f",
                      color: "#fff",
                      padding: "10px 24px",
                      width: "100%",
                      borderRadius: "24px",
                      transition: "all 0.3s",
                      marginTop: "24px",
                      textAlign: "center",
                    }}
                    className="hover:bg-red-700 hover:scale-105"
                  >
                    Sign Up
                  </button>
                </form>

                <p style={{ marginTop: "24px", textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#e3342f",
                      textDecoration: "none",
                    }}
                    className="hover:underline hover:text-red-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
