import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  id: string;
  title: string;
  description?: string;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: "right_type",
    title: "Kaj želite urediti glede svojih osebnih podatkov?",
    description: "Izberite pravico, ki jo želite uveljavljati pri upravljavcu vaših osebnih podatkov.",
    options: [
      { value: "access", label: "Želim vpogled v svoje podatke", description: "Pravica do dostopa do osebnih podatkov (15. člen GDPR)." },
      { value: "erasure", label: "Želim izbris svojih podatkov", description: "Pravica do izbrisa – »pravica do pozabe« (17. člen GDPR)." },
      { value: "rectification", label: "Želim popraviti ali dopolniti svoje podatke", description: "Pravica do popravka netočnih ali nepopolnih podatkov (16. člen GDPR)." },
      { value: "portability", label: "Želim prenesti svoje podatke", description: "Pravica do prenosljivosti podatkov (20. člen GDPR)." },
    ],
  },
];

interface PreQuestionnaireProps {
  onComplete: (answers: Record<string, string>) => void;
}

export const PreQuestionnaire = ({ onComplete }: PreQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[currentStep];
  const totalSteps = questions.length;
  const selectedValue = answers[question.id];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Step indicator */}
        <p className="text-sm text-muted-foreground mb-2">
          Korak {currentStep + 1} od {totalSteps}
        </p>

        {/* Question */}
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
          {question.title}
        </h2>
        {question.description && (
          <p className="text-muted-foreground mb-8">{question.description}</p>
        )}

        {/* Options */}
        <div className="flex flex-col gap-3 mb-10">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`text-left p-4 rounded-lg border transition-all ${
                selectedValue === option.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedValue === option.value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  }`}
                >
                  {selectedValue === option.value && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{option.label}</p>
                  {option.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Nazaj
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedValue}
            className="gap-2"
          >
            {currentStep < totalSteps - 1 ? "Naprej" : "Začni z obrazcem"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
