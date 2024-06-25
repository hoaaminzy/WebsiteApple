import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import FeedBack from "./FeedBack";
import Rating from "@mui/material/Rating";
import { Col, Row, Container } from "react-bootstrap";
import Slider from "react-slick";
const ProductDetails = () => {
  const [allFeedBack, setAllFeedBack] = useState([]);
  const dispatch = useDispatch();
  const [feedBack, setFeedBack] = useState(false);
  const [data, setData] = useState({
    _id: "",
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    sellingPrice: 0,
  });
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();
  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(SummaryApi.allFeedBackProduct.url);
        const dataResponse = await response.json();
        setAllFeedBack(dataResponse?.data || []);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setLoading(false);
  };
  console.log(data);
  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addItemToCart(product));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  const handleBuyProduct = (e, product) => {
    e.preventDefault();
    dispatch(addItemToCart(product));
    navigate("/cart");
  };

  const filterFeedBack = allFeedBack.filter((fb) => fb.productId === data._id);
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <div style={{ background: "#3e3e3f" }}>
      <Container className="container mx-auto p-4 text-white">
        <div>
          <Link to="/" className="text-white">
            <strong>Trang chủ</strong>
          </Link>{" "}
          /
          <Link to="/" className="text-white">
            <span style={{ textTransform: "uppercase" }}>{data.category}</span>
          </Link>{" "}
          / <span>{data.productName}</span>
        </div>
        <Row className="pt-3">
          <Col sm={6} className="h-96 flex flex-col lg:flex-row-reverse gap-4">
            <div
              className="h-[300px] w-[300px]  bg-slate-200 relative p-2"
              style={{ width: "100%", height: "100%" }}
            >
              <img
                src={activeImage}
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
                alt="Product"
              />
              {zoomImage && (
                <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                  <div
                    className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }% `,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="h-full">
              {loading ? (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {new Array(4).fill(null).map((_, index) => (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                  {data?.productImage?.map((imgURL, index) => (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        alt={`Product thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          {loading ? (
            <Col sm={6} className="flex flex-col gap-2 w-full">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit h-6 lg:h-8 animate-pulse" />
              <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full" />
              <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full" />
              <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full" />
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
                <p className="text-red-600 bg-slate-200 w-full" />
                <p className="text-slate-400 line-through bg-slate-200 w-full" />
              </div>
              <div className="flex items-center gap-3 my-2 w-full">
                <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full" />
                <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full" />
              </div>
              <div className="w-full">
                <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full" />
                <p className="bg-slate-200 rounded animate-pulse h-10 lg:h-12 w-full" />
              </div>
            </Col>
          ) : (
            <Col
              sm={6}
              className="flex flex-col gap-1 align-items-start justify-between"
            >
              <p className="bg-red-200 text-white px-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-2xl lg:text-4xl font-medium text-white">
                {data?.productName}
              </h2>
              <p className="capitalize text-white fw-bold">
                Danh mục: {data?.category}
              </p>
              {data.star > "0" ? (
                <div className="d-flex">
                  <div className="text-yellow-300 flex items-center gap-1">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                  <div className="text-white">({data?.star})</div>
                </div>
              ) : (
                ""
              )}
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                <p className="text-white">{formatNumber(data.sellingPrice)}đ</p>
              </div>
              <div className="flex items-center gap-3 my-2">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleAddToCart(e, data)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div>
                <p className="text-slate-600 font-medium my-1 text-white fw-bold">
                  Mô tả :
                </p>
                <p className="text-white">{data?.description}</p>
              </div>
            </Col>
          )}
        </Row>
        <div
          className="mt-5"
          style={{
            border: "1px solid white",
            borderRadius: "20px",
            padding: "10px",
          }}
        >
          <span
            className="text-white"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Đánh giá cho {data.productName}
          </span>
          <hr />
          <div>
            {filterFeedBack.length === 0 ? (
              <span className="d-flex">Chưa có đánh giá nào</span>
            ) : (
              <>
                {filterFeedBack?.map((fback) => {
                  return (
                    <div key={fback._id}>
                      <div className="d-flex flex-col gap-2">
                        <span className="fw-bold text-yellow-300">
                          {fback.name}
                        </span>
                        <span>{formatTime(fback.createdAt)}</span>
                        <div>
                          <Rating
                            name="size-small"
                            defaultValue={fback.rating}
                            size="small"
                          />
                        </div>
                      </div>
                      <div>
                        <p>{fback.review}</p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </>
            )}

            <button
              className="btn btn-primary mt-3"
              onClick={() => setFeedBack(true)}
            >
              Viết đánh giá
            </button>
          </div>
        </div>

        {data?._id && (
          <CategoryWiseProductDisplay
            heading="Related Products"
            category={data?.category}
          />
        )}
        {feedBack && (
          <FeedBack data={data} onClose={() => setFeedBack(false)} />
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;
