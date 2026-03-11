import { useState } from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Pozdravljeni! Sem vaš GDPR pomočnik. Kako vam lahko pomagam pri uveljavljanju pravic po GDPR?",
  },
];

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input.trim() };
    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: "Hvala za vaše vprašanje. Ta funkcija bo kmalu na voljo z AI pomočnikom.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="w-80 shrink-0 border-l border-border bg-card flex flex-col hidden xl:flex">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">AI Pomočnik</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Vprašajte karkoli..."
            className="flex-1 bg-muted border-0 rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <Button type="submit" size="icon" className="shrink-0 h-9 w-9">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
