import UserProfile from "@/components/header/UserProfile";
import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Search, ShoppingCart } from "lucide-react";

export const metadata = {
  title: "Products",
  description: "Products page for Brand website",
};

export default async function Layout({ children }) {
  return (
    <section>
      <Header>
        <Logo />
        <CustomerNavigation />
        <div className="hidden gap-5 lg:flex">
          <ThemeToggle />
          <Search />
          <ShoppingCart />
          <UserProfile />
        </div>
      </Header>
      {children}
      <Footer className={"mt-20 md:mt-[200px]"} />
    </section>
  );
}
