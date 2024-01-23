"use client";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { PackageX, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Separator } from "@/components/ui/Separator";
import clsx from "clsx";
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { roundPrice } from "@/utils/formatPrice";
import useQueryCart from "@/hooks/useQueryCart";
import useDeleteCart from "@/hooks/useDeleteCart";

export function CartSheet({ userId }) {
  const { data } = useQueryCart(userId);
  const { mutate } = useDeleteCart();
  const [isMounted, setIsMounted] = useState(false);
  const { items, clearCart, setCart } = useCart();
  const itemCount = items.length;
  const total = roundPrice(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  const onClearCart = () => {
    clearCart();
    if (userId) mutate(userId);
  };

  useEffect(() => {
    if (data?.cart?.length > 0 && userId) {
      const items = data.cart.map((item) => ({
        ...item.product_variant,
        quantity: item.quantity,
        original_price: item.product.price,
      }));
      setCart(items);
    }
    setIsMounted(true);
  }, [data?.cart, setCart, userId]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative h-4 w-4 lg:h-6 lg:w-6">
          <ShoppingCart className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer lg:h-6 lg:w-6" />
          {isMounted && itemCount > 0 && (
            <span
              className={clsx(
                "absolute -right-[6px] -top-[6px] z-10  h-2 w-2 rounded-full bg-foreground sm:-top-[2px]",
                { hidden: itemCount <= 0 },
              )}
            ></span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full grow flex-col pr-6">
              <ScrollArea className="mt-10 max-h-[300px] sm:max-h-[500px] ">
                <div className="flex flex-col gap-5">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      productId={item.product_id}
                      variant={item}
                    ></CartItem>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <Separator></Separator>
            <div className="space-y-4 pr-6">
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span className="font-semibold">{total}$</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={onClearCart}
                >
                  Clear cart
                </Button>

                <SheetFooter>
                  <SheetTrigger asChild>
                    <Link
                      href="/cart"
                      className={buttonVariants({
                        className: "w-full",
                      })}
                    >
                      Continue to Cart
                    </Link>
                  </SheetTrigger>
                </SheetFooter>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <PackageX className="absolute h-full w-full" />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
