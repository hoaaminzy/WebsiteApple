import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import axios from "axios";
const Home = () => {
  // const [data, setData] = useState([])
  // useEffect(()=>{
  //   axios.post('http://localhost:8080/check-status-transaction', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // },[])
  return (
    <div>
      <BannerProduct />
      <div style={{ background: "#3e3e3f" }}>
        <CategoryList />
        <VerticalCardProduct category={"iphone"} heading={"iPhone"} />
        <VerticalCardProduct category={"mac"} heading={"Mac"} />
        <VerticalCardProduct category={"ipad"} heading={"iPad"} />
        <VerticalCardProduct category={"watch"} heading={"Watch"} />
        <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
        <VerticalCardProduct category={"test"} heading={"test"} />
        <VerticalCardProduct category={"abc"} heading={"abc"} />
      </div>
    </div>
  );
};

export default Home;
