"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  CreditCard,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "April 15, 2023",
    bio: "Crypto trader and blockchain enthusiast with 5+ years of experience in cryptocurrency markets. Focused on automated trading strategies for Bitcoin and Ethereum.",
    plan: "Basic",
    telegramConnected: true,
    totalTrades: 248,
    winRate: "67%",
    pnl: "$4,358.23",
    image: "",
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your profile information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Member Since</span>
                </div>
                <div>{user.memberSince}</div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Plan</span>
                </div>
                <div>{user.plan}</div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span>Telegram</span>
                </div>
                <div>{user.telegramConnected ? "Connected" : "Not Connected"}</div>
              </div>
              <div className="pt-2">
                <p className="text-sm font-medium">Bio</p>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/settings">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Trading Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Trading Summary</CardTitle>
            <CardDescription>Your overall trading performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Total Trades</span>
                  <span className="text-2xl font-bold">{user.totalTrades}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Win Rate</span>
                  <span className="text-2xl font-bold">{user.winRate}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Total P&L</span>
                  <span className="text-2xl font-bold pnl-positive">{user.pnl}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-muted-foreground">Active Strategies</span>
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Account Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Quick links to manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/api-connections">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage API Connections
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/trading">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Configure Trading Strategies
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/settings">
                  <User className="mr-2 h-4 w-4" />
                  Update Account Settings
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/plans">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Subscription
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/support">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="performance">Trading Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Account Activity</CardTitle>
              <CardDescription>
                Your recent account activities and events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLog.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.details}</TableCell>
                      <TableCell>{activity.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Trading Performance</CardTitle>
              <CardDescription>
                Overview of your trading performance by asset.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Trades</TableHead>
                    <TableHead>Win Rate</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((item) => (
                    <TableRow key={item.asset}>
                      <TableCell className="font-medium">{item.asset}</TableCell>
                      <TableCell>{item.trades}</TableCell>
                      <TableCell>{item.winRate}</TableCell>
                      <TableCell className={item.pnl.startsWith("+") ? "pnl-positive" : "pnl-negative"}>
                        {item.pnl}
                      </TableCell>
                      <TableCell className={item.roi.startsWith("+") ? "pnl-positive" : "pnl-negative"}>
                        {item.roi}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const activityLog = [
  {
    id: "1",
    date: "Apr 16, 2023",
    activity: "Login",
    details: "Successful login from Chrome on Windows",
    status: "Success",
  },
  {
    id: "2",
    date: "Apr 16, 2023",
    activity: "Strategy Created",
    details: "Created a new BTC Momentum Strategy",
    status: "Success",
  },
  {
    id: "3",
    date: "Apr 15, 2023",
    activity: "Trade Executed",
    details: "BUY 0.05 BTC at $42,500",
    status: "Success",
  },
  {
    id: "4",
    date: "Apr 15, 2023",
    activity: "API Connection",
    details: "Added Binance API connection",
    status: "Success",
  },
  {
    id: "5",
    date: "Apr 14, 2023",
    activity: "Trade Executed",
    details: "SELL 10 SOL at $105.25",
    status: "Success",
  },
];

const performanceData = [
  {
    asset: "BTC/USDT",
    trades: 125,
    winRate: "68%",
    pnl: "+$2,458.90",
    roi: "+12.4%",
  },
  {
    asset: "ETH/USDT",
    trades: 87,
    winRate: "71%",
    pnl: "+$1,789.45",
    roi: "+15.2%",
  },
  {
    asset: "SOL/USDT",
    trades: 32,
    winRate: "59%",
    pnl: "+$452.30",
    roi: "+8.9%",
  },
  {
    asset: "ADA/USDT",
    trades: 18,
    winRate: "44%",
    pnl: "-$120.42",
    roi: "-3.8%",
  },
  {
    asset: "DOT/USDT",
    trades: 24,
    winRate: "63%",
    pnl: "+$189.75",
    roi: "+5.7%",
  },
];
