import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
// import ListingCard from "./ListingCard";

function ListingsContainer({ searchInput }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // console.log(data);
      });
  }, []);

  function handleDelete(id) {
    const deletedProduct = products.filter((product) => {
      return product.id !== id;
    });

    setProducts(deletedProduct);
  }

  const filteredSearchProduct = products.filter((product) => {
    return product.description
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const productsToDisplay = filteredSearchProduct.map((product) => {
    return (
      <ListingCard
        key={product.id}
        product={product}
        handleDelete={handleDelete}
      />
    );
  });
  return (
    <main>
      <ul className="cards">{productsToDisplay}</ul>
    </main>
  );
}

export default ListingsContainer;
