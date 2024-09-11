import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

type ProtectedLayoutProps = {
  children: ReactNode
}

export default function ProtectedLayout({children}: ProtectedLayoutProps) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-y-10 bg-sky-500"
    >
      <Navbar />
      {children}
    </div>
  )
}
