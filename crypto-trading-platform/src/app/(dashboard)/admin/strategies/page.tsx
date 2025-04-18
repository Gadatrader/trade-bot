"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Edit,
  Filter,
  PauseCircle,
  PlayCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const strategyFormSchema = z.object({
  name: z.string().min(2, {
    message: "Strategy name must be at least 2 characters.",
  }),
  exchange: z.string({
    required_error: "Please select an exchange.",
  }),
  tradingPair: z.string({
    required_error: "Please select a trading pair.",
  }),
  strategy: z.string({
    required_error: "Please select a strategy.",
  }),
  timeframe: z.string({
    required_error: "Please select a timeframe.",
  }),
  initialInvestment: z.coerce.number().min(10, {
    message: "Initial investment must be at least 10 USDT.",
  }),
  riskLevel: z.coerce.number().min(1).max(10),
  takeProfitPercentage: z.coerce.number().min(0.1, {
    message: "Take profit must be at least 0.1%.",
  }),
  stopLossPercentage: z.coerce.number().min(0.1, {
    message: "Stop loss must be at least 0.1%.",
  }),
  owner: z.string({
    required_error: "Please select a user.",
  }),
  isActive: z.boolean().default(false),
});

type StrategyFormValues = z.infer<typeof strategyFormSchema>;

