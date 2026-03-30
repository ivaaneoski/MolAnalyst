import React from 'react';
import { cn } from './Button';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border-[1.5px] border-slate-100 bg-white/50 px-3 py-2 text-[15px] font-inter placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-electric focus-visible:ring-2 focus-visible:ring-electric/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-50 transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
