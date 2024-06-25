import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { Row, Col, Container } from "react-bootstrap";
const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      await fetchUserDetails();
      await fetchUserAddToCart();
      dispatch(setUserDetails(dataApi.user)); // Ensure correct user data is dispatched
      navigate("/");
      window.location.reload();
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <div>
      <Row>
        <Col sm={6} className="flex items-center justify-center">
          <img
            src="https://i.pinimg.com/564x/e1/22/34/e122343ac7ddb125851689e1fb05cc4a.jpg"
            style={{ borderRadius: "30px" }}
          />
        </Col>
        <Col sm={6}>
          <section
            id="login"
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
                <div className="w-24 h-24 mx-auto">
                  <img
                    src={loginIcons}
                    alt="login icons"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <form
                  className="pt-6 flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-2">
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Email:{" "}
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
                  <div className="flex flex-col gap-2">
                    <label style={{ color: "#333", fontWeight: "500" }}>
                      Password:{" "}
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
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
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
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                    <Link
                      to="/forgot-password"
                      style={{
                        display: "block",
                        textAlign: "right",
                        color: "#1d4ed8",
                        textDecoration: "none",
                        marginTop: "8px",
                      }}
                      className="hover:underline hover:text-blue-800"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#1d4ed8",
                      color: "#fff",
                      padding: "10px 24px",
                      width: "100%",
                      borderRadius: "24px",
                      transition: "all 0.3s",
                      marginTop: "24px",
                      textAlign: "center",
                    }}
                    className="hover:bg-blue-700 hover:scale-105"
                  >
                    Login
                  </button>
                </form>
                <p style={{ marginTop: "24px", textAlign: "center" }}>
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    style={{
                      color: "#1d4ed8",
                      textDecoration: "none",
                    }}
                    className="hover:underline hover:text-blue-700"
                  >
                    Sign up
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

export default Login;
