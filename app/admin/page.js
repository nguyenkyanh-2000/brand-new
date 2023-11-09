import AdminNavigation from "@/components/layout/AdminNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { User2 } from "lucide-react";

function Page() {
  return (
    <Header>
      <Logo />
      <AdminNavigation />
      <div className="hidden lg:flex gap-5">
        <ThemeToggle />
        <User2 />
      </div>
    </Header>
  );
}

export default Page;
