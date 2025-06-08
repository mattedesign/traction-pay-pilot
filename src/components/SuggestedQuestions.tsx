
import { Badge } from "@/components/ui/badge";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  isPreview?: boolean;
}

const SuggestedQuestions = ({
  questions,
  onQuestionClick,
  isPreview = false
}: SuggestedQuestionsProps) => {
  const displayQuestions = isPreview ? questions.slice(0, 3) : questions;
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayQuestions.map((question, index) => (
        <Badge
          key={index}
          variant="outline"
          className="cursor-pointer hover:bg-slate-100 text-sm px-3 py-1"
          onClick={() => !isPreview && onQuestionClick(question)}
        >
          {question}
        </Badge>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
