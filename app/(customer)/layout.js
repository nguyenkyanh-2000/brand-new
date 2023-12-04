import UserProfile from "@/components/header/UserProfile";
import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Search, ShoppingCart } from "lucide-react";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import useFetchUser from "@/hooks/useFetchUser";

export const metadata = {
  title: "Products",
  description: "Products page for Brand website",
};

export default async function Layout({ children }) {
  const currentUser = await getCurrentUser();
  await useFetchUser(currentUser?.id);

  return (
    <section>
      <Header>
        <Logo />
        <CustomerNavigation />
        <div className="hidden gap-5 lg:flex">
          <ThemeToggle />
          <Search />
          <ShoppingCart />
          <UserProfile userId={currentUser?.id} />
        </div>
      </Header>
      {children}
      <Footer className={"mt-20 md:mt-[200px]"} />
    </section>
  );
}
