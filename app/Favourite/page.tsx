// components/Favorites.tsx
"use client";

import React, { useMemo } from "react";
import { products, Product } from "@/data/Product";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const FavoriteProductCard = ({ item }: { item: Product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const handleFavoriteClick = () => {
    toggleFavorite(item.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border relative">
      {/* Image Carousel Section */}
      <div className="relative p-5">
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 z-10">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-64 object-contain"
        />
        
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 z-10">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="px-5 pb-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <button 
            onClick={handleFavoriteClick}
            className="text-pink-500 hover:scale-110 transition-transform"
            aria-label="Remove from favorites"
          >
            <Heart 
              className="w-5 h-5" 
              fill={favorite ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </button>
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

const Favorites = () => {
  const { favorites } = useFavorites();

  // Filter products to show only favorites
  const favoriteProducts = useMemo(() => {
    return products.filter((product) => favorites.includes(product.id));
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Favorites</h1>
        
        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No favorite products yet.</p>
            <p className="text-gray-400 text-sm mt-2">Add products to favorites from the Products page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((item) => (
              <FavoriteProductCard 
                key={item.id} 
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;