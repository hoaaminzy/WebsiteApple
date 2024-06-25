import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import SummaryApi from "../common";
const TekZone = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchAllBlogs = async () => {
    const response = await fetch(SummaryApi.getBlog.url);
    const dataResponse = await response.json();
    setBlogs(dataResponse?.data || []);
  };
  console.log(blogs);
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div
      className="Container"
      style={{ backgroundColor: "#3e3e3f", height: "auto", marginTop: "8px" }}
    >
      <div style={{ width: "100%", margin: "0 auto" }}>
        {/* --------------------- */}
        <div style={{ paddingTop: "20px", margin: "0 60px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="image-container"
              style={{
                width: "60%",
                marginRight: "5px",
                position: "relative",
                borderRadius: "25px 0 0 25px",
              }}
            >
              <Link className="link-hover">
                <h3
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 2.68%, rgba(0, 0, 0, .72) 53.2%, rgba(0, 0, 0, .86) 69.35%, #000 86.01%)",
                    bottom: "-8px",
                    color: "white",
                    padding: "15px",
                    borderRadius: "25px 0 0 25px",
                    fontSize: "30px",
                  }}
                >
                  iPad Air M2 chỉ từ 16.990K, trả góp 0%, trả trước từ 8.490K,
                  chỉ 50K mỗi ngày, thu cũ lên đời trợ giá 2 triệu
                </h3>
                <Image
                  className="zoomable-image"
                  style={{ height: "100%", borderRadius: "25px 0 0 25px" }}
                  src="https://cdn.tgdd.vn/News/Thumb/1566787/9-1200x675.jpg"
                  fluid
                />
              </Link>
            </div>
            <div style={{ width: "30%", marginLeft: "5px" }}>
              <div
                className="image-container"
                style={{
                  position: "relative",
                  borderRadius: "0 25px 0 0",
                  marginBottom: "10px",
                }}
              >
                <Link className="link-hover">
                  <h3
                    style={{
                      zIndex: 2,
                      position: "absolute",
                      bottom: "-8px",
                      color: "white",
                      padding: "15px",
                      fontSize: "18px",
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 2.68%, rgba(0, 0, 0, .72) 53.2%, rgba(0, 0, 0, .86) 69.35%, #000 86.01%)",
                    }}
                  >
                    Cách cập nhật iOS 18 Beta 1, trải nghiệm những tính năng mới
                    nhất chỉ với vài bước đơn giản
                  </h3>
                  <Image
                    className="zoomable-image"
                    style={{ borderRadius: "0 25px 0 0", marginBottom: "10px" }}
                    src="https://cdn.tgdd.vn/News/Thumb/1566785/9-1200x675.jpg"
                    fluid
                  />
                </Link>
              </div>
              <div
                className="image-container"
                style={{ position: "relative", borderRadius: "0 0 25px 0" }}
              >
                <Link className="link-hover">
                  <h3
                    style={{
                      zIndex: 2,
                      position: "absolute",
                      bottom: "-8px",
                      color: "white",
                      padding: "15px",
                      borderRadius: "0 0 25px 0",
                      fontSize: "18px",
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 2.68%, rgba(0, 0, 0, .72) 53.2%, rgba(0, 0, 0, .86) 69.35%, #000 86.01%)",
                    }}
                  >
                    iOS 18 ra mắt: Tùy chỉnh icon ứng dụng trên màn hình chính,
                    trung tâm điều khiển có giao diện mới,...
                  </h3>
                  <Image
                    className="zoomable-image"
                    style={{ borderRadius: "0 0 25px 0" }}
                    src="https://cdn.tgdd.vn/News/Thumb/1566784/9-1200x675.jpg"
                    fluid
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------- */}
        <div style={{ margin: "40px 60px 50px 60px" }}>
          <ul
            className="Navbar"
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "0",
              margin: "0 50px",
            }}
          >
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2155/iPhone.png"
                  rounded
                />
                <p>Iphone</p>
              </Link>
            </li>
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2156/Mac.png"
                  rounded
                />
                <p>Mac</p>
              </Link>
            </li>
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2157/Ipad.png"
                  rounded
                />
                <p>ipad</p>
              </Link>
            </li>
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2158/Watch.png"
                  rounded
                />
                <p>Watch</p>
              </Link>
            </li>
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2159/AirPods.png"
                  rounded
                />
                <p>Âm thanh</p>
              </Link>
            </li>
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2160/PK.png"
                  rounded
                />
                <p>Phụ kiện</p>
              </Link>
            </li>
            <li
              className="navbarHover"
              style={{
                backgroundColor: "#323232",
                width: "158px",
                height: "60px",
                borderRadius: "12px",
              }}
            >
              <Link
                className="flex items-center link"
                style={{ color: "#fff" }}
              >
                <Image
                  style={{ width: "48px" }}
                  src="https://cdn.tgdd.vn/newscategory/2161/Dich-vu.png"
                  rounded
                />
                <p>Dịch vụ</p>
              </Link>
            </li>
          </ul>
        </div>
        {/* --------------------- */}
        <div style={{ marginLeft: "120px" }}>
          <h3 style={{ textTransform: "uppercase", color: "#fff" }}>
            mới nhất
          </h3>
          <div>
            <ListGroup>
              {blogs.map((blog, index) => {
                return (
                  <Link to={`/blog/${blog._id}`} key={index}>
                    <ListGroup.Item className="d-flex align-items-start bgr">
                      <Card.Img
                        variant="top"
                        style={{
                          width: "318px",
                          height: "180px",
                          borderRadius: "12px",
                        }}
                        src={blog.image}
                        alt=""
                      />
                      <Card.Body className="ms-3">
                        <Card.Text className="fs-22">{blog.heading}</Card.Text>
                        <Card.Text>{formatTime(blog.createdAt)}</Card.Text>
                      </Card.Body>
                    </ListGroup.Item>
                  </Link>
                );
              })}
            </ListGroup>
          </div>
        </div>
        {/* --------------------- */}
        {/* <div style={{ backgroundColor: "#000", height: "100vh" }}>
          <h3>Video</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "405px",
            }}
          >
            <div
              style={{
                width: "60%",
                marginRight: "5px",
                borderRadius: "25px 0 0 25px",
              }}
            >
              <Link>
                <Image
                  style={{ height: "100%", borderRadius: "25px" }}
                  src="https://cdn.tgdd.vn/News/Thumb/1566728/6-1200x675.jpg"
                  fluid
                />
              </Link>
            </div>
            <div style={{ width: "30%", marginLeft: "5px" }}>
              <div
                style={{
                  height: "25%",
                  marginBottom: "10px",
                }}
              >
                <Link>
                  <Image
                    style={{ height: "100%", borderRadius: "8px" }}
                    src="https://img.youtube.com/vi/tmA5UTIIWBw/mqdefault.jpg"
                    fluid
                  />
                </Link>
                marginBottom:"10px"
              </div>
              <div style={{ height: "25%" }}>
                <Link>
                  <Image
                    style={{ height: "100%", borderRadius: "8px" }}
                    src="https://img.youtube.com/vi/cHbpJX-gysU/mqdefault.jpg"
                    fluid
                  />
                </Link>
              </div>
              <div
                style={{
                  height: "25%",
                  marginBottom: "10px",
                }}
              >
                <Link>
                  <Image
                    style={{ height: "100%", borderRadius: "8px" }}
                    src="https://img.youtube.com/vi/Ye2lYKybMmQ/mqdefault.jpg"
                    fluid
                  />
                </Link>
              </div>
              <div
                style={{
                  height: "25%",
                  marginBottom: "10px",
                }}
              >
                <Link>
                  <Image
                    style={{ height: "100%", borderRadius: "8px" }}
                    src="https://img.youtube.com/vi/6cE_-8Y0fCw/mqdefault.jpg"
                    fluid
                  />
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TekZone;
