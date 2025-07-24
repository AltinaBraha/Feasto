"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);


  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

    useEffect(() => {
    scrollToBottom();
    }, [messages]);


  // Scroll poshtë kur vjen mesazh i ri
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chatbot", { message: input });
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: res.data.reply || "Nuk ka përgjigje.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, sender: "bot", text: "Ndodhi një gabim." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-10 border border-gray-300 flex flex-col h-[600px]">
      <div
        className="flex-1 overflow-y-auto mb-4 space-y-4 px-2 pt-30"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <p className="text-center text-gray-400">Ask what you want</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <Image
                src="/img/chatbot.jpg"
                alt="Bot"
                width={32}       
                height={32}     
                className="rounded-full -ml-2 mr-2"
                />
            )}

            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl break-words
                ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <Image
                src="/img/user.png"
                alt="User"
                width={24}
                height={24}
                className="rounded-full ml-2"
                />

            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {loading && (
        <p className="text-center text-gray-500 mb-2 animate-pulse">...</p>
      )}

        <form onSubmit={sendMessage} className="flex space-x-2 mt-2">
                <input
                    type="text"
                    className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                    placeholder="Write your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                    }
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className={`px-3 py-1.5 rounded text-white font-medium text-xs transition
                        ${loading || !input.trim()
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#1E3A8A] hover:bg-[#1A357A]"}`}
                >
                    Send
                </button>

        </form>


    </div>
  );
}
