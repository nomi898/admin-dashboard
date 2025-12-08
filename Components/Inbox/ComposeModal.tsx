"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCompose,
  updateComposeEmail,
  saveDraft,
  sendEmail,
} from "@/store/emailsSlice";
import { X, Send, Save, Paperclip, Image as ImageIcon } from "lucide-react";

const ComposeModal = () => {
  const dispatch = useAppDispatch();
  const { isComposeOpen, composeEmail } = useAppSelector((state) => state.emails);

  useEffect(() => {
    // Auto-save draft every 30 seconds
    if (isComposeOpen) {
      const interval = setInterval(() => {
        if (composeEmail.to || composeEmail.subject || composeEmail.body) {
          dispatch(saveDraft());
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isComposeOpen, composeEmail, dispatch]);

  if (!isComposeOpen) return null;

  const handleSend = () => {
    if (composeEmail.to && composeEmail.subject) {
      dispatch(sendEmail());
    } else {
      alert("Please fill in 'To' and 'Subject' fields");
    }
  };

  const handleSaveDraft = () => {
    dispatch(saveDraft());
    dispatch(closeCompose());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">New Message</h2>
          <button
            onClick={() => dispatch(closeCompose())}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* To Field */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="email"
            placeholder="To"
            value={composeEmail.to}
            onChange={(e) =>
              dispatch(updateComposeEmail({ to: e.target.value }))
            }
            className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Subject Field */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Subject"
            value={composeEmail.subject}
            onChange={(e) =>
              dispatch(updateComposeEmail({ subject: e.target.value }))
            }
            className="w-full px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Body */}
        <div className="flex-1 p-4">
          <textarea
            placeholder="Compose email..."
            value={composeEmail.body}
            onChange={(e) =>
              dispatch(updateComposeEmail({ body: e.target.value }))
            }
            className="w-full h-full resize-none focus:outline-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Attachment">
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" title="Image">
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;

