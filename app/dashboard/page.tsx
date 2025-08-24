'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MotionSection } from "@/components/ui/motion-section"
import { 
  Building2, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Home,
  Briefcase,
  Receipt,
  Wallet
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns'
import { ar } from 'date-fns/locale'

// Mock data - سيتم استبدالها بـ API calls
const revenueData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'dd/MM', { locale: ar }),
  revenue: Math.floor(Math.random() * 50000) + 20000,
  expenses: Math.floor(Math.random() * 30000) + 10000,
}))

const projectsData = [
  { name: 'مكتمل', value: 12, color: '#10b981' },
  { name: 'قيد التنفيذ', value: 8, color: '#3b82f6' },
  { name: 'متأخر', value: 3, color: '#ef4444' },
  { name: 'معلق', value: 2, color: '#f59e0b' },
]

const installmentsData = [
  { month: 'يناير', paid: 450000, pending: 120000 },
  { month: 'فبراير', paid: 520000, pending: 85000 },
  { month: 'مارس', paid: 380000, pending: 150000 },
  { month: 'أبريل', paid: 620000, pending: 95000 },
  { month: 'مايو', paid: 550000, pending: 110000 },
  { month: 'يونيو', paid: 480000, pending: 130000 },
]

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  trend?: 'up' | 'down'
  prefix?: string
  suffix?: string
}

function KPICard({ title, value, change, icon, trend, prefix, suffix }: KPICardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}{typeof value === 'number' ? value.toLocaleString('ar-SA') : value}{suffix}
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-xs mt-2 ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-3 w-3 ml-1" /> : <TrendingDown className="h-3 w-3 ml-1" />}
            <span>{Math.abs(change)}%</span>
            <span className="text-muted-foreground mr-1">عن الشهر السابق</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('month')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <MotionSection className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <p className="text-muted-foreground">نظرة عامة على أداء النظام</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            أسبوع
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            شهر
          </Button>
          <Button
            variant={timeRange === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('year')}
          >
            سنة
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="إجمالي الإيرادات"
          value={2450000}
          change={12.5}
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
          suffix=" ر.س"
        />
        <KPICard
          title="العقود النشطة"
          value={48}
          change={8}
          trend="up"
          icon={<FileText className="h-4 w-4" />}
        />
        <KPICard
          title="العملاء"
          value={156}
          change={-2.3}
          trend="down"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="نسبة التحصيل"
          value="87.5"
          change={5.2}
          trend="up"
          icon={<CheckCircle className="h-4 w-4" />}
          suffix="%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>الإيرادات والمصروفات</CardTitle>
            <CardDescription>آخر 30 يوم</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `${value.toLocaleString('ar-SA')} ر.س`}
                  labelStyle={{ direction: 'rtl' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  name="الإيرادات"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  fillOpacity={1} 
                  fill="url(#colorExpenses)"
                  name="المصروفات"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projects Status */}
        <Card>
          <CardHeader>
            <CardTitle>حالة المشاريع</CardTitle>
            <CardDescription>توزيع المشاريع حسب الحالة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {projectsData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Installments Overview */}
      <Card>
        <CardHeader>
          <CardTitle>تحصيل الأقساط</CardTitle>
          <CardDescription>مقارنة الأقساط المحصلة والمعلقة</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={installmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `${value.toLocaleString('ar-SA')} ر.س`}
                labelStyle={{ direction: 'rtl' }}
              />
              <Legend />
              <Bar dataKey="paid" fill="#10b981" name="محصل" />
              <Bar dataKey="pending" fill="#f59e0b" name="معلق" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 ml-2" />
              إضافة عقد جديد
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 ml-2" />
              تسجيل عميل جديد
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Receipt className="h-4 w-4 ml-2" />
              إنشاء فاتورة
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Wallet className="h-4 w-4 ml-2" />
              تسجيل دفعة
            </Button>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>تنبيهات مهمة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">5 أقساط متأخرة</p>
                <p className="text-xs text-muted-foreground">إجمالي 125,000 ر.س</p>
              </div>
              <Button size="sm" variant="outline">عرض</Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">3 عقود تنتهي هذا الشهر</p>
                <p className="text-xs text-muted-foreground">تحتاج للتجديد</p>
              </div>
              <Button size="sm" variant="outline">عرض</Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">اجتماع مع العميل أحمد محمد</p>
                <p className="text-xs text-muted-foreground">اليوم في 3:00 م</p>
              </div>
              <Button size="sm" variant="outline">تفاصيل</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>آخر الأنشطة</CardTitle>
          <CardDescription>سجل النشاطات الأخيرة في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: <FileText className="h-4 w-4" />, title: 'عقد جديد #1234', desc: 'تم إنشاء عقد جديد للعميل محمد أحمد', time: 'منذ 5 دقائق', color: 'text-blue-600' },
              { icon: <DollarSign className="h-4 w-4" />, title: 'دفعة مستلمة', desc: 'تم استلام 50,000 ر.س من العميل سارة خالد', time: 'منذ 15 دقيقة', color: 'text-green-600' },
              { icon: <Users className="h-4 w-4" />, title: 'عميل جديد', desc: 'تم تسجيل العميل عبدالله محمد', time: 'منذ ساعة', color: 'text-purple-600' },
              { icon: <Building2 className="h-4 w-4" />, title: 'وحدة محجوزة', desc: 'تم حجز الوحدة A-101 في مشروع النخيل', time: 'منذ ساعتين', color: 'text-orange-600' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.desc}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MotionSection>
  )
}