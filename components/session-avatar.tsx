"use client";

import { useUserStore } from "@/store/user-store";
import { LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const SessionAvatar = () => {
  const { data: session, status } = useSession();
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
            <DropdownMenuLabel>
              {(user.handle ?? session.user?.name) + " " + session.user?.email}
            </DropdownMenuLabel>
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
