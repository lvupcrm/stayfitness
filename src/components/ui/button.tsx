import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus-visible:ring-blue-500 stay-glow-primary",
        primary:
          "stay-gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-blue-500 stay-glow-primary",
        accent:
          "stay-gradient-accent text-slate-900 shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-yellow-500 stay-glow-accent font-bold",
        success:
          "stay-gradient-success text-white shadow-lg hover:shadow-xl hover:scale-105 focus-visible:ring-emerald-500",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 hover:shadow-xl focus-visible:ring-red-500",
        outline:
          "border-2 border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus-visible:ring-slate-500",
        secondary:
          "bg-slate-100 text-slate-700 shadow-sm hover:bg-slate-200 hover:shadow-md focus-visible:ring-slate-500",
        ghost:
          "text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-500",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 px-4 py-2 text-xs rounded-lg",
        lg: "h-13 px-8 py-3 text-base rounded-xl",
        xl: "h-16 px-10 py-4 text-lg rounded-2xl font-bold",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
