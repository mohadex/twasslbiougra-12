import { Order } from '@/types/pharmacy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Phone, MapPin, ShoppingBag, Home } from 'lucide-react';

interface ThankYouProps {
  order: Order;
  onStartOver: () => void;
}

export const ThankYou = ({ order, onStartOver }: ThankYouProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="text-center border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            تم تأكيد طلبك بنجاح!
          </h2>
          <p className="text-green-700">
            شكراً لك على طلبك. سنتواصل معك قريباً لتأكيد التفاصيل.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            تفاصيل الطلب #{order.id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {order.items.map((item) => (
              <div key={item.medicine.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{item.medicine.name}</p>
                  <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                </div>
                <p className="font-semibold">{item.medicine.price * item.quantity} درهم</p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">المجموع:</span>
              <span className="text-xl font-bold text-primary">{order.total} درهم</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معلومات التوصيل</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-medium">رقم الهاتف</p>
              <p className="text-muted-foreground">{order.customer.phone}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p className="font-medium">العنوان</p>
              <p className="text-muted-foreground">{order.customer.address}</p>
            </div>
          </div>
          
          {order.customer.notes && (
            <div className="flex items-start gap-3">
              <p className="font-medium">الملاحظات:</p>
              <p className="text-muted-foreground">{order.customer.notes}</p>
            </div>
          )}
          
          <div className="pt-3 border-t">
            <Badge className="bg-blue-100 text-blue-800">
              حالة الطلب: في انتظار التأكيد
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 text-center">
          <h3 className="font-semibold mb-2">خطوات التوصيل</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>1. سنتصل بك خلال 15 دقيقة لتأكيد الطلب</p>
            <p>2. تحضير طلبك (15-30 دقيقة)</p>
            <p>3. التوصيل إلى عنوانك (30-60 دقيقة)</p>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={onStartOver}
              variant="outline"
              className="w-full"
            >
              <Home className="ml-2 h-4 w-4" />
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};