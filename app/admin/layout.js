import UserProfile from "@/components/header/UserProfile";
import AdminNavigation from "@/components/layout/AdminNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getCurrentUser, isAdmin } from "@/utils/supabase-auth-utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin homepage",
  description: "Admin homepage for Brand website",
};

export default async function Layout({ children }) {
  const currentUser = await getCurrentUser();
  const isAnAdmin = await isAdmin();

  if (!isAnAdmin) redirect("/auth/login");

  return (
    <section>
      <Header>
        <Logo />
        <AdminNavigation />
        <div className="hidden gap-5 lg:flex">
          <ThemeToggle />
          <UserProfile userId={currentUser.id} />
        </div>
      </Header>
      {children}
    </section>
  );
}
