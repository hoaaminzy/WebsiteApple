import React, { useContext, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spinner, Button, Card, Row, Col } from "react-bootstrap";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);
  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <Row className="overflow-x-scroll">
        {loading
          ? loadingList.map((_, index) => (
              <Col key={index} xs={12} md={4} lg={3} className="mb-4">
                <Card className="bg-light">
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light animate-pulse"></div>
                    <Card.Title className="animate-pulse bg-light rounded"></Card.Title>
                    <Card.Text className="animate-pulse bg-light rounded"></Card.Text>
                    <div className="d-flex justify-content-between">
                      <span className="animate-pulse bg-light rounded w-50"></span>
                      <span className="animate-pulse bg-light rounded w-50"></span>
                    </div>
                    <Button className="animate-pulse bg-light rounded w-100 mt-3"></Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : data.map((product) => (
              <Col key={product?._id} xs={12} md={4} lg={3} className="mb-4">
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
                    <Link to={`/product/${product?._id}`}>
                      <Card.Title
                        className="text-white text-center "
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
                    <div className="flex justify-end">
                      <Card.Text className="fw-bold text-white" style={{fontSize:'14px'}}>
                       Đã bán({product?.star})
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default CategoryWiseProductDisplay;
