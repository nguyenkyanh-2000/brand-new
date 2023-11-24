import AdminNavigation from "@/components/layout/AdminNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { isAdmin } from "@/utils/supabase-auth-utils";
import { User2 } from "lucide-react";

export const metadata = {
  title: "Admin homepage",
  description: "Admin homepage for Brand website",
};

export default async function Layout({ children }) {
  const isAnAdmin = await isAdmin();

  if (!isAnAdmin)
    throw new Error(
      "Not enough privilege. Please sign in with an admin account."
    );

  return (
    <section>
      <Header>
        <Logo />
        <AdminNavigation />
        <div className="hidden lg:flex gap-5">
          <ThemeToggle />
          <User2 />
        </div>
      </Header>
      {children}
    </section>
  );
}
