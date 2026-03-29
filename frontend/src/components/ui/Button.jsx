import { cn } from "../../lib/utils";

export function Button({ variant = 'primary', size = 'default', className, children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-inter font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue text-white hover:bg-blue-700 focus:ring-blue",
    secondary: "bg-transparent text-slate border-[1.5px] border-slate-400 hover:bg-slate-100 hover:border-blue",
    ghost: "bg-transparent text-blue hover:underline",
    danger: "bg-rose text-white hover:bg-rose-700 focus:ring-rose"
  };
  
  const sizes = {
    default: "px-6 py-3 text-[15px]",
    sm: "px-4 py-2 text-sm",
    icon: "p-2",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)} 
      {...props}
    >
      {children}
    </button>
  );
}
