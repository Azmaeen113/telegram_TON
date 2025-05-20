
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Trophy, Star, User, Coins } from "lucide-react"; // Added missing imports
import { useGameStore } from "@/store/gameStore";

const ProfileScreen: React.FC = () => {
  const { points, highestCombo, gamesPlayed } = useGameStore();
  
  // Mock data for achievements
  const achievements = [
    {
      name: "First Steps",
      description: "Play your first game",
      progress: 100,
      completed: true
    },
    {
      name: "Combo Master",
      description: "Reach a 10x combo",
      progress: Math.min((highestCombo / 10) * 100, 100),
      completed: highestCombo >= 10
    },
    {
      name: "Regular Tapper",
      description: "Play 5 games",
      progress: Math.min((gamesPlayed / 5) * 100, 100),
      completed: gamesPlayed >= 5
    }
  ];

  return (
    <div className="space-y-4 pb-20">
      <Card className="bg-gradient-to-br from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#9933FF]/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0088FF]/30 to-[#9933FF]/30 animate-pulse"></div>
              <User size={32} className="text-white relative z-10" />
            </div>
            <div>
              <h3 className="font-bold text-white">Telegram User</h3>
              <p className="text-sm text-[#FFFFFF]/70">Joined May 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#0088FF]/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0088FF]/20 to-[#0088FF]/10 animate-pulse"></div>
                <Coins size={24} className="text-[#0088FF] relative z-10" />
              </div>
              <div className="text-2xl font-bold text-white">{points.toLocaleString()}</div>
              <div className="text-xs text-[#FFFFFF]/70">TapTokens</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#9933FF]/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9933FF]/20 to-[#9933FF]/10 animate-pulse"></div>
                <Trophy size={24} className="text-[#9933FF] relative z-10" />
              </div>
              <div className="text-2xl font-bold text-white">{highestCombo}x</div>
              <div className="text-xs text-[#FFFFFF]/70">Best Combo</div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#33FF66]/20 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#33FF66]/20 to-[#33FF66]/10 animate-pulse"></div>
                <Star size={24} className="text-[#33FF66] relative z-10" />
              </div>
              <div className="text-2xl font-bold text-white">{gamesPlayed}</div>
              <div className="text-xs text-[#FFFFFF]/70">Games</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {achievement.completed ? (
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full animate-pulse bg-[#33FF66]/30"></div>
                      <Star className="text-[#33FF66] relative z-10" size={18} />
                    </div>
                  ) : (
                    <Star className="text-[#FFFFFF]/40" size={18} />
                  )}
                  <div>
                    <div className="font-medium text-white">{achievement.name}</div>
                    <div className="text-xs text-[#FFFFFF]/70">{achievement.description}</div>
                  </div>
                </div>
                {achievement.completed && (
                  <div className="text-xs font-medium text-[#33FF66]">Completed</div>
                )}
              </div>
              <Progress value={achievement.progress} className="h-1 bg-[#FFFFFF]/10">
                <div className="h-full bg-gradient-to-r from-[#0088FF] to-[#33FF66]" 
                     style={{ width: `${achievement.progress}%` }} />
              </Progress>
              {index < achievements.length - 1 && <Separator className="my-2 bg-[#FFFFFF]/10" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileScreen;
