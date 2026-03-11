import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { gdprQuestions } from "@/data/gdprQuestions";

interface QuestionCardProps {
  currentStep: number;
  answers: Record<number, string>;
  onAnswer: (questionId: number, optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionCard({ currentStep, answers, onAnswer, onNext, onBack }: QuestionCardProps) {
  const question = gdprQuestions.find((q) => q.id === currentStep);
  if (!question) return null;

  const totalSteps = gdprQuestions.length;
  const progress = (Object.keys(answers).length / totalSteps) * 100;
  const selectedAnswer = answers[currentStep];

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-8 overflow-y-auto">
      {/* Progress */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Vaš napredek</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-card rounded-lg border border-border shadow-sm p-8">
        <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Korak {currentStep} od {totalSteps}
        </div>
        <h1 className="font-serif text-2xl text-foreground mb-2">{question.title}</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{question.description}</p>

        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={(val) => onAnswer(currentStep, val)}
          className="space-y-3"
        >
          {question.options.map((opt) => (
            <Label
              key={opt.id}
              htmlFor={opt.id}
              className={`flex items-center gap-3 p-4 rounded-md border cursor-pointer transition-colors ${
                selectedAnswer === opt.id
                  ? "border-primary bg-nav-active-bg"
                  : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
              }`}
            >
              <RadioGroupItem value={opt.id} id={opt.id} />
              <span className="text-sm">{opt.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Nazaj
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="gap-1"
        >
          {currentStep === totalSteps ? "Zaključi" : "Naprej"} <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
