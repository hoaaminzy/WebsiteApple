import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <div style={{ background: "#000000" }} className="py-4">
      <Container>
        <img
          src="https://assets-global.website-files.com/5fb85f26f126ce08d792d2d9/6362dd5e926122938ff89ade_Apple_Rainbow_Logo_Color_Scheme.jpg"
          alt="Logo"
          width={150}
        />
        <Row>
          <Col sm={3}>
            <span className="text-white fw-bold">Tổng đài</span>
            <ul className="text-white">
              <li>
                <strong>Mua hàng: </strong>10000
              </li>
              <li>
                <strong>Khiếu nại:</strong>10000
              </li>
              <li>Kết nối với chung tôi</li>
            </ul>
          </Col>
          <Col sm={3}>
            <span className="text-white fw-bold">Hệ thống cửa hàng</span>
            <ul className="text-white">
              <li>Xem 96 cửa hàng</li>
              <li>Nội dung cửa hàng</li>
              <li>Chất lượng phục vụ</li>
              <li>Chính sách bảo hàng & đổi trả</li>
            </ul>
          </Col>
          <Col sm={3}>
            <span className="text-white fw-bold">Hỗ trợ khách hàng</span>
            <ul className="text-white">
              <li>Điều kiện giao dịch chung</li>
              <li>Hướng dẫn mua hàng online</li>
              <li>Chính sách giao hàng</li>
              <li>Hướng dẫn thanh toán</li>
            </ul>
          </Col>
          <Col sm={3}>
            <span className="text-white fw-bold">Về thương hiệu TopZone</span>
            <ul className="text-white">
              <li>Tích điểm quà tặng</li>
              <li>Giới thiệu topzone</li>
              <li>Chính sách xử lý dữ liệu cá nhân</li>
              <li>Xem bản mobile</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-white p-0.5" />
        <Row>
          <Col sm={6}>
            <p className="text-white">
              © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở
              KH & ĐT TP.HCM cấp ngày 02/01/2007. Địa chỉ: 128 Trần Quang Khải,
              P.Tân Định, Q.1, TP. Hồ Chí Minh. Điện thoại: 028 38125960. Địa
              chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, Đ. D1, P.Tân
              Phú, TP.Thủ Đức, TP.Hồ Chí Minh. Chịu trách nhiệm nội dung: Huỳnh
              Văn Tốt. Email: hotrotmdt@thegioididong.com.
            </p>
          </Col>
          <Col sm={6}>
            <div className="d-flex gap-5 justify-end items-center">
              <div>
                <img
                  src="https://cdn.tgdd.vn/mwgcart/topzone/images/certify-bct.png"
                  alt=""
                  width={100}
                />
              </div>
              <div>
                <img
                  src="https://tinnhiemmang.vn/handle_cert?id=topzone.vn"
                  alt=""
                  width={100}
                />
              </div>
              <div>
                <img
                  src="https://images.dmca.com/Badges/_dmca_premi_badge_4.png?ID=4f44c8e7-b645-4ddb-8aec-c130d0598c85"
                  alt=""
                  width={100}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
