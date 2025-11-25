import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, PhoneCall } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'المدونة', path: '/blog' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isHome = location.pathname === '/';
  
  // Changed background to darker color (#3E2F23) on scroll for better contrast
  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    scrolled || !isHome ? 'bg-[#3E2F23]/95 shadow-lg py-3' : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 flex justify-between items-center text-white">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition">
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold tracking-wide">الهدف كلين</span>
                <span className="text-[10px] tracking-wider opacity-80 uppercase hidden md:block">لخدمات التنظيف</span>
            </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-reverse space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-base font-medium hover:text-[#B89F88] transition-colors duration-300 ${location.pathname === link.path ? 'text-[#B89F88] font-bold' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button (Desktop) */}
        <div className="hidden lg:block">
            <Link 
                to="/contact" 
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-lg transform hover:-translate-y-0.5 ${
                    scrolled || !isHome 
                    ? 'bg-[#8D6E52] text-white hover:bg-white hover:text-[#3E2F23]' 
                    : 'bg-white text-[#8D6E52] hover:bg-[#8D6E52] hover:text-white'
                }`}
            >
                <PhoneCall size={18} />
                <span>احجز الآن</span>
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white focus:outline-none bg-white/10 p-2 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#3E2F23] absolute top-full w-full left-0 shadow-xl border-t border-white/10">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white text-lg font-medium border-b border-white/10 pb-3 hover:pr-2 transition-all flex justify-between"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/contact"
                className="bg-[#8D6E52] text-white py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 mt-4"
                onClick={() => setIsOpen(false)}
            >
                <PhoneCall size={18} />
                احجز موعدك الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;