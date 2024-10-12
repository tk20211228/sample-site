import type { Metadata } from "next";

import { ModeToggle } from "@/components/mode-toggle";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header className="sticky top-0 z-10 bg-background" />
      <main className="flex-1">{children}</main>

      <div className="fixed bottom-4 right-10 z-50">
        <ModeToggle />
      </div>
    </div>
  );
}
