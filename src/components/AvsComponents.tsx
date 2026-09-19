"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, MessageCircle, CalendarPlus, CheckSquare, Square, Info, Check } from "lucide-react";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
        <h2 className="text-sm font-medium text-gray-700">{title}</h2>
      </div>
      <div className="p-4">
        {children}
      </div>
    </section>
  );
}

export function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <section className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50/50 transition-colors"
      >
        <h2 className="text-sm font-medium text-gray-700">{title}</h2>
        {isOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-gray-100">
          {children}
        </div>
      )}
    </section>
  );
}

export function AIButton({ onClick, text }: { onClick?: () => void; text: string }) {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
        <mask id="mask0_133_870" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
          <rect width="20" height="20" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_133_870)">
          <path d="M2 18V3.5C2 3.0875 2.14688 2.73438 2.44063 2.44063C2.73438 2.14688 3.0875 2 3.5 2H16.5C16.9125 2 17.2656 2.14688 17.5594 2.44063C17.8531 2.73438 18 3.0875 18 3.5V13.5C18 13.9125 17.8531 14.2656 17.5594 14.5594C17.2656 14.8531 16.9125 15 16.5 15H5L2 18ZM4.375 13.5H16.5V3.5H3.5V14.375L4.375 13.5Z" fill="currentColor"/>
          <path d="M9 8L10 6L11 8L13 9L11 10L10 12L9 10L7 9L9 8Z" stroke="currentColor"/>
        </g>
      </svg>
      {text}
    </button>
  );
}

export function ActionItem({ 
  title, 
  subtitle, 
  type = "prescription", 
  checked = false, 
  onToggle 
}: { 
  title: string; 
  subtitle?: string; 
  type?: "prescription" | "recommendation";
  checked?: boolean;
  onToggle?: () => void;
}) {
  const [isChecked, setIsChecked] = useState(checked);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onToggle) onToggle();
  };

  const getChatPrompt = () => {
    if (type === "prescription") {
      return `What are the side effects of ${title} and what should I know about taking it?`;
    }
    return `Can you explain why ${title} is recommended and how it helps?`;
  };

  return (
    <>
      <div className="flex border border-gray-200 rounded overflow-hidden mb-3">
        <div className="w-1.5 bg-primary shrink-0" />
        <div className="p-3 bg-white flex-1 flex gap-3 items-start justify-between">
          <div className="flex gap-3 items-start flex-1">
            {type === "recommendation" && (
              <button 
                onClick={handleToggle} 
                className="mt-0.5 shrink-0 flex items-center justify-center focus:outline-none"
              >
                <div className={`w-5 h-5 rounded-[3px] flex items-center justify-center border-2 transition-colors duration-200 ${isChecked ? 'bg-primary border-primary' : 'border-gray-400 hover:border-gray-500'}`}>
                  {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
              </button>
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium transition-colors duration-200 ${isChecked && type === 'recommendation' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{title}</p>
              {subtitle && <p className={`text-xs mt-1 transition-colors duration-200 ${isChecked && type === 'recommendation' ? 'text-gray-400 line-through' : 'text-gray-500'}`}>{subtitle}</p>}
            </div>
          </div>
          
          <button 
            onClick={() => setIsChatOpen(true)}
            className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-md transition-colors shrink-0"
            title="Ask AI about this"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
              <mask id="mask1_133_870" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask1_133_870)">
                <path d="M2 18V3.5C2 3.0875 2.14688 2.73438 2.44063 2.44063C2.73438 2.14688 3.0875 2 3.5 2H16.5C16.9125 2 17.2656 2.14688 17.5594 2.44063C17.8531 2.73438 18 3.0875 18 3.5V13.5C18 13.9125 17.8531 14.2656 17.5594 14.5594C17.2656 14.8531 16.9125 15 16.5 15H5L2 18ZM4.375 13.5H16.5V3.5H3.5V14.375L4.375 13.5Z" fill="currentColor"/>
                <path d="M9 8L10 6L11 8L13 9L11 10L10 12L9 10L7 9L9 8Z" stroke="currentColor"/>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <AIChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        initialPrompt={getChatPrompt()}
      />
    </>
  );
}

import { AIChatModal } from "./AIChatModal";

export function AppointmentCard({ date, title, doctor }: { date: { month: string; day: string; year: string }, title: string, doctor: string }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div className="flex bg-white border border-gray-200 rounded p-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center justify-center shrink-0 w-12">
            <span className="text-xs font-bold text-gray-500 uppercase">{date.month}</span>
            <span className="text-2xl font-bold text-gray-900 leading-none">{date.day}</span>
            <span className="text-xs text-gray-500 mt-1">{date.year}</span>
          </div>
          <div className="w-px h-10 bg-gray-200 mx-2"></div>
          <div>
            <p className="text-sm font-bold text-gray-900">{title}</p>
            <p className="text-xs text-gray-600 mt-0.5">{doctor}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="text-primary hover:text-primary-dark p-2 hover:bg-gray-100 rounded transition-colors flex flex-col items-center"
          title="Add to Calendar with AI"
        >
          <CalendarPlus className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Add to Cal</span>
        </button>
      </div>
      <AIChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        initialPrompt={`I want to add my ${title} on ${date.month} ${date.day}, ${date.year} with ${doctor} to my calendar. Can you generate an .ics file or calendar link for me?`}
      />
    </>
  );
}
