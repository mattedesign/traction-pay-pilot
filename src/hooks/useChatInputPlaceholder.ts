
import { useCallback } from "react";

export const useChatInputPlaceholder = (mode: "search" | "chat") => {
  const getPlaceholder = useCallback(() => {
    if (mode === "search") {
      return "Search for loads by ID, broker, route, or status...";
    }
    return "Ask about loads, routes, payments, compliance...";
  }, [mode]);

  return { getPlaceholder };
};
