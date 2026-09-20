"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SAMPLE_PATIENTS } from "@/lib/fhir-mock-data";
import { Settings2, GripVertical } from "lucide-react";
import { useState, useRef } from "react";

export function DevBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentPatient = searchParams.get("patient") || SAMPLE_PATIENTS[0].id;

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("patient", e.target.value);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className="fixed bottom-4 right-4 bg-gray-900 text-white rounded-lg shadow-xl p-3 flex items-center gap-3 z-50 text-sm select-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div 
        className="flex items-center gap-2 text-gray-400 hover:text-white cursor-grab active:cursor-grabbing p-1 -ml-1 rounded"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <GripVertical className="w-4 h-4" />
        <Settings2 className="w-4 h-4" />
        <span className="font-semibold">Dev Tools</span>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-1"></div>
      <div className="flex items-center gap-2">
        <label htmlFor="patient-select" className="text-gray-400">Mock Patient:</label>
        <select 
          id="patient-select"
          value={currentPatient} 
          onChange={handlePatientChange}
          className="bg-gray-800 border border-gray-700 text-white rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary-light"
        >
          {SAMPLE_PATIENTS.map(p => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.gender}, DOB: {p.dob})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
