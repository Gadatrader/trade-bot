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
import { Textarea } from "@/components/ui/textarea";
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
import { Check, MailIcon, MessageSquare, PhoneCall } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      toast.success("Your message has been sent. We'll get back to you soon!");
      form.reset();
    }, 1500);
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">
          Get in touch with our customer support team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Fill out the form below to send us a message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your issue or question in detail..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
              <CardDescription>
                Our support team is available during these hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="font-medium">Weekdays</div>
                    <div className="text-sm text-muted-foreground">Monday - Friday</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">9:00 AM - 6:00 PM</div>
                    <div className="text-sm text-muted-foreground">UTC+0</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="font-medium">Weekends</div>
                    <div className="text-sm text-muted-foreground">Saturday - Sunday</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">10:00 AM - 4:00 PM</div>
                    <div className="text-sm text-muted-foreground">UTC+0</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alternative Contact Methods</CardTitle>
              <CardDescription>
                Reach out to us through these channels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MailIcon className="mt-1 h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      support@cryptotrader.com
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Responses within 24 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="mt-1 h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-muted-foreground">
                      Available from the dashboard
                    </div>
                    <div className="text-xs text-muted-foreground">
                      During support hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <PhoneCall className="mt-1 h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <div className="font-medium">Phone Support</div>
                    <div className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Pro plan subscribers only
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
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

// FAQs data
const faqs = [
  {
    question: "How do I connect my exchange API?",
    answer:
      "Go to the API Connections page, click 'Add API Connection', select your exchange, and enter your API key and secret. Make sure to only give trading permissions to the API key, not withdrawals.",
  },
  {
    question: "Are my API keys secure?",
    answer:
      "Yes, we use industry-standard encryption to store your API keys. We never store them in plain text, and all connections to exchanges are made securely over HTTPS.",
  },
  {
    question: "How do I set up Telegram notifications?",
    answer:
      "Search for our bot @CryptoTraderBot on Telegram, start a chat, and type /chatid to get your unique chat ID. Then enter this ID in the API Connections form.",
  },
  {
    question: "What happens if the strategy is losing money?",
    answer:
      "Each strategy has a built-in stop-loss mechanism to limit potential losses. You can customize these parameters in the strategy settings.",
  },
  {
    question: "Can I use my own trading strategies?",
    answer:
      "Yes, Pro plan subscribers can create custom strategies. Contact our support team for guidance on implementing your strategy.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Go to the Plans page and click 'Cancel Subscription'. You'll continue to have access to your current plan until the end of the billing cycle.",
  },
];
