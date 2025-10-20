import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
}

export const RatingPopup = ({ isOpen, onClose, onSubmit }: RatingPopupProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(rating, feedback);
      setIsSubmitted(true);
      // Close the popup after 2 seconds
      setTimeout(() => {
        onClose();
        // Reset form after closing
        setTimeout(() => {
          setRating(0);
          setFeedback('');
          setIsSubmitted(false);
        }, 500);
      }, 2000);
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="إغلاق"
              >
                <X size={24} />
              </button>

              {!isSubmitted ? (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">كيف تقيم خدمتنا؟</h3>
                  <p className="text-gray-600 mb-6">نقدر رأيك في تحسين خدماتنا</p>
                  
                  <div className="flex justify-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-3xl ${star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(rating)}
                        aria-label={`تقييم ${star} من 5`}
                      >
                        {star <= (hover || rating) ? (
                          <Star className="fill-current w-10 h-10" />
                        ) : (
                          <Star className="w-10 h-10" />
                        )}
                      </button>
                    ))}
                  </div>

                  {rating > 0 && (
                    <div className="mb-4">
                      <label htmlFor="feedback" className="block text-right text-gray-700 mb-2">
                        {rating < 4 ? 'كيف يمكننا التحسن؟' : 'ما الذي أعجبك في خدمتنا؟'}
                      </label>
                      <textarea
                        id="feedback"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="اكتب ملاحظاتك هنا..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        dir="rtl"
                      />
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || isSubmitting}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      rating === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white'
                    }`}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-green-500 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">شكراً لك!</h3>
                  <p className="text-gray-600">نقدر لك وقتك وتقييمك لخدمتنا</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RatingPopup;
