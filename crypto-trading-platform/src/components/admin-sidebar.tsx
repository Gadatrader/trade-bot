"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
  LineChart,
  Menu,
  MessageSquare,
  PieChart,
  ShieldAlert,
  Star,
  Terminal
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Trading Strategies",
    href: "/admin/strategies",
    icon: LineChart,
  },
  {
    title: "API Connections",
    href: "/admin/api-connections",
    icon: Terminal,
  },
  {
    title: "Plans & Billing",
    href: "/admin/plans",
    icon: CreditCard,
  },
  {
    title: "Statistics",
    href: "/admin/statistics",
    icon: PieChart,
  },
  {
    title: "Support Tickets",
    href: "/admin/support",
    icon: MessageSquare,
  },
  {
    title: "Security",
    href: "/admin/security",
    icon: ShieldAlert,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Help & Documentation",
    href: "/admin/help",
    icon: HelpCircle,
  },
];

type SidebarProps = {
  defaultCollapsed?: boolean;
};

export function Sidebar({ defaultCollapsed = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex md:hidden h-9 w-9"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="py-4">
            <div className="px-3 py-2 mb-6">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                Admin Panel
              </h2>
            </div>
            <nav className="grid items-start gap-2 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href || pathname?.startsWith(item.href + "/")
                        ? "bg-accent"
                        : "transparent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex h-screen flex-col border-r bg-background py-4 ${
          isCollapsed ? "w-[70px]" : "w-[240px]"
        }`}
      >
        <div className="px-3 py-2 mb-2">
          {!isCollapsed && (
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Admin Panel
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${isCollapsed ? "mx-auto" : "ml-auto"} h-7 w-7`}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">
              {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </span>
          </Button>
        </div>
        <nav className="grid items-start gap-2 px-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "bg-accent"
                    : "transparent"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className={`${isCollapsed ? "mx-auto" : "mr-2"} h-4 w-4`} />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-3 py-2">
          <div className={`${isCollapsed ? "mx-auto" : "px-4"} text-xs text-muted-foreground`}>
            {!isCollapsed && <span>v1.0 Admin Panel</span>}
          </div>
        </div>
      </aside>
    </>
  );
}
