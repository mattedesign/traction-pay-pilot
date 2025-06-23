
interface DashboardHeaderProps {
  userProfile: any;
}

const DashboardHeader = ({ userProfile }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full relative">
              <div className="absolute -top-1 -left-1 w-2 h-1 bg-orange-400 rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-1 bg-orange-400 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-1 bg-orange-400 rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-1 bg-orange-400 rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-500 mb-1">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Insights</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
