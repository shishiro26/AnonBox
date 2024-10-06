"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/shared/auth/log-out-button";
import { LogOut } from "lucide-react";
import CreateComplaint from "./create-complaint";

const TopBar = () => {
  const user = useCurrentUser();
  return (
    <nav className="w-full flex items-center justify-end">
      <div className="flex items-center  hover:cursor-pointer">
        <CreateComplaint />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="font-semibold pointer text-lg capitalize"
          >
            {user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-1 w-48">
          <DropdownMenuLabel className="capitalize white">
            {user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <LogoutButton>
            <DropdownMenuItem>
              <div className="cursor-pointer flex">
                <LogOut className="h-4 w-4 mr-2 cursor-pointer" />
                Logout
              </div>
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default TopBar;
