
const InvoicesLoadingState = () => {
  return (
    <div className="w-80 bg-white text-slate-900 h-screen flex flex-col shadow-sm border-r border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-center">
          <div className="text-slate-500">Loading invoices...</div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesLoadingState;
