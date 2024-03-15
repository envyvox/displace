import Link from "next/link";

import { siteConfig } from "@/config/site";
import SessionAvatar from "@/components/session-avatar";

import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <Separator orientation="vertical" className="mr-6 h-6" />
        <MainNav />
        <MobileNav />
        <Separator orientation="vertical" className="ml-6 h-6" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SessionAvatar />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
