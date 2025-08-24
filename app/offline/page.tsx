import { WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <WifiOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">أنت غير متصل بالإنترنت</h1>
        <p className="text-muted-foreground mb-4">
          يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى
        </p>
        <Button onClick={() => window.location.reload()}>
          إعادة المحاولة
        </Button>
      </div>
    </div>
  )
}