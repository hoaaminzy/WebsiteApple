import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ChangeInfor from "./ChangeInfor";
import ForgotPassowrd from "./ForgotPassowrd";
import { Link } from "react-router-dom";
const InforUser = () => {
  const [changeInfo, setChangeInfor] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const user = useSelector((state) => state.user.user);
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <Container
        className="py-5"
        style={{
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <div className="pb-3">
          <Link to='/' className="text-black">Trang chủ</Link> / <strong>Thông tin cá nhân</strong>
        </div>
        <Row
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "100%",
          }}
        >
          <Col sm={4}>
            <div
              style={{
                
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={user?.profilePic}
                alt="Profile"
                className="profilePic"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                 
                }}
              />
            </div>
          </Col>
          <Col sm={8} className="flex flex-col  justify-between">
            <div className=" flex items-center justify-between">
              <span>Họ và Tên</span>
              <h2
                className="name"
                style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}
              >
                {user?.name}
              </h2>
            </div>
            <div className="infoContainer flex items-center justify-between">
              <span>Email</span>
              <p
                className="email"
                style={{ fontSize: "16px", color: "#777", marginTop: "10px" }}
              >
                {user?.email}
              </p>
            </div>
            <div className="infoContainer flex items-center justify-between">
              <span>Địa chỉ</span>
              <p
                className="email"
                style={{ fontSize: "16px", color: "#777", marginTop: "10px" }}
              >
                {user?.address}
              </p>
            </div>
            <div className="infoContainer flex items-center justify-between">
              <span>Số điện thoại</span>
              <p
                className="email"
                style={{ fontSize: "16px", color: "#777", marginTop: "10px" }}
              >
                {user?.numberphone}
              </p>
            </div>
            <div className="infoContainer flex items-center justify-between">
              <span>Mật khẩu</span>
              <p>*********</p>
            </div>
            <div className="flex flex-col gap-3 " style={{width:'30%'}}>
              <button
                className="btn btn-primary"
                onClick={() => setChangeInfor(true)}
              >
                Thay đổi thông tin
              </button>
              <button
                onClick={() => setChangePassword(true)}
                className="btn btn-primary"
              >
                Đổi mật khẩu
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      {changePassword && (
        <ForgotPassowrd
          inforUser={user}
          onClose={() => setChangePassword(false)}
        />
      )}
      {changeInfo && (
        <ChangeInfor inforUser={user} onClose={() => setChangeInfor(false)} />
      )}
    </div>
  );
};

export default InforUser;
