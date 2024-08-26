import { ReactNode } from "react";


export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className="h-full flex justify-center items-center bg-sky-300">
      {children}
    </div>
  )
}
