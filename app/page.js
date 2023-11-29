import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Search, ShoppingCart, User2 } from "lucide-react";
import Image from "next/image";
import HeroImage1 from "@/public/hero-image-1.jpg";
import HeroImage2 from "@/public/hero-image-2.jpg";
import SlideIn from "@/components/animation/SlideIn";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <SlideIn y1={-100} y2={0} duration={2}>
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
      </SlideIn>
      {/* Hero section */}
      <section className="w-full h-[80vh] grid grid-cols-12 grid-rows-2 gap-x-2 px-10 mt-10 lg:gap-x-5">
        <SlideIn
          y1={1000}
          y2={0}
          duration={2}
          className={"relative col-span-6 row-span-2 lg:col-span-4"}
        >
          <Image src={HeroImage1} fill alt="hero-image-1" />
        </SlideIn>
        <SlideIn
          y1={-1000}
          y2={0}
          duration={2}
          className={"relative col-span-6 row-span-2 lg:col-span-4"}
        >
          <Image src={HeroImage2} fill alt="hero-image-2" />
        </SlideIn>
        <div className="flex flex-col gap-1 col-span-12 mt-10 lg:place-self-end lg:col-span-4 lg:row-span-2 lg:pl-5">
          <SlideIn y1={75} y2={0} duration={2}>
            <h2 className="font-serif font-black text-base lg:text-4xl">
              BRAND NEW WAY OF LIVING.
            </h2>
          </SlideIn>
          <SlideIn y1={75} y2={0} duration={2}>
            <h3 className="text-sm md:text-base px-1">
              Embrace the art of refined living with our collection of
              stationery, clothing, furniture, and cosmetics.
            </h3>
          </SlideIn>
          <SlideIn y1={75} y2={0} duration={2}>
            <Button className="w-full mt-5">Discover now</Button>
          </SlideIn>
        </div>
      </section>

      {/** Shop by categories */}
    </>
  );
}
