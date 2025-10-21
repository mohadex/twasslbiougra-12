import { useState } from 'react';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const RatingDialog = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('الرجاء اختيار تقييم');
      return;
    }
    
    toast.success('شكراً لتقييمك! نقدر ملاحظاتك');
    setOpen(false);
    setRating(0);
    setHoveredRating(0);
    setComment('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-[#EC008C] text-[#EC008C] hover:bg-[#EC008C] hover:text-white"
        >
          قيّم خدمتنا
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-2xl">تقييم الخدمة</DialogTitle>
          <DialogDescription className="text-right">
            ساعدنا في تحسين خدماتنا من خلال تقييمك
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-[#EC008C] text-[#EC008C]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && 'سيء جداً'}
                {rating === 2 && 'سيء'}
                {rating === 3 && 'مقبول'}
                {rating === 4 && 'جيد'}
                {rating === 5 && 'ممتاز'}
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <label htmlFor="rating-comment" className="text-sm font-medium text-right block">
              ملاحظات إضافية (اختيارية)
            </label>
            <Textarea
              id="rating-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="اكتب ملاحظاتك هنا..."
              rows={4}
              className="text-right resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#EC008C] hover:bg-[#d4007d] text-white"
          >
            إرسال التقييم
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
