import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Clock, ArrowUp, Check, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define types for the icon components
type IconType = React.ComponentType<{ className?: string; size?: number }>;

// Social media data
const socialLinks = [
  { 
    icon: MessageCircle, 
    label: 'واتساب', 
    href: 'https://wa.me/21894430720',
    color: '#25D366' 
  },
  { 
    icon: Instagram, 
    label: 'إنستغرام', 
    href: 'https://instagram.com',
    color: '#E1306C'
  },
  { 
    icon: Facebook, 
    label: 'فيسبوك', 
    href: 'https://facebook.com',
    color: '#1877F2'
  }
];

interface SocialIconProps {
  icon: IconType;
  label: string;
  href: string;
  color?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, label, href, color = '#EC008C' }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer nofollow"
    className="group relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-lg"
    style={{ backgroundColor: '#FF006620', '--tw-shadow-color': '#FF006640' } as React.CSSProperties}
    whileHover={{ y: -3, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
    title={label}
    dir="rtl"
  >
    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#FF0066] group-hover:text-[#FF0066] transition-transform" />
  </motion.a>
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <motion.a 
      href={href} 
      className="text-white/80 hover:text-[#EC008C] transition-colors duration-300 py-2 inline-block relative group text-right w-full"
      whileHover={{ x: -5 }}
      dir="rtl"
    >
      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#EC008C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <span className="pr-3">{children}</span>
    </motion.a>
  </li>
);

interface ContactItemProps {
  icon: IconType;
  children: React.ReactNode;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon: Icon, children }) => (
  <motion.div 
    className="flex items-center justify-end gap-3 group w-full text-right"
    whileHover={{ x: -5 }}
    dir="rtl"
  >
    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#FF0066]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF0066] transition-colors duration-300">
      <Icon className="w-4 h-4 text-[#FF0066] group-hover:text-white transition-colors duration-300" />
    </div>
    <span className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
      {children}
    </span>
  </motion.div>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [showScroll, setShowScroll] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Subscribed with:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const checkScroll = (): void => {
      if (!showScroll && window.pageYOffset > 300) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  return (
    <footer className="bg-gradient-to-b from-[#1a1f2e] to-[#0f121b] text-white relative overflow-hidden" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EC008C] to-[#00AEEF]"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* About */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="mb-4">
                  <img 
                    src="/images/tawsillogo.png.png" 
                    alt="توصيل بيوكرة - خدمات التوصيل السريع" 
                    className="h-12 md:h-16 w-auto" 
                  />
                </div>
                <p className="text-sm md:text-base text-white/80 text-right leading-relaxed">
                  نوفر لكم أفضل خدمات التوصيل في مدينة بيوكرى. فريق محترف ومخصص لراحتكم في أسرع وقت وبأعلى معايير الجودة.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white/80 mb-3">تواصل معنا</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <SocialIcon 
                      key={index}
                      icon={social.icon}
                      label={social.label}
                      href={social.href}
                      color={social.color}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-5 text-right relative pb-3 after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-[#EC008C] after:to-[#00AEEF]">
              روابط سريعة
            </h3>
            <ul className="space-y-3 text-right">
              <FooterLink href="/">الرئيسية</FooterLink>
              <FooterLink href="#services">خدماتنا</FooterLink>
              <FooterLink href="#about">من نحن</FooterLink>
              <FooterLink href="#testimonials">آراء العملاء</FooterLink>
              <FooterLink href="#contact">اتصل بنا</FooterLink>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-5 text-right relative pb-3 after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-[#EC008C] after:to-[#00AEEF]">
              معلومات الاتصال
            </h3>
            <div className="space-y-4">
              <ContactItem icon={Mail}>
                <a href="mailto:info@biokradelivery.com" className="hover:text-[#EC008C] transition-colors">
                  info@biokradelivery.com
                </a>
              </ContactItem>
              <ContactItem icon={Phone}>
                <a href="tel:+21894430720" className="hover:text-[#EC008C] transition-colors" dir="ltr">
                  +218 94 43 0720
                </a>
              </ContactItem>
              <ContactItem icon={MapPin}>
                <span>شارع محمد المقريف، بيوكرى، المغرب</span>
              </ContactItem>
              <ContactItem icon={Clock}>
                <div className="text-right">
                  <div>الأحد - الخميس: 8 ص - 10 م</div>
                  <div>الجمعة - السبت: 10 ص - 12 م</div>
                </div>
              </ContactItem>
            </div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-12 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-2" dir="rtl">
              <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-[#EC008C] to-[#00AEEF] bg-clip-text text-transparent">
                اشترك في نشرتنا البريدية
              </h3>
              <p className="text-sm md:text-base text-white/70 mb-6 max-w-lg mx-auto">
                اشترك الآن واحصل على آخر العروض الحصرية والتحديثات مباشرة إلى بريدك الإلكتروني
              </p>
            </div>
            
            {isSubscribed ? (
              <motion.div 
                className="bg-green-500/10 border border-green-500/30 text-green-400 text-center p-4 rounded-lg flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Check className="w-5 h-5" />
                <span>تم الاشتراك بنجاح! شكراً لك</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <div className="relative flex-1" dir="rtl">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full h-14 px-5 pl-12 pr-4 text-right bg-white/5 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-[#FF0066] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-all duration-300"
                    required
                    dir="rtl"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                </div>
                <Button 
                  type="submit" 
                  className="h-14 px-8 bg-[#FF0066] hover:bg-[#e5005c] text-white font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#FF0066]/30 flex items-center gap-2 group"
                >
                  <span>اشتراك</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Copyright & Bottom Bar */}
        <div className="border-t border-[#FF0066]/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4" dir="rtl">
            <div className="text-sm text-white/60 text-center md:text-right">
              © {new Date().getFullYear()} أويد | ⴰⵡⵉⴷ | AWID. جميع الحقوق محفوظة
            </div>
            <div className="flex items-center gap-6 text-sm flex-wrap justify-center">
              <a href="#" className="text-white/60 hover:text-[#EC008C] transition-colors whitespace-nowrap">سياسة الخصوصية</a>
              <a href="#" className="text-white/60 hover:text-[#EC008C] transition-colors whitespace-nowrap">الشروط والأحكام</a>
              <a href="#" className="text-white/60 hover:text-[#EC008C] transition-colors whitespace-nowrap">سياسة الإرجاع</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 w-12 h-12 rounded-full bg-[#FF0066] shadow-lg flex items-center justify-center text-white z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0066] transition-all duration-300 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="العودة للأعلى"
        dir="rtl"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};
