import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { websiteTypes, WebsiteType } from "@/data/websiteTypes";

interface QuizQuestion {
  question: string;
  options: { label: string; weight: Record<string, number> }[];
}

const questions: QuizQuestion[] = [
  {
    question: "What's the primary goal of your website?",
    options: [
      { label: "Sell products or services", weight: { ecommerce: 3, "landing-page": 2, saas: 1 } },
      { label: "Showcase my work or portfolio", weight: { portfolio: 3, "personal-brand": 2 } },
      { label: "Share content and build an audience", weight: { blog: 3, educational: 2, forum: 1 } },
      { label: "Provide information about my organization", weight: { corporate: 3, nonprofit: 2 } },
    ],
  },
  {
    question: "Who is your target audience?",
    options: [
      { label: "General consumers (B2C)", weight: { ecommerce: 2, blog: 2, "personal-brand": 1 } },
      { label: "Businesses and professionals (B2B)", weight: { saas: 3, corporate: 2, portal: 1 } },
      { label: "Creative industry professionals", weight: { portfolio: 3, directory: 1 } },
      { label: "Learners and students", weight: { educational: 3, forum: 2, blog: 1 } },
    ],
  },
  {
    question: "What features are most important to you?",
    options: [
      { label: "Online payments and checkout", weight: { ecommerce: 3, saas: 2, nonprofit: 1 } },
      { label: "User accounts and dashboards", weight: { saas: 3, portal: 2, educational: 2 } },
      { label: "Content publishing and SEO", weight: { blog: 3, "personal-brand": 2, corporate: 1 } },
      { label: "Visual galleries and media", weight: { portfolio: 3, directory: 1 } },
    ],
  },
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<WebsiteType | null>(null);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: number[]) => {
    const scores: Record<string, number> = {};

    allAnswers.forEach((answerIndex, questionIndex) => {
      const weights = questions[questionIndex].options[answerIndex].weight;
      Object.entries(weights).forEach(([typeId, weight]) => {
        scores[typeId] = (scores[typeId] || 0) + weight;
      });
    });

    const topTypeId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topType = websiteTypes.find((t) => t.id === topTypeId) || websiteTypes[0];
    setResult(topType);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const ResultIcon = result?.icon;

  return (
    <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-medium text-slate-900">Interactive Quiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Find Your Perfect Website Type
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Answer 3 simple questions to discover which website type best fits your needs.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-card rounded-3xl border border-border shadow-elevated overflow-hidden">
          {!result ? (
            <>
              {/* Progress Bar */}
              <div className="h-1.5 bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              <div className="p-8 sm:p-12">
                {/* Question Counter */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-medium text-muted-foreground">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                </div>

                {/* Question */}
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-8">
                  {questions[currentStep].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 text-left rounded-2xl border transition-all duration-200 group ${answers[currentStep] === index
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[currentStep] === index
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/30 group-hover:border-primary/50"
                            }`}
                        >
                          {answers[currentStep] === index && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="font-medium text-foreground">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Result */
            <div className="p-8 sm:p-12 text-center">
              <div className={`inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br ${result.color} items-center justify-center shadow-lg mb-6`}>
                {ResultIcon && <ResultIcon className="w-10 h-10 text-white" />}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {result.title}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {result.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {result.popularTools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary/10 text-primary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <Button
                onClick={reset}
                variant="outline"
                className="rounded-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Take Quiz Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
