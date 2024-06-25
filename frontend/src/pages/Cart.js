import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GoChevronLeft, GoChevronDown } from "react-icons/go";
import { RiBillLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import {
  removeItemFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Cart = () => {
  const [inforCus, setInforCus] = useState({
    name: "",
    address: "",
    numberphone: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInforCus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [isChecked, setIsChecked] = useState(false);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.sellingPrice,
    0
  );

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleIncreaseQty = (itemId) => {
    dispatch(increaseQty(itemId));
  };

  const handleDecreaseQty = (itemId) => {
    dispatch(decreaseQty(itemId));
  };

  const handlePaymentZalo = async () => {
    if (isChecked) {
      try {
        const formattedProducts = cartItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        }));

        const response = await fetch("http://localhost:8080/paymentZalo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPrice,
            userId: user._id,
            products: formattedProducts,
            user: {
              name: inforCus.name || user.name,
              address: inforCus.address || user.address,
              numberphone: inforCus.numberphone || user.numberphone,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // window.location.href = `https://qcgateway.zalopay.vn/openinapp?order=${encodeURIComponent(
        //   JSON.stringify(data.order)
        // )}`;
        console.log(data);
        window.location.href = data.order_url;
      } catch (error) {
        console.error("Error:", error);
        // Handle error gracefully, e.g., show a message to the user
        alert(
          "An error occurred while processing the payment. Please try again later."
        );
      }
    } else {
      alert(
        "Bạn phải đồng ý với chính sách xử lý dữ liệu cá nhân của TopZone trước khi thanh toán."
      );
    }
  };

  const handleCod = async () => {
    if (isChecked) {
      try {
        const formattedProducts = cartItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        }));

        const response = await fetch("http://localhost:8080/paymentCod", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPrice,
            userId: user._id,
            products: formattedProducts,
            user: {
              name: inforCus.name || user.name,
              address: inforCus.address || user.address,
              numberphone: inforCus.numberphone || user.numberphone,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        navigate("/checkout");
        // localStorage.clear();
        // window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert(
        "Bạn phải đồng ý với chính sách xử lý dữ liệu cá nhân của TopZone trước khi thanh toán."
      );
    }
  };

  const handlePayment = async () => {
    if (isChecked) {
      try {
        const formattedProducts = cartItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        }));

        const response = await fetch("http://localhost:8080/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPrice,
            userId: user._id,
            products: formattedProducts,
            user: {
              name: inforCus.name || user.name,
              address: inforCus.address || user.address,
              numberphone: inforCus.numberphone || user.numberphone,
            },
          }),
        });

        const data = await response.json();
        if (data.payUrl) {
          window.location.href = data.payUrl;
        } else {
          console.error("Payment initiation failed", data);
        }
        // localStorage.clear();
        // window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert(
        "Bạn phải đồng ý với chính sách xử lý dữ liệu cá nhân của TopZone trước khi thanh toán."
      );
    }
  };

  return (
    <div className="container py-5" style={{ width: "100%" }}>
      <div className="Content" style={{ width: "600px", margin: "0 auto" }}>
        <div style={{ height: "100%", marginTop: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <GoChevronLeft style={{ marginRight: "6px" }} />
                Về trang chủ TopZone
              </span>
            </Link>
            <span>Giỏ hàng của bạn</span>
          </div>
        </div>
        <div
          className="shadow"
          style={{
            height: "auto",
            marginTop: "8px",
            backgroundColor: "#f0f0f0",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{ padding: "35px 25px 15px 25px" }}
              className="relative"
            >
              <div style={{ display: "inline-block" }}>
                <img
                  src={item.productImage[0]}
                  alt={item.productName}
                  className="h-20 w-20 object-scale-down"
                />
              </div>
              <div style={{ display: "inline-block", width: "80%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "10px",
                  }}
                >
                  <span>
                    {item.productName}
                    <br />
                    <span style={{ fontSize: "12px", opacity: 0.7 }}>
                      Online giá quá rẻ
                    </span>
                  </span>
                  <span>{formatNumber(item.sellingPrice)}đ</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Màu: Trắng</span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div
                      style={{
                        height: "25px",
                        width: "25px",
                        border: "1px solid black",
                        borderRadius: "4px",
                        textAlign: "center",
                        opacity: 0.2,
                      }}
                      onClick={() => handleDecreaseQty(item._id)}
                    >
                      -
                    </div>
                    <span>{item.quantity}</span>
                    <div
                      style={{
                        height: "25px",
                        width: "25px",
                        border: "1px solid black",
                        borderRadius: "4px",
                        textAlign: "center",
                      }}
                      onClick={() => handleIncreaseQty(item._id)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-5 right-5"
                onClick={() => handleRemoveItem(item._id)}
              >
                <IoClose />
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "35px 25px 15px 25px",
            }}
          >
            <span>
              <strong>Tạm tính</strong> ({totalQty} sản phẩm)
            </span>
            <span>{formatNumber(totalPrice)}đ</span>
            <div onClick={() => handleClearCart()}>
              <IoClose />
            </div>
          </div>
        </div>
        <div
          className="shadow"
          style={{
            height: "auto",
            marginTop: "8px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <div style={{ padding: "15px 15px 15px 25px" }}>
            <div>
              <span>
                <strong>Thông tin khách hàng</strong>
              </span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <Form.Group>
                  <Form.Label>Tên khách hàng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user?.name}
                    name="name"
                    value={inforCus.name}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user?.address}
                    name="address"
                    value={inforCus.address}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user?.numberphone}
                    name="numberphone"
                    value={inforCus.numberphone}
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Đồng ý với chính sách xử lý dữ liệu cá nhân của TopZone"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div
          className="shadow"
          style={{
            height: "auto",
            marginTop: "8px",
            backgroundColor: "#f0f0f0",
            padding: "35px 25px 15px 25px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>Hình thức thanh toán</strong>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
              flexDirection: "column",
            }}
          >
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                gap: 10,
                backgroundColor:
                  cartItems.length === 0 || !isChecked ? "#ccc" : "#007bff",
                border: "none",
                cursor:
                  cartItems.length === 0 || !isChecked
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={handleCod}
              disabled={cartItems.length === 0 || !isChecked}
            >
              <GoChevronDown />
              Thanh toán khi nhận hàng (COD)
            </Button>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                gap: 10,
                backgroundColor:
                  cartItems.length === 0 || !isChecked ? "#ccc" : "#007bff",
                border: "none",
                cursor:
                  cartItems.length === 0 || !isChecked
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={handlePayment}
              disabled={cartItems.length === 0 || !isChecked}
            >
              <RiBillLine />
              Thanh toán trực tuyến
            </Button>
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                backgroundColor:
                  cartItems.length === 0 || !isChecked ? "#ccc" : "#007bff",
                border: "none",
                cursor:
                  cartItems.length === 0 || !isChecked
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={handlePaymentZalo}
              disabled={cartItems.length === 0 || !isChecked}
            >
              <RiBillLine />
              Thanh toán Zalo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
