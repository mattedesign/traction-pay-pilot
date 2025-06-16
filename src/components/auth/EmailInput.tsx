
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  email: string;
  onEmailChange: (email: string) => void;
}

const EmailInput = ({ email, onEmailChange }: EmailInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
        Email ID
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="guru.pihlano@abcdef.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        className="h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-base"
      />
    </div>
  );
};

export default EmailInput;
