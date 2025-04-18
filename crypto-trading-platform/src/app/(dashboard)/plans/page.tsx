"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, HelpCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleUpgrade = (planId: string) => {
    setLoadingPlan(planId);

    // Simulate API call
    setTimeout(() => {
      console.log(`Upgrading to ${planId}`);
      setLoadingPlan(null);
      toast.success(`Successfully upgraded to ${getPlanById(planId)?.name} plan!`);
    }, 1500);
  };

  const handleCancel = () => {
    setLoadingPlan("cancel");

    // Simulate API call
    setTimeout(() => {
      console.log("Cancelling subscription");
      setLoadingPlan(null);
      toast.success("Your subscription has been cancelled. You can still use premium features until the end of your billing cycle.");
    }, 1500);
  };

  const getPlanById = (id: string) => {
    return pricingPlans.find((plan) => plan.id === id);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">
          Choose the right plan for your trading needs.
        </p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Plan</CardTitle>
          <CardDescription>
            You are currently on the {currentPlan.name} plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="grid gap-2">
              <div className="font-medium">Plan details:</div>
              <ul className="grid gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>{currentPlan.maxStrategies} trading strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>{currentPlan.maxExchanges} exchange connections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>
                    {currentPlan.telegramNotifications
                      ? "Telegram notifications included"
                      : "No Telegram notifications"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" />
                  <span>
                    {currentPlan.historicalData
                      ? `${currentPlan.historicalData} historical data`
                      : "No historical data"}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Your next payment:</div>
              <p className="text-sm text-muted-foreground">
                {currentPlan.name === "Free"
                  ? "No payment required"
                  : `${currentPlan.price[billingCycle]} on ${formatDate(nextBillingDate)}`}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {currentPlan.name !== "Free" && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCancel}
              disabled={loadingPlan === "cancel"}
            >
              {loadingPlan === "cancel" ? "Cancelling..." : "Cancel Subscription"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center space-x-4 rounded-lg border p-4">
        <Button
          variant={billingCycle === "monthly" ? "default" : "outline"}
          onClick={() => setBillingCycle("monthly")}
          className="w-28"
        >
          Monthly
        </Button>
        <div className="text-sm">
          <span className="rounded-full bg-success/20 px-2 py-1 text-xs font-medium text-success">
            Save 20%
          </span>
        </div>
        <Button
          variant={billingCycle === "yearly" ? "default" : "outline"}
          onClick={() => setBillingCycle("yearly")}
          className="w-28"
        >
          Yearly
        </Button>
      </div>

      {/* Pricing Plans */}
      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col ${
              plan.popular ? "border-primary" : ""
            }`}
          >
            {plan.popular && (
              <div className="rounded-t-lg bg-primary px-4 py-1 text-center text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="text-3xl font-bold">
                {plan.price[billingCycle]}
                {plan.price[billingCycle] !== "Free" && (
                  <span className="text-sm font-normal text-muted-foreground">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                )}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-center text-muted-foreground">
                    <X className="mr-2 h-4 w-4" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleUpgrade(plan.id)}
                disabled={
                  loadingPlan !== null || currentPlan.id === plan.id
                }
                variant={currentPlan.id === plan.id ? "outline" : "default"}
              >
                {loadingPlan === plan.id ? (
                  "Processing..."
                ) : currentPlan.id === plan.id ? (
                  "Current Plan"
                ) : (
                  "Upgrade"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to format dates
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Sample data
const currentPlan = {
  id: "basic",
  name: "Basic",
  maxStrategies: 3,
  maxExchanges: 2,
  telegramNotifications: true,
  historicalData: "30 days",
  price: {
    monthly: "$29",
    yearly: "$278",
  },
};

const nextBillingDate = "2023-05-15";

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for individual traders",
    price: {
      monthly: "Free",
      yearly: "Free",
    },
    features: [
      "1 trading strategy",
      "1 exchange connection",
      "Basic indicators",
      "Email support",
    ],
    limitations: [
      "No Telegram notifications",
      "No historical data",
      "Limited strategy options",
    ],
    popular: false,
  },
  {
    id: "basic",
    name: "Basic",
    description: "Advanced features for serious traders",
    price: {
      monthly: "$29",
      yearly: "$278",
    },
    features: [
      "3 trading strategies",
      "2 exchange connections",
      "Telegram notifications",
      "30 days historical data",
      "Advanced indicators",
      "Email & chat support",
    ],
    limitations: ["No custom strategies", "Limited backtesting"],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    description: "All features for professional traders",
    price: {
      monthly: "$79",
      yearly: "$758",
    },
    features: [
      "Unlimited trading strategies",
      "5 exchange connections",
      "Telegram notifications",
      "90 days historical data",
      "Custom strategies",
      "Advanced backtesting",
      "Priority support",
    ],
    limitations: [],
    popular: false,
  },
];

const faqs = [
  {
    question: "How do I upgrade my plan?",
    answer:
      "You can upgrade your plan at any time by selecting the plan you want to upgrade to and clicking the 'Upgrade' button. Your billing cycle will be updated immediately.",
  },
  {
    question: "Can I downgrade my plan?",
    answer:
      "Yes, you can downgrade your plan at any time. The change will take effect at the end of your current billing cycle.",
  },
  {
    question: "What happens if I cancel my subscription?",
    answer:
      "If you cancel your subscription, you'll still have access to premium features until the end of your current billing cycle. After that, your account will be downgraded to the Free plan.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a refund within 7 days of your payment.",
  },
];
