import { CartSheet } from "@/components/forms/cart/CartSheet";
import InspirationGallery from "@/components/inspiration/InspirationGallery";
import SearchProduct from "@/components/header/SearchProduct";
import UserProfile from "@/components/header/UserProfile";
import InspirationParagraph from "@/components/inspiration/InspirationParagraph";
import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import React from "react";
import InspirationHeader from "@/components/inspiration/InspirationHeader";
import { HorizontalCarousel } from "@/components/carousel/HorizontalCarousel";
import { InspirationCard1 } from "@/components/inspiration/InspirationCard1";
import { InspirationCard2 } from "@/components/inspiration/InspirationCard2";

export const metadata = {
  title: "Inspiration | Brand",
  description: "Inspiration page for Brand",
};

const paragraph = "Feeling nostalgic? Mix and match with soft white tones.";

async function InspirationPage() {
  const currentUser = await getCurrentUser();
  return (
    <div>
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

      <InspirationHeader />

      <section className="my-20 px-10">
        <HorizontalCarousel>
          <InspirationCard1 />
          <InspirationCard1 />
          <InspirationCard1 />
          <InspirationCard1 />
          <InspirationCard2 />
        </HorizontalCarousel>
      </section>

      <section className="my-20 px-10">
        <InspirationParagraph paragraph={paragraph} />

        <InspirationGallery />
      </section>

      <Footer className={"mt-20 sm:mt-[200px]"} />
    </div>
  );
}

export default InspirationPage;
