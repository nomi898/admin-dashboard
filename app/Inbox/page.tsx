"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setEmails,
  setSelectedEmail,
  setCurrentFolder,
  setSearchQuery,
  toggleStar,
  deleteEmail,
  addMessage,
  setMessages,
  archiveEmail,
  openCompose,
} from "@/store/emailsSlice";
import ComposeModal from "@/Components/Inbox/ComposeModal";
import { emails as initialEmails, Email, getMessagesForEmail, Message } from "@/data/emails";
import {
  Mail,
  Star,
  Send,
  FileText,
  AlertTriangle,
  Bell,
  Trash2,
  Search,
  Plus,
  Archive,
  Info,
  Printer,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Send as SendIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const InboxPage = () => {
  const dispatch = useAppDispatch();
  const { emails, selectedEmail, currentFolder, searchQuery, messages, drafts } = useAppSelector(
    (state) => state.emails
  );
  const [newMessage, setNewMessage] = React.useState("");

  // Initialize emails on mount
  useEffect(() => {
    if (emails.length === 0) {
      dispatch(setEmails(initialEmails));
    }
  }, [dispatch, emails.length]);

  // Get filtered emails based on folder and search
  const filteredEmails = useMemo(() => {
    let filtered = [...emails];

    // Filter by folder
    if (currentFolder === "Starred") {
      filtered = filtered.filter((e) => e.isStarred);
    } else if (currentFolder === "Bin") {
      filtered = filtered.filter((e) => e.folder === "Bin");
    } else if (currentFolder === "Spam") {
      filtered = filtered.filter((e) => e.folder === "Spam");
    } else if (currentFolder === "Important") {
      filtered = filtered.filter((e) => e.label === "Work");
    } else if (currentFolder === "Sent") {
      filtered = filtered.filter((e) => e.folder === "Sent");
    } else if (currentFolder === "Draft") {
      // Show drafts from Redux store
      filtered = drafts.map((draft) => ({
        ...draft,
        sender: "You",
      }));
    } else if (currentFolder === "Inbox") {
      // Inbox shows emails that are not in Sent, Draft, Bin, or Spam folders
      filtered = filtered.filter(
        (e) => !e.folder || (e.folder !== "Sent" && e.folder !== "Draft" && e.folder !== "Bin" && e.folder !== "Spam")
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (email) =>
          email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [emails, currentFolder, searchQuery]);

  const handleEmailClick = (email: Email) => {
    // If it's a draft, open in compose mode
    if (email.folder === "Draft") {
      dispatch(openCompose(email as Email));
      return;
    }
    
    dispatch(setSelectedEmail(email));
    // Load messages if not already loaded
    if (!messages[email.id]) {
      const initialMessages = getMessagesForEmail(email.id);
      dispatch(setMessages({ emailId: email.id, messages: initialMessages }));
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedEmail) {
      const message: Message = {
        id: (messages[selectedEmail.id]?.length || 0) + 1,
        sender: "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      dispatch(addMessage({ emailId: selectedEmail.id, message }));
      setNewMessage("");
    }
  };

  const handleStarClick = (e: React.MouseEvent, emailId: number) => {
    e.stopPropagation();
    dispatch(toggleStar(emailId));
  };

  const handleDeleteClick = (e: React.MouseEvent, emailId: number) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this email?")) {
      dispatch(deleteEmail(emailId));
    }
  };

  const handleArchiveClick = (e: React.MouseEvent, emailId: number) => {
    e.stopPropagation();
    dispatch(archiveEmail(emailId));
  };

  const folderCounts = useMemo(() => {
    return {
      Inbox: emails.filter((e) => !e.folder || e.folder === "Inbox").length,
      Starred: emails.filter((e) => e.isStarred).length,
      Sent: emails.filter((e) => e.folder === "Sent").length,
      Draft: drafts.length,
      Spam: emails.filter((e) => e.folder === "Spam").length,
      Important: emails.filter((e) => e.label === "Work").length,
      Bin: emails.filter((e) => e.folder === "Bin").length,
    };
  }, [emails, drafts]);

  const currentMessages = selectedEmail ? messages[selectedEmail.id] || [] : [];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Inbox</h2>

        {/* Compose Button */}
        <button
          onClick={() => dispatch(openCompose())}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-6 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Compose
        </button>

        {/* My Email Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">My Email</h3>
          <div className="space-y-1">
            {[
              { name: "Inbox", icon: Mail, count: folderCounts.Inbox },
              { name: "Starred", icon: Star, count: folderCounts.Starred },
              { name: "Sent", icon: Send, count: folderCounts.Sent },
              { name: "Draft", icon: FileText, count: folderCounts.Draft },
              { name: "Spam", icon: AlertTriangle, count: folderCounts.Spam },
              { name: "Important", icon: Bell, count: folderCounts.Important },
              { name: "Bin", icon: Trash2, count: folderCounts.Bin },
            ].map((folder) => {
              const Icon = folder.icon;
              const isActive = currentFolder === folder.name;
              return (
                <button
                  key={folder.name}
                  onClick={() => dispatch(setCurrentFolder(folder.name))}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{folder.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{folder.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Label Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Label</h3>
          <div className="space-y-2">
            {[
              { name: "Primary", color: "bg-green-500" },
              { name: "Social", color: "bg-blue-500" },
              { name: "Work", color: "bg-orange-500" },
              { name: "Friends", color: "bg-purple-500" },
            ].map((label) => (
              <div key={label.name} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${label.color}`}></div>
                <span className="text-sm">{label.name}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <Plus className="w-3 h-3" />
            Create New Label
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {!selectedEmail ? (
          /* Email List View */
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4">{currentFolder}</h1>

            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search mail"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    const selectedIds = filteredEmails
                      .filter((e) => !e.isRead)
                      .map((e) => e.id);
                    selectedIds.forEach((id) => dispatch(archiveEmail(id)));
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Archive"
                >
                  <Archive className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Info">
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    const selectedIds = filteredEmails.map((e) => e.id);
                    if (confirm(`Delete ${selectedIds.length} email(s)?`)) {
                      selectedIds.forEach((id) => dispatch(deleteEmail(id)));
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Email List */}
            {filteredEmails.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No emails found</p>
              </div>
            ) : (
              <>
                <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                  {filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => handleEmailClick(email)}
                      className={`flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                        !email.isRead ? "bg-blue-50 font-semibold" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <button
                        onClick={(e) => handleStarClick(e, email.id)}
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            email.isStarred ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{email.sender}</span>
                          {email.label && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                email.label === "Primary"
                                  ? "bg-green-100 text-green-700"
                                  : email.label === "Work"
                                  ? "bg-orange-100 text-orange-700"
                                  : email.label === "Friends"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {email.label}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {email.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Showing 1-{filteredEmails.length} of {filteredEmails.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Message Conversation View */
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(setSelectedEmail(null))}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-semibold">{selectedEmail.sender}</h2>
                  {selectedEmail.label && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        selectedEmail.label === "Primary"
                          ? "bg-green-100 text-green-700"
                          : selectedEmail.label === "Work"
                          ? "bg-orange-100 text-orange-700"
                          : selectedEmail.label === "Friends"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {selectedEmail.label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Print">
                    <Printer className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => handleStarClick(e, selectedEmail.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Star"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        selectedEmail.isStarred
                          ? "fill-current text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(e, selectedEmail.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{selectedEmail.subject}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md p-4 rounded-lg ${
                        message.isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm mb-1">{message.content}</p>
                      <span
                        className={`text-xs ${
                          message.isOwn ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Voice">
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Attachment">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Image">
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <SendIcon className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <ComposeModal />
    </div>
  );
};

export default InboxPage;
