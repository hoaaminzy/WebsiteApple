import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import HistoryDetail from "../pages/HistoryDetail";

const HistoryPayment = () => {
  const user = useSelector((state) => state?.user?.user);
  const [historyDetail, setHistoryDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [dataPayments, setDataPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Chuyển đổi thành định dạng ngày tháng dễ đọc
  };

  const filterDataPayment = dataPayments.filter(
    (dataPayment) => dataPayment.userId === user?._id
  );
  console.log(filterDataPayment)
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
            </tr>
          </thead>
          <tbody>
            {filterDataPayment?.map((filterData, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{filterData.pay[0].orderId}</td>
                <td>{formatNumber(filterData.pay[0].amount)}</td>
                <td>{filterData.products.length}</td>
                <td>{filterData.pay[0].partnerCode}</td>
                <td>{filterData.pay[0].message}</td>
                <td>{formatTime(filterData.pay[0].responseTime)}</td>
                <td
                  onClick={() => {
                    setSelectedOrder(filterData.products);
                    setHistoryDetail(true);
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Xem chi tiết
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

export default HistoryPayment;
