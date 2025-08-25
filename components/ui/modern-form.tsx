"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  Search,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  Loader2,
  Plus,
  Trash2,
  Edit,
  Copy
} from "lucide-react"

// Modern Input Component
interface ModernInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  success?: string
  hint?: string
  icon?: React.ElementType
  variant?: "default" | "success" | "error" | "warning"
  size?: "sm" | "default" | "lg"
}

export function ModernInput({
  label,
  error,
  success,
  hint,
  icon: Icon,
  variant = "default",
  size = "default",
  className,
  ...props
}: ModernInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = props.type === "password"
  const inputType = isPassword && showPassword ? "text" : props.type

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-500/50 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/20"
      case "error":
        return "border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/20"
      case "warning":
        return "border-yellow-500/50 focus:border-yellow-500 focus:ring-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-900/20"
      default:
        return "border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-9 px-3 text-sm"
      case "lg":
        return "h-14 px-6 text-lg"
      default:
        return "h-12 px-4 text-base"
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <Input
          {...props}
          type={inputType}
          className={cn(
            "w-full rounded-xl border transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            "placeholder:text-muted-foreground/60",
            getVariantStyles(),
            getSizeStyles(),
            Icon && "pr-12",
            isPassword && "pr-20",
            className
          )}
        />
        
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-muted/50"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </div>
      
      {(error || success || hint) && (
        <div className="flex items-center gap-2 text-sm">
          {error && (
            <>
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{error}</span>
            </>
          )}
          {success && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-600 dark:text-green-400">{success}</span>
            </>
          )}
          {hint && !error && !success && (
            <>
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{hint}</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Modern Textarea Component
interface ModernTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string
  error?: string
  success?: string
  hint?: string
  variant?: "default" | "success" | "error" | "warning"
  size?: "sm" | "default" | "lg"
}

export function ModernTextarea({
  label,
  error,
  success,
  hint,
  variant = "default",
  size = "default",
  className,
  ...props
}: ModernTextareaProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-500/50 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/20"
      case "error":
        return "border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/20"
      case "warning":
        return "border-yellow-500/50 focus:border-yellow-500 focus:ring-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-900/20"
      default:
        return "border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2 text-sm min-h-[80px]"
      case "lg":
        return "px-6 py-4 text-lg min-h-[120px]"
      default:
        return "px-4 py-3 text-base min-h-[100px]"
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <Textarea
        {...props}
        className={cn(
          "w-full rounded-xl border transition-all duration-200 resize-none",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "placeholder:text-muted-foreground/60",
          getVariantStyles(),
          getSizeStyles(),
          className
        )}
      />
      
      {(error || success || hint) && (
        <div className="flex items-center gap-2 text-sm">
          {error && (
            <>
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{error}</span>
            </>
          )}
          {success && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-600 dark:text-green-400">{success}</span>
            </>
          )}
          {hint && !error && !success && (
            <>
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{hint}</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Modern Select Component
interface ModernSelectProps {
  label?: string
  placeholder?: string
  options: { value: string; label: string; icon?: React.ElementType }[]
  value?: string
  onValueChange?: (value: string) => void
  error?: string
  success?: string
  hint?: string
  variant?: "default" | "success" | "error" | "warning"
  size?: "sm" | "default" | "lg"
  disabled?: boolean
}

export function ModernSelect({
  label,
  placeholder,
  options,
  value,
  onValueChange,
  error,
  success,
  hint,
  variant = "default",
  size = "default",
  disabled = false
}: ModernSelectProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-500/50 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50 dark:bg-green-900/20"
      case "error":
        return "border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/20"
      case "warning":
        return "border-yellow-500/50 focus:border-yellow-500 focus:ring-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-900/20"
      default:
        return "border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-9 px-3 text-sm"
      case "lg":
        return "h-14 px-6 text-lg"
      default:
        return "h-12 px-4 text-base"
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium text-foreground">
          {label}
        </Label>
      )}
      
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className={cn(
          "w-full rounded-xl border transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          getVariantStyles(),
          getSizeStyles(),
          disabled && "opacity-50 cursor-not-allowed"
        )}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-border/50 bg-background/95 backdrop-blur-sm">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted/50"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {option.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      
      {(error || success || hint) && (
        <div className="flex items-center gap-2 text-sm">
          {error && (
            <>
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-red-600 dark:text-red-400">{error}</span>
            </>
          )}
          {success && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-green-600 dark:text-green-400">{success}</span>
            </>
          )}
          {hint && !error && !success && (
            <>
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{hint}</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// Modern Form Card Component
interface ModernFormCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "bordered" | "glass"
}

export function ModernFormCard({
  title,
  description,
  children,
  className,
  variant = "default"
}: ModernFormCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "bordered":
        return "border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5"
      case "glass":
        return "glass-card backdrop-blur-xl bg-white/80 dark:bg-slate-900/80"
      default:
        return "bg-card border border-border/50"
    }
  }

  return (
    <Card className={cn(
      "rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl",
      getVariantStyles(),
      className
    )}>
      {(title || description) && (
        <CardHeader className="pb-4">
          {title && (
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  )
}

// Modern Form Actions Component
interface ModernFormActionsProps {
  children: React.ReactNode
  className?: string
}

export function ModernFormActions({ children, className }: ModernFormActionsProps) {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/30",
      className
    )}>
      {children}
    </div>
  )
}

// Modern Form Field Group Component
interface ModernFormFieldGroupProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function ModernFormFieldGroup({
  title,
  description,
  children,
  className
}: ModernFormFieldGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h4 className="text-lg font-semibold text-foreground">{title}</h4>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

