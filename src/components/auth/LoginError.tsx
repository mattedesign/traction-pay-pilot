
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginErrorProps {
  error: string;
}

const LoginError = ({ error }: LoginErrorProps) => {
  if (!error) return null;

  return (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default LoginError;
