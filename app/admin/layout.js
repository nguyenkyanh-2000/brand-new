import AdminNavigation from "@/components/layout/AdminNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { User2 } from "lucide-react";

export const metadata = {
  title: "Admin homepage",
  description: "Admin homepage for Brand website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header>
          <Logo />
          <AdminNavigation />
          <div className="hidden lg:flex gap-5">
            <ThemeToggle />
            <User2 />
          </div>
        </Header>
        {children}
      </body>
    </html>
  );
}
