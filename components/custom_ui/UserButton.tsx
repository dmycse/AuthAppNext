'use client';

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
 } from "@/components/ui/dropdown-menu";

 import { 
  Avatar,
  AvatarImage,
  AvatarFallback
  } from "@/components/ui/avatar";

import { VscAccount } from "react-icons/vsc";
import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import SignOutButton from "@/components/custom_ui/SignOutButton";

  
  export const UserButton = () => {

    let user = useCurrentUser();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image ?? ''} />
            <AvatarFallback className="bg-sky-400 hover:bg-sky-600">
              <VscAccount className="w-6 h-6 text-white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <SignOutButton>
            <DropdownMenuItem className="cursor-pointer">
              <ExitIcon className="w-5 h-5 mr-3" />
              Sign out
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  