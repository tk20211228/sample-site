import type { Metadata } from "next";
import NavigationBar from "../../components/navigation-ber";

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
      <NavigationBar />
      {/* <div className="hidden lg:block">
        <NavigationBar />
      </div>
      <div className="lg:hidden">
        <MobileNavigationBar />
      </div> */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}