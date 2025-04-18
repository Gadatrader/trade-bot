"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CandlestickChart,
  PauseCircle,
  PlayCircle,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

export default function TradingPage() {
  // State to track which strategies are active
  const [activeStrategies, setActiveStrategies] = useState<{ [key: string]: boolean }>({
    "1": true, // BTC Momentum Strategy is active by default
    "2": false, // ETH Conservative is inactive by default
  });

  const toggleStrategy = (strategyId: string) => {
    setActiveStrategies(prev => {
      const isCurrentlyActive = prev[strategyId];

      // Show toast based on the new state
      if (isCurrentlyActive) {
        toast.success(`Strategy stopped successfully!`);
      } else {
        toast.success(`Strategy started successfully!`);
      }

      return {
        ...prev,
        [strategyId]: !isCurrentlyActive
      };
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trading Strategies</h1>
        <p className="text-muted-foreground">
          Control your automated trading strategies.
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Strategies</TabsTrigger>
          <TabsTrigger value="history">Performance History</TabsTrigger>
        </TabsList>

        {/* Active Strategies Tab */}
        <TabsContent value="active" className="space-y-4">
          {strategies.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <AlertCircle className="mb-2 h-10 w-10 text-muted-foreground/70" />
                <h3 className="font-medium">No active strategies</h3>
                <p className="text-sm text-muted-foreground">
                  You don&apos;t have any trading strategies set up yet. Please contact support to set up a strategy.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {strategies.map((strategy) => (
                <Card key={strategy.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{strategy.name}</CardTitle>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${
                          activeStrategies[strategy.id]
                            ? "bg-success/20 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {activeStrategies[strategy.id] ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <CardDescription>
                      {strategy.exchange} • {strategy.tradingPair}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Strategy</p>
                        <p className="font-medium">{strategy.strategy}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timeframe</p>
                        <p className="font-medium">{strategy.timeframe}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Initial Investment</p>
                        <p className="font-medium">{strategy.initialInvestment} USDT</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Risk Level</p>
                        <p className="font-medium">{strategy.riskLevel}/10</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Take Profit</p>
                        <p className="font-medium">{strategy.takeProfitPercentage}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Stop Loss</p>
                        <p className="font-medium">{strategy.stopLossPercentage}%</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-4">
                    <Button
                      variant={activeStrategies[strategy.id] ? "destructive" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() => toggleStrategy(strategy.id)}
                    >
                      {activeStrategies[strategy.id] ? (
                        <>
                          <PauseCircle className="mr-2 h-4 w-4" />
                          Stop Trading
                        </>
                      ) : (
                        <>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Start Trading
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Performance History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Performance History</CardTitle>
              <CardDescription>
                Detailed performance metrics for your trading strategies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md bg-muted p-8 text-center">
                <CandlestickChart className="mx-auto h-10 w-10 text-muted-foreground/70" />
                <h3 className="mt-2 font-medium">Performance charts are coming soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  We&apos;re working on detailed performance metrics and visualizations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const strategies = [
  {
    id: "1",
    name: "BTC Momentum Strategy",
    exchange: "Binance",
    tradingPair: "BTC/USDT",
    strategy: "MA Crossover",
    timeframe: "1h",
    initialInvestment: 1000,
    riskLevel: 7,
    takeProfitPercentage: 5,
    stopLossPercentage: 3,
    createdAt: "2023-03-15T14:30:00Z",
  },
  {
    id: "2",
    name: "ETH Conservative",
    exchange: "Coinbase",
    tradingPair: "ETH/USDT",
    strategy: "Bollinger Bands",
    timeframe: "4h",
    initialInvestment: 500,
    riskLevel: 4,
    takeProfitPercentage: 2.5,
    stopLossPercentage: 2,
    createdAt: "2023-03-10T09:45:00Z",
  },
];
