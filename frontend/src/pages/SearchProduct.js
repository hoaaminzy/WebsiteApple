import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";
import VerticalCardProduct from "../components/VerticalCardProduct";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div style={{ background: "#3e3e3f", minHeight: "100vh" }}>
      <div className="container mx-auto p-4">
        {loading && <p className="text-lg text-center">Loading ...</p>}

        <p className="text-lg font-semibold my-3 text-white">
          Search Results : {data.length}
        </p>

        {data.length === 0 && !loading && (
          <p className="bg-white text-lg text-center p-4">No Data Found....</p>
        )}

        {data.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data} />
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
