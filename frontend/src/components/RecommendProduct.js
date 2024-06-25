import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Slider from "react-slick";
import { FaApple } from "react-icons/fa";
import SummaryApi from "../common";

const RecommendProduct = ({ heading }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${SummaryApi.allProduct.url}`);
      const dataResponse = await response.json();

      console.log("product data", dataResponse);

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
      } else {
        console.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const filterRecommendProduct = allProduct.filter((item) => item.star > "0");
  console.log("Filtered recommended products:", filterRecommendProduct);
  const sortData = filterRecommendProduct.sort((a, b) => b.star - a.star);

  return (
    <div className="container mx-auto px-4 my-6 relative">
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

      <div>
        <Slider {...settings}>
          {loading
            ? loadingList.map((_, index) => {
                return (
                  <div key={index}>
                    <Card style={{ width: "18rem" }} className="">
                      <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text></Card.Text>
                        <div
                          style={{ width: "100%" }}
                          className="d-flex justify-between align-items-center"
                        >
                          <Card.Text className=" text-red-600"></Card.Text>
                          <Card.Text className="fw-bold fs-4"></Card.Text>
                        </div>
                        <Button
                          className="d-flex align-items-center justify-center w-100"
                          variant="primary"
                        ></Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            : sortData.map((product, index) => {
                return (
                  <div key={index}>
                    <Card
                      style={{
                        width: "18rem",
                        borderRadius: "30px",
                        padding: "20px",
                        background: "#323232",
                        minHeight: "450px",
                      }}
                      className="boxshadow"
                    >
                      <Card.Img variant="top" src={product.productImage[0]} />
                      <Card.Body className="d-flex flex-col justify-between">
                        <Link to={`product/${product?._id}`}>
                          <Card.Title
                            className="text-white text-center"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.productName}
                          </Card.Title>
                        </Link>
                        <div
                          style={{ width: "100%" }}
                          className="flex items-center justify-between gap-3 "
                        >
                          <Card.Text
                            className="text-white m-0"
                            style={{
                              textDecoration: "line-through !important",
                            }}
                          >
                            {formatNumber(product?.price)}đ
                          </Card.Text>
                          <Card.Text className="fw-bold fs-4 text-white">
                            {formatNumber(product?.sellingPrice)}đ
                          </Card.Text>
                        </div>
                        <div className="d-flex justify-end">
                          <Card.Text
                            className="fw-bold text-white"
                            style={{ fontSize: "14px" }}
                          >
                            Đã bán({product?.star})
                          </Card.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
        </Slider>
      </div>
    </div>
  );
};

export default RecommendProduct;
