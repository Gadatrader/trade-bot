"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of platform statistics and metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            Generate Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,248</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUp className="h-3.5 w-3.5 text-success" />
              <span className="text-success">+12.5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">852</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3.5 w-3.5 text-success" />
              <span className="text-success">+24.3%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,580</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUp className="h-3.5 w-3.5 text-success" />
              <span className="text-success">+8.2%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowDown className="h-3.5 w-3.5 text-destructive" />
              <span className="text-destructive">-4</span>
              <span>from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue breakdown for the current year.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
                <CardDescription>
                  New user registrations over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">User Growth Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Registrations</CardTitle>
              <CardDescription>
                The newest users who joined the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{user.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
              <CardDescription>
                The most recent trades executed on the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{trade.symbol}</p>
                      <p className="text-sm text-muted-foreground">{trade.user}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className={`text-sm font-medium ${trade.type === "BUY" ? "text-success" : "text-destructive"}`}>
                        {trade.type} @ {trade.price}
                      </p>
                      <p className="text-xs text-muted-foreground">{trade.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Recent support tickets requiring attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{ticket.title}</p>
                      <p className="text-sm text-muted-foreground">{ticket.user}</p>
                    </div>
                    <div className="ml-auto flex flex-col items-end">
                      <p className={`text-xs px-2 py-0.5 rounded-full ${
                        ticket.status === "Open"
                          ? "bg-destructive/20 text-destructive"
                          : ticket.status === "In Progress"
                            ? "bg-warning/20 text-warning"
                            : "bg-success/20 text-success"
                      }`}>
                        {ticket.status}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{ticket.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Admin Actions</CardTitle>
          <CardDescription>
            Frequently used admin actions
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Button asChild variant="outline" className="h-20 flex flex-col justify-center">
            <Link href="/admin/users">
              <Users className="h-5 w-5 mb-1" />
              <span>Manage Users</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 flex flex-col justify-center">
            <Link href="/admin/strategies">
              <BarChart3 className="h-5 w-5 mb-1" />
              <span>Edit Strategies</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 flex flex-col justify-center">
            <Link href="/admin/plans">
              <DollarSign className="h-5 w-5 mb-1" />
              <span>Manage Plans</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 flex flex-col justify-center">
            <Link href="/admin/support">
              <Users className="h-5 w-5 mb-1" />
              <span>Support Tickets</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample Data
const recentUsers = [
  {
    id: "1",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    date: "2 hours ago",
  },
  {
    id: "2",
    name: "William Chen",
    email: "william.chen@example.com",
    date: "4 hours ago",
  },
  {
    id: "3",
    name: "Sophia Johnson",
    email: "sophia.johnson@example.com",
    date: "1 day ago",
  },
  {
    id: "4",
    name: "Mohammed Ali",
    email: "mohammed.ali@example.com",
    date: "1 day ago",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    date: "2 days ago",
  },
];

const recentTrades = [
  {
    id: "1",
    symbol: "BTC/USDT",
    user: "james.wilson@example.com",
    type: "BUY",
    price: "$42,250.75",
    date: "30 min ago",
  },
  {
    id: "2",
    symbol: "ETH/USDT",
    user: "sarah.brown@example.com",
    type: "SELL",
    price: "$2,350.50",
    date: "45 min ago",
  },
  {
    id: "3",
    symbol: "SOL/USDT",
    user: "david.kim@example.com",
    type: "BUY",
    price: "$105.25",
    date: "1 hour ago",
  },
  {
    id: "4",
    symbol: "ADA/USDT",
    user: "lisa.garcia@example.com",
    type: "BUY",
    price: "$0.45",
    date: "2 hours ago",
  },
  {
    id: "5",
    symbol: "DOT/USDT",
    user: "michael.johnson@example.com",
    type: "SELL",
    price: "$6.75",
    date: "3 hours ago",
  },
];

const supportTickets = [
  {
    id: "1",
    title: "API Connection Issue",
    user: "robert.smith@example.com",
    status: "Open",
    date: "1 hour ago",
  },
  {
    id: "2",
    title: "Payment Failed",
    user: "jennifer.lee@example.com",
    status: "In Progress",
    date: "3 hours ago",
  },
  {
    id: "3",
    title: "Strategy Not Working",
    user: "thomas.wilson@example.com",
    status: "In Progress",
    date: "5 hours ago",
  },
  {
    id: "4",
    title: "Account Access Issue",
    user: "maria.garcia@example.com",
    status: "Resolved",
    date: "1 day ago",
  },
  {
    id: "5",
    title: "Refund Request",
    user: "daniel.brown@example.com",
    status: "Open",
    date: "1 day ago",
  },
];
