"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  Share2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Save,
  Search,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  Heart,
  Zap,
  Sparkles,
  Crown,
  Trophy,
  Gift,
  Bell,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  User,
  Users,
  Building,
  Home,
  FileText,
  Database,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Award,
  Shield,
  Key,
  Wifi,
  Bluetooth,
  Camera,
  Video,
  Mic,
  Headphones,
  Speaker,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Server,
  Cloud,
  Globe,
  Map,
  Compass,
  Navigation,
  Car,
  Plane,
  Train,
  Ship,
  Bike,
  Gamepad2,
  Music,
  Film,
  Book,
  Newspaper,
  Folder,
  File,
  Image,
  Video as VideoIcon,
  Archive,
  Inbox,
  Send,
  Reply,
  Forward,
  ReplyAll,
  Trash,
  Archive as ArchiveIcon,
  Tag,
  Bookmark,
  Flag,
  Pin,
  Link,
  Unlink,
  Code,
  Terminal,
  Command,
  Power,
  Battery,
  Wifi as WifiIcon,
  Signal,
  Volume,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Shuffle,
  Repeat,
  Repeat1,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  Repeat1 as Repeat1Icon,
  Shuffle as ShuffleIcon2,
  Repeat as RepeatIcon2,
  Repeat1 as Repeat1Icon2
} from "lucide-react"

// Modern Button Component
interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
  size?: "sm" | "default" | "lg" | "xl"
  icon?: React.ElementType
  iconPosition?: "left" | "right"
  loading?: boolean
  success?: boolean
  error?: boolean
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
  gradient?: "blue" | "purple" | "green" | "orange" | "red" | "pink" | "indigo" | "teal"
  className?: string
  asChild?: boolean
  children?: React.ReactNode
}

export function ModernButton({
  variant = "default",
  size = "default",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  success = false,
  error = false,
  badge,
  badgeVariant = "secondary",
  gradient,
  className,
  asChild = false,
  children,
  disabled,
  ...props
}: ModernButtonProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-9 px-3 text-sm"
      case "lg":
        return "h-12 px-6 text-lg"
      case "xl":
        return "h-16 px-8 text-xl"
      default:
        return "h-11 px-4 text-base"
    }
  }

  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return "sm"
      case "lg":
        return "lg"
      case "xl":
        return "lg"
      default:
        return "default"
    }
  }

  const getGradientStyles = () => {
    if (!gradient) return ""
    
    switch (gradient) {
      case "blue":
        return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      case "purple":
        return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
      case "green":
        return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      case "orange":
        return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
      case "red":
        return "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
      case "pink":
        return "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
      case "indigo":
        return "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
      case "teal":
        return "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
      default:
        return ""
    }
  }

  const getStateStyles = () => {
    if (loading) return "opacity-80 cursor-wait"
    if (success) return "bg-green-500 hover:bg-green-600 text-white"
    if (error) return "bg-red-500 hover:bg-red-600 text-white"
    return ""
  }

  const isDisabled = disabled || loading

  const buttonContent = (
    <>
      {loading && (
        <RefreshCw className="h-4 w-4 animate-spin" />
      )}
      
      {!loading && Icon && iconPosition === "left" && (
        <Icon className="h-4 w-4" />
      )}
      
      <span className="flex items-center gap-2">
        {children}
        {badge && (
          <Badge variant={badgeVariant} className="ml-1">
            {badge}
          </Badge>
        )}
      </span>
      
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4" />
      )}
      
      {success && (
        <Check className="h-4 w-4 ml-1" />
      )}
      
      {error && (
        <X className="h-4 w-4 ml-1" />
      )}
    </>
  )



  return (
    <Button
      variant={variant}
      size={getButtonSize()}
      disabled={isDisabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium",
        "transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "rounded-xl shadow-sm hover:shadow-md",
        getSizeStyles(),
        getGradientStyles(),
        getStateStyles(),
        className
      )}
      {...props}
    >
      {buttonContent}
    </Button>
  )
}

