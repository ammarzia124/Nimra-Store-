"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products/new", icon: Package },
    { name: "Analytics", href: "#", icon: BarChart3 },
    { name: "Settings", href: "#", icon: Settings },
  ];

  return (
    <>
      {/* Strict isolation styles: Disable body scroll, hide storefront footer entirely */}
      <style>{`
        body { overflow: hidden !important; }
        footer { display: none !important; }
      `}</style>
      
      {/* Fixed workspace overlay terminating perfectly under the 80px navbar */}
      <div className="fixed top-[80px] bottom-0 left-0 right-0 flex bg-gray-50 text-gray-900 font-sans z-[100]">
        {/* Premium Dark Sidebar */}
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col border-r border-slate-800 shadow-xl z-10">
          <div className="p-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 mb-6">Management</h2>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 opacity-80" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Workspace Container */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-12 relative">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-10">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
