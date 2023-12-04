"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/tailwind-utils";
import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea";

const examples = [
  {
    name: "Profile",
    href: "/me/profile",
  },
  {
    name: "Orders",
    href: "/me/orders",
  },
  {
    name: "Returns",
    href: "/me/returns",
  },
  {
    name: "Settings",
    href: "/me/settings",
  },
];

function UserProfileNavigation({ className, ...props }) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <ScrollArea className="max-w-[600px] lg:max-w-none">
        <div className={cn("flex flex-col gap-10", className)} {...props}>
          {examples.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex items-center px-4",
                pathname?.startsWith(example.href)
                  ? "font-bold text-primary"
                  : "font-medium text-muted-foreground",
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

export default UserProfileNavigation;
