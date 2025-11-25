import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
                 <Sparkles className="h-6 w-6 text-primary" />
                 <h3 className="text-2xl font-bold">الهدف كلين</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              نحن نقدم خدمات تنظيف عالية الجودة للمنازل والمكاتب. فريقنا محترف ومجهز بأحدث الأدوات لضمان بيئة نظيفة وصحية لك ولعائلتك.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-r-4 border-primary pr-3">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition">الصفحة الرئيسية</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition">من نحن</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition">خدماتنا</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary transition">المدونة والمقالات</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 border-r-4 border-primary pr-3">معلومات التواصل</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 shrink-0" size={20} />
                <span className="text-gray-400">المملكة العربية السعودية، الرياض، شارع التخصصي</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={20} />
                <span className="text-gray-400 dir-ltr text-right">+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={20} />
                <span className="text-gray-400">info@elhadaf-clean.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} شركة الهدف كلين. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;