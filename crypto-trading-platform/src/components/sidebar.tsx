"use client";

import { useState } from "react";
import { MainNav } from "./main-nav";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

type SidebarProps = {
  defaultCollapsed?: boolean;
};

export function Sidebar({ defaultCollapsed = false }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

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
          <div className="px-2 py-6">
            <MainNav />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex h-screen flex-col border-r bg-background p-4 pt-8 ${
          isCollapsed ? "w-[80px]" : "w-[240px]"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-6">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold">Navigation</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-7 w-7"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">
                {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              </span>
            </Button>
          </div>
          <MainNav />
        </div>
      </aside>
    </>
  );
}
