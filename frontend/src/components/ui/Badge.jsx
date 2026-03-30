import React from 'react';
import { cn } from './Button';

export function Badge({ className, variant = "neutral", ...props }) {
  const variants = {
    neutral: "bg-slate-100/50 text-slate-600",
    strong: "bg-emerald/15 text-emerald-600",
    moderate: "bg-amber/15 text-amber-600",
    weak: "bg-slate-400/15 text-slate-600",
    hbond: "bg-cyan-accent/15 text-cyan-600",
    hydrophobic: "bg-amber/15 text-amber-600",
    pistacking: "bg-electric/15 text-electric",
    electrostatic: "bg-emerald/15 text-emerald-600",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-inter tracking-wider uppercase transition-colors outline-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
