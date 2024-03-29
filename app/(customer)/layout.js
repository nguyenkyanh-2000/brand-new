import UserProfile from "@/components/header/UserProfile";
import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Search } from "lucide-react";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import getQueryClient from "@/utils/getQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { CartSheet } from "@/components/forms/cart/CartSheet";
import SearchProduct from "@/components/header/SearchProduct";

export default async function Layout({ children }) {
  const currentUser = await getCurrentUser();
  const dehydratedState = dehydrate(getQueryClient());

  return (
    <HydrationBoundary state={dehydratedState}>
      <section>
        <Header>
          <Logo />
          <CustomerNavigation />
          <div className="hidden gap-5 lg:flex">
            <ThemeToggle />
            <SearchProduct />
            <CartSheet userId={currentUser?.id} />
            <UserProfile userId={currentUser?.id} />
          </div>
        </Header>
        {children}
        <Footer className={"mt-20 md:mt-[200px]"} />
      </section>
    </HydrationBoundary>
  );
}
