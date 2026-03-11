import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompletionScreenProps {
  onRestart: () => void;
}

export function CompletionScreen({ onRestart }: CompletionScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-success" />
        </div>
        <h1 className="font-serif text-3xl text-foreground mb-3">Vprašalnik zaključen</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Hvala, da ste izpolnili vprašalnik. Na podlagi vaših odgovorov bomo pripravili
          priporočila za pravilno obravnavo zahteve posameznika po GDPR.
        </p>
        <Button onClick={onRestart} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Začni znova
        </Button>
      </div>
    </div>
  );
}
