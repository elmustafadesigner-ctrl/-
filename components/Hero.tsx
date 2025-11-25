import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowLeft } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#8D6E52] to-[#6d5540] overflow-hidden flex items-center pt-32 md:pt-20 pb-0">
      
      {/* === Animated Bubbles Background === */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 60 + 20; 
          const left = Math.random() * 100; 
          const duration = Math.random() * 15 + 10; 
          const delay = Math.random() * 10; 
          
          return (
            <div 
              key={i}
              className="bubble absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: '-100px',
                animation: `floatUp ${duration}s linear infinite`,
                animationDelay: `-${delay}s`
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20 h-full pb-10 md:pb-24">
        
        {/* === Right Content (Text) === */}
        <div className="text-white relative order-1 flex flex-col items-start text-right animate-fade-in-up px-2 md:px-0 mt-8 md:mt-0 z-30">
          
          {/* Brand/Subtitle */}
          <div className="flex items-center gap-3 mb-6 md:mb-8 bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/10 backdrop-blur-md hover:bg-white/20 transition duration-300 cursor-default">
             <span className="text-yellow-400 text-lg md:text-xl animate-pulse">✨</span>
             <span className="uppercase tracking-widest text-xs md:text-sm font-bold text-white/90">
               الخيار الأول للنظافة في المملكة
             </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[1.4] md:leading-[1.5] relative">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 pb-2">خدمات تنظيف</span>
            <span className="relative inline-block text-white mt-1">
              المنازل
              <svg className="absolute w-full h-4 md:h-5 -bottom-2 md:-bottom-4 right-0 text-[#B89F88] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-white/90 mb-10 max-w-lg leading-[1.8] font-normal opacity-90">
            استمتع بمنزل نظيف وصحي مع فريقنا المحترف. نستخدم أحدث التقنيات ومواد آمنة لضمان راحتك وسلامة عائلتك.
          </p>

          {/* Buttons with Shine Effect */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto z-30 relative">
              <Link 
                to="/contact"
                className="relative overflow-hidden w-full sm:w-auto bg-[#F9F5F0] text-[#8D6E52] px-8 py-4 font-bold text-lg rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
                <span className="relative z-10">احجز موعدك الآن</span>
                <ArrowLeft size={20} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/services"
                className="w-full sm:w-auto border-2 border-white/30 text-white px-8 py-4 font-bold text-lg rounded-xl hover:bg-white/10 hover:border-white transition duration-300 flex items-center justify-center"
              >
                استكشف خدماتنا
              </Link>
          </div>
            
          {/* === FIXED: 50% OFF Badge - Responsive Positioning === */}
          {/* Mobile/Tablet: Inline/Relative to avoid overlap */}
          <div className="lg:hidden absolute top-0 left-0 -translate-y-full transform z-20">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-lg flex flex-col items-center justify-center text-[#8D6E52] border-2 border-white/50">
                  <span className="text-xl font-black leading-none">50%</span>
                  <span className="text-[8px] font-bold uppercase">OFF</span>
               </div>
          </div>

          {/* Desktop Only: Large Floating Badge */}
          <div className="hidden lg:flex absolute top-[10%] -left-24 w-40 h-40 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border border-white/30 flex-col items-center justify-center text-white shadow-2xl animate-[bounce_4s_infinite] z-30">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-xl"></div>
              <span className="relative text-5xl font-black drop-shadow-lg leading-none mb-1">50%</span>
              <span className="relative text-lg font-bold uppercase tracking-widest drop-shadow-md">OFF</span>
              <span className="relative text-xs mt-2 bg-[#8D6E52] px-3 py-1 rounded-full font-bold shadow-sm">لأول طلب</span>
          </div>

        </div>

        {/* === Left Content (Image) === */}
        <div className="relative order-2 flex justify-center md:justify-end items-center mt-4 md:mt-0 animate-fade-in-left px-4 pb-12 md:pb-0 z-20">
            
            {/* The Image Frame Wrapper */}
            <div className="relative w-full max-w-[500px] lg:max-w-[800px] aspect-[4/3] p-4 md:p-6 transition-all duration-500">
                 
                 {/* Main Image Container */}
                 <div className="w-full h-full relative z-10 rounded-[2rem] overflow-hidden border-[8px] md:border-[12px] border-white/10 shadow-2xl">
                     <img 
                       src="https://images.unsplash.com/photo-1527515637-62b9a8ab4d38?q=80&w=1000&auto=format&fit=crop" 
                       alt="Professional Cleaner" 
                       className="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                 </div>

                 {/* Decorations */}
                 <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 w-32 h-32 md:w-48 md:h-48 z-0 flex flex-col gap-3 items-end justify-start opacity-25">
                     {[...Array(6)].map((_, i) => (
                         <div key={i} className="h-2 bg-[#F9F5F0] rounded-full" style={{width: `${100 - (i*15)}%`}}></div>
                     ))}
                 </div>
                 
                 {/* Floating Card (Verified) - STRICTLY CONTAINED ON MOBILE/TABLET */}
                 {/* On LG screens, it goes negative right. On MD/SM, it stays inside/bottom. */}
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto md:left-auto md:translate-x-0 md:bottom-12 md:right-8 lg:-right-16 lg:bottom-12 bg-white p-4 md:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-30 flex items-center gap-4 animate-pulse border border-gray-100">
                     <div className="bg-green-100 p-2 md:p-3 rounded-full text-green-600 shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                         </svg>
                     </div>
                     <div className="text-right">
                         <p className="text-[10px] md:text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">تم التحقق</p>
                         <p className="text-sm md:text-xl font-black text-gray-800 whitespace-nowrap">عمالة محترفة 100%</p>
                     </div>
                 </div>

            </div>
        </div>
      </div>
      
      {/* === Social Media Corner - Adjusted for Tablet Overlap === */}
      <div className="absolute bottom-0 right-0 z-10 hidden md:block">
          <div className="relative">
              {/* Size reduced on MD to prevent overlap with content */}
              <div className="w-[180px] h-[100px] md:w-[200px] md:h-[120px] lg:w-[300px] lg:h-[160px] bg-white rounded-tl-[80px] md:rounded-tl-[100px] lg:rounded-tl-[140px] shadow-lg flex items-end justify-center pb-6 md:pb-8 lg:pb-16 pr-4 md:pr-6 lg:pr-10">
                  <div className="flex gap-3 md:gap-4 lg:gap-6 relative z-10 translate-x-2 md:translate-x-4">
                    {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                        <a key={i} href="#" className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-[#F9F5F0] flex items-center justify-center text-[#8D6E52] hover:bg-[#8D6E52] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm border border-[#8D6E52]/10">
                            <Icon size={16} className="md:w-[18px] md:h-[18px]" />
                        </a>
                    ))}
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};

export default Hero;