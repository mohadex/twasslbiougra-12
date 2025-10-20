import { CartItem } from '@/types/pharmacy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (medicineId: string, quantity: number) => void;
  onRemoveItem: (medicineId: string) => void;
  onProceedToCheckout: () => void;
}

export const ShoppingCart = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout 
}: ShoppingCartProps) => {
  const total = items.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">السلة فارغة</p>
          <p className="text-sm text-muted-foreground mt-1">أضف بعض الأدوية لتبدأ التسوق</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            سلة التسوق ({items.length} منتج)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.medicine.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{item.medicine.name}</h4>
                <p className="text-sm text-muted-foreground">{item.medicine.price} درهم</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.medicine.id, Math.max(0, item.quantity - 1))}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Badge variant="outline" className="px-3 py-1 min-w-[40px] text-center">
                  {item.quantity}
                </Badge>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-left">
                <p className="font-medium">{item.medicine.price * item.quantity} درهم</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemoveItem(item.medicine.id)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">المجموع:</span>
            <span className="text-2xl font-bold text-primary">{total} درهم</span>
          </div>
          <Button 
            onClick={onProceedToCheckout}
            variant="medical"
            size="lg"
            className="w-full"
          >
            متابعة الطلب
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};