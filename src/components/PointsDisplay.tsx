
import React from "react";
import { Coins } from "lucide-react";

interface PointsDisplayProps {
  points: number;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ points }) => {
  return (
    <div className="flex items-center bg-gradient-to-r from-[#121830] to-[#0C0E1A] rounded-full px-4 py-2 shadow-lg border border-[#9933FF]/30">
      <div className="mr-3 rounded-full bg-gradient-to-br from-[#9933FF] to-[#0088FF] p-1.5 relative">
        <div className="absolute inset-0 rounded-full animate-pulse bg-[#9933FF]/30"></div>
        <Coins size={20} className="text-white relative z-10" />
      </div>
      <div>
        <div className="text-xs text-[#FFFFFF]/70">TapTokens</div>
        <div className="font-bold text-[#FFFFFF]">{points.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PointsDisplay;
