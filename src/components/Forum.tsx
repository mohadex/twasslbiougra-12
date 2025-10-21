import { useState } from 'react';
import { ForumPost } from '@/types/pharmacy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { RatingDialog } from './RatingDialog';
import { ShoppingBag, User, MapPin, Phone, MessageSquare, Image as ImageIcon, Clock, PhoneCall, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState({
    name: '',
    phone: '',
    address: '',
    request: '',
    prescription: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPost.name && newPost.phone && newPost.address && newPost.request) {
      const post: ForumPost = {
        id: Math.random().toString(36).substr(2, 9),
        name: newPost.name,
        phone: newPost.phone,
        request: newPost.request,
        createdAt: new Date()
      };
      
      setPosts(prev => [post, ...prev]);
      setNewPost({ name: '', phone: '', address: '', request: '', prescription: null });
      toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-2 text-sm md:text-base text-[#EC008C] hover:text-[#d4007d] font-medium transition-colors mb-6">
            <ArrowRight className="w-4 h-4 transform rotate-180" />
            العودة للصفحة الرئيسية
          </Link>

          {/* Header Card */}
          <Card className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-0 mb-8 bg-gradient-to-r from-pink-50 to-rose-50">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center mb-4 shadow-inner">
                <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-[#EC008C]" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">طلب خدمة التوصيل</h1>
              <p className="text-gray-600 max-w-md mb-4">املأ النموذج وسيتصل بك فريقنا في أقرب وقت لتأكيد طلبك</p>
              
              {/* Rating Button */}
              <div className="mt-2">
                <RatingDialog />
              </div>
            </div>
          </Card>

          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 md:mb-8 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-lg">ℹ️</span>
                </div>
              </div>
              <div className="mr-3">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">معلومات هامة:</span> خدمة التوصيل متوفرة في جميع أنحاء مدينة بيوكرى. سيتم الرد على طلبك في غضون 30 دقيقة
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-6 md:p-8 rounded-2xl shadow-sm border-0 bg-white mb-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">نموذج الطلب</h2>
              <div className="w-10 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="forum-name" className="text-right block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="forum-name"
                    type="text"
                    value={newPost.name}
                    onChange={(e) => setNewPost(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="أدخل الاسم الكامل"
                    className="text-right pr-10 h-12 text-base border-gray-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    required
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="forum-address" className="text-right block text-sm md:text-base">
                  * العنوان
                </Label>
                <div className="relative">
                  <Input
                    id="forum-address"
                    type="text"
                    value={newPost.address}
                    onChange={(e) => setNewPost(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="أدخل العنوان"
                    className="text-right pr-10"
                    required
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="forum-phone" className="text-right block text-base">
                  * رقم الهاتف
                </Label>
                <div className="relative">
                  <Input
                    id="forum-phone"
                    type="tel"
                    value={newPost.phone}
                    onChange={(e) => setNewPost(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="أدخل رقم الهاتف"
                    className="text-right pr-10"
                    required
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="forum-request" className="text-right block text-base">
                  * ماذا تريد؟
                </Label>
                <div className="relative">
                  <Textarea
                    id="forum-request"
                    value={newPost.request}
                    onChange={(e) => setNewPost(prev => ({ ...prev, request: e.target.value }))}
                    placeholder="اكتب طلبك هنا..."
                    rows={5}
                    className="text-right pr-10 resize-none text-base"
                    required
                  />
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prescription" className="text-right block text-sm md:text-base">
                  صورة (اختيارية)
                </Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 md:p-8 text-center hover:border-primary transition-colors cursor-pointer touch-manipulation">
                  <input
                    id="prescription"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPost(prev => ({ ...prev, prescription: e.target.files?.[0] || null }))}
                    className="hidden"
                  />
                  <label htmlFor="prescription" className="cursor-pointer">
                    <ImageIcon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 text-muted-foreground" />
                    <p className="text-sm md:text-base font-medium text-[#EC008C] mb-1">انقر لرفع صورة</p>
                    <p className="text-xs md:text-sm text-muted-foreground">أو اسحبها هنا</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      يمكنك رفع صورة للمنتج أو أي صورة توضيحية
                    </p>
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-base md:text-lg py-6 rounded-xl font-bold shadow-lg hover:shadow-pink-200/50 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                إرسال الطلب
              </Button>
            </form>
          </Card>

          {/* Additional Info */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <a 
              href="https://wa.me/212720435617" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full p-6 text-center bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-2xl overflow-hidden">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.96.66 3.77 1.76 5.22l-1.02 3.04 3.09-.1A9.9 9.9 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.43 0-2.8-.28-4.06-.8l-.22-.13-2.34.08.63-1.87-.15-.24A8 8 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.52-11.97l-3.05 3.05-1.18-1.18a.5.5 0 00-.7.01l-1.77 1.77a.5.5 0 00.71.71l1.23-1.22 3.06 3.06a.5.5 0 00.7 0l5.66-5.66a.5.5 0 00-.71-.7l-5.15 5.16z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">تواصل معنا على واتساب</h3>
                <p className="text-sm text-gray-600 mb-2" dir="ltr">+212 7 20 43 56 17</p>
                <div className="mt-3 inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-700 transition-colors">
                  ابدأ المحادثة
                  <svg className="w-4 h-4 mr-1 transform -scale-x-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Card>
            </a>

            <Card className="p-6 text-center bg-white border border-gray-100 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
                <Clock className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">أوقات العمل</h3>
              <p className="text-sm text-muted-foreground">كل أيام الأسبوع من 8 صباحاً حتى 10 مساءً</p>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
