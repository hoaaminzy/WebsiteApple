import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import Chart from "../components/Chart";
import axios from "axios";
const DashBoard = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [allUser, setAllUsers] = useState([]);
  const [dataPayments, setDataPayments] = useState([]);
  const [dataCods, setDataCods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [allBanner, setAllBanner] = useState([]);

  const fetchAllBanner = async () => {
    const response = await fetch(SummaryApi.allBanner.url);
    const dataResponse = await response.json();
    setAllBanner(dataResponse?.data || []);
  };

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${SummaryApi.allProduct.url}`);
      const dataResponse = await response.json();

      console.log("product data", dataResponse);

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
        setTotalProducts(dataResponse.total || 0);
      } else {
        console.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/allPayments")
      .then((res) => {
        setDataPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/allCodPayments")
      .then((res) => {
        setDataCods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const combinedData = [...dataPayments, ...dataCods];

  const getDetailedOrders = (combinedData, allProducts) => {
    return combinedData.map((order) => {
      const detailedProducts = order.products
        .map((prod) => {
          const foundProduct = allProducts.find(
            (item) => item._id === prod.productId
          );
          return foundProduct
            ? { ...foundProduct, quantity: prod.quantity || 1 }
            : null;
        })
        .filter((item) => item !== null);
      return { ...order, detailedProducts };
    });
  };
  const detailedOrders = getDetailedOrders(combinedData, allProduct);

  useEffect(() => {
    fetchAllProduct();
    fetchAllUsers();
    fetchAllBanner();
  }, []);
  const data = [
    {
      name: "Products",
      count: allProduct.length,
    },
    {
      name: "Users",
      count: allUser.length,
    },

    {
      name: "Orders",
      count: detailedOrders.length,
    },
    {
      name: "Banners",
      count: allBanner.length,
    },
  ];
  return (
    <div className="py-5" style={{maxHeight:'100vh'}}>
        <span className="text-center block fw-bold fs-2 pb-5">BẢNG THỐNG KÊ</span>
      <Chart data={data} />
    </div>
  );
};

export default DashBoard;
