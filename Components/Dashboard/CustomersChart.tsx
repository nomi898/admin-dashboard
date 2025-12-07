"use client";

import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "New Customers", value: 34249 },
  { name: "Repeated", value: 1420 },
];

const COLORS = ["#4F8BFF", "#A5B4F7"];

export default function CustomersChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Customers</h2>

      <div className="w-full flex justify-center">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-center mt-2">
        <h3 className="text-2xl font-bold">34,249</h3>
        <p className="text-gray-500">New Customers</p>

        <h3 className="text-lg font-semibold mt-2">1420</h3>
        <p className="text-gray-500">Repeated</p>
      </div>
    </div>
  );
}
