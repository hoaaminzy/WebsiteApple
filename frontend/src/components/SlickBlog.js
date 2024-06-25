import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import scrollTop from "../helpers/scrollTop";
import { FaApple } from "react-icons/fa";

const SlickBlog = ({ heading }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  const [blogs, setBlogs] = useState([]);
  const fetchAllBlogs = async () => {
    const response = await fetch(SummaryApi.getBlog.url);
    const dataResponse = await response.json();
    setBlogs(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllBlogs();
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="slider-container pt-5">
       <div className="d-flex items-center justify-center gap-1  pb-5 pt-4">
        <div className="text-white fs-1">
          <FaApple />
        </div>
        <span
          className=" d-flex items-center text-4xl font-semibold text-white text-center"
          style={{ height: "100%" }}
        >
          {heading}
        </span>
      </div>
      <Slider {...settings}>
        {blogs.map((blog, index) => {
          return (
            <Link to={`/blog/${blog._id}`} key={index}>
              <div
                key={index}
                style={{
                  marginRight: "20px",
                  backgroundColor: "#323232",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div style={{ width: "100%" }}>
                  <img src={blog.image} width="100%" />
                </div>
                <div className="p-3">
                  <p className="text-white">{blog.heading}</p>
                  <p className="text-white">{formatTime(blog.createdAt)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlickBlog;
