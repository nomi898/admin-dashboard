"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronDown } from "lucide-react";

type ChartFilter = "All" | "Q1" | "Q2";

const barData = [
  { name: "Mon", desktop: 30, mobile: 20, tablet: 10 },
  { name: "Tue", desktop: 60, mobile: 30, tablet: 20 },
  { name: "Wed", desktop: 50, mobile: 25, tablet: 15 },
  { name: "Thu", desktop: 80, mobile: 40, tablet: 25 },
  { name: "Fri", desktop: 55, mobile: 35, tablet: 20 },
  { name: "Sat", desktop: 40, mobile: 25, tablet: 15 },
  { name: "Sun", desktop: 45, mobile: 30, tablet: 18 },
];

const pieDataAll = [
  { name: "Completed", value: 55 },
  { name: "In Progress", value: 25 },
  { name: "Pending", value: 20 },
];

const pieDataQ1 = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 20 },
  { name: "Pending", value: 15 },
];

const pieDataQ2 = [
  { name: "Completed", value: 45 },
  { name: "In Progress", value: 35 },
  { name: "Pending", value: 20 },
];

const donutData = [
  { name: "Health", value: 30 },
  { name: "Tech", value: 25 },
  { name: "Design", value: 20 },
  { name: "Education", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#3b82f6", "#a855f7", "#22d3ee", "#f59e0b", "#f43f5e"];

const UiElementsPage = () => {
  const [filter, setFilter] = useState<ChartFilter>("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const pieData = useMemo(() => {
    if (filter === "Q1") return pieDataQ1;
    if (filter === "Q2") return pieDataQ2;
    return pieDataAll;
  }, [filter]);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">UI Elements</h1>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm text-gray-700">Filter By</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900">
                {filter === "All" ? "Charts" : filter}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </button>
          {filterOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {(["All", "Q1", "Q2"] as ChartFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    filter === f ? "font-semibold text-blue-600" : "text-gray-700"
                  }`}
                >
                  {f === "All" ? "Charts" : f}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart Section */}
      <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
        <div className="h-56 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="desktop" stackId="a" fill="#3b82f6" />
              <Bar dataKey="mobile" stackId="a" fill="#22d3ee" />
              <Bar dataKey="tablet" stackId="a" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Pie Chart Section */}
      <section className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="h-40 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={2}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </section>

      {/* Donut Chart Section */}
      <section className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Donut Chart</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {donutData.map((d, idx) => (
            <div key={d.name} className="h-36 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={28}
                    outerRadius={45}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {donutData.map((_, i) => (
                      <Cell key={i} fill={COLORS[(idx + i) % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UiElementsPage;

