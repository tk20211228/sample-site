import type { Metadata } from "next";

import { ModeToggle } from "@/components/mode-toggle";
import Header from "./emm/components/header";

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
    <div className="flex flex-col h-dvh">
      <Header className="sticky top-0 z-20 bg-background" />
      <main className="flex-1 z-10 bg-gradient-to-t from-primary/10 to-background ">
        {children}
      </main>

      {/* <div className="fixed bottom-4 right-5 z-50">
        <ModeToggle />
      </div> */}
    </div>
  );
}
