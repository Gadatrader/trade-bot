import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-muted/60 flex-col justify-between p-10">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              CryptoTrader
            </span>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="text-3xl font-bold">
            Automate your crypto trading strategies
          </div>
          <div className="text-muted-foreground text-lg">
            Connect your exchange API and let our platform execute trades for you
            24/7. Get notified on Telegram for every action.
          </div>
        </div>
        <div className="text-xs text-muted-foreground space-x-4">
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-between">
            <div className="md:hidden">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  CryptoTrader
                </span>
              </Link>
            </div>
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
