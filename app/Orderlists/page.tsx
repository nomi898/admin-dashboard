"use client";

import React, { useState, useMemo } from "react";
import { orders, Order, orderTypes, orderStatuses, OrderType, OrderStatus } from "@/data/orders";
import {
  Filter,
  ChevronDown,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

const OrderListsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<OrderType[]>([]);
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState<OrderStatus[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showOrderTypePicker, setShowOrderTypePicker] = useState(false);
  const [showOrderStatusPicker, setShowOrderStatusPicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter orders based on selected filters
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Filter by date
    if (selectedDate) {
      const selectedDateStr = selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      filtered = filtered.filter((order) => order.date === selectedDateStr);
    }

    // Filter by order types
    if (selectedOrderTypes.length > 0) {
      filtered = filtered.filter((order) => selectedOrderTypes.includes(order.type as OrderType));
    }

    // Filter by order statuses
    if (selectedOrderStatuses.length > 0) {
      filtered = filtered.filter((order) => selectedOrderStatuses.includes(order.status));
    }

    return filtered;
  }, [selectedDate, selectedOrderTypes, selectedOrderStatuses]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleResetFilters = () => {
    setSelectedDate(null);
    setSelectedOrderTypes([]);
    setSelectedOrderStatuses([]);
    setCurrentPage(1);
  };

  const toggleOrderType = (type: OrderType) => {
    setSelectedOrderTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleOrderStatus = (status: OrderStatus) => {
    setSelectedOrderStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Date";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "Processing":
        return "bg-purple-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "On Hold":
        return "bg-orange-500 text-white";
      case "In Transit":
        return "bg-pink-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Calendar navigation
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(calendarYear, calendarMonth, day);
    setSelectedDate(newDate);
    setShowDatePicker(false);
  };

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Order Lists</h1>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg p-3 sm:p-4 mb-6 flex items-center gap-3 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Filter By</span>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowOrderTypePicker(false);
              setShowOrderStatusPicker(false);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Calendar className="w-4 h-4" />
            <span>{formatDate(selectedDate)}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showDatePicker && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 min-w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="font-semibold">
                  {monthNames[calendarMonth]} {calendarYear}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-600 p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: getFirstDayOfMonth(calendarMonth, calendarYear) }).map(
                  (_, i) => (
                    <div key={`empty-${i}`} className="p-2"></div>
                  )
                )}
                {Array.from({ length: getDaysInMonth(calendarMonth, calendarYear) }).map(
                  (_, i) => {
                    const day = i + 1;
                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === calendarMonth &&
                      selectedDate.getFullYear() === calendarYear;
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        className={`p-2 rounded hover:bg-blue-50 ${
                          isSelected ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        {day}
                      </button>
                    );
                  }
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2 mb-2">
                *You can choose multiple date
              </p>
              <button
                onClick={() => setShowDatePicker(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Order Type Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowOrderTypePicker(!showOrderTypePicker);
              setShowDatePicker(false);
              setShowOrderStatusPicker(false);
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span>Order Type</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showOrderTypePicker && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 min-w-[400px]">
              <h3 className="font-semibold mb-4">Select Order Type</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {orderTypes.map((type) => {
                  const isSelected = selectedOrderTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleOrderType(type)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mb-2">
                *You can choose multiple Order type
              </p>
              <button
                onClick={() => setShowOrderTypePicker(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Order Status Filter */}
        <div className="relative">
          <button
            onClick={() => {
              setShowOrderStatusPicker(!showOrderStatusPicker);
              setShowDatePicker(false);
              setShowOrderTypePicker(false);
            }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <span>Order Status</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showOrderStatusPicker && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 min-w-[300px]">
              <h3 className="font-semibold mb-4">Select Order Status</h3>
              <div className="space-y-2 mb-4">
                {orderStatuses.map((status) => {
                  const isSelected = selectedOrderStatuses.includes(status);
                  return (
                    <button
                      key={status}
                      onClick={() => toggleOrderStatus(status)}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors text-left ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setShowOrderStatusPicker(false)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Apply Now
              </button>
            </div>
          )}
        </div>

        {/* Reset Filter Button */}
        <button
          onClick={handleResetFilters}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg ml-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filter
        </button>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ADDRESS
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  DATE
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  TYPE
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {String(order.id).padStart(5, "0")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of{" "}
            {filteredOrders.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showDatePicker || showOrderTypePicker || showOrderStatusPicker) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowDatePicker(false);
            setShowOrderTypePicker(false);
            setShowOrderStatusPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default OrderListsPage;
