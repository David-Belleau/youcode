"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { GraduationCap, LogOut, User2, Map } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export const LoggedInButton = ({ user }: LoggedInButtonProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
      redirect("/");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="mr-2 h-6 w-6 cursor-pointer">
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          {user.image && (
            <AvatarImage src={user.image} alt={user.name ?? "user picture"} />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/account">
            <User2 className="mr-2" size={12} />
            My account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="block sm:hidden" />
        <DropdownMenuItem asChild className="block sm:hidden">
          <Link href="/explorer" className="flex flex-row">
            <Map className="mr-2" size={12} />
            Explorer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="block sm:hidden" />
        <DropdownMenuItem asChild className="block sm:hidden">
          <Link href="/courses" className="flex flex-row">
            <GraduationCap className="mr-2" size={12} />
            Courses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DropdownMenuItem
            className="border-none"
            disabled={mutation.isPending}
            onClick={() => {
              mutation.mutate();
            }}
          >
            {mutation.isPending ? (
              <Loader className="mr-2" size={12} />
            ) : (
              <LogOut className="mr-2" size={12} />
            )}
            Logout
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
