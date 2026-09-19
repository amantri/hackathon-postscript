"use client";

import { useState } from "react";
import { AIButton, AppointmentCard } from "./AvsComponents";
import { AIChatModal } from "./AIChatModal";

export function LearnMoreButton({ topic }: { topic: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <AIButton text={`Learn about ${topic}`} onClick={() => setIsOpen(true)} />
      <AIChatModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        initialPrompt={`Can you explain ${topic} in simple terms and what I should know about it?`}
      />
    </>
  );
}

export function CalendarAddButton({ appointmentInfo }: { appointmentInfo: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-primary hover:text-primary-dark p-2 hover:bg-gray-100 rounded transition-colors flex flex-col items-center"
        title="Add to Calendar with AI"
      >
        {/* We can re-use the UI from AppointmentCard or just override the button */}
        <span className="text-[10px] font-medium text-center">AI<br/>Cal</span>
      </button>
      <AIChatModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        initialPrompt={`I want to add this appointment to my calendar: ${appointmentInfo}. Can you help me generate an invite?`}
      />
    </>
  );
}
