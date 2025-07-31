// components/ChatWidget.js
"use client";

import { useState } from "react";
import { X } from "lucide-react";

import ChatBot from "@/components/chatbot/ChatBot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Butoni i chatbot në këndin e faqes */}
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center space-x-2"

            aria-label="Hap Chatbot"
          >
            <span>💬</span>
            <span className=" text-sm">Ask me something</span>
          </button>

        )}
      </div>

      {/* Popup i chatbot-it */}
        {open && (
          <div className="fixed bottom-6 right-6 w-[350px] max-w-[90vw] h-[520px] bg-white  shadow-xl rounded-xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-3  bg-gray-100 rounded-t-xl">
              <h2 className="font-semibold text-gray-800">Feasto Chatbot</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-red-500 transition"
                aria-label="Mbyll Chatbotin"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatBot />
            </div>
          </div>
        )}

    </>
  );
}
