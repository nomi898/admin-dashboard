// components/ProductGrid.tsx
"use client";

import React from "react";
import { products, Product } from "@/data/Product";
import ProductCard from "./Productcard";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {products.map((item: Product) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductGrid;
