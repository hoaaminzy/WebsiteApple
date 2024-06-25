import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { Container, Row } from "react-bootstrap";
import SlickBlog from "../components/SlickBlog";
import scrollTop from "../helpers/scrollTop";
const BlogDetail = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchAllBlogs = async () => {
    const response = await fetch(SummaryApi.getBlog.url);
    const dataResponse = await response.json();
    setBlogs(dataResponse?.data || []);
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchAllBlogs();
  }, []);
  const { id } = useParams();
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const filterBlog = blogs.filter((blog) => blog._id === id);
  console.log(filterBlog[0]?._id);
  return (
    <div
      style={{ background: "black", height: "max-content" }}
      className="text-white py-5"
    >
      <Container
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div className="d-flex flex-col justify-center items-center">
            <div className="d-flex flex-col">
              <span className="fw-bold fs-1">{filterBlog[0]?.heading}</span>
              <span className="py-4">
                {formatTime(filterBlog[0]?.createdAt)}
              </span>
              <img src={filterBlog[0]?.image} style={{ width: "100%" }} />
              <p className="pt-4">{filterBlog[0]?.description}</p>
            </div>
            <div className="py-3">
              <span className="fw-bold fs-1">
                {filterBlog[0]?.headingContent1}
              </span>
              <img
                src={filterBlog[0]?.imageContent1}
                style={{ width: "100%" }}
              />
              <p className="pt-2">{filterBlog[0]?.descriptionContent1}</p>
            </div>
            <div>
              <span className="fw-bold fs-1">
                {filterBlog[0]?.headingContent2}
              </span>
              <img
                src={filterBlog[0]?.imageContent2}
                style={{ width: "100%" }}
              />
              <p className="pt-2">{filterBlog[0]?.descriptionContent2}</p>
            </div>
            <div>
              <span className="fw-bold fs-1">
                {filterBlog[0]?.headingContent3}
              </span>
              <img
                src={filterBlog[0]?.imageContent3}
                style={{ width: "100%" }}
              />
              <p className="pt-3">{filterBlog[0]?.descriptionContent3}</p>
            </div>
            <div>
              <span className="fw-bold fs-1">
                {filterBlog[0]?.headingContent4}
              </span>
              <img
                src={filterBlog[0]?.imageContent4}
                style={{ width: "100%" }}
              />
              <p className="pt-3">{filterBlog[0]?.descriptionContent4}</p>
            </div>
            <div>
              <span className="fw-bold fs-1">
                {filterBlog[0]?.headingContent5}
              </span>
              <img
                src={filterBlog[0]?.imageContent5}
                style={{ width: "100%" }}
              />
              <p className="pt-4">{filterBlog[0]?.descriptionContent5}</p>
            </div>
          </div>
        </div>
      </Container>
      <div className="container">
        <SlickBlog heading="Xem thêm" />
      </div>
    </div>
  );
};

export default BlogDetail;
