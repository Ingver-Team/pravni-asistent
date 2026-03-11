import { useState } from "react";
import { MessageSquare, ArrowLeft, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatPanel } from "@/components/gdpr/ChatPanel";
import { Link } from "react-router-dom";
import ingverLogo from "@/assets/ingver_square.png";
import { PreQuestionnaire } from "@/components/gdpr/PreQuestionnaire";

const DOCUWISE_URLS: Record<string, string> = {
  access: "https://app.docuwise.eu/sl/share/b2485bc0-35cc-4eca-b146-d1493d215701",
  erasure: "https://app.docuwise.eu/en/share/83433540-05d3-4dd9-a1fd-9e4bf54aadaa",
  rectification: "https://app.docuwise.eu/en/share/9b0bde4a-727e-43e6-bd87-4049579f54dc",
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
          ) : DOCUWISE_URLS[preAnswers.right_type] ? (
            <div className="flex-1 min-w-0">
              <iframe
                src={DOCUWISE_URLS[preAnswers.right_type]}
                className="w-full h-full border-0"
                title="DocuWise vprašalnik"
                allow="clipboard-write"
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 bg-background">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <FileX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-3">
                  Obrazec trenutno ni na voljo
                </h2>
                <p className="text-muted-foreground mb-8">
                  Obrazec za to pravico je v pripravi in bo na voljo kmalu. Prosimo, poskusite znova kasneje ali izberite drugo pravico.
                </p>
                <Button variant="outline" onClick={() => setPreCompleted(false)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Nazaj na izbiro pravice
                </Button>
              </div>
            </div>
          )}

          {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} rightType={preAnswers.right_type} />}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
