"use client";

import { useState } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="p-0 lg:hidden">
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Меню</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex justify-center">
          <DrawerTitle>
            <MobileLink href="/" onOpenChange={setOpen}>
              Displace
            </MobileLink>
          </DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col items-center gap-6">
          <Separator className="w-1/4" />
          <MobileLink
            href="/projects"
            onOpenChange={setOpen}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/projects"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Проекты
          </MobileLink>
          <MobileLink
            href="/users"
            onOpenChange={setOpen}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/users")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Пользователи
          </MobileLink>
          <MobileLink
            href="/mentors"
            onOpenChange={setOpen}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/mentors")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Менторская
          </MobileLink>
          <Separator className="w-1/4" />
          <Link
            href="https://razrabs.ru/"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Статьи
          </Link>
          <Separator className="w-1/4" />
          <Link
            href={siteConfig.links.discord}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Discord
          </Link>
          <Link
            href={siteConfig.links.github}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.links.buymeacoffee}
            className={cn(
              "text-foreground/60 transition-colors hover:text-foreground/80"
            )}
          >
            Buy Me a Coffee
          </Link>
          <Separator className="w-1/4" />
        </nav>
        <DrawerFooter className="pt-6">
          <DrawerClose asChild>
            <Button variant="ghost">Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default MobileNav;
