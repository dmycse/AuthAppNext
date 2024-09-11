'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton } from '@/components/custom_ui/UserButton'


export const Navbar = () => {

  let pathname = usePathname()

  return (
    <nav 
      className="p-4 w-[600px] flex justify-between items-center  
                bg-secondary rounded-md shadow-sm"
    >
      <div className="flex gap-x-2">
      <Button 
          variant={pathname === '/server' ? 'default' : 'outline'}
          asChild 
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button 
          variant={pathname === '/client' ? 'default' : 'outline'}
          asChild 
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button 
          variant={pathname === '/admin' ? 'default' : 'outline'}
          asChild 
        >
          <Link href="/admin">Admin</Link>
        </Button>
        <Button 
          variant={pathname === '/settings' ? 'default' : 'outline'}
          asChild 
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
     <UserButton />
    </nav>
  )
}
