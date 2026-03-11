import { useState } from "react";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatPanel } from "@/components/gdpr/ChatPanel";
import { Link } from "react-router-dom";
import ingverLogo from "@/assets/ingver_square.png";
import { PreQuestionnaire } from "@/components/gdpr/PreQuestionnaire";

const DOCUWISE_URLS: Record<string, string> = {
  access: "https://app.docuwise.eu/sl/share/a6eeeeb0-06f4-4c52-ad88-3fe6ee5a952b",
  erasure: "https://app.docuwise.eu/sl/share/963ff6c5-6eb8-4284-8742-8ff74feb14bb",
  rectification: "https://app.docuwise.eu/sl/share/fc323106-cfb2-46e4-9bb2-6a182776e589",
  portability: "",
};

const Questionnaire = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [preCompleted, setPreCompleted] = useState(false);
  const [preAnswers, setPreAnswers] = useState<Record<string, string>>({});

  const handlePreComplete = (answers: Record<string, string>) => {
    setPreAnswers(answers);
    setPreCompleted(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {preCompleted ? (
              <Button variant="ghost" size="sm" onClick={() => setPreCompleted(false)} className="gap-2 -ml-2 hover:bg-primary/10 hover:text-primary">
                <ArrowLeft className="w-4 h-4" />
                Nazaj
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2 hover:bg-primary/10 hover:text-primary">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Nazaj
                </Link>
              </Button>
            )}
            <div className="h-6 w-px bg-border" />
            <Link to="/" className="flex items-center gap-2">
              <img src={ingverLogo} alt="Prijava IP" className="h-6 w-auto" />
              <div>
                <h1 className="font-serif text-lg leading-none">Prijava IP</h1>
                <p className="text-xs text-muted-foreground">Obrazec za Informacijskega pooblaščenca</p>
              </div>
            </Link>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChatOpen(!chatOpen)}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            AI Pomočnik
          </Button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {!preCompleted ? (
            <PreQuestionnaire onComplete={handlePreComplete} />
          ) : (
            <div className="flex-1 min-w-0">
              <iframe
                src={DOCUWISE_URLS[preAnswers.right_type] || DOCUWISE_URLS.access}
                className="w-full h-full border-0"
                title="DocuWise vprašalnik"
                allow="clipboard-write"
              />
            </div>
          )}

          {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} rightType={preAnswers.right_type} />}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
