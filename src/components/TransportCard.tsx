import { Phone, MessageCircle, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransportService } from '@/types/transport';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface TransportCardProps {
  service: TransportService;
  onRate: (serviceId: string, rating: number, comment?: string) => void;
}

export const TransportCard = ({ service, onRate }: TransportCardProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast({
        title: 'يرجى اختيار تقييم',
        variant: 'destructive',
      });
      return;
    }

    onRate(service.id, rating, comment);
    setRating(0);
    setComment('');
    setIsDialogOpen(false);
    toast({
      title: 'شكراً لتقييمك!',
      description: 'تم إضافة تقييمك بنجاح',
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 pt-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🚗</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-2 break-words">{service.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(service.averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground mr-2">
                ({service.totalRatings})
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a href={`tel:${service.phone}`} className="w-full">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Phone className="w-4 h-4" />
              <span className="truncate">{service.phone}</span>
            </Button>
          </a>
          <a
            href={`https://wa.me/${service.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full justify-start gap-2 bg-green-50 hover:bg-green-100 border-green-200">
              <MessageCircle className="w-4 h-4" />
              واتساب
            </Button>
          </a>
        </div>
      </CardContent>

      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">
              قيّم الخدمة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>قيّم {service.name}</DialogTitle>
              <DialogDescription>شارك تجربتك مع هذه الخدمة</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="تعليق (اختياري)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-20"
              />
            </div>

            <DialogFooter>
              <Button onClick={handleSubmitRating} className="w-full">
                إرسال التقييم
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
