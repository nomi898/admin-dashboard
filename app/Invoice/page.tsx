"use client";

import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateInvoiceDetails,
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
} from "@/store/invoiceSlice";
import { InvoiceItem } from "@/data/invoices";
import { Printer, Send, Plus, X, Edit2, Trash2, Save } from "lucide-react";

const InvoicePage = () => {
  const dispatch = useAppDispatch();
  const { currentInvoice } = useAppSelector((state) => state.invoice);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    baseCost: 0,
  });

  const [editItem, setEditItem] = useState<InvoiceItem | null>(null);
  const [editDetails, setEditDetails] = useState({
    invoiceFrom: { name: "", address: "" },
    invoiceTo: { name: "", address: "" },
    invoiceDate: "",
    dueDate: "",
  });

  // Calculate total
  const total = useMemo(() => {
    if (!currentInvoice) return 0;
    return currentInvoice.items.reduce((sum, item) => sum + item.totalCost, 0);
  }, [currentInvoice]);

  // Initialize edit details when editing starts
  React.useEffect(() => {
    if (currentInvoice && isEditingDetails) {
      setEditDetails({
        invoiceFrom: { ...currentInvoice.invoiceFrom },
        invoiceTo: { ...currentInvoice.invoiceTo },
        invoiceDate: currentInvoice.invoiceDate,
        dueDate: currentInvoice.dueDate,
      });
    }
  }, [currentInvoice, isEditingDetails]);

  const handleAddItem = () => {
    if (!newItem.description || newItem.quantity <= 0 || newItem.baseCost <= 0) {
      alert("Please fill in all fields correctly");
      return;
    }
    dispatch(addInvoiceItem(newItem));
    setNewItem({ description: "", quantity: 1, baseCost: 0 });
    setIsAddItemModalOpen(false);
  };

  const handleStartEditItem = (item: InvoiceItem) => {
    setEditItem({ ...item });
    setEditingItemId(item.id);
  };

  const handleSaveEditItem = () => {
    if (editItem) {
      dispatch(updateInvoiceItem(editItem));
      setEditingItemId(null);
      setEditItem(null);
    }
  };

  const handleCancelEditItem = () => {
    setEditingItemId(null);
    setEditItem(null);
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteInvoiceItem(id));
    }
  };

  const handleSaveDetails = () => {
    dispatch(updateInvoiceDetails(editDetails));
    setIsEditingDetails(false);
    setEditingField(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    // In a real app, this would send the invoice via email
    alert("Invoice sent successfully!");
  };

  const handleFieldClick = (field: string) => {
    setEditingField(field);
  };

  if (!currentInvoice) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <p className="text-gray-500">No invoice selected</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen print:bg-white">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8 print:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 print:hidden gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold">Invoice</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingDetails(!isEditingDetails)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Details
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Invoice From */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Invoice From:</h3>
            {isEditingDetails && editingField === "fromName" ? (
              <input
                type="text"
                value={editDetails.invoiceFrom.name}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    invoiceFrom: { ...editDetails.invoiceFrom, name: e.target.value },
                  })
                }
                onBlur={handleSaveDetails}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSaveDetails();
                }}
                className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                autoFocus
              />
            ) : (
              <p
                onClick={() => isEditingDetails && handleFieldClick("fromName")}
                className={`${isEditingDetails ? "cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" : ""}`}
              >
                {currentInvoice.invoiceFrom.name}
              </p>
            )}
            {isEditingDetails && editingField === "fromAddress" ? (
              <input
                type="text"
                value={editDetails.invoiceFrom.address}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    invoiceFrom: { ...editDetails.invoiceFrom, address: e.target.value },
                  })
                }
                onBlur={handleSaveDetails}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSaveDetails();
                }}
                className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none mt-1"
                autoFocus
              />
            ) : (
              <p
                onClick={() => isEditingDetails && handleFieldClick("fromAddress")}
                className={`text-gray-600 ${isEditingDetails ? "cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" : ""}`}
              >
                {currentInvoice.invoiceFrom.address}
              </p>
            )}
          </div>

          {/* Invoice To */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Invoice To:</h3>
            {isEditingDetails && editingField === "toName" ? (
              <input
                type="text"
                value={editDetails.invoiceTo.name}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    invoiceTo: { ...editDetails.invoiceTo, name: e.target.value },
                  })
                }
                onBlur={handleSaveDetails}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSaveDetails();
                }}
                className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                autoFocus
              />
            ) : (
              <p
                onClick={() => isEditingDetails && handleFieldClick("toName")}
                className={`${isEditingDetails ? "cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" : ""}`}
              >
                {currentInvoice.invoiceTo.name}
              </p>
            )}
            {isEditingDetails && editingField === "toAddress" ? (
              <input
                type="text"
                value={editDetails.invoiceTo.address}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    invoiceTo: { ...editDetails.invoiceTo, address: e.target.value },
                  })
                }
                onBlur={handleSaveDetails}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSaveDetails();
                }}
                className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none mt-1"
                autoFocus
              />
            ) : (
              <p
                onClick={() => isEditingDetails && handleFieldClick("toAddress")}
                className={`text-gray-600 ${isEditingDetails ? "cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" : ""}`}
              >
                {currentInvoice.invoiceTo.address}
              </p>
            )}
          </div>

          {/* Invoice Dates */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Invoice Dates:</h3>
            <div className="space-y-1">
              {isEditingDetails && editingField === "invoiceDate" ? (
                <input
                  type="date"
                  value={editDetails.invoiceDate}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, invoiceDate: e.target.value })
                  }
                  onBlur={handleSaveDetails}
                  className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => isEditingDetails && handleFieldClick("invoiceDate")}
                  className={`${isEditingDetails ? "cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" : ""}`}
                >
                  Invoice Date: {currentInvoice.invoiceDate}
                </p>
              )}
              {isEditingDetails && editingField === "dueDate" ? (
                <input
                  type="date"
                  value={editDetails.dueDate}
                  onChange={(e) =>
                    setEditDetails({ ...editDetails, dueDate: e.target.value })
                  }
                  onBlur={handleSaveDetails}
                  className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none mt-1"
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => isEditingDetails && handleFieldClick("dueDate")}
                  className={`${isEditingDetails ? "cursor-pointer hover:bg-gray-50 px-2 py-1 rounded" : ""}`}
                >
                  Due Date: {currentInvoice.dueDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 print:hidden flex-wrap gap-3">
            <h3 className="text-lg font-semibold">Items</h3>
            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Serial No.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Base Cost
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Total Cost
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 print:hidden">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentInvoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.serialNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingItemId === item.id ? (
                        <input
                          type="text"
                          value={editItem?.description || ""}
                          onChange={(e) =>
                            setEditItem({ ...editItem!, description: e.target.value })
                          }
                          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingItemId === item.id ? (
                        <input
                          type="number"
                          min="1"
                          value={editItem?.quantity || 0}
                          onChange={(e) =>
                            setEditItem({
                              ...editItem!,
                              quantity: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {editingItemId === item.id ? (
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editItem?.baseCost || 0}
                          onChange={(e) =>
                            setEditItem({
                              ...editItem!,
                              baseCost: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none"
                        />
                      ) : (
                        `$${item.baseCost.toFixed(2)}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      ${item.totalCost.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm print:hidden">
                      {editingItemId === item.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSaveEditItem}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEditItem}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStartEditItem(item)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-end mb-6">
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              Total = ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>

      {/* Add Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Item</h2>
              <button
                onClick={() => setIsAddItemModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Cost *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.baseCost}
                    onChange={(e) =>
                      setNewItem({ ...newItem, baseCost: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAddItemModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;

