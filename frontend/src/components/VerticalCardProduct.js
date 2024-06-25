import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { IoLogoApple } from "react-icons/io5";
import Slider from "react-slick";
import { FaApple } from "react-icons/fa";
const VerticalCardProduct = ({ category, heading }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, product) => {
    //    await addToCart(e,id)
    //    fetchUserAddToCart()
    await dispatch(addItemToCart(product));
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct.data);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = data.sort((a, b) => b.star - a.star);

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
            ? loadingList.map((product, index) => {
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
                        <div className="flex justify-end">
                          <Card.Text className="fw-bold text-white" style={{fontSize:'14px'}}>
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

export default VerticalCardProduct;
