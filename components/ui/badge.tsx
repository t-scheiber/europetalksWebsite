import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        open: "border-transparent bg-[hsl(150_55%_92%)] text-[hsl(152_60%_22%)] dark:bg-[hsl(152_40%_16%)] dark:text-[hsl(150_55%_80%)]",
        soon: "border-transparent bg-[hsl(46_95%_86%)] text-[hsl(36_75%_22%)] dark:bg-[hsl(42_45%_20%)] dark:text-marker",
        closed: "border-transparent bg-[hsl(218_42%_94%)] text-[hsl(220_24%_32%)] dark:bg-[hsl(222_40%_18%)] dark:text-[hsl(220_26%_78%)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
