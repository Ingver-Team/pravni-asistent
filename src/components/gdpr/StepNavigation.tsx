import { Check } from "lucide-react";
import { gdprQuestions } from "@/data/gdprQuestions";

interface StepNavigationProps {
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (step: number) => void;
}

export function StepNavigation({ currentStep, completedSteps, onStepClick }: StepNavigationProps) {
  return (
    <div className="w-64 shrink-0 border-r border-border bg-card p-6 overflow-y-auto hidden lg:block">
      <h2 className="font-serif text-lg font-bold mb-1 text-foreground">Kazalo</h2>
      <p className="text-xs text-muted-foreground mb-6">Vaš napredek skozi vprašalnik</p>

      <nav className="space-y-1">
        {gdprQuestions.map((q) => {
          const isActive = currentStep === q.id;
          const isCompleted = completedSteps.has(q.id);

          return (
            <button
              key={q.id}
              onClick={() => onStepClick(q.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm transition-colors ${
                isActive
                  ? "bg-nav-active-bg text-nav-active font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 ${
                  isCompleted
                    ? "bg-nav-completed text-success-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : q.id}
              </span>
              <span className="truncate leading-tight">Korak {q.id}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
