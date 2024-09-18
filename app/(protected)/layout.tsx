import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Navbar } from "./_components/navbar";


type ProtectedLayoutProps = {
  children: ReactNode
}

export default async function ProtectedLayout({children}: ProtectedLayoutProps) {
  let session = await auth();

  return (
    <SessionProvider session={session}>
      <div
        className="p-5 w-full min-h-full flex flex-col items-center justify-center gap-y-10 bg-sky-500"
      >
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  )
}
