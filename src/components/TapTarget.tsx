
import React from "react";

interface TargetProps {
  target: {
    id: number;
    x: number;
    y: number;
    size: number;
    points: number;
    type: 'normal' | 'bonus' | 'multiplier';
  };
  onClick: () => void;
}

const TapTarget: React.FC<TargetProps> = ({ target, onClick }) => {
  const getTypeStyles = () => {
    switch (target.type) {
      case 'bonus':
        return 'bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white';
      case 'multiplier':
        return 'bg-gradient-to-br from-[#33FF66] to-[#00CC44] text-white';
      default:
        return 'bg-gradient-to-br from-[#0088FF] to-[#0066CC] text-white';
    }
  };

  const getHaloColor = () => {
    switch (target.type) {
      case 'bonus':
        return 'rgba(249, 115, 22, 0.3)';
      case 'multiplier':
        return 'rgba(51, 255, 102, 0.3)';
      default:
        return 'rgba(0, 136, 255, 0.3)';
    }
  };

  const getShadowColor = () => {
    switch (target.type) {
      case 'bonus':
        return '#F97316';
      case 'multiplier':
        return '#33FF66';
      default:
        return '#0088FF';
    }
  };

  return (
    <div
      className={`absolute rounded-full flex items-center justify-center animate-pop cursor-pointer tap-target hardware-accelerated ${getTypeStyles()} shadow-lg backdrop-blur-sm`}
      style={{
        left: `${target.x}px`,
        top: `${target.y}px`,
        width: `${target.size}px`,
        height: `${target.size}px`,
        boxShadow: `0 0 15px ${getShadowColor()}`,
        border: '2px solid rgba(255, 255, 255, 0.2)',
        transform: 'scale(1)',
        transition: 'transform 0.1s ease-out',
        // Ensure minimum touch target size
        minWidth: '44px',
        minHeight: '44px',
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault(); // Prevent any default behavior
        onClick();
      }}
      // Add touch events for better mobile performance
      onTouchStart={(e) => {
        e.stopPropagation();
        // Prevent default to avoid scrolling/zooming
        e.preventDefault();
      }}
    >
      {/* Pulsing halo effect - optimized for performance */}
      <div
        className="absolute inset-0 rounded-full optimized-pulse hardware-accelerated"
        style={{
          background: `radial-gradient(circle, ${getHaloColor()} 0%, transparent 70%)`,
          transform: 'scale(1.2)',
          opacity: 0.5
        }}
      ></div>

      {target.type === 'normal' ? (
        <span className="font-bold text-lg relative z-10">{target.points}</span>
      ) : target.type === 'bonus' ? (
        <span className="font-bold text-lg relative z-10">+{target.points}</span>
      ) : (
        <span className="font-bold text-lg relative z-10">2x</span>
      )}

      {/* Inner glow effect */}
      <div
        className="absolute inset-0 rounded-full hardware-accelerated"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        }}
      ></div>
    </div>
  );
};

export default TapTarget;
