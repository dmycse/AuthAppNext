import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

type HeaderProps = {
  label: string
}

export const Header = ({label}: HeaderProps) => {
  return (
    <header className="w-full flex flex-col justify-center items-center space-y-4">
      <h1 className={cn(font.className, "text-3xl font-semibold")}>
        Auth
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </header>
  )
}
