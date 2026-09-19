"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AIChatModal } from "./AIChatModal";

type ChatContextType = {
  openChat: (prompt?: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [promptTrigger, setPromptTrigger] = useState<{prompt: string, timestamp: number} | undefined>();

  const openChat = useCallback((prompt?: string) => {
    if (prompt) {
      setPromptTrigger({ prompt, timestamp: Date.now() });
    }
    setIsOpen(true);
  }, []);

  return (
    <ChatContext.Provider value={{ openChat }}>
      {children}
      <AIChatModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        promptTrigger={promptTrigger}
      />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
