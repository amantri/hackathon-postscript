"use client";

import { useState } from "react";
import { AIButton, AppointmentCard } from "./AvsComponents";
import { useChat } from "./ChatContext";

export function LearnMoreButton({ topic }: { topic: string }) {
  const { openChat } = useChat();
  
  return (
    <AIButton 
      text={`Learn about ${topic}`} 
      onClick={() => openChat(`Can you explain ${topic} in simple terms and what I should know about it?`)} 
    />
  );
}

export function CalendarAddButton({ appointmentInfo }: { appointmentInfo: string }) {
  const handleAddToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//PostScript//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${appointmentInfo}`,
      `DESCRIPTION:Appointment: ${appointmentInfo}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const file = new File([icsContent], 'appointment.ics', { type: 'text/calendar' });

    const downloadFallback = () => {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: 'Appointment',
      }).catch((error) => {
        console.error('Share failed:', error);
        if (error.name === 'NotAllowedError') {
          downloadFallback();
        }
      });
    } else {
      downloadFallback();
    }
  };

  return (
    <button 
      onClick={handleAddToCalendar}
      className="text-primary hover:text-primary-dark p-2 hover:bg-gray-100 rounded transition-colors flex flex-col items-center"
      title="Add to Calendar"
    >
      <span className="text-[10px] font-medium text-center">Add to<br/>Cal</span>
    </button>
  );
}
