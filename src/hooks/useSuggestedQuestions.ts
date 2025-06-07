
import { useState } from "react";

const suggestedQuestions = [
  "How do I handle a weight discrepancy on my BOL?",
  "What's the best fuel route from Chicago to Denver?", 
  "When should I expect payment on this load?",
  "Help me find cheapest fuel stops on I-80",
  "How do I submit my ELD logs for this trip?",
  "What documents do I need for Canada runs?",
  "Can I get a fuel advance on approved loads?",
  "How to dispute detention charges?",
  "Best truck stops with overnight parking near me",
  "Help me calculate my cost per mile"
];

export const useSuggestedQuestions = () => {
  const getRandomSuggestions = () => {
    const shuffled = [...suggestedQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const [currentSuggestions] = useState(getRandomSuggestions());

  return { currentSuggestions };
};
