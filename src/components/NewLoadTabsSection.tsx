
import { FileText } from "lucide-react";

interface NewLoadTabsSectionProps {
  activeTab: 'documents' | 'accessorials';
  onTabChange: (tab: 'documents' | 'accessorials') => void;
}

const NewLoadTabsSection = ({ activeTab, onTabChange }: NewLoadTabsSectionProps) => {
  return (
    <div className="border-b border-slate-200">
      <div className="flex">
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'documents' 
              ? 'border-slate-600 text-slate-600' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => onTabChange('documents')}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Documents
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium border-b-2 ${
            activeTab === 'accessorials' 
              ? 'border-slate-600 text-slate-600' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => onTabChange('accessorials')}
        >
          Accessorials
        </button>
      </div>
    </div>
  );
};

export default NewLoadTabsSection;
