"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyMuted from "@/components/typography/muted";
import TypographySmall from "@/components/typography/small";

const SessionAvatar = () => {
  const { data: session, status } = useSession();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  switch (status) {
    case "loading":
      return <Skeleton className="size-10 rounded-full" />;
    case "unauthenticated":
      return (
        <Button variant="outline" onClick={() => signIn()}>
          Войти
        </Button>
      );
    case "authenticated":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="hover:cursor-pointer">
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>
                <Skeleton className="rounded-full" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              className="space-x-2"
              onClick={() => router.push(`/u/${user.handle}`)}
            >
              <Avatar>
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>
                  <Skeleton className="rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div>
                <TypographySmall>Профиль</TypographySmall>
                <TypographyMuted>u/{user.handle}</TypographyMuted>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="mr-2 size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Переключить тему</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="mr-2 size-4" />
              <span>Настройки</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 size-4" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }
};

export default SessionAvatar;
