import React, { useEffect, useState } from "react";

import SummaryApi from "../common";

import Slider from "react-slick";

const BannerProduct = () => {
  const [allBanner, setAllBanner] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const fetchAllBanner = async () => {
    const response = await fetch(SummaryApi.allBanner.url);
    const dataResponse = await response.json();

    setAllBanner(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllBanner();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className=" mx-auto rounded ">
      {/**desktop and tablet version */}
      <div className="">
        <Slider {...settings}>
          {allBanner[0]?.productImage?.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default BannerProduct;
