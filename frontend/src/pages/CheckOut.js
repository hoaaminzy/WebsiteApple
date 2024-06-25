import React from "react";
import { Link } from "react-router-dom";
const CheckOut = () => {
  return (
    <div style={{ maxWidth: "100vw", height: "90vh", background: "black", display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_640.png"
          alt=""
          width={300}
        />
        <Link to='/' className="text-center block text-white">Quay về trang chủ</Link>
      </div>
    </div>
  );
};

export default CheckOut;
