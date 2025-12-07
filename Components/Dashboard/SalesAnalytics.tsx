"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2015, a: 20, b: 15 },
  { year: 2016, a: 70, b: 45 },
  { year: 2017, a: 60, b: 45 },
  { year: 2018, a: 55, b: 48 },
  { year: 2019, a: 100, b: 85 },
];

export default function SalesAnalytics() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="a"
              stroke="#4E9BFF"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="b"
              stroke="#65C39F"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
