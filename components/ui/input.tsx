import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    pass?: React.ReactNode;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, pass, ...props }, ref) => {

    let [viewPass, setViewPass] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={viewPass ? "text" : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {pass && (
          <span className="absolute top-3 right-2 cursor-pointer" onClick={() => setViewPass(prev => !prev)}>
            {viewPass ? <EyeOpenIcon /> : <EyeClosedIcon />} 
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input";

export { Input };


