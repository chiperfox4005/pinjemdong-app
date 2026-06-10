"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      {!isAuthPage && <Navbar />}
      <main style={{ flex: 1, paddingTop: isAuthPage ? "0px" : "80px" }}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}
