"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  AlertTriangle,
  X,
  Bell,
  Shield,
  Star,
  Zap,
  Heart,
  Lightbulb,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  DollarSign,
  FileText,
  Database,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Copy,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
  Search
} from "lucide-react"

// Modern Alert Component
interface ModernAlertProps {
  title?: string
  message: string
  variant?: "default" | "success" | "warning" | "error" | "info" | "premium" | "featured"
  size?: "sm" | "default" | "lg"
  closable?: boolean
  onClose?: () => void
  actions?: React.ReactNode
  icon?: React.ElementType
  className?: string
}

export function ModernAlert({
  title,
  message,
  variant = "default",
  size = "default",
  closable = false,
  onClose,
  actions,
  icon: CustomIcon,
  className
}: ModernAlertProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          textColor: "text-green-800 dark:text-green-200",
          iconColor: "text-green-600 dark:text-green-400",
          titleColor: "text-green-900 dark:text-green-100"
        }
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          textColor: "text-yellow-800 dark:text-yellow-200",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          titleColor: "text-yellow-900 dark:text-yellow-100"
        }
      case "error":
        return {
          icon: XCircle,
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
          textColor: "text-red-800 dark:text-red-200",
          iconColor: "text-red-600 dark:text-red-400",
          titleColor: "text-red-900 dark:text-red-100"
        }
      case "info":
        return {
          icon: Info,
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-800",
          textColor: "text-blue-800 dark:text-blue-200",
          iconColor: "text-blue-600 dark:text-blue-400",
          titleColor: "text-blue-900 dark:text-blue-100"
        }
      case "premium":
        return {
          icon: Star,
          bgColor: "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
          borderColor: "border-amber-200 dark:border-amber-800",
          textColor: "text-amber-800 dark:text-amber-200",
          iconColor: "text-amber-600 dark:text-amber-400",
          titleColor: "text-amber-900 dark:text-amber-100"
        }
      case "featured":
        return {
          icon: Zap,
          bgColor: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
          borderColor: "border-purple-200 dark:border-purple-800",
          textColor: "text-purple-800 dark:text-purple-200",
          iconColor: "text-purple-600 dark:text-purple-400",
          titleColor: "text-purple-900 dark:text-purple-100"
        }
      default:
        return {
          icon: Info,
          bgColor: "bg-slate-50 dark:bg-slate-900/20",
          borderColor: "border-slate-200 dark:border-slate-800",
          textColor: "text-slate-800 dark:text-slate-200",
          iconColor: "text-slate-600 dark:text-slate-400",
          titleColor: "text-slate-900 dark:text-slate-100"
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "p-3 text-sm"
      case "lg":
        return "p-6 text-lg"
      default:
        return "p-4 text-base"
    }
  }

  const config = getVariantConfig()
  const Icon = CustomIcon || config.icon

  return (
    <Card className={cn(
      "border transition-all duration-300 hover:shadow-md",
      config.bgColor,
      config.borderColor,
      getSizeStyles(),
      className
    )}>
      <CardContent className="p-0">
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex-shrink-0 p-2 rounded-lg",
            config.bgColor
          )}>
            <Icon className={cn("h-5 w-5", config.iconColor)} />
          </div>
          
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={cn(
                "font-semibold mb-1",
                config.titleColor
              )}>
                {title}
              </h4>
            )}
            <p className={cn(
              "leading-relaxed",
              config.textColor
            )}>
              {message}
            </p>
            
            {actions && (
              <div className="flex items-center gap-2 mt-3">
                {actions}
              </div>
            )}
          </div>
          
          {closable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={cn(
                "h-8 w-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/5",
                config.textColor
              )}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Modern Toast Component
interface ModernToastProps {
  title?: string
  message: string
  variant?: "default" | "success" | "warning" | "error" | "info"
  duration?: number
  onClose?: () => void
  actions?: React.ReactNode
  className?: string
}

export function ModernToast({
  title,
  message,
  variant = "default",
  duration = 5000,
  onClose,
  actions,
  className
}: ModernToastProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 max-w-sm w-full",
      "animate-in slide-in-from-right-full duration-300",
      className
    )}>
      <ModernAlert
        title={title}
        message={message}
        variant={variant}
        size="default"
        closable={true}
        onClose={() => {
          setIsVisible(false)
          onClose?.()
        }}
        actions={actions}
        className="shadow-2xl border-0"
      />
    </div>
  )
}

