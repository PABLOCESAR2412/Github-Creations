import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-900/40 text-blue-400 border-blue-800/50",
        secondary:
          "border-transparent bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]",
        destructive:
          "border-transparent bg-red-900/40 text-red-400 border-red-800/50",
        outline: "border-[#30363d] text-[#8b949e]",
        success: "border-transparent bg-green-900/40 text-green-400 border-green-800/50",
        purple: "border-transparent bg-purple-900/40 text-purple-400 border-purple-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
