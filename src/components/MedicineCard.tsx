import { Medicine } from '@/types/pharmacy';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

export const MedicineCard = ({ medicine, onAddToCart }: MedicineCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-relaxed">{medicine.name}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {medicine.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <CardDescription className="text-right leading-relaxed mb-3">
          {medicine.description}
        </CardDescription>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            {medicine.price} درهم
          </span>
          {medicine.inStock ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              متوفر
            </Badge>
          ) : (
            <Badge variant="destructive">
              غير متوفر
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onAddToCart(medicine)}
          disabled={!medicine.inStock}
          variant="medical"
          className="w-full"
        >
          <ShoppingCart className="ml-2 h-4 w-4" />
          أضف للسلة
        </Button>
      </CardFooter>
    </Card>
  );
};