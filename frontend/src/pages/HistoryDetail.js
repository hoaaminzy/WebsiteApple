import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import SummaryApi from "../common";

const HistoryDetail = ({ onClose, data }) => {
  const [allProduct, setAllProduct] = useState([]);
  console.log("data", data);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error("Failed to fetch all products:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
  const mapProduct = data
    ?.map((prod) => {
      const foundProduct = allProduct.find(
        (item) => item._id === prod.productId
      );
      return foundProduct ? { ...foundProduct, quantity: prod.quantity } : null;
    })
    .filter((item) => item !== null);

  console.log(mapProduct);

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Chi tiết đơn hàng</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <div className="overflow-auto max-h-[70vh]">
          {mapProduct && mapProduct.length > 0 ? (
            mapProduct.map((item, i) => (
              <div key={i} className="border-b py-2 d-flex justify-between">
                <div>
                  <div>
                    <strong>Tên sản phẩm:</strong> {item.productName}
                  </div>
                  <div>
                    <strong>Thương hiệu:</strong> {item.brandName}
                  </div>
                  <div>
                    <strong>Số lượng:</strong> {item.quantity}
                  </div>
                  <div>
                    <strong>Giá:</strong> {formatNumber(item.sellingPrice)}
                  </div>
                </div>
                <div>
                  <img src={item.productImage[0]} alt="" width={100} />
                </div>
              </div>
            ))
          ) : (
            <div>Không có sản phẩm nào trong đơn hàng này.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;
