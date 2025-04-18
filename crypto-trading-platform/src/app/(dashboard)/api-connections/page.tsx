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
import { AlertCircle, CheckCircle, Plus, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const apiFormSchema = z.object({
  exchange: z.string({
    required_error: "Please select an exchange.",
  }),
  apiKey: z.string().min(5, {
    message: "API key must be valid.",
  }),
  apiSecret: z.string().min(5, {
    message: "API secret must be valid.",
  }),
  telegramChatId: z.string().optional(),
});

type APIFormValues = z.infer<typeof apiFormSchema>;

export default function APIConnectionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Default values for the form
  const defaultValues: Partial<APIFormValues> = {
    exchange: "",
    apiKey: "",
    apiSecret: "",
    telegramChatId: "",
  };

  const form = useForm<APIFormValues>({
    resolver: zodResolver(apiFormSchema),
    defaultValues,
  });

  function onSubmit(data: APIFormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      toast.success("API connection added successfully!");
      setOpen(false);
      form.reset();
    }, 1500);
  }

  const testConnection = (apiId: string) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => resolve(true), 1500);
      }),
      {
        loading: "Testing connection...",
        success: "Connection successful!",
        error: "Failed to connect. Please check your API credentials.",
      }
    );
  };

  const deleteConnection = (apiId: string) => {
    toast.success("API connection removed successfully!");
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">API Connections</h1>
          <p className="text-muted-foreground">
            Manage your exchange API connections and Telegram notifications.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add API Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add API Connection</DialogTitle>
              <DialogDescription>
                Add your exchange API credentials. The API needs only trade permissions, not withdrawals.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
                          <SelectItem value="okx">OKX</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your API key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apiSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Secret</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your API secret" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegramChatId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram Chat ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Telegram chat ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is used to send you trade notifications via Telegram.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="pt-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Connection"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Connections</CardTitle>
          <CardDescription>
            Here are all your connected exchange APIs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiConnections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="mb-2 h-10 w-10 text-muted-foreground/70" />
              <h3 className="font-medium">No API connections</h3>
              <p className="text-sm text-muted-foreground">
                You haven&apos;t added any API connections yet. Click the button above to add one.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exchange</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiConnections.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell className="font-medium">{connection.exchange}</TableCell>
                    <TableCell>
                      {connection.apiKey.substring(0, 5)}...{connection.apiKey.substring(connection.apiKey.length - 5)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Active</span>
                      </div>
                    </TableCell>
                    <TableCell>{connection.addedOn}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => testConnection(connection.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Test Connection</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteConnection(connection.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          You can add up to 5 exchange connections with your current plan.
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Telegram Notification Setup</CardTitle>
          <CardDescription>
            Set up Telegram notifications to receive real-time updates about your trades.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="flex items-start space-x-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Follow these steps to set up Telegram notifications:</p>
                <ol className="list-decimal pl-4 text-sm">
                  <li>Search for @CryptoTraderBot on Telegram</li>
                  <li>Start a chat with the bot by clicking &quot;Start&quot;</li>
                  <li>Type /chatid to get your unique chat ID</li>
                  <li>Copy the chat ID and paste it in the API Connection form</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Sample data
const apiConnections = [
  {
    id: "1",
    exchange: "Binance",
    apiKey: "7RsX9wZFK2Lp5KTmnOq7",
    apiSecret: "**********",
    status: "active",
    addedOn: "April 10, 2023",
  },
  {
    id: "2",
    exchange: "Coinbase",
    apiKey: "LpT7xNmK9QrSv3zOw6X2",
    apiSecret: "**********",
    status: "active",
    addedOn: "March 22, 2023",
  },
];