export default function AdminStrategiesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStrategies, setActiveStrategies] = useState<{ [key: string]: boolean }>({
    "1": true,
    "2": false,
    "3": true,
    "4": false,
    "5": true,
  });
  const [currentStrategy, setCurrentStrategy] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExchange, setFilterExchange] = useState<string | null>(null);

  // Form setup for adding/editing strategies
  const form = useForm<StrategyFormValues>({
    resolver: zodResolver(strategyFormSchema),
    defaultValues: {
      name: "",
      exchange: "",
      tradingPair: "",
      strategy: "",
      timeframe: "",
      initialInvestment: 100,
      riskLevel: 5,
      takeProfitPercentage: 3,
      stopLossPercentage: 2,
      owner: "",
      isActive: false,
    },
  });

  // Handler for adding a new strategy
  function onSubmitAdd(data: StrategyFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Adding new strategy:", data);
      setIsLoading(false);
      toast.success("Strategy added successfully!");
      setIsAddDialogOpen(false);
      form.reset();
    }, 1000);
  }

  // Handler for editing an existing strategy
  function onSubmitEdit(data: StrategyFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Editing strategy:", data);
      setIsLoading(false);
      toast.success("Strategy updated successfully!");
      setIsEditDialogOpen(false);
    }, 1000);
  }

  // Handler for toggling strategy status
  const toggleStrategy = (strategyId: string) => {
    setActiveStrategies(prev => {
      const isCurrentlyActive = prev[strategyId];

      // Show toast based on the new state
      if (isCurrentlyActive) {
        toast.success("Strategy stopped successfully!");
      } else {
        toast.success("Strategy started successfully!");
      }

      return {
        ...prev,
        [strategyId]: !isCurrentlyActive
      };
    });
  };

  // Handler for deleting a strategy
  const deleteStrategy = (strategyId: string) => {
    // Simulate API call
    toast.success("Strategy deleted successfully!");
  };

  // Handler for editing a strategy - populate the form with the selected strategy data
  const handleEditStrategy = (strategyId: string) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (strategy) {
      setCurrentStrategy(strategyId);
      form.reset({
        name: strategy.name,
        exchange: strategy.exchange.toLowerCase(),
        tradingPair: strategy.tradingPair,
        strategy: strategy.strategy.replace(/ /g, "_").toUpperCase(),
        timeframe: strategy.timeframe,
        initialInvestment: strategy.initialInvestment,
        riskLevel: strategy.riskLevel,
        takeProfitPercentage: strategy.takeProfitPercentage,
        stopLossPercentage: strategy.stopLossPercentage,
        owner: strategy.owner,
        isActive: activeStrategies[strategyId],
      });
      setIsEditDialogOpen(true);
    }
  };

  // Filter strategies based on search term and exchange filter
  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = searchTerm === "" ||
      strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      strategy.tradingPair.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesExchange = filterExchange === null || strategy.exchange === filterExchange;

    return matchesSearch && matchesExchange;
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Trading Strategies</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage all user trading strategies.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Strategy
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Strategy</DialogTitle>
              <DialogDescription>
                Create a new trading strategy for a user.
              </DialogDescription>
            </DialogHeader>
            <StrategyForm
              form={form}
              onSubmit={onSubmitAdd}
              isLoading={isLoading}
              buttonText="Add Strategy"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Strategy Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Strategy</DialogTitle>
            <DialogDescription>
              Modify the trading strategy settings.
            </DialogDescription>
          </DialogHeader>
          <StrategyForm
            form={form}
            onSubmit={onSubmitEdit}
            isLoading={isLoading}
            buttonText="Update Strategy"
          />
        </DialogContent>
      </Dialog>

      {/* Filters and Search */}
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <Input
                placeholder="Search strategies by name, user, or pair..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Exchange</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filterExchange === null}
                    onCheckedChange={() => setFilterExchange(null)}
                  >
                    All Exchanges
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterExchange === "Binance"}
                    onCheckedChange={() => setFilterExchange("Binance")}
                  >
                    Binance
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterExchange === "Coinbase"}
                    onCheckedChange={() => setFilterExchange("Coinbase")}
                  >
                    Coinbase
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterExchange === "Bybit"}
                    onCheckedChange={() => setFilterExchange("Bybit")}
                  >
                    Bybit
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterExchange === "KuCoin"}
                    onCheckedChange={() => setFilterExchange("KuCoin")}
                  >
                    KuCoin
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategies Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Trading Strategies</CardTitle>
          <CardDescription>
            {filteredStrategies.length} strategies found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Exchange</TableHead>
                <TableHead>Trading Pair</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStrategies.map((strategy) => (
                <TableRow key={strategy.id}>
                  <TableCell className="font-medium">{strategy.name}</TableCell>
                  <TableCell>{strategy.owner}</TableCell>
                  <TableCell>{strategy.exchange}</TableCell>
                  <TableCell>{strategy.tradingPair}</TableCell>
                  <TableCell>{strategy.strategy}</TableCell>
                  <TableCell>
                    <div className={`px-2 py-1 rounded-full text-xs inline-block ${
                      activeStrategies[strategy.id]
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {activeStrategies[strategy.id] ? "Active" : "Inactive"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant={activeStrategies[strategy.id] ? "destructive" : "default"}
                        size="sm"
                        onClick={() => toggleStrategy(strategy.id)}
                      >
                        {activeStrategies[strategy.id] ? (
                          <>
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Stop
                          </>
                        ) : (
                          <>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Start
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditStrategy(strategy.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteStrategy(strategy.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Strategy Form component
function StrategyForm({
  form,
  onSubmit,
  isLoading,
  buttonText
}: {
  form: any,
  onSubmit: (data: StrategyFormValues) => void,
  isLoading: boolean,
  buttonText: string
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strategy Name</FormLabel>
                <FormControl>
                  <Input placeholder="My BTC Strategy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exchange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exchange</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exchange" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="coinbase">Coinbase</SelectItem>
                    <SelectItem value="kucoin">KuCoin</SelectItem>
                    <SelectItem value="bybit">Bybit</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tradingPair"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trading Pair</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a trading pair" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                    <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                    <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                    <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
                    <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strategy Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MA_CROSSOVER">MA Crossover</SelectItem>
                    <SelectItem value="RSI_DIVERGENCE">RSI Divergence</SelectItem>
                    <SelectItem value="MACD_SIGNAL">MACD Signal</SelectItem>
                    <SelectItem value="BOLLINGER_BANDS">Bollinger Bands</SelectItem>
                    <SelectItem value="CUSTOM">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeframe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timeframe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1m">1 minute</SelectItem>
                    <SelectItem value="5m">5 minutes</SelectItem>
                    <SelectItem value="15m">15 minutes</SelectItem>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="1d">1 day</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initialInvestment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Investment (USDT)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="riskLevel"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Risk Level</FormLabel>
                  <span className="text-sm">{field.value} / 10</span>
                </div>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    max={10}
                    min={1}
                    step={1}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>
                  Higher risk may yield higher returns but with increased volatility.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="takeProfitPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Take Profit (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stopLossPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stop Loss (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Activate Strategy</FormLabel>
                <FormDescription>
                  Start trading with this strategy immediately after saving.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : buttonText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

// Sample data
const strategies = [
  {
    id: "1",
    name: "BTC Momentum Strategy",
    owner: "james.wilson@example.com",
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
    owner: "sarah.brown@example.com",
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
  {
    id: "3",
    name: "SOL Aggressive",
    owner: "david.kim@example.com",
    exchange: "Binance",
    tradingPair: "SOL/USDT",
    strategy: "RSI Divergence",
    timeframe: "15m",
    initialInvestment: 750,
    riskLevel: 8,
    takeProfitPercentage: 7,
    stopLossPercentage: 5,
    createdAt: "2023-03-12T11:20:00Z",
  },
  {
    id: "4",
    name: "ADA Conservative",
    owner: "lisa.garcia@example.com",
    exchange: "Bybit",
    tradingPair: "ADA/USDT",
    strategy: "MACD Signal",
    timeframe: "1d",
    initialInvestment: 300,
    riskLevel: 3,
    takeProfitPercentage: 2,
    stopLossPercentage: 1.5,
    createdAt: "2023-03-08T15:10:00Z",
  },
  {
    id: "5",
    name: "BNB Scalping",
    owner: "thomas.wilson@example.com",
    exchange: "KuCoin",
    tradingPair: "BNB/USDT",
    strategy: "Custom",
    timeframe: "5m",
    initialInvestment: 1200,
    riskLevel: 9,
    takeProfitPercentage: 1.2,
    stopLossPercentage: 0.8,
    createdAt: "2023-03-05T08:30:00Z",
  },
];

const users = [
  { id: "james.wilson@example.com", name: "James Wilson", email: "james.wilson@example.com" },
  { id: "sarah.brown@example.com", name: "Sarah Brown", email: "sarah.brown@example.com" },
  { id: "david.kim@example.com", name: "David Kim", email: "david.kim@example.com" },
  { id: "lisa.garcia@example.com", name: "Lisa Garcia", email: "lisa.garcia@example.com" },
  { id: "thomas.wilson@example.com", name: "Thomas Wilson", email: "thomas.wilson@example.com" },
  { id: "emily.jackson@example.com", name: "Emily Jackson", email: "emily.jackson@example.com" },
  { id: "michael.chen@example.com", name: "Michael Chen", email: "michael.chen@example.com" },
];
