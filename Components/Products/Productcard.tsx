"use client";

import React from "react";
import { Product } from "@/data/Product";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const ProductCard = ({ item }: { item: Product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const handleFavoriteClick = () => {
    toggleFavorite(item.id);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border relative">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-64 object-contain" />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 text-pink-500 hover:scale-110 transition-transform bg-white rounded-full p-2 shadow-md"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className="w-5 h-5"
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
          />
        </button>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
        </div>

        <p className="text-blue-600 font-semibold text-lg mb-1">
          ${item.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-1 text-yellow-500 mb-4">
          {"★".repeat(Math.floor(item.rating))}
          {item.rating % 1 !== 0 && "☆"}
          {"☆".repeat(Math.floor(5 - item.rating))}
          <span className="text-gray-500 text-sm ml-1">({item.reviews})</span>
        </div>

        <button className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Edit Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;