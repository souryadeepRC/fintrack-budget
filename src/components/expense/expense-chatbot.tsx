"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Loader2, Bot, User } from "lucide-react";
import { askGroqAction } from "@/actions/chat-actions";
import { Expense } from "@/types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ExpenseChatbot({ expenses }: { expenses: Expense[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Fintract AI. I can analyze your expenses, offer insights, or help you log a new expense. How can I help today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Map to the format Groq expects
      const history = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await askGroqAction(history, expenses);

      if (res.success && res.content) {
        let aiText = res.content;
        
        // Parse special Add Expense command from LLM response
        const expenseCmdRegex = /<<<ADD_EXPENSE:(.*?)>>>/;
        const match = aiText.match(expenseCmdRegex);
        
        if (match) {
          try {
            const payload = JSON.parse(match[1]);
            console.log("🔥 AI Add Expense Triggered! Payload:", payload);
            
            // Remove the raw JSON command from the chat bubble and add a success note
            aiText = aiText.replace(expenseCmdRegex, "").trim() + "\n\n*(Expense payload successfully logged to console!)*";
          } catch (e) {
            console.error("Failed to parse AI payload:", e);
          }
        }

        setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I had trouble connecting to the AI brain. Please try again later!" }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Centered Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          
          {/* Chat Window Modal */}
          <div className="bg-slate-950 border border-emerald-500/30 w-full max-w-2xl h-[80vh] max-h-[750px] rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                  <Bot className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">Fintract AI</h3>
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-2 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-md">
                      <Bot className="w-5 h-5 text-slate-950" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-md ${msg.role === "user" ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-tr-sm" : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"}`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0 mt-1 shadow-md">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start animate-in fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-md">
                    <Bot className="w-5 h-5 text-slate-950" />
                  </div>
                  <div className="bg-slate-800 text-emerald-400 px-5 py-3.5 rounded-2xl rounded-tl-sm border border-slate-700 flex items-center gap-2 shadow-md">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-950 border-t border-white/10 shrink-0">
              <div className="flex gap-2 bg-slate-900 border border-slate-700 rounded-2xl p-1.5 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50 transition-all shadow-inner">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Ask about your finances, or tell me to log an expense..." className="flex-1 bg-transparent text-slate-200 text-sm px-4 py-2 outline-none placeholder:text-slate-500" />
                <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}