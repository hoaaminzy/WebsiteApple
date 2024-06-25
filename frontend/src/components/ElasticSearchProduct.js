import React, { useState } from "react";
import axios from "axios";

const ElasticSearchProduct = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/elastic-search-product?query=${query}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product._id}>{product.productName}</li>
            ))}
          </ul>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ElasticSearchProduct;
