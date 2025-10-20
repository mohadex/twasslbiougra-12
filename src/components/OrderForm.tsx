import { useState } from 'react';
import { CustomerInfo } from '@/types/pharmacy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

interface OrderFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  onBack: () => void;
  total: number;
}

export const OrderForm = ({ onSubmit, onBack, total }: OrderFormProps) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerInfo.name && customerInfo.phone && customerInfo.address) {
      onSubmit(customerInfo);
    }
  };

  const isValid = customerInfo.name && customerInfo.phone && customerInfo.address;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">معلومات التوصيل</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              الاسم الكامل *
            </Label>
            <Input
              id="name"
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              placeholder="أدخل اسمك الكامل"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الهاتف *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="06XXXXXXXX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              العنوان الكامل *
            </Label>
            <Textarea
              id="address"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
              placeholder="أدخل عنوانك الكامل في بيوكرا، بما في ذلك اسم الحي والنقاط المرجعية"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              ملاحظات إضافية
            </Label>
            <Textarea
              id="notes"
              value={customerInfo.notes}
              onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="أي ملاحظات خاصة أو تعليمات للتوصيل (اختياري)"
              rows={2}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">المجموع النهائي:</span>
              <span className="text-2xl font-bold text-primary">{total} درهم</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              * التوصيل مجاني داخل مدينة بيوكرا
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              رجوع للسلة
            </Button>
            <Button
              type="submit"
              variant="medical"
              disabled={!isValid}
              className="flex-1"
            >
              تأكيد الطلب
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};