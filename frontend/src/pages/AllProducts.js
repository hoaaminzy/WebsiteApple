import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };


  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <Container>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="pt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Selling Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Description</th>
              <th colSpan={2}>Status</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product, index) => (
              <AdminProductCard
                data={product}
                key={index}
                fetchdata={fetchAllProduct}
              />
            ))}
          </tbody>
        </Table>
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </Container>
  );
};

export default AllProducts;
