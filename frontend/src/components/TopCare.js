import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CiClock2 } from "react-icons/ci";
import Slider from "react-slick";
import { GoChevronRight } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
const TopCare = () => {
  const imageSlide = [
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_5-min.JPG",
    },
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_6-min.JPG",
    },
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_7-min.JPG",
    },
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_9-min.JPG",
    },
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_9-min.JPG",
    },
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_11-min.JPG",
    },
    {
      image:
        "https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/img_1-min.JPG",
    },
  ];
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px 0",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="Container">
      <div style={{ width: "100%" }}>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h2 style={{ fontSize: "40px" }}>Dịch vụ sữa chưa TopCare</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              rowGap: "30px",
            }}
          >
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://imagecdn.tantamphucvu.vn//svCategoryImageURL/9fa37750-34b8-4638-9fc9-f6e053db2c16-Image.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Sửa chữa iPhone</Card.Title>
                <Card.Text>
                  Gửi đi xưởng sửa chữa Apple Màn hình iPhone Pin iPhone
                </Card.Text>
                <div className="flex">
                  <Card.Link>Xem bảng giá tham khảo </Card.Link>
                  <GoChevronRight />
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://imagecdn.tantamphucvu.vn//svCategoryImageURL/7f5a1369-3ced-4c7e-9668-9ba961224e20-Image5.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Sửa chữa iPad</Card.Title>
                <Card.Text>Đổi máy iPad</Card.Text>
                <div className="flex">
                  <Card.Link>Xem bảng giá tham khảo </Card.Link>
                  <GoChevronRight />
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://imagecdn.tantamphucvu.vn//svCategoryImageURL/1b213305-cbee-4d69-8024-2fe76c4222a1-Image-1.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Sửa chữa Macbook</Card.Title>
                <Card.Text>
                  Logic Board MacBook Pin MacBook Màn hình MacBook
                </Card.Text>
                <div className="flex">
                  <Card.Link>Xem bảng giá tham khảo </Card.Link>
                  <GoChevronRight />
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://imagecdn.tantamphucvu.vn//svCategoryImageURL/9c248d66-cec9-4e15-8c7a-4403d63ff0f3-Image-2.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Sửa chữa Watch</Card.Title>
                <Card.Text>Đổi máy Watch</Card.Text>
                <div className="flex">
                  <Card.Link>Xem bảng giá tham khảo </Card.Link>
                  <GoChevronRight />
                </div>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://imagecdn.tantamphucvu.vn//svCategoryImageURL/56b25a53-098e-4753-9ed8-381a8fae7dcb-Image-3.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Sửa chữa AirPods</Card.Title>
                <Card.Text>Đổi máy AirPods</Card.Text>
                <div className="flex">
                  <Card.Link>Xem bảng giá tham khảo </Card.Link>
                  <GoChevronRight />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", backgroundColor: "#f5f5f7" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h2 style={{ fontSize: "40px", paddingTop: "30px" }}>
              Lý do lựa chọn TopCare
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              rowGap: "30px",
              placeItems: "center",
            }}
          >
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                background: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_1.png"
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>
                  Chính hãng Apple
                </Card.Title>
                <Card.Text>
                  TopCare là trung tâm dịch vụ ủy quyền chính thức của Apple.
                  Tất cả linh kiện sửa chữa tại TopCare đều do Apple cung cấp
                  chính hãng.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_2.png"
              />
              <Card.Body style={{ marginBottom: "20px" }}>
                <Card.Title style={{ fontSize: "24px" }}>
                  Chứng chỉ Apple
                </Card.Title>
                <Card.Text>
                  100% đội ngũ chuyên viên và kỹ thuật viên của TopCare được đào
                  tạo và cấp chứng chỉ bởi Apple.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_3.png"
              />
              <Card.Body style={{ marginBottom: "20px" }}>
                <Card.Title style={{ fontSize: "24px" }}>
                  Bảo mật tuyệt đối
                </Card.Title>
                <Card.Text>
                  Thông tin khách hàng cung cấp được bảo vệ nghiêm ngặt theo
                  tiêu chuẩn kiểm soát cao nhất.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_4.png"
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>
                  Dịch vụ đẳng cấp
                </Card.Title>
                <Card.Text>
                  Với phương châm lấy khách hàng làm trọng tâm, TopCare cam kết
                  mang đến chất lượng phục vụ vượt trội dành cho khách hàng.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/why_choose/icon_5.png"
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>Tiết kiệm</Card.Title>
                <Card.Text>
                  TopCare thường xuyên có những chương trình ưu đãi giúp khách
                  hàng tiết kiệm hơn khi sửa chữa sản phẩm.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h2 style={{ fontSize: "40px" }}>
              Phụ kiện chính hãng Apple tại TopCare
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              rowGap: "30px",
              marginTop: "60px",
            }}
          >
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_1.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Tai nghe</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_2.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Cáp | Sạc</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_3.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Ốp lưng | Bao da</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_4.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Dây Apple Watch</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_5.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>AirTag</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_6.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Chuột | Trackpad</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_7.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Apple TV</Card.Title>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                alignItems: "center",
                border: "none",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "200px", height: "200px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/accessory/img_8.png"
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>Bàn phím</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#f5f5f7",
          paddingBottom: "30px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "40px", paddingTop: "30px" }}>
            Quy trình bảo hành TopCare
          </h2>
        </div>
        <div style={{ width: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto auto",
              rowGap: "30px",
              placeItems: "center",
              marginTop: "40px",
            }}
          >
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                background: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_1.png"
              />
              <Card.Body>
                <Card.Text>1. Kiểm tra tổng quan trước sửa chữa</Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_2.png"
              />
              <Card.Body>
                <Card.Text>2. Đặt linh kiện</Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_3.png"
              />
              <Card.Body>
                <Card.Text>3. Sửa chữa | Thay thế</Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_4.png"
              />
              <Card.Body>
                <Card.Text>4. Kiểm tra tổng quan sau sửa chữa</Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                display: "flex",
                alignItems: "center",
                border: "none",
                backgroundColor: "#f5f5f7",
              }}
            >
              <Card.Img
                variant="top"
                style={{ width: "60px", height: "60px" }}
                src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/warranty/icon_5.png"
              />
              <Card.Body>
                <Card.Text>5. Trả sản phẩm</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <span>
            Điều khoản bảo hành sửa chữa Apple toàn cầu:{" "}
            <span style={{ fontStyle: "italic", color: "blue" }}>Pháp lý</span>{" "}
            |
            <span style={{ fontStyle: "italic", color: "blue" }}>Sửa chữa</span>
          </span>
        </div>
      </div>

      <div style={{ width: "100%", backgroundColor: "#000" }}>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h2 style={{ fontSize: "40px", paddingTop: "30px", color: "#fff" }}>
            Trung tâm bảo hành TopCare - Đẳng cấp khác biệt
          </h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card.Img
            style={{ width: "469px", height: "164px", margin: "10px" }}
            src="https://cdn.tgdd.vn/mwgcart/topzone/images/topcare/introduce/logo.png"
          />
        </div>
        <div style={{ width: "750px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#fff", fontSize: "20px" }}>
            Tại Trung tâm bảo hành TopCare, khách hàng yêu mến hệ sinh thái
            Apple sẽ trải nghiệm đầy đủ và đa dạng nhất các dịch vụ bảo hành
            chính hãng Apple từ iPhone, iPad đến những chiếc tai nghe AirPods...
            trong một không gian đẳng cấp và hiện đại.
          </p>
        </div>
        <div className="py-5">
          <Slider {...settings}>
            {imageSlide.map((img, index) => {
              return (
                <div key={index} className="d-flex mr-5">
                  <img
                    className="mr-5"
                    src={img.image}
                    alt=""
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div
          style={{
            width: "1100px",
            margin: "0 auto",
            padding: "10px 0",
            fontSize: "20px",
            color: "#fff",
          }}
        >
          <span style={{ fontSize: "30px" }}>Trung tâm bảo hành TopCare</span>
          <div>
            <ul className="contract">
              <li className="flex" style={{ justifyContent: "normal" }}>
                <CiLocationOn
                  style={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                Số 249 Nguyễn Văn Luông, Phường 11, Quận 6, Thành phố Hồ Chí
                Minh.
                <Link style={{ marginLeft: "8px" }}>Xem chỉ đường</Link>
              </li>
              <li className="flex" style={{ justifyContent: "normal" }}>
                <CiLocationOn
                  style={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                759 Cách Mạng Tháng Tám, Phường 6, Quận Tân Bình, TP. Hồ Chí
                Minh.
                <Link style={{ marginLeft: "8px" }}>Xem chỉ đường</Link>
              </li>
              <li className="flex" style={{ justifyContent: "normal" }}>
                <CiLocationOn
                  style={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                09 Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, Hà Nội.
                <Link style={{ marginLeft: "8px" }}>Xem chỉ đường</Link>
              </li>
              <li
                className="flex"
                style={{ justifyContent: "normal", alignItems: "normal" }}
              >
                <CiClock2
                  style={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                <ul className="contract2">
                  <li className="flex" style={{ justifyContent: "normal" }}>
                    <GoDotFill
                      style={{
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                      }}
                    />
                    HCM: Từ 8:00 - 17:00 từ thứ 2 đến thứ 7 (không nghỉ trưa),
                    CN không làm việc
                  </li>
                  <li className="flex" style={{ justifyContent: "normal" }}>
                    <GoDotFill
                      style={{
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                      }}
                    />
                    Hà Nội: Từ 8:00 - 20:00 từ thứ 2 đến Chủ nhật (không nghỉ
                    trưa)
                  </li>
                </ul>
              </li>
              <li className="flex" style={{ justifyContent: "normal" }}>
                <BsTelephone
                  style={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                <Link>1900 232 463</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCare;