// Modern Notification Component
interface ModernNotificationProps {
  title: string
  message: string
  type?: "default" | "success" | "warning" | "error" | "info"
  time?: string
  read?: boolean
  onRead?: () => void
  onDelete?: () => void
  avatar?: string
  className?: string
}

export function ModernNotification({
  title,
  message,
  type = "default",
  time,
  read = false,
  onRead,
  onDelete,
  avatar,
  className
}: ModernNotificationProps) {
  const getTypeConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30"
        }
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
        }
      case "error":
        return {
          icon: XCircle,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30"
        }
      case "info":
        return {
          icon: Info,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/30"
        }
      default:
        return {
          icon: Bell,
          color: "text-slate-600 dark:text-slate-400",
          bgColor: "bg-slate-100 dark:bg-slate-900/30"
        }
    }
  }

  const config = getTypeConfig()
  const Icon = config.icon

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-xl border transition-all duration-200",
      "hover:shadow-md hover:scale-[1.02]",
      read 
        ? "bg-muted/30 border-muted/50 opacity-75" 
        : "bg-background border-border/50",
      className
    )}>
      {avatar ? (
        <img 
          src={avatar} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          config.bgColor
        )}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn(
            "font-semibold text-foreground",
            read && "text-muted-foreground"
          )}>
            {title}
          </h4>
          
          <div className="flex items-center gap-1">
            {time && (
              <span className="text-xs text-muted-foreground">
                {time}
              </span>
            )}
            
            <div className="flex items-center gap-1">
              {!read && onRead && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRead}
                  className="h-6 w-6 rounded-md hover:bg-muted/50"
                >
                  <CheckCircle className="h-3 w-3" />
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="h-6 w-6 rounded-md hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <p className={cn(
          "text-sm mt-1 leading-relaxed",
          read ? "text-muted-foreground" : "text-foreground"
        )}>
          {message}
        </p>
      </div>
    </div>
  )
}

// Modern Status Message Component
interface ModernStatusMessageProps {
  type: "loading" | "success" | "error" | "empty" | "no-results"
  title: string
  message?: string
  icon?: React.ElementType
  actions?: React.ReactNode
  className?: string
}

export function ModernStatusMessage({
  type,
  title,
  message,
  icon: CustomIcon,
  actions,
  className
}: ModernStatusMessageProps) {
  const getTypeConfig = () => {
    switch (type) {
      case "loading":
        return {
          icon: RefreshCw,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          animation: "animate-spin"
        }
      case "success":
        return {
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30"
        }
      case "error":
        return {
          icon: XCircle,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30"
        }
      case "empty":
        return {
          icon: Database,
          color: "text-slate-600 dark:text-slate-400",
          bgColor: "bg-slate-100 dark:bg-slate-900/30"
        }
      case "no-results":
        return {
          icon: Search,
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-100 dark:bg-orange-900/30"
        }
      default:
        return {
          icon: Info,
          color: "text-slate-600 dark:text-slate-400",
          bgColor: "bg-slate-100 dark:bg-slate-900/30"
        }
    }
  }

  const config = getTypeConfig()
  const Icon = CustomIcon || config.icon

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-6 text-center",
      className
    )}>
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
        config.bgColor
      )}>
        <Icon className={cn(
          "h-8 w-8",
          config.color,
          config.animation
        )} />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      {message && (
        <p className="text-muted-foreground max-w-md mb-6">
          {message}
        </p>
      )}
      
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

