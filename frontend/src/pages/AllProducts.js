import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { Pagination } from "antd";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

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

  useEffect(() => {
    fetchAllProduct(currentPage, pageSize);
  }, [currentPage, pageSize]);
  useEffect(() => {
    fetchAllProduct();
  }, []);
  // const handlePageChange = (page, pageSize) => {
  //   setCurrentPage(page);
  //   setPageSize(pageSize);
  // };

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
              <th>STT</th>
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
                index = {index}
                key={index}
                fetchdata={fetchAllProduct}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalProducts}
        // onChange={handlePageChange}
        showSizeChanger
      />

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
