import { useState } from "react";
import { MessageSquare, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatPanel } from "@/components/gdpr/ChatPanel";
import { Link } from "react-router-dom";

const DOCUWISE_URL = "https://app.docuwise.eu/sl/documents/f4396b5a-c3d2-42b5-a491-98381bf7643c/create";

const Questionnaire = () => {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <h1 className="font-serif text-lg leading-none">GDPR Pomočnik</h1>
              <p className="text-xs text-muted-foreground">Obrazec za Informacijskega pooblaščenca</p>
            </div>
          </Link>
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
          {/* DocuWise iframe */}
          <div className="flex-1 min-w-0">
            {DOCUWISE_URL ? (
              <iframe
                src={DOCUWISE_URL}
                className="w-full h-full border-0"
                title="DocuWise vprašalnik"
                allow="clipboard-write"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/30">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium mb-2">DocuWise vprašalnik</p>
                  <p className="text-sm">URL za iframe še ni nastavljen.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Chat Panel */}
          {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
