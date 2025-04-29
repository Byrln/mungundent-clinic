import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md",
  {
    variants: {
      variant: {
        default: "bg-dental-500 text-white hover:bg-dental-600 font-semibold",
        destructive:
          "bg-error-500 text-white hover:bg-error-500/90",
        outline:
          "border-2 border-dental-500 bg-white text-dental-500 hover:bg-dental-50 font-semibold",
        secondary:
          "bg-sky-500 text-white hover:bg-sky-500/90 font-semibold",
        ghost: "hover:bg-dental-50 text-dental-500",
        link: "text-dental-500 underline-offset-4 hover:underline shadow-none",
        success: "bg-mint-500 text-neutral-800 hover:bg-mint-500/90 font-semibold",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-full px-4 py-2",
        lg: "h-12 rounded-full px-8 py-3 text-base",
        xl: "h-14 rounded-full px-10 py-4 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }