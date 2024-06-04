import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import productCategory from "../helpers/productCategory";
const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? productCategory.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : productCategory.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.value}
                  className="cursor-pointer"
                  key={product?.category}
                >
                  {/* <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p> */}
                  <Card style={{background:'#323232'}}>
                    <Card.Img variant="top" src={product?.image} />
                    <Card.Body>
                      <Card.Title className="text-white text-center">{product.label}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
