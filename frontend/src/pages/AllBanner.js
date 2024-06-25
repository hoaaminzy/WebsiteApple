import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import CreateBanner from "../components/CreateBanner";
import EditBanner from "../components/EditBanner";

const AllBanner = () => {
  const [updateBanner, setUpdateBanner] = useState(null);
  const [openUploadBanner, setOpenUploadBanner] = useState(false);
  const [allBanner, setAllBanner] = useState([]);

  const fetchAllBanner = async () => {
    const response = await fetch(SummaryApi.allBanner.url);
    const dataResponse = await response.json();
    setAllBanner(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllBanner();
  }, []);

  const handleDeleteBanner = async (id) => {
    // Implement delete functionality
    // await fetch(SummaryApi.deleteBanner.url, { method: SummaryApi.deleteBanner.method, body: JSON.stringify({ id }) });
    fetchAllBanner(); // Refresh the banners list after deletion
  };

  return (
    <Container>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadBanner(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="pt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Image</th>
              <th>Image</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allBanner.map((banner, index) => (
              <tr key={index}>
                {banner.productImage && banner.productImage.length > 0 ? (
                  <>
                    {banner.productImage.map((image, i) => (
                      <td key={i}>
                        <img
                          src={image}
                          alt={`Image ${i}`}
                          style={{ maxWidth: "100px", height: "auto" }}
                        />
                      </td>
                    ))}
                    {banner.productImage.length < 4 &&
                      Array(4 - banner.productImage.length)
                        .fill()
                        .map((_, i) => <td key={`empty-${i}`}></td>)}
                  </>
                ) : (
                  <td colSpan="4">No images available</td>
                )}
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => setUpdateBanner(banner)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {updateBanner && (
        <EditBanner
          banner={updateBanner}
          onClose={() => {
            setUpdateBanner(null);
            fetchAllBanner(); // Refresh the banners list after update
          }}
        />
      )}

      {openUploadBanner && (
        <CreateBanner
          onClose={() => {
            setOpenUploadBanner(false);
            fetchAllBanner(); // Refresh the banners list after creation
          }}
        />
      )}
    </Container>
  );
};

export default AllBanner;
