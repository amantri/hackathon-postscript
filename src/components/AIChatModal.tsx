"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function AIChatModal({ 
  isOpen, 
  onClose, 
  promptTrigger 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  promptTrigger?: { prompt: string, timestamp: number };
}) {
  const [messages, setMessages] = useState<{role: "user"|"ai", content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.transition = 'padding-right 0.3s ease-out';
      if (window.innerWidth >= 768) {
        document.body.style.paddingRight = '28rem'; // max-w-md is 28rem
      }
      
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          document.body.style.paddingRight = '28rem';
        } else {
          document.body.style.paddingRight = '0px';
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.style.paddingRight = '0px';
      };
    } else {
      document.body.style.paddingRight = '0px';
    }
  }, [isOpen]);

  const lastProcessedTimestampRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen && promptTrigger && promptTrigger.timestamp > lastProcessedTimestampRef.current && !isLoading) {
      lastProcessedTimestampRef.current = promptTrigger.timestamp;
      handleSend(promptTrigger.prompt);
    }
  }, [isOpen, promptTrigger, isLoading]);

  async function handleSend(text: string = input) {
    if (!text.trim()) return;
    
    const userMessage = text;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessages(prev => [...prev, { role: "ai", content: data.reply || "" }]);
    } catch (e: any) {
      const errorMessage = e instanceof Error ? e.message : "Sorry, I encountered an error.";
      setMessages(prev => [...prev, { role: "ai", content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col border-l border-gray-200 z-50 animate-[slide-in-right_0.3s_ease-out]"
    >
      {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <mask id="mask1_133_870" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask1_133_870)">
                <path d="M2 18V3.5C2 3.0875 2.14688 2.73438 2.44063 2.44063C2.73438 2.14688 3.0875 2 3.5 2H16.5C16.9125 2 17.2656 2.14688 17.5594 2.44063C17.8531 2.73438 18 3.0875 18 3.5V13.5C18 13.9125 17.8531 14.2656 17.5594 14.5594C17.2656 14.8531 16.9125 15 16.5 15H5L2 18ZM4.375 13.5H16.5V3.5H3.5V14.375L4.375 13.5Z" fill="currentColor"/>
                <path d="M9 8L10 6L11 8L13 9L11 10L10 12L9 10L7 9L9 8Z" stroke="currentColor"/>
              </g>
            </svg>
            Medical AI Assistant
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 my-10 text-sm">
              Ask me about your diagnosis, medications, or health!
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-gray-200 text-gray-600" : "bg-primary text-white"}`}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.role === "user" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-800"}`}>
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <div className="flex flex-col gap-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_strong]:font-semibold [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-3 rounded-lg bg-white border border-gray-200 text-gray-500 text-sm flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-white p-2 rounded-lg disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
    </div>
  );
}
