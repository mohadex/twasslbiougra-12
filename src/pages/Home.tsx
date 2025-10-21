import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Package, Truck, Clock, Droplet, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUp } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { RatingPopup } from '@/components/RatingPopup';
import { toast } from 'sonner';

export const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = [
    'خدمة توصيل سريعة وموثوقة',
    'تغطي جميع أنحاء مدينة بيوكرى',
    'تواصل معنا الآن',
    'احصل على أفضل تجربة توصيل'
  ];

  const handleTyping = useCallback(() => {
    const current = loopNum % toRotate.length;
    const fullText = toRotate[current];
    
    setText(isDeleting 
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1)
    );

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
  }, [text, isDeleting, loopNum]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleTyping();
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, handleTyping]);

  const features = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-[#f1594b]" />,
      title: "1. اطلب الخدمة",
      description: "املأ نموذج الطلب أو تواصل معنا عبر الهاتف، لتحديد احتياجك بدقة واستلمه"
    },
    {
      icon: <Package className="w-12 h-12 text-[#f1594b]" />,
      title: "2. استلم من المندوب",
      description: "يصل المندوب إلى موقعك لاستلام الطرد أو الطلب، في أي وقت وفي أي مكان"
    },
    {
      icon: <Truck className="w-12 h-12 text-[#f1594b]" />,
      title: "3. التوصيل لوجهته سريعة",
      description: "نضمن توصيل الطلب بأمان وسرعة للوجهة المطلوبة عبر شبكتنا من المندوبين المحترفين"
    }
  ];

  const services = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-[#f1594b]" />,
      title: "توصيل الطلبات",
      description: "نقوم بتوصيل طلباتك في أي مكان في بيوكرى، سواء كان ذلك منتجات منزلية أو بقالة، وقت قصير فقط."
    },
    {
      icon: <Clock className="w-12 h-12 text-[#f1594b]" />,
      title: "توصيل سريع",
      description: "خدمة توصيل سريعة لجميع أنحاء المدينة مع مساعدة لطيفة لتلبية احتياجاتك المتنوعة في كل الأوقات"
    },
    {
      icon: <Droplet className="w-12 h-12 text-[#f1594b]" />,
      title: "دعم في على مدار الساعة",
      description: "خدمة عملاء متاحة 24/7 لتلبية جميع احتياجاتك والرد على الاستفسارات في أي وقت"
    }
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      text: "خدمة ممتازة وسريعة! أفضل التوصيل بسهولة. التوصيل كان في الوقت المحدد، ودائماً كان هناك متابعة ممتازة.",
      rating: 5,
      date: "12 أبريل 2025"
    },
    {
      name: "سارة علي",
      text: "تجربة رائعة مع خدمة التوصيل. المندوب كان محترفاً جداً، والطلب وصل بشكل ممتاز. أنصح بشدة!",
      rating: 5,
      date: "10 أكتوبر 2025"
    },
    {
      name: "محمد حسن",
      text: "أفضل خدمة توصيل في بيوكرى. الأسعار معقولة في الوقت، الخدمة المحددة، والكفاءة كان عاليا جداً.",
      rating: 5,
      date: "8 أكتوبر 2025"
    }
  ];

  const handleRatingSubmit = async (rating: number, feedback: string) => {
    // In a real app, you would send this to your backend
    console.log('Rating submitted:', { rating, feedback });
    
    // Mark as rated in localStorage
    setShowRatingPopup(false);
    
    // Show success message
    toast.success('شكراً لتقييمك!', {
      description: 'نقدر لك وقتك في تحسين خدماتنا.',
      position: 'top-center',
      duration: 5000,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 xl:py-40">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{
              backgroundImage: 'url(/images/tawsil-hero.png.jpg)',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              filter: 'brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-[#1a1f2e]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex items-center min-h-[70vh]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#f1594b]">نجعل التنقل في بيوكرى</span> أسهل من أي وقتٍ مضى
            </motion.h1>
            
            <motion.div 
              className="h-12 md:h-14 flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-white/90 text-center font-medium max-w-2xl mx-auto">
                {text}
                <span className="mr-1 animate-pulse text-white">|</span>
              </p>
            </motion.div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/order">
                <Button className="bg-[#f1594b] hover:bg-[#e04a3b] text-white px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  🚗 اطلب خدمة الآن
                </Button>
              </Link>
              <a href="tel:+212600000000">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 hover:border-[#f1594b] px-8 py-6 text-lg font-medium transition-all transform hover:scale-105">
                  📞 تواصل معنا
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block text-sm font-medium text-[#f1594b] bg-[#fef0ef] px-3 py-1 rounded-full mb-3">كيف نعمل</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">كيف تعمل خدمة التوصيل في بيوكرى؟</h2>
          <div className="w-20 h-1 bg-[#f1594b] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 md:text-lg">
            بخطوات بسيطة وسريعة، نوصل احتياجاتك لباب دارك بأمان. خدمة موثوقة وسريعة في جميع أنحاء بيوكرى
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <Card className="h-full p-8 text-center bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-2xl hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#fef0ef] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm font-medium text-[#f1594b] bg-[#fef0ef] px-3 py-1 rounded-full mb-3">خدماتنا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">خدمات النقل في بيوكرى</h2>
            <div className="w-20 h-1 bg-[#f1594b] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 md:text-lg">
              اكتشف أفضل خدمات النقل والتوصيل في بيوكرى مع ضمان السرعة والموثوقية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <Card className="h-full flex flex-col overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="p-1 bg-[#f1594b] flex-1 flex flex-col">
                    <div className="bg-white p-6 md:p-8 rounded-t-lg flex-1 flex flex-col">
                      <div className="w-20 h-20 rounded-xl bg-[#fef0ef] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                    <Link 
                      to="/order" 
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo(0, 0);
                        window.location.href = '/order';
                      }}
                      className="block w-full"
                    >
                      <Button 
                        className="w-full bg-[#f1594b] hover:bg-[#e04a3b] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-orange-100 transition-all duration-300"
                        size="sm"
                        type="button"
                      >
                        احجز الآن
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">آراء عملائنا في بيوكرى</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-5 md:p-6">
              <div className="flex justify-center mb-2 md:mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#f1594b] text-[#f1594b]" />
                ))}
              </div>
              <h4 className="font-bold text-center mb-2 text-sm md:text-base">{testimonial.name}</h4>
              <p className="text-muted-foreground text-center text-xs md:text-sm mb-2 md:mb-3">{testimonial.text}</p>
              <p className="text-xs text-muted-foreground text-center">{testimonial.date}</p>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
      
      {/* Rating Popup */}
      <RatingPopup 
        isOpen={showRatingPopup}
        onClose={() => setShowRatingPopup(false)}
        onSubmit={handleRatingSubmit}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
