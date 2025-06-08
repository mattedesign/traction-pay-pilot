
const RouteVisualization = () => {
  return (
    <div className="absolute top-2 right-2 w-32 h-20 opacity-8">
      <svg viewBox="0 0 128 80" className="w-full h-full">
        {/* Highway route */}
        <path 
          d="M10,40 Q32,20 64,40 Q96,60 118,40" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none" 
          className="text-slate-200"
          strokeDasharray="6,4"
        />
        {/* Start point */}
        <circle cx="10" cy="40" r="3" className="fill-slate-300" />
        {/* End point */}
        <circle cx="118" cy="40" r="3" className="fill-slate-300" />
        {/* Fuel stops */}
        <circle cx="45" cy="32" r="2" className="fill-slate-400">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="83" cy="48" r="2" className="fill-slate-400">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.7s" />
        </circle>
        {/* Traffic indicators */}
        <rect x="30" y="38" width="8" height="4" rx="2" className="fill-slate-200 opacity-60" />
        <rect x="70" y="38" width="12" height="4" rx="2" className="fill-slate-200 opacity-60" />
      </svg>
    </div>
  );
};

export default RouteVisualization;
