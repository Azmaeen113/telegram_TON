
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Wallet, QrCode, Check, Coins, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useGameStore } from "@/store/gameStore";

const WalletScreen: React.FC = () => {
  const { toast } = useToast();
  const { points } = useGameStore();
  const [walletConnected, setWalletConnected] = useState(false);

  // Mock conversion rate: 10,000 TapTokens = 0.01 TON
  const conversionRate = 10000;
  const minimumWithdrawal = 100000; // 0.1 TON minimum

  const tonAmount = points / conversionRate;
  const canWithdraw = points >= minimumWithdrawal;
  const progressPercentage = Math.min((points / minimumWithdrawal) * 100, 100);

  const connectWallet = () => {
    // Mock wallet connection
    toast({
      title: "Wallet Connected",
      description: "Your TON wallet has been successfully connected.",
      className: "bg-gradient-to-r from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]"
    });
    setWalletConnected(true);
  };

  const withdrawTON = () => {
    // Mock withdrawal process
    toast({
      title: "Withdrawal Initiated",
      description: `${tonAmount.toFixed(3)} TON will be sent to your wallet.`,
      className: "bg-gradient-to-r from-[#121830] to-[#0C0E1A] text-white border border-[#33FF66]"
    });
  };

  return (
    <div className="space-y-4 pb-32">
      <Card className="bg-gradient-to-br from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]/30 overflow-hidden relative">
        {/* Hexagonal grid background */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0zm0 5.62L9.9 16.98v26.04L30 54.38l20.1-11.36V16.98L30 5.62z' fill='%239933FF' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>

        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet size={20} className="text-[#0088FF]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">
              TON Wallet
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          {walletConnected ? (
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#9933FF]/10 to-[#0088FF]/10 p-4 rounded-lg border border-[#9933FF]/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0088FF] to-[#9933FF] flex items-center justify-center flex-shrink-0">
                <Check size={18} className="text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Wallet Connected</div>
                <div className="text-xs text-[#FFFFFF]/70 flex items-center gap-2">
                  <span>EQCd...3f9V</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#33FF66] animate-pulse"></span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#0C0E1A] to-[#121830] p-6 rounded-lg flex flex-col items-center border border-[#FFFFFF]/10">
              <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0088FF]/30 to-[#9933FF]/30 rounded-lg blur-md group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative z-10 w-32 h-32 bg-[#0C0E1A] rounded-lg border border-[#FFFFFF]/20 flex items-center justify-center p-4">
                  <QrCode size={80} className="text-white" />
                </div>
              </div>
              <p className="text-[#FFFFFF]/80 text-sm text-center mb-6">Connect your TON wallet to withdraw your earned TapTokens</p>
              <Button onClick={connectWallet} className="w-full bg-gradient-to-r from-[#0088FF] to-[#9933FF] hover:opacity-90 text-white relative group overflow-hidden border-none">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#33FF66]/0 via-[#33FF66]/30 to-[#33FF66]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Zap size={16} />
                  Connect Wallet
                </span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-[#121830] to-[#0C0E1A] text-white border border-[#9933FF]/30 overflow-hidden relative">
        {/* Hexagonal grid background */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15L30 0zm0 5.62L9.9 16.98v26.04L30 54.38l20.1-11.36V16.98L30 5.62z' fill='%239933FF' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>

        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg flex items-center gap-2">
            <Coins size={20} className="text-[#33FF66]" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">
              Convert TapTokens
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="bg-gradient-to-r from-[#0C0E1A] to-[#121830] p-4 rounded-lg border border-[#FFFFFF]/10">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-[#FFFFFF]/70">Your TapTokens</div>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0088FF] to-[#9933FF]">
                  {points.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#FFFFFF]/70">TON Equivalent</div>
                <div className="text-2xl font-bold text-[#33FF66]">{tonAmount.toFixed(3)} TON</div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#FFFFFF]/70 mb-2">
              <span>Progress to minimum withdrawal</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full bg-[#FFFFFF]/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${progressPercentage >= 100 ? 'bg-[#33FF66]' : 'bg-gradient-to-r from-[#0088FF] to-[#9933FF]'}`}
                style={{ width: `${progressPercentage}%`, transition: 'width 1s ease-out' }}
              ></div>
            </div>
            <div className="text-xs text-[#FFFFFF]/60 text-center mt-2">
              Minimum withdrawal: <span className="text-[#33FF66]">0.1 TON</span> ({minimumWithdrawal.toLocaleString()} TapTokens)
            </div>
          </div>

          <Separator className="bg-[#FFFFFF]/10" />

          <div className="text-sm">
            <div className="flex justify-between mb-2 py-2 px-3 bg-[#FFFFFF]/5 rounded-lg">
              <span className="text-[#FFFFFF]/80">Exchange Rate</span>
              <span className="text-[#FFFFFF]"><span className="text-[#0088FF]">{conversionRate.toLocaleString()}</span> TapTokens = <span className="text-[#33FF66]">0.01 TON</span></span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative z-10">
          <Button
            onClick={withdrawTON}
            className={`w-full ${canWithdraw ? 'bg-gradient-to-r from-[#33FF66] to-[#00CC44]' : 'bg-[#FFFFFF]/10'} text-white relative group overflow-hidden ${!walletConnected || !canWithdraw ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            disabled={!walletConnected || !canWithdraw}
          >
            {canWithdraw && (
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FFFFFF]/0 via-[#FFFFFF]/10 to-[#FFFFFF]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            )}
            <span className="relative z-10">
              {canWithdraw ? 'Withdraw TON' : `Need ${(minimumWithdrawal - points).toLocaleString()} more TapTokens`}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletScreen;
