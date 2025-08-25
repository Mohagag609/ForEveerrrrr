'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernButton } from "@/components/ui/modern-buttons"
import { ModernAlert } from "@/components/ui/modern-alerts"
import { ModernStatusMessage } from "@/components/ui/modern-alerts"
import { GradientHero } from "@/components/ui/gradient-hero"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Building2, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Package,
  Settings,
  Shield,
  Database,
  BarChart3,
  Sparkles,
  Zap,
  Star,
  Crown,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingDown,
  Eye,
  Plus,
  Download,
  Share2,
  Target,
  Award,
  Globe,
  Rocket,
  Lightbulb,
  Heart,
  Gift,
  Trophy,
  Medal,
  Flag,
  Compass,
  Navigation,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock as ClockIcon,
  User,
  Building,
  FileText as FileTextIcon,
  Database as DatabaseIcon,
  DollarSign as DollarSignIcon,
  TrendingUp as TrendingUpIcon,
  Package as PackageIcon,
  Settings as SettingsIcon,
  Shield as ShieldIcon,
  BarChart3 as BarChart3Icon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const router = useRouter()
  const features = [
    {
      title: "إدارة العملاء والموردين",
      description: "نظام متكامل لإدارة بيانات العملاء والموردين والشركاء",
      icon: Users,
      href: "/clients",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      gradient: "blue",
      badge: "جديد",
      featured: true,
      stats: "1,234+ عميل"
    },
    {
      title: "إدارة العقارات",
      description: "متابعة المشاريع والوحدات والعقود والأقساط",
      icon: Building2,
      href: "/projects",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      gradient: "green",
      badge: "مميز",
      featured: true,
      stats: "56+ مشروع"
    },
    {
      title: "النظام المحاسبي",
      description: "نظام محاسبي متكامل مع دليل الحسابات والقيود",
      icon: DollarSign,
      href: "/accounting/accounts",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      gradient: "purple",
      badge: "متقدم",
      stats: "89+ عقد"
    },
    {
      title: "إدارة المخازن",
      description: "متابعة المواد والمخازن وحركات المواد",
      icon: Package,
      href: "/warehouses",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      gradient: "orange",
      stats: "12+ مخزن"
    },
    {
      title: "التقارير والإحصائيات",
      description: "تقارير شاملة مع إمكانية التصدير PDF و Excel",
      icon: BarChart3,
      href: "/reports",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      gradient: "indigo",
      badge: "مميز",
      featured: true,
      stats: "50+ تقرير"
    },
    {
      title: "النسخ الاحتياطي",
      description: "نظام آمن للنسخ الاحتياطي واستعادة البيانات",
      icon: Database,
      href: "/settings/backup",
      color: "text-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      gradient: "teal",
      stats: "99.9% أمان"
    }
  ]

  const stats = [
    {
      label: "عميل نشط",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      gradient: "blue"
    },
    {
      label: "مشروع جاري",
      value: "56",
      change: "+8%",
      changeType: "positive",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      gradient: "green"
    },
    {
      label: "عقد نشط",
      value: "89",
      change: "+15%",
      changeType: "positive",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      gradient: "purple"
    },
    {
      label: "قسط مستحق",
      value: "₺2.4M",
      change: "-3%",
      changeType: "negative",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      gradient: "red"
    }
  ]

  const quickActions = [
    {
      title: "إضافة عميل جديد",
      description: "تسجيل عميل جديد في النظام",
      icon: Plus,
      href: "/clients/new",
      gradient: "blue",
      badge: "سريع"
    },
    {
      title: "إنشاء مشروع",
      description: "بدء مشروع عقاري جديد",
      icon: Building2,
      href: "/projects/new",
      gradient: "green",
      badge: "جديد"
    },
    {
      title: "تقرير مالي",
      description: "عرض التقارير المالية",
      icon: BarChart3,
      href: "/reports/financial",
      gradient: "purple",
      badge: "مهم"
    },
    {
      title: "إدارة المخازن",
      description: "مراجعة المخزون والمواد",
      icon: Package,
      href: "/warehouses",
      gradient: "orange",
      badge: "يومي"
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <GradientHero
        title="نظام ERP العقاري المتكامل"
        subtitle="نظام محاسبي وإداري شامل لإدارة شركات المقاولات والعقارات"
        ctaText="لوحة التحكم"
        onCtaClick={() => router.push('/dashboard')}
        gradient="ocean"
      />

      {/* Quick Actions */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            إجراءات سريعة
          </h2>
          <p className="text-muted-foreground">
            الوصول السريع للمهام الأكثر استخداماً
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="card-modern group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                    "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg",
                    "group-hover:scale-110 transition-transform duration-300"
                  )}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{action.title}</h3>
                      <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        {action.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  
                  <ModernButton
                    asChild
                    variant="outline"
                    gradient={action.gradient as any}
                    className="w-full"
                  >
                    <Link href={action.href}>
                      <Eye className="h-4 w-4 ml-2" />
                      فتح
                    </Link>
                  </ModernButton>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="card-modern hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.changeType === "positive" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={cn(
                    "p-3 rounded-xl",
                    stat.bgColor
                  )}>
                    <Icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            المميزات الرئيسية
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف القوة الكاملة لنظام ERP المتكامل مع مجموعة شاملة من الأدوات والميزات
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="card-modern group hover:scale-105 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      "relative p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300",
                      feature.bgColor
                    )}>
                      <Icon className={cn("h-8 w-8", feature.color)} />
                      {feature.featured && (
                        <div className="absolute -top-2 -right-2">
                          <Crown className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        {feature.badge && (
                          <Badge 
                            variant={feature.featured ? "default" : "secondary"}
                            className={cn(
                              "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0",
                              feature.gradient === "blue" && "from-blue-500 to-blue-600",
                              feature.gradient === "green" && "from-green-500 to-green-600",
                              feature.gradient === "purple" && "from-purple-500 to-purple-600",
                              feature.gradient === "orange" && "from-orange-500 to-orange-600",
                              feature.gradient === "indigo" && "from-indigo-500 to-indigo-600",
                              feature.gradient === "teal" && "from-teal-500 to-teal-600"
                            )}
                          >
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                      {feature.stats && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {feature.stats}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <ModernButton 
                      asChild 
                      variant="outline" 
                      gradient={feature.gradient as any}
                      className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                    >
                      <Link href={feature.href} className="flex items-center justify-center gap-2">
                        <Eye className="h-4 w-4" />
                        فتح القسم
                      </Link>
                    </ModernButton>
                    
                    <div className="flex items-center gap-2">
                      <ModernButton
                        variant="ghost"
                        size="sm"
                        icon={Download}
                        className="h-8 w-8 p-0"
                      >
                        
                      </ModernButton>
                      <ModernButton
                        variant="ghost"
                        size="sm"
                        icon={Share2}
                        className="h-8 w-8 p-0"
                      >
                        
                      </ModernButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Security & Trust Section */}
      <div className="grid gap-8 md:grid-cols-2">
        <ModernAlert
          title="نظام آمن وموثوق"
          message="يتميز النظام بأعلى معايير الأمان وحماية البيانات، مع نظام نسخ احتياطي تلقائي وإمكانية استعادة البيانات في أي وقت"
          variant="success"
          size="lg"
          icon={Shield}
          actions={
            <div className="flex items-center gap-2">
              <ModernButton size="sm" variant="outline">
                <Shield className="h-4 w-4 ml-2" />
                تفاصيل الأمان
              </ModernButton>
              <ModernButton size="sm" variant="outline">
                <Download className="h-4 w-4 ml-2" />
                شهادة الأمان
              </ModernButton>
            </div>
          }
        />

        <ModernAlert
          title="أداء عالي وسرعة"
          message="نظام سريع وفعال لجميع العمليات، مع واجهة مستخدم سلسة وسهلة ودعم متعدد اللغات والمنصات"
          variant="info"
          size="lg"
          icon={Zap}
          actions={
            <div className="flex items-center gap-2">
              <ModernButton size="sm" variant="outline">
                <BarChart3 className="h-4 w-4 ml-2" />
                مؤشرات الأداء
              </ModernButton>
              <ModernButton size="sm" variant="outline">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات الأداء
              </ModernButton>
            </div>
          }
        />
      </div>

      {/* CTA Section */}
      <Card className="card-modern bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 border-primary/30">
        <CardContent className="p-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <Rocket className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-foreground">
              ابدأ رحلة النجاح مع نظام ERP المتكامل
            </h3>
            <p className="text-lg text-muted-foreground">
              انضم إلى آلاف الشركات التي تعتمد على نظامنا لإدارة أعمالها
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernButton 
                size="lg"
                gradient="blue"
                onClick={() => router.push('/dashboard')}
                className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 ml-2" />
                ابدأ الآن
              </ModernButton>
              <ModernButton 
                variant="outline" 
                size="lg"
                className="px-8 py-3 text-lg border-primary/30 hover:bg-primary/10 transition-all duration-300"
              >
                <Calendar className="h-5 w-5 ml-2" />
                جدولة عرض توضيحي
              </ModernButton>
            </div>
            
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-border/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                تجربة مجانية 30 يوم
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                دعم فني 24/7
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                تحديثات مجانية
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}