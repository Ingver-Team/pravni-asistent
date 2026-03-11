import { useState, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepNavigation } from "@/components/gdpr/StepNavigation";
import { QuestionCard } from "@/components/gdpr/QuestionCard";
import { ChatPanel } from "@/components/gdpr/ChatPanel";
import { CompletionScreen } from "@/components/gdpr/CompletionScreen";
import { gdprQuestions } from "@/data/gdprQuestions";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [chatOpen, setChatOpen] = useState(true);
  const [completed, setCompleted] = useState(false);

  const completedSteps = new Set(Object.keys(answers).map(Number));
  const totalSteps = gdprQuestions.length;

  const handleAnswer = useCallback((questionId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep === totalSteps) {
      setCompleted(true);
    } else {
      setCurrentStep((s) => Math.min(s + 1, totalSteps));
    }
  }, [currentStep, totalSteps]);

  const handleBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentStep(1);
    setAnswers({});
    setCompleted(false);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <StepNavigation
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={(step) => {
          setCompleted(false);
          setCurrentStep(step);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="font-serif text-lg leading-none">GDPR Pomočnik</h1>
            <p className="text-xs text-muted-foreground">Vprašalnik za uveljavljanje pravic</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChatOpen(!chatOpen)}
            className="gap-2 xl:hidden"
          >
            <MessageSquare className="w-4 h-4" />
            AI Pomočnik
          </Button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {completed ? (
            <CompletionScreen onRestart={handleRestart} />
          ) : (
            <QuestionCard
              currentStep={currentStep}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {/* Right Chat Panel */}
          {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
