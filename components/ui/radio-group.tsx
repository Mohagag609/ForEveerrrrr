"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childProps = child.props as any
            return React.cloneElement(child, {
              checked: childProps.value === value,
              onCheckedChange: () => onValueChange?.(childProps.value)
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  checked?: boolean
  onCheckedChange?: () => void
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onCheckedChange}
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <div className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background",
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "flex items-center justify-center",
          className
        )}>
          <Circle className="h-2.5 w-2.5 fill-current text-current opacity-0 peer-checked:opacity-100" />
        </div>
      </div>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }