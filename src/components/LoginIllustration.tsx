
const LoginIllustration = () => {
  return (
    <div className="w-full max-w-lg">
      <svg viewBox="0 0 400 300" className="w-full h-auto">
        {/* Background elements */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>
        
        <rect width="400" height="300" fill="url(#skyGradient)" />
        
        {/* Road */}
        <path
          d="M0 220 Q100 210 200 220 T400 220 L400 300 L0 300 Z"
          fill="#e2e8f0"
          opacity="0.8"
        />
        
        {/* Road markings */}
        <path
          d="M50 220 L70 220 M130 220 L150 220 M210 220 L230 220 M290 220 L310 220"
          stroke="#cbd5e1"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Clouds */}
        <g opacity="0.6">
          <circle cx="80" cy="50" r="15" fill="#f1f5f9" />
          <circle cx="95" cy="45" r="18" fill="#f1f5f9" />
          <circle cx="110" cy="50" r="12" fill="#f1f5f9" />
          
          <circle cx="280" cy="40" r="12" fill="#f1f5f9" />
          <circle cx="295" cy="35" r="15" fill="#f1f5f9" />
          <circle cx="310" cy="40" r="10" fill="#f1f5f9" />
        </g>
        
        {/* Mountains/Hills in background */}
        <path
          d="M0 180 Q50 160 100 180 T200 185 T300 175 T400 180 L400 220 L0 220 Z"
          fill="#f1f5f9"
          opacity="0.7"
        />
        
        {/* Main truck */}
        <g transform="translate(150, 140)">
          {/* Truck body shadow */}
          <ellipse cx="50" cy="75" rx="45" ry="8" fill="#cbd5e1" opacity="0.3" />
          
          {/* Truck trailer */}
          <rect x="30" y="35" width="60" height="30" rx="3" fill="#3b82f6" />
          <rect x="32" y="37" width="56" height="26" rx="2" fill="#60a5fa" />
          
          {/* Truck cab */}
          <rect x="10" y="40" width="25" height="25" rx="3" fill="#1e40af" />
          <rect x="12" y="42" width="21" height="21" rx="2" fill="#3b82f6" />
          
          {/* Truck windows */}
          <rect x="14" y="44" width="8" height="8" rx="1" fill="#e0f2fe" />
          <rect x="24" y="44" width="6" height="8" rx="1" fill="#e0f2fe" />
          
          {/* Truck wheels */}
          <circle cx="20" cy="70" r="6" fill="#374151" />
          <circle cx="20" cy="70" r="4" fill="#6b7280" />
          <circle cx="20" cy="70" r="2" fill="#9ca3af" />
          
          <circle cx="45" cy="70" r="6" fill="#374151" />
          <circle cx="45" cy="70" r="4" fill="#6b7280" />
          <circle cx="45" cy="70" r="2" fill="#9ca3af" />
          
          <circle cx="75" cy="70" r="6" fill="#374151" />
          <circle cx="75" cy="70" r="4" fill="#6b7280" />
          <circle cx="75" cy="70" r="2" fill="#9ca3af" />
          
          {/* Headlights */}
          <circle cx="8" cy="50" r="2" fill="#fbbf24" opacity="0.8" />
          <circle cx="8" cy="58" r="2" fill="#fbbf24" opacity="0.8" />
        </g>
        
        {/* Driver character */}
        <g transform="translate(50, 80)">
          {/* Character shadow */}
          <ellipse cx="35" cy="135" rx="25" ry="6" fill="#cbd5e1" opacity="0.3" />
          
          {/* Body */}
          <ellipse cx="35" cy="110" rx="18" ry="25" fill="#3b82f6" />
          <ellipse cx="35" cy="108" rx="16" ry="23" fill="#60a5fa" />
          
          {/* Arms */}
          <ellipse cx="20" cy="95" rx="6" ry="15" fill="#fbbf24" transform="rotate(-20 20 95)" />
          <ellipse cx="50" cy="95" rx="6" ry="15" fill="#fbbf24" transform="rotate(30 50 95)" />
          
          {/* Head */}
          <circle cx="35" cy="70" r="15" fill="#fbbf24" />
          
          {/* Hat */}
          <ellipse cx="35" cy="62" rx="16" ry="6" fill="#1e40af" />
          <rect x="27" y="58" width="16" height="8" rx="2" fill="#3b82f6" />
          
          {/* Face */}
          <circle cx="30" cy="68" r="2" fill="#374151" />
          <circle cx="40" cy="68" r="2" fill="#374151" />
          <path d="M30 75 Q35 78 40 75" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {/* Hair visible under hat */}
          <path d="M25 65 Q28 63 32 64" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 64 Q42 63 45 65" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
          
          {/* Legs */}
          <rect x="28" y="125" width="6" height="20" rx="3" fill="#1e40af" />
          <rect x="36" y="125" width="6" height="20" rx="3" fill="#1e40af" />
          
          {/* Feet */}
          <ellipse cx="31" cy="148" rx="5" ry="3" fill="#374151" />
          <ellipse cx="39" cy="148" rx="5" ry="3" fill="#374151" />
          
          {/* Tablet/device in hand */}
          <rect x="45" y="88" width="12" height="8" rx="1" fill="#f8fafc" />
          <rect x="46" y="89" width="10" height="6" rx="0.5" fill="#e0f2fe" />
          <circle cx="51" cy="94" r="0.5" fill="#3b82f6" />
        </g>
        
        {/* GPS/Location pins floating */}
        <g opacity="0.7">
          <g transform="translate(300, 60)">
            <circle cx="0" cy="8" r="8" fill="#ef4444" />
            <circle cx="0" cy="6" r="3" fill="white" />
            <path d="M0 16 L-4 8 L4 8 Z" fill="#ef4444" />
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="300,60; 300,55; 300,60" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </g>
          
          <g transform="translate(320, 100)">
            <circle cx="0" cy="8" r="6" fill="#10b981" />
            <circle cx="0" cy="6" r="2" fill="white" />
            <path d="M0 14 L-3 8 L3 8 Z" fill="#10b981" />
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="320,100; 320,95; 320,100" 
              dur="2.5s" 
              repeatCount="indefinite"
              begin="1s"
            />
          </g>
        </g>
        
        {/* Payment/money elements */}
        <g opacity="0.6">
          <g transform="translate(280, 120)">
            <rect x="0" y="0" width="20" height="12" rx="2" fill="#22c55e" />
            <text x="10" y="8" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">$</text>
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="280,120; 285,115; 280,120" 
              dur="4s" 
              repeatCount="indefinite"
            />
          </g>
          
          <g transform="translate(260, 90)">
            <circle cx="0" cy="0" r="8" fill="#fbbf24" />
            <text x="0" y="3" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">$</text>
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="260,90; 265,85; 260,90" 
              dur="3.5s" 
              repeatCount="indefinite"
              begin="0.5s"
            />
          </g>
        </g>
        
        {/* Route line connecting elements */}
        <path
          d="M100 150 Q150 140 200 150 T320 140"
          stroke="#94a3b8"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          opacity="0.4"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;10"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default LoginIllustration;
