import React, { useContext } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const VerticalCard = ({ loading, data = [] }) => {
  const dispatch = useDispatch();
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);
  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
  const handleAddToCart = async (e, product) => {
    await dispatch(addItemToCart(product));
    //    fetchUserAddToCart()
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                  </div>
                  <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <div key={index}>
                <Card
                  style={{
                    width: "18rem",
                    borderRadius: "10px",
                    padding: "20px",
                    background: "#323232",
                  }}
                  className=""
                >
                  <Card.Img variant="top" src={product.productImage[0]} />
                  <Card.Body>
                    <Card.Title className="text-white">
                      {product.productName}
                    </Card.Title>
                    <Card.Text className="text-white">
                      {product.description}
                    </Card.Text>
                    <div
                      style={{ width: "100%" }}
                      className="d-flex justify-between align-items-center"
                    >
                      <Card.Text className=" text-red-600">
                        {formatNumber(product?.price)}đ
                      </Card.Text>
                      <Card.Text className="fw-bold fs-4 text-white">
                        {formatNumber(product?.sellingPrice)}đ
                      </Card.Text>
                    </div>
                    <Link to={`product/${product?._id}`}>
                      <Button
                        className="d-flex align-items-center justify-center w-100"
                        variant="primary"
                      >
                        Xem chi tiết sản phẩm
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
    </div>
  );
};

export default VerticalCard;
