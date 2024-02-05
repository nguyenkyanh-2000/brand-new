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
import { InspirationCard } from "@/components/inspiration/InspirationCard";

import Picture1 from "@/public/inspiration-card-1.webp";
import Picture2 from "@/public/inspiration-card-2.webp";
import Picture3 from "@/public/inspiration-card-3.webp";
import Picture4 from "@/public/inspiration-card-4.webp";
import Picture5 from "@/public/inspiration-card-5.webp";
import Picture6 from "@/public/inspiration-card-6.webp";

import InspirationDoubleImages from "@/components/inspiration/InspirationDoubleImages.js";
import Picture7 from "@/public/inspiration-double-1.webp";
import Picture8 from "@/public/inspiration-double-2.webp";
import Picture9 from "@/public/inspiration-double-3.webp";
import Picture10 from "@/public/inspiration-double-4.webp";
import VerticalCarousel from "@/components/carousel/VerticalCarousel";
import { VerticalInspirationCard } from "@/components/inspiration/VerticalInspirationCard";

export const metadata = {
  title: "Inspiration | Brand",
  description: "Inspiration page for Brand",
};

const paragraph = "First: choose your style.";
const paragraph1 = "Feeling nostalgic? Mix and match with soft white tones.";
const paragraph2 = "Discover other inspirations here.";

const images = [Picture1, Picture2, Picture3, Picture4, Picture5, Picture6];

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

      <section className="my-[150px] px-10">
        <HorizontalCarousel>
          {images.map((image, index) => (
            <InspirationCard key={index} image={image} />
          ))}
        </HorizontalCarousel>
      </section>

      <section className="my-[150px] flex h-fit flex-col px-10">
        <InspirationParagraph paragraph={paragraph} />
        <VerticalCarousel>
          {images.map((image, index) => (
            <VerticalInspirationCard image={image} key={index} index={index} />
          ))}
        </VerticalCarousel>
      </section>

      <section className="my-[150px] flex h-screen flex-col gap-[100px] px-10">
        <InspirationParagraph paragraph={paragraph1} />
        <InspirationGallery />
      </section>

      <section className="my-[150px] flex min-h-screen flex-col gap-20 px-10">
        <InspirationParagraph paragraph={paragraph2} />
        <InspirationDoubleImages image1={Picture7} image2={Picture8} />
        <InspirationDoubleImages image1={Picture9} image2={Picture10} />
      </section>

      <Footer className={"mt-20 sm:mt-[200px]"} />
    </div>
  );
}

export default InspirationPage;
