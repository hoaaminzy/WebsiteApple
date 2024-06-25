import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common/";

const AdminProductCard = ({ data, fetchdata, index }) => {
  const [editProduct, setEditProduct] = useState(false);

  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
  const deleteProduct = async (id) => {
    const response = await fetch(`${SummaryApi.deleteProduct.url}/${id}`, {
      method: SummaryApi.deleteProduct.method,
    });
  };
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td className="flex justify-center">
          <img src={data?.productImage[0]} alt={data.productName} width={100} />
        </td>
        <td>{data.productName}</td>
        <td>{data.price}</td>
        <td>{formatNumber(data.sellingPrice)}</td>
        <td>{data.category}</td>
        <td>{data.brandName}</td>
        <td>{data.description}</td>
        <td>
          <button
            onClick={() => setEditProduct(true)}
            style={{ cursor: "pointer" }}
            className="btn btn-primary"
          >
            Edit
          </button>
          <button
            onClick={() => deleteProduct(data._id)}
            style={{ cursor: "pointer" }}
            className="ml-6 btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </>
  );
};

export default AdminProductCard;
