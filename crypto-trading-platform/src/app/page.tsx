"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  CreditCard,
  LineChart,
  Shield,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const isLoggedIn = false; // This will come from authentication state

  // If logged in, redirect to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 border-b bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Automated Trading Platform for <span className="gradient-heading">Crypto</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect your exchange API and automate your trading strategies 24/7. Get real-time updates and notifications directly on Telegram.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/features">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-success" />
                  <span>24/7 Trading</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-success" />
                  <span>Telegram Alerts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Check className="h-4 w-4 text-success" />
                  <span>Multiple Exchanges</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary">
                <div className="dashboard-card absolute -left-8 -top-8 w-72">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Trading Performance</h4>
                    <div className="text-2xl font-bold">+23.54%</div>
                    <p className="text-xs text-muted-foreground">
                      30-day performance
                    </p>
                  </div>
                </div>
                <div className="dashboard-card absolute -right-8 -bottom-8 w-72">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Active Trades</h4>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Across multiple pairs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need for Automated Trading
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform provides a comprehensive suite of tools to help you
                automate your trading strategies and maximize your profits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="space-y-1">
                <LineChart className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Advanced Strategies</CardTitle>
                <CardDescription>
                  Use our proven trading strategies or create your own custom algorithms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Multiple technical indicators</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Risk management settings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Backtesting capabilities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <BellRing className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Real-time Notifications</CardTitle>
                <CardDescription>
                  Stay updated with real-time alerts and notifications on Telegram.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Trade execution alerts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Price movement notifications</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Daily and weekly reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Comprehensive Dashboard</CardTitle>
                <CardDescription>
                  Monitor your trading performance with detailed analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Performance metrics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Historical trade data</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Profit/loss visualization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <CreditCard className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Multiple Exchange Support</CardTitle>
                <CardDescription>
                  Connect to multiple cryptocurrency exchanges with ease.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Binance, Coinbase, and more</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Secure API connections</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Cross-exchange strategies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Security Focused</CardTitle>
                <CardDescription>
                  Your API keys and data are secured with enterprise-grade encryption.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>No withdrawal permissions needed</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Regular security audits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-1">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Customizable Experience</CardTitle>
                <CardDescription>
                  Tailor the platform to meet your specific trading needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Personalized dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Adjustable risk parameters</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>Custom notification settings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Trusted by Traders Worldwide
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                See what our users have to say about their experience with our platform.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 border-t">
        <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Ready to Automate Your Trading?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Join thousands of traders who are already using our platform to
              automate their trading strategies.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const testimonials = [
  {
    name: "Alex Thompson",
    title: "Day Trader",
    content:
      "This platform has completely transformed my trading. The automated strategies have consistently outperformed my manual trading, and the Telegram notifications keep me informed even when I'm away from my desk.",
  },
  {
    name: "Sarah Chen",
    title: "Crypto Investor",
    content:
      "I've tried several trading bots, but this one stands out for its reliability and ease of use. The dashboard provides all the information I need, and the customer support is outstanding.",
  },
  {
    name: "Michael Rodriguez",
    title: "Full-time Trader",
    content:
      "The ability to customize strategies and risk parameters has been game-changing for my portfolio. I've seen a 30% increase in my returns since I started using this platform.",
  },
  {
    name: "Emma Wilson",
    title: "Passive Investor",
    content:
      "As someone who doesn't have time to monitor markets constantly, this platform has been a lifesaver. The set-it-and-forget-it approach with safety measures gives me peace of mind.",
  },
  {
    name: "David Kim",
    title: "Technical Analyst",
    content:
      "The backtesting capabilities and technical indicators available are impressive. I can validate my strategies before deploying them with real capital, which has saved me from potential losses.",
  },
  {
    name: "Priya Patel",
    title: "Hedge Fund Manager",
    content:
      "We've integrated this platform into our trading operations, and the results have exceeded our expectations. The ability to connect to multiple exchanges has opened up arbitrage opportunities.",
  },
];
