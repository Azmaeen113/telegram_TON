
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Timer, Star, Zap } from "lucide-react";
import TapTarget from "@/components/TapTarget";
import GameTimer from "@/components/GameTimer";
import PointsDisplay from "@/components/PointsDisplay";
import { useGameStore } from "@/store/gameStore";
import ComboIndicator from "./ComboIndicator";
import { useTelegram } from "@/hooks/useTelegram";

interface TargetPosition {
  id: number;
  x: number;
  y: number;
  size: number;
  points: number;
  type: 'normal' | 'bonus' | 'multiplier';
}

const GameScreen: React.FC = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [targets, setTargets] = useState<TargetPosition[]>([]);
  const [lastTap, setLastTap] = useState(0);
  const [combo, setCombo] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { points, addPoints, resetPoints, incrementGamesPlayed, updateHighestCombo } = useGameStore();
  const [particleEffects, setParticleEffects] = useState<{x: number, y: number, value: number}[]>([]);
  const [frameId, setFrameId] = useState<number | null>(null);
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [hasMultiplier, setHasMultiplier] = useState(false);
  const [multiplierEndTime, setMultiplierEndTime] = useState(0);

  // Telegram integration
  const {
    showMainButton,
    hideMainButton,
    triggerHapticFeedback,
    isInTelegram
  } = useTelegram({
    onBackButton: () => {
      if (isPlaying) {
        // Confirm before exiting game
        if (window.confirm("Are you sure you want to exit the game? Your progress will be lost.")) {
          setIsPlaying(false);
        }
      }
    }
  });

  const generateTarget = useCallback(() => {
    if (!gameAreaRef.current) return;

    const areaWidth = gameAreaRef.current.clientWidth;
    const areaHeight = gameAreaRef.current.clientHeight;

    // Determine target type based on probability
    const rand = Math.random();
    let type: 'normal' | 'bonus' | 'multiplier' = 'normal';
    let pointValue = 1;
    let size = 60;

    if (rand > 0.95) {
      type = 'multiplier';
      pointValue = 2; // Multiplier value
      size = 50;
    } else if (rand > 0.8) {
      type = 'bonus';
      pointValue = 5;
      size = 70;
    }

    const maxX = areaWidth - size;
    const maxY = areaHeight - size;

    const newTarget: TargetPosition = {
      id: Date.now(),
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
      size,
      points: pointValue,
      type,
    };

    setTargets(prev => [...prev, newTarget]);
  }, []);

  const handleTargetClick = (target: TargetPosition) => {
    // Create particle effect at tap location
    setParticleEffects(prev => [...prev, {
      x: target.x + target.size / 2,
      y: target.y + target.size / 2,
      value: target.points
    }]);

    // Trigger haptic feedback for better user experience
    if (isInTelegram) {
      triggerHapticFeedback(target.type === 'bonus' || target.type === 'multiplier' ? 'impact' : 'selection');
    }

    // Remove the tapped target
    setTargets(prev => prev.filter(t => t.id !== target.id));

    // Calculate time since last tap
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;
    setLastTap(now);

    // Update combo if tap was quick enough
    let currentCombo = combo;
    if (timeSinceLastTap < 1000) {
      currentCombo += 1;
      setCombo(currentCombo);
      // Update highest combo in store
      updateHighestCombo(currentCombo);
    } else {
      currentCombo = 0;
      setCombo(0);
    }

    // Calculate points with combo multiplier
    let pointsEarned = target.points;
    const comboMultiplier = Math.min(1 + (currentCombo * 0.1), 2); // Max 2x multiplier

    // Apply active multiplier if exists
    const now2 = Date.now();
    const hasActiveMultiplier = hasMultiplier && now2 < multiplierEndTime;
    const totalMultiplier = hasActiveMultiplier ? comboMultiplier * 2 : comboMultiplier;

    if (target.type === 'multiplier') {
      // Multiplier target doubles points for next 5 seconds
      setHasMultiplier(true);
      setMultiplierEndTime(now2 + 5000); // 5 seconds from now

      toast({
        title: "2x Multiplier!",
        description: "Points doubled for 5 seconds!",
        duration: 2000,
        className: "bg-gradient-to-r from-[#0088FF] to-[#9933FF] text-white border-[#33FF66]"
      });
    } else {
      pointsEarned = Math.floor(pointsEarned * totalMultiplier);
      addPoints(pointsEarned);
    }

    // Generate new target faster as game progresses
    const delay = Math.max(1000 - (60 - timeLeft) * 10, 200);
    setTimeout(generateTarget, delay);
  };

  // Clean up particle effects after animation
  useEffect(() => {
    if (particleEffects.length > 0) {
      const timer = setTimeout(() => {
        setParticleEffects([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [particleEffects]);

  // Game animation loop using requestAnimationFrame for smooth performance
  const gameLoop = useCallback((timestamp: number) => {
    if (!lastFrameTime) {
      setLastFrameTime(timestamp);
      setFrameId(requestAnimationFrame(gameLoop));
      return;
    }

    const deltaTime = timestamp - lastFrameTime;

    // Check if multiplier has expired
    if (hasMultiplier && Date.now() >= multiplierEndTime) {
      setHasMultiplier(false);
    }

    // Update game state based on deltaTime if needed
    // This is where you would update positions, physics, etc.

    setLastFrameTime(timestamp);
    setFrameId(requestAnimationFrame(gameLoop));
  }, [lastFrameTime, hasMultiplier, multiplierEndTime]);

  // Start the game loop when playing
  useEffect(() => {
    if (isPlaying) {
      setFrameId(requestAnimationFrame(gameLoop));
    } else if (frameId !== null) {
      cancelAnimationFrame(frameId);
      setFrameId(null);
      setLastFrameTime(0);
    }

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isPlaying, gameLoop, frameId]);

  const startGame = () => {
    resetPoints();
    setIsPlaying(true);
    setTimeLeft(60);
    setTargets([]);
    setCombo(0);
    setHasMultiplier(false);
    incrementGamesPlayed();

    // Hide main button during gameplay
    hideMainButton();

    // Generate first target
    setTimeout(generateTarget, 500);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);

          // Show main button after game ends
          showMainButton("Play Again", startGame);

          // Trigger haptic feedback for game over
          if (isInTelegram) {
            triggerHapticFeedback('notification');
          }

          toast({
            title: "Game Over!",
            description: `You earned ${points} TapTokens!`,
            className: "bg-gradient-to-r from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]"
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, points, toast, showMainButton, triggerHapticFeedback, isInTelegram]);

  // Clean up game state when component unmounts or when switching tabs
  useEffect(() => {
    return () => {
      if (isPlaying) {
        setIsPlaying(false);
        if (frameId !== null) {
          cancelAnimationFrame(frameId);
          setFrameId(null);
        }
      }
    };
  }, [isPlaying, frameId]);

  // Show main button when not playing
  useEffect(() => {
    if (!isPlaying) {
      showMainButton("Start Game", startGame);
    }
  }, [isPlaying, showMainButton]);

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)]">
      <div className="flex justify-between items-center mb-4">
        <PointsDisplay points={points} />
        {isPlaying && <GameTimer timeLeft={timeLeft} />}
      </div>

      {isPlaying ? (
        <div
          ref={gameAreaRef}
          className="relative flex-1 bg-gradient-to-br from-[#121830] to-[#0C0E1A] rounded-lg shadow-lg overflow-hidden border border-[#9933FF]/30"
        >
          {/* Hexagonal grid background */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0zm0 5.62L9.9 16.98v26.04L30 54.38l20.1-11.36V16.98L30 5.62z' fill='%239933FF' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>

          {/* Floating particles */}
          {Array.from({length: 20}).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#0088FF] opacity-50 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`
              }}
            ></div>
          ))}

          {targets.map(target => (
            <TapTarget
              key={target.id}
              target={target}
              onClick={() => handleTargetClick(target)}
            />
          ))}

          {/* Point particle effects */}
          {particleEffects.map((effect, index) => (
            <div
              key={`effect-${index}`}
              className="absolute z-20 text-white font-bold animate-fade-in pointer-events-none"
              style={{
                left: effect.x,
                top: effect.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              +{effect.value}
            </div>
          ))}

          {combo > 0 && <ComboIndicator combo={combo} />}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-[#121830] to-[#0C0E1A] rounded-lg shadow-lg border border-[#9933FF]/30 p-6 overflow-hidden relative">
          {/* Hexagonal grid background */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0zm0 5.62L9.9 16.98v26.04L30 54.38l20.1-11.36V16.98L30 5.62z' fill='%239933FF' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>

          {/* Animated logo */}
          <div className="animate-float mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-[#0088FF]/30 animate-pulse"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-[#0088FF] to-[#9933FF] rounded-full flex items-center justify-center relative z-10">
              <Zap size={48} className="text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">TON Tapper</h2>
          <p className="text-[#FFFFFF]/80 text-center mb-8 max-w-xs">
            Tap quickly to earn TapTokens and convert them to real TON cryptocurrency!
          </p>

          {!isInTelegram && (
            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-[#0088FF] to-[#9933FF] hover:opacity-90 text-white shadow-lg shadow-[#9933FF]/20 relative group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#33FF66]/0 via-[#33FF66]/30 to-[#33FF66]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative z-10">Start Game</span>
            </Button>
          )}

          {isInTelegram && (
            <p className="text-[#FFFFFF]/70 text-sm text-center mt-4">
              Press the button below to start the game
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
