"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "5k", sales: 20, profit: 15 },
  { name: "10k", sales: 70, profit: 25 },
  { name: "15k", sales: 30, profit: 20 },
  { name: "20k", sales: 40, profit: 35 },
  { name: "25k", sales: 55, profit: 28 },
  { name: "30k", sales: 90, profit: 40 },
  { name: "35k", sales: 49, profit: 22 },
  { name: "40k", sales: 60, profit: 35 },
  { name: "45k", sales: 75, profit: 45 },
  { name: "50k", sales: 58, profit: 38 },
  { name: "55k", sales: 80, profit: 55 },
  { name: "60k", sales: 20, profit: 10 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Revenue</h2>
        <select className="border rounded-md px-3 py-1 text-sm">
          <option>October</option>
        </select>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#EA755B" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#EA755B" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#C997FD" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#C997FD" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#EA755B"
              fill="url(#salesColor)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#C997FD"
              fill="url(#profitColor)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EA755B]"></div>
          Sales
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#C997FD]"></div>
          Profit
        </div>
      </div>
    </div>
  );
}
