
import React from "react";

interface ComboIndicatorProps {
  combo: number;
}

const ComboIndicator: React.FC<ComboIndicatorProps> = ({ combo }) => {
  // Calculate intensity based on combo
  const intensity = Math.min(combo / 10, 1); // Max intensity at combo 10+
  
  return (
    <div className="absolute top-4 right-4 bg-gradient-to-br from-[#9933FF] to-[#0088FF] text-white px-4 py-2 rounded-lg animate-pop shadow-lg shadow-[#9933FF]/20">
      <div className="text-xs opacity-80">Combo</div>
      <div className="font-bold text-2xl flex items-center">
        {combo}
        <span 
          className="ml-1 text-[#33FF66]"
          style={{
            textShadow: `0 0 ${5 + intensity * 10}px #33FF66`,
            fontSize: `${100 + intensity * 50}%`
          }}
        >
          x
        </span>
      </div>
      
      {/* Pulse effect that gets more intense with higher combo */}
      <div 
        className="absolute inset-0 rounded-lg animate-pulse"
        style={{
          background: `linear-gradient(to right, rgba(153, 51, 255, ${0.1 + intensity * 0.2}), rgba(0, 136, 255, ${0.1 + intensity * 0.2}))`,
          animationDuration: `${1 - intensity * 0.5}s` // Faster pulse for higher combo
        }}
      ></div>
    </div>
  );
};

export default ComboIndicator;
