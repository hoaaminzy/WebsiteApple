import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import { Container } from "react-bootstrap";
import VerticalCardProduct from "../components/VerticalCardProduct";
import VerticalCard from "../components/VerticalCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import productCategory from "../helpers/productCategory";
const CategoryDetail = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    // autoplaySpeed: 2000,
    cssEase: "linear"
  };
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const { id } = useParams();
  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${SummaryApi.allProduct.url}`);
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
        // setTotalProducts(dataResponse.total || 0);
      } else {
        console.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  //   useEffect(() => {
  //     fetchAllProduct(currentPage, pageSize);
  //   }, [currentPage, pageSize]);
  useEffect(() => {
    fetchAllProduct();
  }, []);

  //   const handlePageChange = (page, pageSize) => {
  //     setCurrentPage(page);
  //     setPageSize(pageSize);
  //   };

  const filterDataCategory = allProduct.filter((item) => item.category === id);
  console.log(filterDataCategory);

  const filterDataBanner = productCategory.filter((item) => item.value === id);
  console.log(filterDataBanner.banner);
  return (
    <div style={{ background: "#3e3e3f", minHeight: "100vh" }}>
      <Container className="py-5">
        <div className="pb-4 fs-5 text-white">
          <Link className="text-white" to="/">
            Trang chủ
          </Link>{" "}
          / <strong>{id.toUpperCase()}</strong>
        </div>
        <div
          className="pb-5"
         
        >
          <Slider {...settings}  style={{ borderRadius: "20px", overflow: "hidden", height: "max-content" }}>
            {filterDataBanner[0]?.banner?.map((item,index) => {
              return (
                <div key={index} >
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "100%", height: "max-content" }}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <VerticalCard data={filterDataCategory} />
      </Container>
    </div>
  );
};

export default CategoryDetail;
