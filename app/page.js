import CustomerNavigation from "@/components/layout/CustomerNavigation";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import HeroImage1 from "@/public/hero-image-1.webp";
import HeroImage2 from "@/public/hero-image-2.webp";
import SlideIn from "@/components/animation/SlideIn";
import { Button } from "@/components/ui/Button";
import CategoryImageClothes from "@/public/category-image-clothes.webp";
import CategoryImageFurniture from "@/public/category-image-furniture.webp";
import CategoryImageCosmetics from "@/public/category-image-cosmetics.webp";
import CategoryImageStationery from "@/public/category-image-stationery.webp";
import PosterImage from "@/public/poster-image.webp";
import Video from "@/public/video.webm";
import Link from "next/link";
import { OnViewSlideIn } from "@/components/animation/OnViewSlideIn";
import Footer from "@/components/layout/Footer";
import UserProfile from "@/components/header/UserProfile";
import { getCurrentUser } from "@/utils/supabase-auth-utils";
import useFetchUser from "@/hooks/useFetchUser";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";

export default async function Home() {
  const currentUser = await getCurrentUser();
  await useFetchUser(currentUser?.id);

  const dehydratedState = dehydrate(getQueryClient());

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="overflow-x-hidden">
        <SlideIn y1={-100} y2={0} duration={2}>
          <Header>
            <Logo />
            <CustomerNavigation />
            <div className="hidden lg:flex gap-5">
              <ThemeToggle />
              <Search />
              <ShoppingCart />
              <UserProfile userId={currentUser?.id} />
            </div>
          </Header>
        </SlideIn>

        {/* Hero section */}
        <section className="w-full h-[80vh] grid grid-rows-4 grid-cols-12 gap-2 px-10 mt-10 lg:gap-5">
          <SlideIn
            y1={1000}
            y2={0}
            duration={2}
            className={
              "relative col-span-12 row-span-2 rounded-md md:row-span-4 md:col-span-6 lg:col-span-4"
            }
          >
            <Image
              src={HeroImage1}
              className="w-full h-full object-cover object-center"
              priority
              sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
              alt="hero-image-1"
            />
          </SlideIn>
          <SlideIn
            y1={-1000}
            y2={0}
            duration={2}
            className={
              "relative col-span-12 row-span-2 rounded-md md:row-span-4 md:col-span-6 lg:col-span-4"
            }
          >
            <Image
              src={HeroImage2}
              className="w-full h-full object-cover object-center"
              sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
              alt="hero-image-2"
            />
          </SlideIn>
          <div className="flex flex-col gap-1 col-span-12 mt-10 md:place-self-end md:col-span-4 md:row-span-4 md:pl-5">
            <SlideIn y1={75} y2={0} duration={2}>
              <h2 className="font-serif font-black text-base lg:text-4xl">
                BRAND NEW WAY OF LIVING.
              </h2>
            </SlideIn>
            <SlideIn y1={75} y2={0} duration={2}>
              <h3 className="text-base font-light md:text-base px-1">
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

        <section className="grid w-screen grid-cols-4 px-10 mt-20 sm:mt-[200px] gap-5">
          <OnViewSlideIn x1={-1000} x2={0} delay={0} className={"col-span-4"}>
            <h2 className="font-serif font-bold text-base md:text-2xl lg:text-4xl">
              Shop by categories
            </h2>
          </OnViewSlideIn>
          <OnViewSlideIn
            className={"col-span-4 sm:col-span-2 md:col-span-1"}
            y1={1000}
            y2={0}
          >
            <Link
              href="/products?categories=clothes"
              className="flex flex-col gap-2"
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageClothes}
                  className="object-cover object-center rounded-md"
                  fill
                  sizes="(min-width: 1200px) calc(25vw - 15px), (min-width: 768px) calc(50vw - 10px), 100vw"
                  alt="category-image-1"
                />
              </div>
              <p className="text-lg">Clothes</p>
            </Link>
          </OnViewSlideIn>
          <OnViewSlideIn
            className={"col-span-4 sm:col-span-2 md:col-span-1"}
            y1={-1000}
            y2={0}
          >
            <Link
              href="/products?categories=cosmetics"
              className="flex flex-col gap-2 "
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageCosmetics}
                  className="object-cover object-center rounded-md"
                  fill
                  sizes="(min-width: 1200px) calc(25vw - 15px), (min-width: 768px) calc(50vw - 10px), 100vw"
                  alt="category-image-2"
                />
              </div>
              <p className="text-lg">Cosmetics</p>
            </Link>
          </OnViewSlideIn>
          <OnViewSlideIn
            className={"col-span-4 sm:col-span-2 md:col-span-1"}
            y1={1000}
            y2={0}
          >
            <Link
              href="/products?categories=furniture"
              className="flex flex-col gap-2"
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageFurniture}
                  className="object-cover object-center rounded-md"
                  fill
                  sizes="(min-width: 1200px) calc(25vw - 15px), (min-width: 768px) calc(50vw - 10px), 100vw"
                  alt="category-image-3"
                />
              </div>
              <p className="text-lg">Furniture</p>
            </Link>
          </OnViewSlideIn>
          <OnViewSlideIn
            className={"col-span-4 sm:col-span-2 md:col-span-1"}
            y1={-1000}
            y2={0}
          >
            <Link
              href="/products?categories=stationery"
              className="flex flex-col gap-2"
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageStationery}
                  className="object-cover object-center rounded-md"
                  fill
                  sizes="(min-width: 1200px) calc(25vw - 15px), (min-width: 768px) calc(50vw - 10px), 100vw"
                  alt="category-image-4"
                />
              </div>
              <p className="text-lg">Stationery</p>
            </Link>
          </OnViewSlideIn>
        </section>

        {/** Short description section */}

        <section className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 gap-10 w-screen mt-20 sm:mt-[200px] px-10">
          <div className="flex flex-col justify-center gap-5 col-span-1 row-span-2">
            <h3 className="break-words font-serif font-bold text-2xl sm:text-4xl">
              {`A Visionary Approach to Lifestyle`}
            </h3>
            <p className="break-words font-light text-base sm:text-lg">
              {`Detail and
            craftsmanship isn't just about fashion; it's a testament to the
            harmony between luxury and consciousness. Step into our world and
            explore the narrative where sophistication meets responsibility,
            redefining elegance in every aspect.`}
            </p>
          </div>
          <div className="col-span-1 row-span-2 ">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover rounded-md"
              src={Video}
            ></video>
          </div>

          {/** Promotional poster */}
          <div className="col-span-1 min-h-[400px] row-span-2 relative">
            <Image
              src={PosterImage}
              alt="poster-image"
              fill
              sizes="(min-width: 1200px) 50vw, 100vw"
              className="object-center object-cover rounded-md"
            ></Image>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col justify-center items-center gap-5">
              <p className=" text-white font-sans font-bold text-3xl md:text-6xl italic">
                DuraTex <sup className="text-xl md:text-3xl text-white">®</sup>
              </p>
              <p className="  text-white font-sans font-bold text-3xl md:text-6xl  italic">
                DuraMat <sup className="text-xl md:text-3xl text-white">®</sup>
              </p>
              <p className=" text-white font-sans font-bold text-3xl md:text-6xl  italic">
                DuraFlex <sup className="text-xl md:text-3xl text-white">®</sup>
              </p>
              <p className=" text-white font-sans font-bold text-3xl md:text-6xl  italic">
                DuraBlend{" "}
                <sup className="text-xl md:text-3xl text-white">®</sup>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 col-span-1 row-span-2">
            <h3 className="break-words font-serif font-bold text-2xl sm:text-4xl">
              {`An Innovative Material Collection`}
            </h3>
            <p className="break-words text-base font-light sm:text-lg">
              {`Embark on a transformative journey with Brand, merging innovation
              and sophistication through four pioneering materials. These materials underscore our
              commitment to crafting products that embody durability, elegance,
              and conscious refinement.`}
            </p>
          </div>
        </section>

        <Footer className={"w-screen mt-20 sm:mt-[200px]"} />
      </div>
    </HydrationBoundary>
  );
}
