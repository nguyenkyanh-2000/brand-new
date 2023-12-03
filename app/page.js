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
            <div className="hidden gap-5 lg:flex">
              <ThemeToggle />
              <Search />
              <ShoppingCart />
              <UserProfile userId={currentUser?.id} />
            </div>
          </Header>
        </SlideIn>

        {/* Hero section */}
        <section className="mt-10 grid h-[80vh] w-full grid-cols-12 grid-rows-4 gap-2 px-10 lg:gap-5">
          <SlideIn
            y1={500}
            y2={0}
            duration={2}
            className={
              "relative col-span-12 row-span-2 rounded-md md:col-span-6 md:row-span-4 lg:col-span-4"
            }
          >
            <Image
              src={HeroImage1}
              className="h-full w-full object-cover object-center"
              priority
              sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
              alt="hero-image-1"
            />
          </SlideIn>
          <SlideIn
            y1={-500}
            y2={0}
            duration={2}
            className={
              "relative col-span-12 row-span-2 rounded-md md:col-span-6 md:row-span-4 lg:col-span-4"
            }
          >
            <Image
              src={HeroImage2}
              className="h-full w-full object-cover object-center"
              sizes="(min-width: 1200px) 500px, (min-width: 768px) 50vw, 100vw"
              priority
              alt="hero-image-2"
            />
          </SlideIn>
          <div className="col-span-12 mt-10 flex flex-col gap-1 md:col-span-4 md:row-span-4 md:place-self-end md:pl-5">
            <SlideIn y1={75} y2={0} duration={2}>
              <h2 className="font-serif text-base font-black lg:text-4xl">
                BRAND NEW WAY OF LIVING.
              </h2>
            </SlideIn>
            <SlideIn y1={75} y2={0} duration={2}>
              <h3 className="px-1 text-base font-light md:text-base">
                Embrace the art of refined living with our collection of
                stationery, clothing, furniture, and cosmetics.
              </h3>
            </SlideIn>
            <SlideIn y1={75} y2={0} duration={2}>
              <Button className="mt-5 w-full">Discover now</Button>
            </SlideIn>
          </div>
        </section>

        {/** Shop by categories */}

        <section className="mt-20 grid w-screen grid-cols-4 gap-5 px-10 sm:mt-[200px]">
          <OnViewSlideIn x1={-1000} x2={0} delay={0} className={"col-span-4"}>
            <h2 className="font-serif text-base font-bold md:text-2xl lg:text-4xl">
              Shop by categories
            </h2>
          </OnViewSlideIn>
          <OnViewSlideIn
            className={"col-span-4 sm:col-span-2 md:col-span-1"}
            y1={1000}
            y2={0}
          >
            <Link
              href="/products?category=clothes"
              className="flex flex-col gap-2"
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageClothes}
                  className="rounded-md object-cover object-center"
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
              href="/products?category=cosmetics"
              className="flex flex-col gap-2 "
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageCosmetics}
                  className="rounded-md object-cover object-center"
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
              href="/products?category=furniture"
              className="flex flex-col gap-2"
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageFurniture}
                  className="rounded-md object-cover object-center"
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
              href="/products?category=stationery"
              className="flex flex-col gap-2"
            >
              <div className={"relative h-[400px] md:h-[600px] "}>
                <Image
                  src={CategoryImageStationery}
                  className="rounded-md object-cover object-center"
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

        <section className="mt-20 grid w-screen grid-cols-1 grid-rows-4 gap-10 px-10 sm:mt-[200px] sm:grid-cols-2">
          <div className="col-span-1 row-span-2 flex flex-col justify-center gap-5">
            <h3 className="break-words font-serif text-2xl font-bold sm:text-4xl">
              {`A Visionary Approach to Lifestyle`}
            </h3>
            <p className="break-words text-base font-light sm:text-lg">
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
              src={
                "https://robpoznemaimlcpzzojf.supabase.co/storage/v1/object/public/video/202311300858.webm"
              }
              className="h-full w-full rounded-md object-cover"
            ></video>
          </div>

          {/** Promotional poster */}
          <div className="relative col-span-1 row-span-2 min-h-[400px]">
            <Image
              src={PosterImage}
              alt="poster-image"
              fill
              sizes="(min-width: 1200px) 50vw, 100vw"
              className="rounded-md object-cover object-center"
            ></Image>
            <div className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-5">
              <p className=" font-sans text-3xl font-bold italic text-white md:text-6xl">
                DuraTex <sup className="text-xl text-white md:text-3xl">®</sup>
              </p>
              <p className="  font-sans text-3xl font-bold italic text-white  md:text-6xl">
                DuraMat <sup className="text-xl text-white md:text-3xl">®</sup>
              </p>
              <p className=" font-sans text-3xl font-bold italic text-white  md:text-6xl">
                DuraFlex{" "}
                <sup className="text-xl text-white md:text-3xl">®</sup>
              </p>
              <p className=" font-sans text-3xl font-bold italic text-white  md:text-6xl">
                DuraBlend{" "}
                <sup className="text-xl text-white md:text-3xl">®</sup>
              </p>
            </div>
          </div>
          <div className="col-span-1 row-span-2 flex flex-col justify-center gap-5">
            <h3 className="break-words font-serif text-2xl font-bold sm:text-4xl">
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

        <Footer className={"mt-20 w-screen sm:mt-[200px]"} />
      </div>
    </HydrationBoundary>
  );
}
