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
                <Link to={`/product/${product?._id}`} onClick={scrollTop}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={product.productImage[0]}
                      className="object-scale-down h-48"
                    />
                    <Card.Body>
                      <Card.Title className="text-ellipsis line-clamp-1">
                        {product?.productName}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {product?.category}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <span className="text-danger">
                          {displayINRCurrency(product?.sellingPrice)}
                        </span>
                        <span className="text-muted text-decoration-line-through">
                          {displayINRCurrency(product?.price)}
                        </span>
                      </div>
                      <Button
                        variant="danger"
                        className="w-100 mt-3"
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default CategoryWiseProductDisplay;