// Action Button Component
interface ActionButtonProps {
  action: "add" | "edit" | "delete" | "copy" | "download" | "upload" | "share" | "view" | "hide" | "lock" | "unlock"
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost" | "destructive"
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export function ActionButton({
  action,
  size = "default",
  variant = "default",
  loading = false,
  disabled = false,
  onClick,
  className,
  children
}: ActionButtonProps) {
  const getActionConfig = () => {
    switch (action) {
      case "add":
        return {
          icon: Plus,
          label: "إضافة",
          color: "text-green-600",
          bgColor: "bg-green-100 hover:bg-green-200",
          borderColor: "border-green-200"
        }
      case "edit":
        return {
          icon: Edit,
          label: "تعديل",
          color: "text-blue-600",
          bgColor: "bg-blue-100 hover:bg-blue-200",
          borderColor: "border-blue-200"
        }
      case "delete":
        return {
          icon: Trash2,
          label: "حذف",
          color: "text-red-600",
          bgColor: "bg-red-100 hover:bg-red-200",
          borderColor: "border-red-200"
        }
      case "copy":
        return {
          icon: Copy,
          label: "نسخ",
          color: "text-purple-600",
          bgColor: "bg-purple-100 hover:bg-purple-200",
          borderColor: "border-purple-200"
        }
      case "download":
        return {
          icon: Download,
          label: "تحميل",
          color: "text-indigo-600",
          bgColor: "bg-indigo-100 hover:bg-indigo-200",
          borderColor: "border-indigo-200"
        }
      case "upload":
        return {
          icon: Upload,
          label: "رفع",
          color: "text-teal-600",
          bgColor: "bg-teal-100 hover:bg-teal-200",
          borderColor: "border-teal-200"
        }
      case "share":
        return {
          icon: Share2,
          label: "مشاركة",
          color: "text-orange-600",
          bgColor: "bg-orange-100 hover:bg-orange-200",
          borderColor: "border-orange-200"
        }
      case "view":
        return {
          icon: Eye,
          label: "عرض",
          color: "text-cyan-600",
          bgColor: "bg-cyan-100 hover:bg-cyan-200",
          borderColor: "border-cyan-200"
        }
      case "hide":
        return {
          icon: EyeOff,
          label: "إخفاء",
          color: "text-slate-600",
          bgColor: "bg-slate-100 hover:bg-slate-200",
          borderColor: "border-slate-200"
        }
      case "lock":
        return {
          icon: Lock,
          label: "قفل",
          color: "text-amber-600",
          bgColor: "bg-amber-100 hover:bg-amber-200",
          borderColor: "border-amber-200"
        }
      case "unlock":
        return {
          icon: Unlock,
          label: "فتح",
          color: "text-emerald-600",
          bgColor: "bg-emerald-100 hover:bg-emerald-200",
          borderColor: "border-emerald-200"
        }
      default:
        return {
          icon: Plus,
          label: "إجراء",
          color: "text-slate-600",
          bgColor: "bg-slate-100 hover:bg-slate-200",
          borderColor: "border-slate-200"
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-8 px-3 text-sm"
      case "lg":
        return "h-12 px-6 text-lg"
      default:
        return "h-10 px-4 text-base"
    }
  }

  const config = getActionConfig()
  const Icon = config.icon

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center gap-2 font-medium",
        "transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "rounded-lg shadow-sm hover:shadow-md",
        getSizeStyles(),
        variant === "outline" && config.borderColor,
        variant === "ghost" && config.bgColor,
        variant === "default" && config.bgColor,
        config.color,
        className
      )}
    >
      {loading ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {children || config.label}
    </Button>
  )
}

// Icon Button Component
interface IconButtonProps {
  icon: React.ElementType
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary"
  size?: "sm" | "default" | "lg" | "xl"
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  tooltip?: string
}

export function IconButton({
  icon: Icon,
  variant = "default",
  size = "default",
  loading = false,
  disabled = false,
  onClick,
  className,
  tooltip
}: IconButtonProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8"
      case "lg":
        return "h-12 w-12"
      case "xl":
        return "h-16 w-16"
      default:
        return "h-10 w-10"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "lg":
        return "h-5 w-5"
      case "xl":
        return "h-6 w-6"
      default:
        return "h-4 w-4"
    }
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center",
        "transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "rounded-xl shadow-sm hover:shadow-md",
        getSizeStyles(),
        className
      )}
      title={tooltip}
    >
      {loading ? (
        <RefreshCw className={cn("animate-spin", getIconSize())} />
      ) : (
        <Icon className={getIconSize()} />
      )}
    </Button>
  )
}

// Floating Action Button Component
interface FloatingActionButtonProps {
  icon: React.ElementType
  onClick?: () => void
  variant?: "primary" | "secondary" | "success" | "warning" | "error"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
}

export function FloatingActionButton({
  icon: Icon,
  onClick,
  variant = "primary",
  size = "default",
  className,
  children
}: FloatingActionButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
      case "secondary":
        return "bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white shadow-lg hover:shadow-xl"
      case "success":
        return "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
      case "warning":
        return "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
      case "error":
        return "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
      default:
        return "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-12 w-12"
      case "lg":
        return "h-20 w-20"
      default:
        return "h-16 w-16"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-5 w-5"
      case "lg":
        return "h-8 w-8"
      default:
        return "h-6 w-6"
    }
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "inline-flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "hover:scale-110 active:scale-95",
        "rounded-full shadow-2xl",
        getVariantStyles(),
        getSizeStyles(),
        className
      )}
    >
      <Icon className={getIconSize()} />
      {children && (
        <span className="ml-2 font-medium">
          {children}
        </span>
      )}
    </button>
  )
}

