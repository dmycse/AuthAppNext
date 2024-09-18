import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export default async function AuthLayout({children}: {children: ReactNode}) {
  let session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="h-full flex justify-center items-center bg-sky-300">
        {children}
      </div>
    </SessionProvider>
  )
}
