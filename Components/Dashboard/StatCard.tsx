import { ReactNode } from "react";

export default function StatCard({
  title,
  value,
  change,
  changeText,
  icon,
  iconBg,
  isUp,
}: {
  title: string;
  value: string | number;
  change: number;
  changeText: string;
  icon: ReactNode;
  iconBg: string;
  isUp: boolean; // true = green ↑ , false = red ↓
}) {
  return (
    <div className="p-4 rounded-xl bg-white flex flex-col gap-3 hover:shadow-md transition">
      {/* Title + Icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <h2 className="text-3xl font-semibold">{value}</h2>

      {/* Percentage & subtitle */}
      <div className="flex items-center gap-1">
        <p
          className={`text-sm font-medium ${
            isUp ? "text-green-600" : "text-red-600"
          } flex items-center gap-1`}
        >
          {isUp ? "▲" : "▼"} {Math.abs(change)}%
        </p>

        <span className="text-sm text-gray-500">{changeText}</span>
      </div>
    </div>
  );
}
