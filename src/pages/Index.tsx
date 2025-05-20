
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Trophy, User, Wallet } from "lucide-react";
import GameScreen from "@/components/GameScreen";
import ProfileScreen from "@/components/ProfileScreen";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import WalletScreen from "@/components/WalletScreen";
import { useTelegram } from "@/hooks/useTelegram";
import { useGameStore } from "@/store/gameStore";

const Index: React.FC = () => {
  // Use the game store to persist the active tab across renders
  const { activeTab, setActiveTab } = useGameStore(state => ({
    activeTab: state.activeTab || "game",
    setActiveTab: state.setActiveTab
  }));
  const { isInTelegram, theme } = useTelegram();

  // Handle tab change with proper state update
  const handleTabChange = useCallback((value: string) => {
    console.log(`Changing main tab to: ${value}`);
    setActiveTab(value);
  }, [setActiveTab]);

  // Apply Telegram-specific class to body
  useEffect(() => {
    if (isInTelegram) {
      document.body.classList.add('in-telegram');
    } else {
      document.body.classList.remove('in-telegram');
    }

    // Apply theme class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      document.body.classList.remove('in-telegram');
    };
  }, [isInTelegram, theme]);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#121830] to-[#0C0E1A] text-white ${isInTelegram ? 'in-telegram' : ''}`}>
      <div className="container mx-auto px-4 py-6 app-content">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0088FF] to-[#9933FF] bg-clip-text text-transparent relative inline-block">
            TON Tapper
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#33FF66] rounded-full animate-pulse hardware-accelerated"></div>
          </h1>
          <p className="text-[#FFFFFF]/70 text-sm mt-1">Tap to earn TON cryptocurrency</p>
        </div>

        <Tabs
          id="main-navigation-tabs"
          defaultValue="game"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
          activationMode="manual" // Ensure manual activation for better control
        >
          <TabsContent value="game" className="mt-0">
            <GameScreen />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <ProfileScreen />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0">
            <LeaderboardScreen />
          </TabsContent>

          <TabsContent value="wallet" className="mt-0">
            <WalletScreen />
          </TabsContent>

          {/* Navigation bar - fixed at the bottom */}
          <div className={`fixed bottom-0 left-0 right-0 bg-[#121830]/80 backdrop-blur-lg border-t border-[#9933FF]/30 p-2 z-50 ${isInTelegram ? 'pb-20' : 'pb-2'}`}>
            <TabsList className="w-full grid grid-cols-4 gap-2 bg-[#0C0E1A]/50">
              <TabsTrigger
                value="game"
                className="flex flex-col items-center py-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]"
                onClick={() => handleTabChange("game")}
              >
                <Play size={20} />
                <span className="text-xs mt-1">Play</span>
              </TabsTrigger>

              <TabsTrigger
                value="profile"
                className="flex flex-col items-center py-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]"
                onClick={() => handleTabChange("profile")}
              >
                <User size={20} />
                <span className="text-xs mt-1">Profile</span>
              </TabsTrigger>

              <TabsTrigger
                value="leaderboard"
                className="flex flex-col items-center py-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]"
                onClick={() => handleTabChange("leaderboard")}
              >
                <Trophy size={20} />
                <span className="text-xs mt-1">Leaders</span>
              </TabsTrigger>

              <TabsTrigger
                value="wallet"
                className="flex flex-col items-center py-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0088FF] data-[state=active]:to-[#9933FF]"
                onClick={() => handleTabChange("wallet")}
              >
                <Wallet size={20} />
                <span className="text-xs mt-1">Wallet</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
