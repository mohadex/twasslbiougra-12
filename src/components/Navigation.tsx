import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f1594b] sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/tawsillogo.png.png" alt="توصيل بيوكرة - خدمات التوصيل السريع" className="h-12 md:h-16 w-auto" />
            <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>أويد</span>
              <span className="opacity-60">|</span>
              <span>ⴰⵡⵉⴷ</span>
              <span className="opacity-60">|</span>
              <span>AWID</span>
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="text-white/90 hover:text-white transition-colors font-medium">
              الرئيسية
            </Link>
            <Link to="/#services" className="text-white/90 hover:text-white transition-colors font-medium">
              خدماتنا
            </Link>
            <Link to="/transport" className="text-white/90 hover:text-white transition-colors font-medium">
              وسائل النقل
            </Link>
            <Link to="/#about" className="text-white/90 hover:text-white transition-colors font-medium">
              من نحن
            </Link>
            <Link to="/order" className="text-white/90 hover:text-white transition-colors font-medium">
              اتصل بنا
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/20 pt-4">
            <Link 
              to="/" 
              className="block text-white/90 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/20 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/#services" 
              className="block text-white/90 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/20 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              خدماتنا
            </Link>
            <Link 
              to="/transport" 
              className="block text-white/90 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/20 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              وسائل النقل
            </Link>
            <Link 
              to="/#about" 
              className="block text-white/90 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/20 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </Link>
            <Link 
              to="/order" 
              className="block text-white/90 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/20 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
