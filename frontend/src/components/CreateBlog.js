import React, { useState } from "react";
import uploadImage from "../helpers/uploadImage";
import SummaryApi from "../common";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({ imageData, setImageData, imageKey, imageIndex }) => {
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setImageData((prev) => ({
      ...prev,
      [imageKey]: [...(prev[imageKey] || []), uploadImageCloudinary.url],
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = [...imageData[imageKey]];
    newImages.splice(index, 1);

    setImageData((prev) => ({
      ...prev,
      [imageKey]: newImages,
    }));
  };

  return (
    <div>
      <label className="mt-3">Blog Image {imageIndex}:</label>
      <label>
        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
          <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
            <span className="text-4xl">
              <FaCloudUploadAlt />
            </span>
            <p className="text-sm">Upload Product Image</p>
            <input
              type="file"
              id={`uploadImageInput${imageIndex}`}
              className="hidden"
              onChange={handleUploadImage}
            />
          </div>
        </div>
      </label>
      {imageData[imageKey]?.length > 0 ? (
        <div className="flex items-center gap-2">
          {imageData[imageKey].map((el, index) => (
            <div className="relative group" key={index}>
              <img
                src={el}
                alt={el}
                width={80}
                height={80}
                className="bg-slate-100 border cursor-pointer"
                onClick={() => {
                  setImageData((prev) => ({
                    ...prev,
                    openFullScreenImage: true,
                    fullScreenImage: el,
                  }));
                }}
              />
              <div
                className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                onClick={() => handleDeleteImage(index)}
              >
                <MdDelete />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600 text-xs">*Please upload product image</p>
      )}
    </div>
  );
};

const CreateBlog = () => {
  const [data, setData] = useState({
    heading: "",
    image: [],
    description: "",
    headingContent1: "",
    imageContent1: [],
    descriptionContent1: "",
    headingContent2: "",
    imageContent2: [],
    descriptionContent2: "",
    headingContent3: "",
    imageContent3: [],
    descriptionContent3: "",
    headingContent4: "",
    imageContent4: [],
    descriptionContent4: "",
    headingContent5: "",
    imageContent5: [],
    descriptionContent5: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    console.log(data);

    const response = await fetch(SummaryApi.uploadBlog.url, {
      method: SummaryApi.uploadBlog.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      console.log(responseData);
    } else if (responseData.error) {
      console.log(responseData.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="heading" className="block mb-2 text-gray-700">
            Heading
          </label>
          <input
            type="text"
            id="heading"
            placeholder="Enter heading"
            name="heading"
            value={data.heading}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded w-full"
            required
          />
          <label
            htmlFor="description"
            className="block mb-2 text-gray-700 mt-4"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded w-full"
          />
          <ImageUploader
            imageData={data}
            setImageData={setData}
            imageKey="image"
            imageIndex={0}
          />
        </div>

        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="mb-6">
            <label
              htmlFor={`headingContent${num}`}
              className="block mb-2 text-gray-700"
            >
              Heading Content {num}
            </label>
            <input
              type="text"
              id={`headingContent${num}`}
              placeholder="Enter heading content"
              name={`headingContent${num}`}
              value={data[`headingContent${num}`]}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded w-full"
            />
            <ImageUploader
              imageData={data}
              setImageData={setData}
              imageKey={`imageContent${num}`}
              imageIndex={num}
            />
            <label
              htmlFor={`descriptionContent${num}`}
              className="block mb-2 text-gray-700 mt-4"
            >
              Description Content {num}
            </label>
            <textarea
              id={`descriptionContent${num}`}
              name={`descriptionContent${num}`}
              value={data[`descriptionContent${num}`]}
              onChange={handleOnChange}
              rows="4"
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}

        <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded">
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
