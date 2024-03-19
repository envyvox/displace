"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex">
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/projects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/projects" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Проекты
        </Link>
        <Link
          href="/users"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/users")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Пользователи
        </Link>
        <Link
          href="/mentors"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/mentors")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Менторская
        </Link>
        <Separator orientation="vertical" />
        <Link
          href="https://razrabs.ru/"
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Статьи
        </Link>
        <Separator orientation="vertical" />
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
          className="text-foreground/60 transition-colors hover:text-foreground/80"
        >
          Buy Me a Coffee
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;
