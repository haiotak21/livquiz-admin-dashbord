"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    []
  );

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen bg-[#0B1437]">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <div className={
        isSidebarOpen
          ? "fixed inset-0 z-40 flex md:hidden"
          : "fixed inset-0 z-40 hidden md:hidden"
      }>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div className="relative z-50 w-64 max-w-[80%] h-full bg-white shadow-xl">
          <Sidebar onNavigate={closeSidebar} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F9FAFB]">
          {children}
        </main>
      </div>
    </div>
  );
}


