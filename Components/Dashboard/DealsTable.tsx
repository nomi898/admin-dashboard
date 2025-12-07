"use client";

import Image from "next/image";
import React from "react";

interface Deal {
  id: number;
  productName: string;
  productImage: string;
  location: string;
  date: string;
  piece: number;
  amount: string;
  status: "Delivered" | "Pending" | "Canceled";
}

const deals: Deal[] = [
  {
    id: 1,
    productName: "Apple Watch",
    productImage: "/apple-watch.png", // put the image in public/
    location: "6096 Marjolaine Landing",
    date: "12.09.2019 - 12.53 PM",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 2,
    productName: "Apple Watch",
    productImage: "/apple-watch.png", // put the image in public/
    location: "6096 Marjolaine Landing",
    date: "12.09.2019 - 12.53 PM",
    piece: 423,
    amount: "$34,295",
    status: "Canceled",
  },
];

const statusClasses: Record<Deal["status"], string> = {
  Delivered: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Canceled: "bg-red-100 text-red-600",
};

const DealsTable: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Deals Details</h2>

        <select className="border px-3 py-1 rounded-md text-sm">
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="py-3 pl-4 font-medium text-left">Product Name</th>
              <th className="py-3 font-medium text-left">Location</th>
              <th className="py-3 font-medium text-left">Date - Time</th>
              <th className="py-3 font-medium text-left">Piece</th>
              <th className="py-3 font-medium text-left">Amount</th>
              <th className="py-3 pr-4 font-medium text-left">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-b">
                {/* Product + Image */}
                <td className="py-4 pl-4 flex items-center gap-3">
                  <Image
                    src={deal.productImage}
                    alt={deal.productName}
                    width={36}
                    height={36}
                    className="rounded-md"
                  />
                  <span className="font-medium text-gray-800">{deal.productName}</span>
                </td>

                {/* Location */}
                <td className="py-4 text-gray-700">{deal.location}</td>

                {/* Date */}
                <td className="py-4 text-gray-700">{deal.date}</td>

                {/* Piece */}
                <td className="py-4 text-gray-700">{deal.piece}</td>

                {/* Amount */}
                <td className="py-4 text-gray-700">{deal.amount}</td>

                {/* Status */}
                <td className="py-4 pr-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${statusClasses[deal.status]}`}
                  >
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealsTable;
