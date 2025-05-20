
import React, { useState, useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Star } from "lucide-react";

// Mock data for leaderboard
const mockLeaderboardData = {
  daily: [
    { rank: 1, name: "TapMaster", score: 12800, isCurrentUser: false },
    { rank: 2, name: "CryptoTapper", score: 10500, isCurrentUser: false },
    { rank: 3, name: "TONLover", score: 9850, isCurrentUser: false },
    { rank: 4, name: "BlockchainPro", score: 8720, isCurrentUser: false },
    { rank: 5, name: "You", score: 7500, isCurrentUser: true },
    { rank: 6, name: "TONFan", score: 6900, isCurrentUser: false },
    { rank: 7, name: "CoinCollector", score: 5800, isCurrentUser: false },
    { rank: 8, name: "TapKing", score: 4750, isCurrentUser: false },
    { rank: 9, name: "CryptoQueen", score: 3900, isCurrentUser: false },
    { rank: 10, name: "TokenMaster", score: 3200, isCurrentUser: false },
  ],
  weekly: [
    { rank: 1, name: "TokenMaster", score: 45000, isCurrentUser: false },
    { rank: 2, name: "TapMaster", score: 38000, isCurrentUser: false },
    { rank: 3, name: "You", score: 32500, isCurrentUser: true },
    { rank: 4, name: "CoinCollector", score: 28900, isCurrentUser: false },
    { rank: 5, name: "TapKing", score: 25600, isCurrentUser: false },
    { rank: 6, name: "BlockchainPro", score: 22800, isCurrentUser: false },
    { rank: 7, name: "CryptoTapper", score: 18900, isCurrentUser: false },
    { rank: 8, name: "TONLover", score: 16700, isCurrentUser: false },
    { rank: 9, name: "CryptoQueen", score: 14500, isCurrentUser: false },
    { rank: 10, name: "TONFan", score: 12300, isCurrentUser: false },
  ],
  allTime: [
    { rank: 1, name: "TokenMaster", score: 185000, isCurrentUser: false },
    { rank: 2, name: "TapMaster", score: 162000, isCurrentUser: false },
    { rank: 3, name: "BlockchainPro", score: 143000, isCurrentUser: false },
    { rank: 4, name: "CoinCollector", score: 126000, isCurrentUser: false },
    { rank: 5, name: "CryptoTapper", score: 115000, isCurrentUser: false },
    { rank: 6, name: "TONLover", score: 98000, isCurrentUser: false },
    { rank: 7, name: "TapKing", score: 87500, isCurrentUser: false },
    { rank: 8, name: "You", score: 76200, isCurrentUser: true },
    { rank: 9, name: "CryptoQueen", score: 68900, isCurrentUser: false },
    { rank: 10, name: "TONFan", score: 59000, isCurrentUser: false },
  ],
};

const LeaderboardScreen: React.FC = () => {
  const [leaderboardType, setLeaderboardType] = useState("daily");

  // Function to render rank emblem/medal
  const renderRank = (rank: number, isCurrentUser: boolean) => {
    if (rank <= 3) {
      let medalColor = '';
      let medalIcon = Award;

      if (rank === 1) {
        medalColor = '#FFD700'; // Gold
      } else if (rank === 2) {
        medalColor = '#C0C0C0'; // Silver
      } else {
        medalColor = '#CD7F32'; // Bronze
      }

      return (
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${isCurrentUser ? 'animate-pulse' : ''}`} style={{ background: `linear-gradient(to bottom right, ${medalColor}, ${medalColor}99)` }}>
          <span className="text-white font-bold text-sm">{rank}</span>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isCurrentUser ? 'bg-[#9933FF]/30' : 'bg-[#FFFFFF]/10'}`}>
        <span className={`font-medium text-sm ${isCurrentUser ? 'text-white' : 'text-[#FFFFFF]/80'}`}>{rank}</span>
      </div>
    );
  };

  // Generate a unique ID for this component's tabs to avoid conflicts with main navigation
  const tabsId = useId();

  return (
    <div className="pb-20">
      <Card className="bg-gradient-to-br from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]/30">
        <CardHeader className="pb-2 flex flex-row items-center">
          <Trophy size={22} className="text-[#FFD700] mr-2" />
          <CardTitle className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            id={`leaderboard-tabs-${tabsId}`}
            defaultValue="daily"
            value={leaderboardType}
            onValueChange={setLeaderboardType}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4 bg-[#0C0E1A]">
              <TabsTrigger value="daily" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]">Weekly</TabsTrigger>
              <TabsTrigger value="allTime" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]">All Time</TabsTrigger>
            </TabsList>

            {["daily", "weekly", "allTime"].map((period) => (
              <TabsContent key={period} value={period} className="mt-0">
                <div className="rounded-lg overflow-hidden bg-[#0C0E1A]/50 border border-[#FFFFFF]/5">
                  <div className="grid grid-cols-12 gap-2 p-3 text-[#FFFFFF]/70 text-sm border-b border-[#FFFFFF]/10">
                    <div className="col-span-2 text-center font-medium">Rank</div>
                    <div className="col-span-6 font-medium">Player</div>
                    <div className="col-span-4 text-right font-medium">Score</div>
                  </div>

                  <div className="max-h-[400px] overflow-y-auto">
                    {mockLeaderboardData[period as keyof typeof mockLeaderboardData].map((entry, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-12 gap-2 p-3 items-center ${
                          entry.isCurrentUser ? 'bg-[#9933FF]/10 border-l-2 border-[#9933FF]' :
                          index % 2 === 0 ? 'bg-[#FFFFFF]/5' : ''
                        } border-b border-[#FFFFFF]/5 transition-all hover:bg-[#FFFFFF]/10`}
                        style={{
                          animation: entry.isCurrentUser ? 'fadeIn 0.5s ease-out' : `fadeIn ${0.1 + index * 0.05}s ease-out`,
                        }}
                      >
                        <div className="col-span-2 flex justify-center">
                          {renderRank(entry.rank, entry.isCurrentUser)}
                        </div>
                        <div className="col-span-6 font-medium flex items-center">
                          {entry.isCurrentUser ? (
                            <>
                              <span className="text-white">{entry.name}</span>
                              <Star size={16} className="ml-1 text-[#33FF66]" />
                            </>
                          ) : (
                            <span className="text-white">{entry.name}</span>
                          )}
                        </div>
                        <div className="col-span-4 text-right font-bold text-[#FFFFFF]">
                          {entry.score.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardScreen;
