import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, type = 'button', children, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button";
  
  const variants = {
    primary: "bg-electric text-white font-semibold hover:bg-electric-hover active:bg-electric-active disabled:bg-slate-400 disabled:text-slate-600 disabled:cursor-not-allowed",
    secondary: "bg-transparent border-[1.5px] border-slate-400 text-slate-900 font-medium hover:bg-slate-100 hover:border-electric",
    ghost: "bg-transparent text-electric hover:underline underline-offset-4 font-medium",
    danger: "bg-rose text-white font-semibold hover:bg-rose-600 active:bg-rose-700",
  };

  const sizes = {
    default: "h-11 px-6 rounded-lg text-[15px]",
    sm: "h-9 px-4 rounded-md text-sm",
    lg: "h-12 px-8 rounded-lg text-base",
    icon: "h-10 w-10 rounded-lg flex items-center justify-center p-0",
  };

  return (
    <Comp
      type={type}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";
