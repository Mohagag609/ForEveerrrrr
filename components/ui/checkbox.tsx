"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <input
        type="checkbox"
        className="peer sr-only"
        ref={ref}
        {...props}
      />
      <div className={cn(
        "h-4 w-4 rounded-sm border border-primary ring-offset-background",
        "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "peer-checked:bg-primary peer-checked:text-primary-foreground",
        "flex items-center justify-center",
        className
      )}>
        <Check className="h-3 w-3 opacity-0 peer-checked:opacity-100" />
      </div>
    </div>
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }