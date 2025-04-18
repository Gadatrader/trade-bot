"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ArrowUpRight, ArrowDownRight, Clock, Activity, TrendingUp, BarChart, LineChart } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your trading performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              +14% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pnl-positive">+$4,358.23</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly ROI</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trades Overview */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Trading Activity</h2>
          <TabsList>
            <TabsTrigger value="all">All Trades</TabsTrigger>
            <TabsTrigger value="open">Open Positions</TabsTrigger>
            <TabsTrigger value="closed">Closed Trades</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {/* Render trades here */}
            {sampleTrades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="open" className="space-y-4">
          <div className="grid gap-4">
            {/* Render open trades here */}
            {sampleTrades
              .filter((trade) => trade.status === "OPEN")
              .map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <div className="grid gap-4">
            {/* Render closed trades here */}
            {sampleTrades
              .filter((trade) => trade.status === "CLOSED")
              .map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

type TradeProps = {
  trade: typeof sampleTrades[number];
};

function TradeCard({ trade }: TradeProps) {
  const isProfitable = trade.pnl ? trade.pnl > 0 : false;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center">
              <span className="font-medium">{trade.symbol}</span>
              <div className={`ml-3 px-2 py-0.5 rounded text-xs ${
                trade.side === "BUY"
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              }`}>
                {trade.side}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {trade.quantity} @ ${trade.price.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col items-end space-y-1">
            {trade.status === "OPEN" ? (
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium">Open Position</span>
              </div>
            ) : (
              <div className={`flex items-center ${isProfitable ? "pnl-positive" : "pnl-negative"}`}>
                {isProfitable ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                <span className="text-sm font-medium">
                  {isProfitable ? "+" : ""}${trade.pnl?.toFixed(2)} ({trade.pnlPercentage?.toFixed(2)}%)
                </span>
              </div>
            )}
            <span className="text-xs text-muted-foreground">
              {trade.status === "OPEN"
                ? formatDate(trade.createdAt)
                : formatDate(trade.closedAt || trade.createdAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to format dates
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

// Sample data
const sampleTrades = [
  {
    id: "1",
    symbol: "BTC/USDT",
    side: "BUY" as const,
    quantity: 0.05,
    price: 42500.75,
    status: "CLOSED" as const,
    createdAt: "2023-04-15T10:30:00Z",
    closedAt: "2023-04-15T14:45:00Z",
    pnl: 125.5,
    pnlPercentage: 2.35,
  },
  {
    id: "2",
    symbol: "ETH/USDT",
    side: "BUY" as const,
    quantity: 0.8,
    price: 2245.50,
    status: "OPEN" as const,
    createdAt: "2023-04-16T09:15:00Z",
    closedAt: null,
    pnl: null,
    pnlPercentage: null,
  },
  {
    id: "3",
    symbol: "SOL/USDT",
    side: "SELL" as const,
    quantity: 10,
    price: 105.25,
    status: "CLOSED" as const,
    createdAt: "2023-04-14T16:20:00Z",
    closedAt: "2023-04-14T18:30:00Z",
    pnl: -45.6,
    pnlPercentage: -1.85,
  },
  {
    id: "4",
    symbol: "ADA/USDT",
    side: "BUY" as const,
    quantity: 500,
    price: 0.45,
    status: "OPEN" as const,
    createdAt: "2023-04-16T11:40:00Z",
    closedAt: null,
    pnl: null,
    pnlPercentage: null,
  },
  {
    id: "5",
    symbol: "DOT/USDT",
    side: "SELL" as const,
    quantity: 30,
    price: 6.75,
    status: "CLOSED" as const,
    createdAt: "2023-04-13T14:05:00Z",
    closedAt: "2023-04-14T10:20:00Z",
    pnl: 87.3,
    pnlPercentage: 4.2,
  },
];
