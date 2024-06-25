import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";

const ChangeInfor = ({ onClose, inforUser }) => {
  const [data, setData] = useState({
    name: inforUser.name || "",
    address: inforUser.address || "",
    numberphone: inforUser.numberphone || "",
    profilePic: "",
  });

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      console.log("Base64 Image: ", imagePic);
      setData((prev) => ({ ...prev, profilePic: imagePic }));
    }
  };

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: inforUser._id,
          ...data,
        }),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating information:", error);
    }
  };

  console.log("Profile Pic: ", data.profilePic);

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Sửa thông tin</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full">
          <img
            src={data.profilePic || inforUser.profilePic}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <label>
            <div
              className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full"
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.5)",
                padding: "8px 0",
              }}
            >
              Upload Photo
            </div>
            <input
              type="file"
              className="hidden"
              style={{ display: "none" }}
              onChange={handleUploadPic}
            />
          </label>
        </div>
        <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid">
            <label style={{ color: "#333", fontWeight: "500" }}>Name: </label>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <input
                type="text"
                placeholder={inforUser.name}
                name="name"
                value={data.name}
                onChange={handleOnChange}
                required
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  background: "transparent",
                  color: "#333",
                }}
              />
            </div>
          </div>

          <div className="grid">
            <label style={{ color: "#333", fontWeight: "500" }}>
              Address:{" "}
            </label>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <input
                type="text"
                placeholder={inforUser.address}
                name="address"
                value={data.address}
                onChange={handleOnChange}
                required
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  background: "transparent",
                  color: "#333",
                }}
              />
            </div>
          </div>
          <div className="grid">
            <label style={{ color: "#333", fontWeight: "500" }}>
              Number Phone:{" "}
            </label>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "8px",
                borderRadius: "8px",
              }}
            >
              <input
                type="text"
                placeholder={inforUser.numberphone}
                name="numberphone"
                value={data.numberphone}
                onChange={handleOnChange}
                required
                style={{
                  width: "100%",
                  height: "100%",
                  outline: "none",
                  background: "transparent",
                  color: "#333",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#e3342f",
              color: "#fff",
              padding: "10px 24px",
              width: "100%",
              borderRadius: "24px",
              transition: "all 0.3s",
              marginTop: "24px",
              textAlign: "center",
            }}
            className="hover:bg-red-700 hover:scale-105"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeInfor;
