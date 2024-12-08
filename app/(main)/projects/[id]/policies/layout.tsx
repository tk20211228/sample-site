import PoliciesMenuBar from "@/app/(main)/components/projects/policies-menu-ber";
import type { Metadata } from "next";

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
    <div className="flex">
      <PoliciesMenuBar className="hidden md:block" />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
