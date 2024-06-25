import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Row } from "react-bootstrap";
import HistoryDetail from "./HistoryDetail";
import SummaryApi from "../common";

const AllOrder = () => {
  const [dataPayments, setDataPayments] = useState([]);
  const [dataCods, setDataCods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyDetail, setHistoryDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [allProduct, setAllProduct] = useState([]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(`${SummaryApi.allProduct.url}`);
      const dataResponse = await response.json();

      console.log("product data", dataResponse);

      if (dataResponse.success) {
        setAllProduct(dataResponse.data || []);
      } else {
        console.error(dataResponse.message);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

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

  console.log("Detail", detailedOrders);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="pt-5">
      <span className="text-center d-block fw-bold fs-3">Lịch sử đơn hàng</span>
      <Row className="pt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách hàng</th>
              <th>Mã Order</th>
              <th>Tổng tiền</th>
              <th>Số lượng sản phẩm</th>
              <th>Cổng thanh toán</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Hình thức</th>
              <th>Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {detailedOrders.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.user?.name}</td>
                <td>{data.pay ? data.pay[0].orderId : "COD" + data._id}</td>
                <td>
                  {formatNumber(data.pay ? data.pay[0].amount : data.total)}
                </td>
                <td>{data.products.length}</td>
                <td>{data.pay ? data.pay[0].partnerCode : "COD"}</td>
                <td>
                  <strong>
                    {data.pay ? data.pay[0].message : data.status}
                  </strong>
                </td>
                <td>
                  {formatTime(
                    data.pay ? data.pay[0].responseTime : data.createdAt
                  )}
                </td>
                <td>{data.pay ? "Online" : "COD"}</td>
                <td>
                  {data.detailedProducts.map((item, j) => (
                    <>
                      <div
                        key={j}
                        className="d-flex justify-between items-center"
                      >
                        <div>
                          <strong>{item.productName}</strong>
                          <br />
                          <span>Giá: {formatNumber(item.price)}</span>
                          <br />
                          <span>Số lượng: {item.quantity}</span>
                          <br />
                        </div>
                        <div>
                          <img src={item.productImage[0]} width={100} />
                        </div>
                      </div>
                    </>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      {historyDetail && (
        <HistoryDetail
          data={selectedOrder}
          onClose={() => setHistoryDetail(false)}
        />
      )}
    </Container>
  );
};

export default AllOrder;
