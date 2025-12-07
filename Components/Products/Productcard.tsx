
import React from "react";
import { Product } from "@/data/Product";

const ProductCard = ({ item }: { item: Product }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">
      <img src={item.image} alt={item.name} className="w-full object-contain" />

      <h3 className="font-semibold mt-3">{item.name}</h3>
      <p className="text-blue-600 font-semibold">${item.price}</p>

      <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
        {"★".repeat(Math.floor(item.rating))}
        <span className="text-gray-500">({item.reviews})</span>
      </div>

      <button className="mt-4 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">
        Edit Product
      </button>
    </div>
  );
};

export default ProductCard;