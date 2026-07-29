import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-black dark:text-white shadow hover:bg-blue-700 active:bg-blue-800",
        destructive:
          "bg-red-600 text-black dark:text-white shadow-sm hover:bg-red-700 active:bg-red-800",
        outline:
          "border border-[#30363d] bg-[#161b22] text-[#c9d1d9] shadow-sm hover:bg-[#21262d] hover:text-black dark:text-white",
        secondary:
          "bg-[#21262d] text-[#c9d1d9] shadow-sm hover:bg-[#30363d] hover:text-black dark:text-white",
        ghost: "hover:bg-[#21262d] hover:text-black dark:text-white text-[#8b949e]",
        link: "text-blue-400 underline-offset-4 hover:underline",
        github: "bg-[#238636] text-black dark:text-white shadow hover:bg-[#2ea043] active:bg-[#238636] font-semibold",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
