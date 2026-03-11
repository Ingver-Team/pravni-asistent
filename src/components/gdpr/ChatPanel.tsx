import { useState, useRef, useEffect } from "react";
import { Send, X, Loader2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatPanelProps {
  onClose: () => void;
  rightType?: string;
}

const INITIAL_MESSAGES: Record<string, Message> = {
  access: {
    role: "assistant",
    content:
      "Pozdravljeni! 👋 Pomagam vam pri izpolnjevanju zahteve za **seznanitev z osebnimi podatki** (člen 15 GDPR).\n\nLahko vam pomagam pri:\n- **Razumevanju posameznih polj** v obrazcu\n- **Razlagi pravnih pojmov** v preprostem jeziku\n- **Nasveti glede vaših pravic** pri varstvu podatkov\n\nKar vprašajte, če se kje zataknete!",
  },
  erasure: {
    role: "assistant",
    content:
      "Pozdravljeni! 👋 Pomagam vam pri izpolnjevanju zahteve za **izbris osebnih podatkov** (člen 17 GDPR).\n\nLahko vam pomagam pri:\n- **Razumevanju posameznih polj** v obrazcu\n- **Razlagi pravnih pojmov** v preprostem jeziku\n- **Nasveti glede pravice do pozabe**\n\nKar vprašajte, če se kje zataknete!",
  },
  rectification: {
    role: "assistant",
    content:
      "Pozdravljeni! 👋 Pomagam vam pri izpolnjevanju zahteve za **popravek osebnih podatkov** (člen 16 GDPR).\n\nLahko vam pomagam pri:\n- **Razumevanju posameznih polj** v obrazcu\n- **Razlagi pravnih pojmov** v preprostem jeziku\n- **Nasveti glede popravka netočnih podatkov**\n\nKar vprašajte, če se kje zataknete!",
  },
  default: {
    role: "assistant",
    content:
      "Pozdravljeni! 👋 Sem vaš AI pomočnik za pripravo obrazcev za Informacijskega pooblaščenca.\n\nLahko vam pomagam pri:\n- **Razumevanju posameznih polj** v obrazcu\n- **Razlagi pravnih pojmov** v preprostem jeziku\n- **Nasveti glede vaših pravic** po GDPR\n\nKar vprašajte, če se kje zataknete!",
  },
};

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  access: [
    "Kaj napisati v polje 'Komu vlagate zahtevo'?",
    "Katere podatke lahko zahtevam od upravljavca?",
    "Kaj napisati v utemeljitev?",
    "Kakšni so roki za odgovor upravljavca?",
  ],
  erasure: [
    "Kaj napisati v polje 'Komu vlagate zahtevo'?",
    "Kdaj lahko zahtevam izbris podatkov?",
    "Ali obstajajo izjeme, ko izbris ni mogoč?",
    "Kaj priložiti kot dokazilo?",
  ],
  rectification: [
    "Kaj napisati v polje 'Komu vlagate zahtevo'?",
    "Kako opisati, kateri podatki so napačni?",
    "Kaj napisati kot razlog za popravek?",
    "Kakšni so roki za odgovor upravljavca?",
  ],
  default: [
    "Kaj je Informacijski pooblaščenec?",
    "Katere pravice imam po GDPR?",
    "Kakšni so roki za odgovor upravljavca?",
    "Kaj storiti, če upravljavec ne odgovori?",
  ],
};

export function ChatPanel({ onClose, rightType }: ChatPanelProps) {
  const initialMsg = INITIAL_MESSAGES[rightType || ""] || INITIAL_MESSAGES.default;
  const suggestions = SUGGESTED_QUESTIONS[rightType || ""] || SUGGESTED_QUESTIONS.default;

  const [messages, setMessages] = useState<Message[]>([initialMsg]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    let assistantContent = "";

    try {
      const chatUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      const resp = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          rightType: rightType || undefined,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Napaka" }));
        throw new Error(err.error || `Napaka: ${resp.status}`);
      }

      if (!resp.body) throw new Error("Ni podatkov");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        ...(assistantContent
          ? []
          : [
              {
                role: "assistant" as const,
                content: `Oprostite, prišlo je do napake: ${e instanceof Error ? e.message : "Neznana napaka"}`,
              },
            ]),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  return (
    <div className="w-80 shrink-0 border-l border-border bg-card flex flex-col hidden xl:flex">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-foreground">AI Pomočnik</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>p+p]:mt-2 [&>ul]:m-0 [&>ul]:mt-1 [&>ol]:m-0 [&>ol]:mt-1 [&>li]:m-0">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
              <Loader2 className="w-3 h-3 animate-spin" />
              Razmišljam...
            </div>
          </div>
        )}

        {/* Suggested questions */}
        {showSuggestions && messages.length === 1 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <HelpCircle className="w-3 h-3" />
              Pogosta vprašanja:
            </div>
            {suggestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="block w-full text-left text-xs px-3 py-2 rounded-md border border-border bg-background hover:bg-muted transition-colors text-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        )}
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
            disabled={isLoading}
            className="flex-1 bg-muted border-0 rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
          />
          <Button type="submit" size="icon" className="shrink-0 h-9 w-9" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
