
import React from "react";
import { Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface GameTimerProps {
  timeLeft: number;
}

const GameTimer: React.FC<GameTimerProps> = ({ timeLeft }) => {
  const percentage = (timeLeft / 60) * 100;
  const isLowTime = timeLeft <= 10;
  
  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-full bg-gradient-to-br from-[#121830] to-[#0C0E1A] p-1.5 relative ${isLowTime ? 'animate-pulse' : ''}`}>
        <Timer size={18} className={`${isLowTime ? 'text-[#F97316]' : 'text-[#FFFFFF]/70'}`} />
      </div>
      <div className="w-28">
        <div className="text-xs text-[#FFFFFF]/70 mb-1 flex justify-between">
          <span className={isLowTime ? 'text-[#F97316] font-bold animate-pulse' : ''}>{timeLeft}s</span>
        </div>
        <div className="h-2 w-full bg-[#FFFFFF]/10 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isLowTime ? 'bg-[#F97316]' : 'bg-gradient-to-r from-[#0088FF] to-[#9933FF]'}`}
            style={{ width: `${percentage}%`, transition: 'width 1s linear' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GameTimer;
