import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border-[1.5px] border-slate-100 bg-white/50 px-3 py-2 text-[15px] font-inter placeholder:text-slate-400 focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
