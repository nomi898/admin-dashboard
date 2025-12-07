"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

const data: DataPoint[] = [
  { name: "5k", value: 20 },
  { name: "10k", value: 32 },
  { name: "15k", value: 48 },
  { name: "20k", value: 85 },
  { name: "25k", value: 50 },
  { name: "30k", value: 55 },
  { name: "35k", value: 25 },
  { name: "40k", value: 45 },
  { name: "45k", value: 75 },
  { name: "50k", value: 60 },
  { name: "55k", value: 42 },
  { name: "60k", value: 55 },
];

const SalesChart: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sales Details</h2>

        <select className="border px-3 py-1 rounded-md text-sm">
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          {/* Gradient Under Line */}
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* Axis */}
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />

          {/* Tooltip */}
          <Tooltip formatter={(value: number) => `${value}%`} />

          {/* Gradient Fill */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            fill="url(#colorBlue)"
            strokeWidth={2}
          />

          {/* Line + Dots */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 5, fill: "#3B82F6" }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
