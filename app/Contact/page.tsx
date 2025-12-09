"use client";

import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addContact, updateContact, deleteContact } from "@/store/contactsSlice";
import { Contact } from "@/data/contacts";
import { Plus, Mail, X, Edit2, Trash2, Search, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { contacts } = useAppSelector((state) => state.contacts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState<Omit<Contact, "id">>({
    name: "",
    email: "",
    image: "/Products/Image.svg",
    phone: "",
    address: "",
  });

  // Filter contacts by search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [contacts, searchQuery]);

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      email: "",
      image: "/Products/Image.svg",
      phone: "",
      address: "",
    });
    setEditingContact(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (contact: Contact) => {
    setFormData({
      name: contact.name,
      email: contact.email,
      image: contact.image,
      phone: contact.phone || "",
      address: contact.address || "",
    });
    setEditingContact(contact);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingContact(null);
    setFormData({
      name: "",
      email: "",
      image: "/Products/Image.svg",
      phone: "",
      address: "",
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in name and email");
      return;
    }

    if (editingContact) {
      dispatch(updateContact({ ...formData, id: editingContact.id }));
    } else {
      dispatch(addContact(formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      dispatch(deleteContact(id));
    }
  };

  const handleMessage = (contact: Contact) => {
    // Navigate to inbox and compose email to this contact
    router.push(`/Inbox?compose=true&to=${encodeURIComponent(contact.email)}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contact</h1>
        <button
          onClick={() => router.push("/Contact/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Contact
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No contacts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Contact Image */}
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={contact.image}
                  alt={contact.name}
                  fill
                  className="object-cover"
                />
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(contact)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{contact.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm truncate">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  )}
                  {contact.address && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm truncate">{contact.address}</span>
                    </div>
                  )}
                </div>

                {/* Message Button */}
                <button
                  onClick={() => handleMessage(contact)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Existing modal kept for future use but currently redirected to Add page */}
    </div>
  );
};

export default ContactPage;

