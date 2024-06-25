import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";

const FeedBack = ({ data, onClose }) => {
  const user = useSelector((state) => state.user.user);

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all necessary data fields are provided
    if (rating && review && name && phone) {
      const feedbackData = {
        rating,
        review,
        name,
        numberphone: phone,
        productId: data._id,
        userId: user._id,
      };

      try {
        const response = await fetch(SummaryApi.feedbackProduct.url, {
          method: SummaryApi.feedbackProduct.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        });

        const dataApi = await response.json();
        if (response.ok) {
          console.log("Feedback submitted successfully:", dataApi);
          onClose();
          window.location.reload();
        } else {
          console.error("Error submitting feedback:", dataApi);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Please fill in all fields.");
    }
  };

  return (
    <div>
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white py-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex justify-between items-center pb-3">
                <span className="font-bold d-block text-black text-center w-100 fs-5">
                  Đánh giá sản phẩm
                </span>
                <div
                  className="w-fit ml-auto text-2xl text-black cursor-pointer mr-4"
                  onClick={onClose}
                >
                  <CgClose />
                </div>
              </div>
              <hr style={{ color: "red" }} />
              <div className="d-flex flex-col justify-center">
                <div
                  style={{ width: "100%" }}
                  className="d-flex justify-center"
                >
                  <img src={data.productImage[0]} width={200} alt="Product" />
                </div>
                <span className="text-center text-black pt-4 fs-4">
                  {data.productName}
                </span>
                <div className="d-flex justify-center pt-4">
                  {[...Array(5)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          style={{ display: "none" }}
                        />
                        <FaStar
                          size={50}
                          className="star"
                          color={
                            currentRating <= (hover || rating)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="mt-4 px-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nhận xét của bạn
                  </label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="4"
                    className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="px-4 d-flex gap-3 pt-3">
                  <Form.Control
                    type="text"
                    id="inputName"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Form.Control
                    type="text"
                    id="inputPhone"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="px-4 pt-4 w-100">
                  <button type="submit" className="btn btn-primary w-100">
                    Gửi đánh giá
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
