import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { User2, Search, ShoppingCart } from "lucide-react";

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
        <div className="hidden lg:flex gap-5">
          <ThemeToggle />
          <Search />
          <ShoppingCart />
          <User2 />
        </div>
      </Header>
      {children}
    </section>
  );
}
