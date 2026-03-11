import { useState } from "react";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatPanel } from "@/components/gdpr/ChatPanel";
import { Link } from "react-router-dom";
import ingverLogo from "@/assets/ingver_square.png";
import { PreQuestionnaire } from "@/components/gdpr/PreQuestionnaire";

const DOCUWISE_URLS: Record<string, string> = {
  access: "https://app.docuwise.eu/sl/share/f4396b5a-c3d2-42b5-a491-98381bf7643c",
  erasure: "https://app.docuwise.eu/sl/share/963ff6c5-6eb8-4284-8742-8ff74feb14bb",
  rectification: "https://app.docuwise.eu/sl/share/f4396b5a-c3d2-42b5-a491-98381bf7643c",
  portability: "https://app.docuwise.eu/sl/share/f4396b5a-c3d2-42b5-a491-98381bf7643c",
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
              <Button variant="ghost" size="sm" onClick={() => setPreCompleted(false)} className="gap-2 -ml-2">
                <ArrowLeft className="w-4 h-4" />
                Nazaj
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
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
                src={DOCUWISE_URL}
                className="w-full h-full border-0"
                title="DocuWise vprašalnik"
                allow="clipboard-write"
              />
            </div>
          )}

          {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
