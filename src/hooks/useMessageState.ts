
import { useState } from "react";

export const useMessageState = () => {
  const [message, setMessage] = useState("");

  return {
    message,
    setMessage
  };
};
