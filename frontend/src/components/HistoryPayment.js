import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import HistoryDetail from "../pages/HistoryDetail";
import SummaryApi from "../common";

const HistoryPayment = () => {
  const user = useSelector((state) => state?.user?.user);
  const [historyDetail, setHistoryDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [dataPayments, setDataPayments] = useState([]);
  const [dataCods, setDataCods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});

  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await axios.get(
          "http://localhost:8080/allPayments"
        );
        const codPaymentsResponse = await axios.get(
          "http://localhost:8080/allCodPayments"
        );
        setDataPayments(paymentsResponse.data);
        setDataCods(codPaymentsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filterDataPayment = dataPayments.filter(
    (dataPayment) => dataPayment.userId === user?._id
  );
  const filterDataCod = dataCods.filter(
    (dataCod) => dataCod.userId === user?._id
  );
  const combinedData = [...filterDataPayment, ...filterDataCod];

  const handleChange = async (event, orderId) => {
    const newValue = event.target.value;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [orderId]: newValue,
    }));

    if (newValue === "done") {
      try {
        await axios.post(`${SummaryApi.updatePaymentStatus.url}/${orderId}`, {
          status: "Đã thanh toán",
        });
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    }
  };

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
            {combinedData?.map((data, i) => {
              const orderId = data.pay ? data.pay[0].orderId : data._id;
              const currentStatus =
                selectedValues[orderId] ||
                (data.pay ? data.pay[0].message : data.status);
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{data.user?.name}</td>
                  <td>{data.pay ? data.pay[0].orderId : "COD-" + data._id}</td>
                  <td>
                    {formatNumber(data.pay ? data.pay[0].amount : data.total)}
                  </td>
                  <td>{data.products.length}</td>
                  <td>{data.pay ? data.pay[0].partnerCode : "COD"}</td>
                  <td>
                    <select
                      value={currentStatus}
                      onChange={(event) => handleChange(event, orderId)}
                      disabled={currentStatus === "done"}
                    >
                      <option value={currentStatus}>{currentStatus}</option>
                      {currentStatus !== "done" && (
                        <option value="done">Đã thanh toán</option>
                      )}
                    </select>
                  </td>
                  <td>
                    {formatTime(
                      data.pay ? data.pay[0].responseTime : data.createdAt
                    )}
                  </td>
                  <td
                    onClick={() => {
                      setSelectedOrder(data.products);
                      setHistoryDetail(true);
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Xem chi tiết
                  </td>
                </tr>
              );
            })}
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
