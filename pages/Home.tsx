import React, { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import { 
  CheckCircle, ArrowLeft, Bot, Send, Calendar, User, 
  Award, Clock, Building, Users, Star, Shield, Zap,
  Home as HomeIcon, Sofa, Briefcase, Bug, Sparkles, Droplet,
  ChevronDown, ChevronUp, MapPin, ChevronRight, ChevronLeft, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../services/wordpressService';
import { BlogPost } from '../types';

// --- Scroll Animation Component ---
const ScrollReveal = ({ 
  children, 
  className = "", 
  animation = "animate-fade-in-up", 
  delay = "0s", 
  threshold = 0.1
}: { 
  children: React.ReactNode, 
  className?: string, 
  animation?: string, 
  delay?: string,
  threshold?: number
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} transition-opacity duration-700 ${isVisible ? animation : 'opacity-0'}`}
      style={{ animationDelay: isVisible ? delay : '0s', animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};

// --- Custom Hook for counting animation ---
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, countRef };
};

const AnimatedStat = ({ icon, end, suffix, label }: { icon: React.ReactNode, end: number, suffix: string, label: string }) => {
  const { count, countRef } = useCounter(end);
  return (
    <div ref={countRef} className="text-center group">
        <div className="text-[#8D6E52] mb-4 flex justify-center group-hover:scale-110 transition duration-300">
            {icon}
        </div>
        <div className="text-3xl md:text-5xl font-black text-[#3E2F23] mb-2 font-mono">
            {count}{suffix}
        </div>
        <div className="text-gray-500 font-bold">{label}</div>
    </div>
  );
};

const ServiceHighlightCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-white p-8 rounded-3xl shadow-xl flex items-start gap-4 border border-gray-50 hover:-translate-y-2 transition-transform duration-300 h-full">
        <div className="bg-[#F9F5F0] p-3 rounded-2xl text-[#8D6E52] shrink-0">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-[#3E2F23] mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const ChatMessage = ({ isBot, text }: { isBot: boolean, text: string }) => (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
        <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
            isBot 
            ? 'bg-white text-gray-700 shadow-sm rounded-tr-none border border-gray-100' 
            : 'bg-[#8D6E52] text-white rounded-tl-none shadow-md'
        }`}>
            {text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
        </div>
    </div>
);

const FeatureRow = ({ icon, title, darkMode = false }: { icon: React.ReactNode, title: string, darkMode?: boolean }) => (
    <div className="flex items-center gap-4 group">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            darkMode ? 'bg-white/10 text-green-400 group-hover:bg-green-500 group-hover:text-white' : 'bg-green-100 text-green-600'
        } transition duration-300`}>
            {icon}
        </div>
        <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} font-bold text-lg`}>{title}</span>
    </div>
);

const Home: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { isBot: true, text: "مرحباً بك في الهدف كلين! 🧹 أنا مساعدك الذكي. يمكنني إخبارك بالأسعار التقريبية أو أفضل طرق التنظيف. كيف أساعدك اليوم؟" }
  ]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts().then(setBlogPosts);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChatSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatInput.trim()) return;
      const userMsg = chatInput;
      setChatHistory(prev => [...prev, { isBot: false, text: userMsg }]);
      setChatInput('');
      setTimeout(() => {
          const botResponse = getSmartResponse(userMsg);
          setChatHistory(prev => [...prev, { isBot: true, text: botResponse }]);
      }, 1000);
  };

  const getSmartResponse = (msg: string) => {
      const m = msg.toLowerCase();
      if (m.includes('سعر') || m.includes('بكام') || m.includes('اسعار') || m.includes('تكلفة')) {
          if (m.includes('كنب') || m.includes('مجلس')) return "💰 أسعار تنظيف الكنب تقريبية في السوق: \n- الطقم 4 قطع يبدأ من 200 ريال.\n- الكنب الزاوية للمتر حوالي 30 ريال.\nنستخدم البخار لإزالة البقع الصعبة! 🛋️";
          if (m.includes('سجاد') || m.includes('موكيت')) return "💰 أسعار تنظيف السجاد:\n- الغرفة (4x4) تبدأ من 150 ريال.\n- الموكيت بالمتر المربع يبدأ من 5 ريال.\nالأسعار تعتمد على كثافة السجاد ونوع الغسيل.";
          if (m.includes('فيلا') || m.includes('شقة')) return "🏡 لتنظيف المنازل الكاملة (شقق/فلل):\n- الشقق الصغيرة: تبدأ من 350 ريال.\n- الفلل: تبدأ من 800 ريال وتختلف حسب المساحة.\nيمكنك حجز معاينة مجانية!";
          return "تختلف الأسعار حسب المساحة والخدمة المطلوبة. بشكل عام:\n- الشقق تبدأ من 350 ريال\n- الكنب يبدأ من 200 ريال.\nما هي الخدمة التي تريدها بالتحديد؟";
      }
      if (m.includes('حجز') || m.includes('موعد') || m.includes('رقم')) return "📞 يمكنك الحجز فوراً بالاتصال على 0500000000 أو عبر صفحة 'اتصل بنا' في الموقع. فريقنا جاهز لخدمتك 24/7!";
      if (m.includes('قهوة') || m.includes('بقع')) return "💡 لإزالة بقع القهوة: جرب خلط الخل الأبيض مع الماء الدافئ وافرك برفق. لكن للأمان التام والحفاظ على القماش، ننصحك بخدمة التنظيف بالبخار لدينا.";
      if (m.includes('مكان') || m.includes('وين') || m.includes('موقع')) return "📍 نحن نغطي جميع أحياء مدينة الرياض وضواحيها. نصلك أينما كنت!";
      return "أنا هنا للمساعدة! يمكنك سؤالي عن 'أسعار الكنب'، 'تنظيف الشقق'، أو 'إزالة البقع'. 😊";
  };

  const services = [
    { icon: <HomeIcon size={32} />, title: "تنظيف المنازل", desc: "تنظيف شامل للغرف والمطابخ والحمامات بأدق التفاصيل." },
    { icon: <Sofa size={32} />, title: "غسيل كنب ومجالس", desc: "إزالة البقع بالبخار والتعقيم العميق للأقمشة والمفروشات." },
    { icon: <Briefcase size={32} />, title: "تنظيف مكاتب", desc: "عقود تنظيف دورية للشركات لضمان بيئة عمل منتجة." },
    { icon: <Bug size={32} />, title: "مكافحة حشرات", desc: "القضاء على الآفات بمواد آمنة وبدون رائحة." },
    { icon: <Sparkles size={32} />, title: "جلي وتلميع رخام", desc: "تلميع ومعالجة الأرضيات الرخامية لاستعادة بريقها." },
    { icon: <Droplet size={32} />, title: "تعقيم شامل", desc: "حماية من الفيروسات والبكتيريا لمنازل صحية." },
  ];

  const processSteps = [
    { num: '01', title: 'تواصل معنا', desc: 'اتصل بنا أو احجز موعدك عبر الموقع بسهولة.', color: 'bg-blue-100 text-blue-600' },
    { num: '02', title: 'وصول الفريق', desc: 'يصل فريقنا المجهز بالكامل في الموعد المحدد.', color: 'bg-yellow-100 text-yellow-600' },
    { num: '03', title: 'استمتع بالنظافة', desc: 'ننجز المهمة بدقة لتستمتع بمنزل نظيف وصحي.', color: 'bg-green-100 text-green-600' }
  ];

  const previousWorks = [
      { id: 1, client: "مستوصف عالم الطب", service: "ترميمات وتنظيف", date: "22 ديسمبر", image: "https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=600&auto=format&fit=crop", rating: 5 },
      { id: 2, client: "شركة الأفق الجديدة", service: "سباكة في بالرياض", date: "15 نوفمبر", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop", rating: 5 },
      { id: 3, client: "مطعم النافورة", service: "كشف تسربات المياه", date: "10 أكتوبر", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop", rating: 4 },
      { id: 4, client: "فيلا حي الروضة", service: "تنظيف واجهات زجاجية", date: "05 سبتمبر", image: "https://images.unsplash.com/photo-1527515637-62b9a8ab4d38?q=80&w=600&auto=format&fit=crop", rating: 5 },
      { id: 5, client: "مكتب المحاماة الدولي", service: "جلي رخام", date: "28 أغسطس", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop", rating: 5 },
      { id: 6, client: "فندق السعادة", service: "تنظيف مفروشات", date: "15 يوليو", image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop", rating: 5 },
  ];

  return (
    <div className="min-h-screen font-sans text-dark bg-white">
      <Hero />
      
      {/* === Services Highlight Strip (Overlapping Hero) === */}
      {/* FIX: Removed negative margin for MD (Tablets). Only apply on LG (Desktop) */}
      <section className="relative z-30 pt-10 md:pt-16 lg:-mt-24 pb-20 pointer-events-none">
        <div className="container mx-auto px-6 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <ScrollReveal delay="0s">
                    <ServiceHighlightCard 
                        icon={<Shield size={36} />} 
                        title="ضمان الأمان" 
                        desc="نضمن لك خدمة آمنة وموثوقة مع عمالة مدربة ومفحوصة أمنياً." 
                    />
                </ScrollReveal>
                <ScrollReveal delay="0.2s">
                    <ServiceHighlightCard 
                        icon={<Zap size={36} />} 
                        title="سرعة في الإنجاز" 
                        desc="نلتزم بالمواعيد وننجز مهام التنظيف بدقة وسرعة فائقة." 
                    />
                </ScrollReveal>
                <ScrollReveal delay="0.4s" className="md:col-span-2 lg:col-span-1">
                    <ServiceHighlightCard 
                        icon={<Star size={36} />} 
                        title="جودة لا تُضاهى" 
                        desc="نستخدم أفضل المواد والمعدات لضمان أعلى معايير النظافة." 
                    />
                </ScrollReveal>
            </div>
        </div>
      </section>

      {/* === About & Stats Section === */}
      <section className="py-16 md:py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Left Image Area */}
            <ScrollReveal animation="animate-fade-in-left" className="w-full lg:w-1/2 relative group px-2 md:px-4">
                <div className="absolute inset-0 bg-[#8D6E52] rounded-[40px] rotate-6 opacity-20 group-hover:rotate-12 transition duration-500 scale-105"></div>
                <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl relative z-10 aspect-square border-8 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=1000&auto=format&fit=crop" 
                      alt="Cleaning Team" 
                      className="w-full h-full object-cover transform transition duration-700 hover:scale-110" 
                    />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 right-8 md:-bottom-8 md:right-10 bg-[#3E2F23] text-white p-6 md:p-8 rounded-2xl shadow-2xl z-20 border-b-8 border-[#8D6E52] transform hover:-translate-y-2 transition">
                    <span className="block text-4xl md:text-6xl font-black mb-1 text-[#B89F88]">10+</span>
                    <span className="text-sm md:text-lg font-medium opacity-80">سنوات من التميز</span>
                </div>
            </ScrollReveal>

            {/* Right Text Area */}
            <ScrollReveal className="w-full lg:w-1/2 mt-12 lg:mt-0">
               <span className="text-[#8D6E52] font-bold tracking-widest uppercase mb-4 block text-lg">من نحن</span>
               <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-[#3E2F23] mb-8 leading-[1.4] lg:leading-[1.3]">
                   شريكك الموثوق <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#8D6E52] to-[#B89F88]">لبيئة نظيفة وصحية</span>
               </h2>
               
               <p className="text-gray-500 leading-[1.8] mb-12 text-lg md:text-xl font-light">
                   تأسست شركة "الهدف كلين" لتضع معايير جديدة في عالم النظافة. نحن لا نقدم خدمة تنظيف فحسب، بل نقدم راحة البال.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-14">
                   {[
                       "مواد تنظيف صديقة للبيئة", "فريق عمل محترف ومؤمن",
                       "ضمان إعادة الخدمة مجاناً", "أسعار تنافسية وواضحة"
                   ].map((item, i) => (
                       <div key={i} className="flex items-center gap-4">
                           <div className="bg-green-100 p-2.5 rounded-full text-green-600 shadow-sm shrink-0">
                               <CheckCircle size={22} />
                           </div>
                           <span className="text-gray-800 font-bold text-lg leading-[1.4]">{item}</span>
                       </div>
                   ))}
               </div>

               <div className="flex flex-col sm:flex-row gap-6">
                   <Link to="/about" className="bg-[#3E2F23] text-white px-10 py-4 rounded-xl shadow-lg hover:bg-[#8D6E52] transition font-bold text-lg text-center">اقرأ المزيد عنا</Link>
                   <Link to="/services" className="px-10 py-4 border-2 border-[#3E2F23]/10 text-[#3E2F23] font-bold rounded-xl hover:bg-[#3E2F23]/5 transition text-lg text-center">خدماتنا</Link>
               </div>
            </ScrollReveal>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 lg:gap-12 mt-28 md:mt-36 divide-y md:divide-y-0 md:divide-x divide-gray-100 divide-x-reverse">
             <ScrollReveal delay="0s"><AnimatedStat icon={<Award size={36} />} end={100} suffix="%" label="جودة مضمونة" /></ScrollReveal>
             <ScrollReveal delay="0.2s"><AnimatedStat icon={<Clock size={36} />} end={50} suffix="k+" label="ساعة عمل" /></ScrollReveal>
             <ScrollReveal delay="0.4s"><AnimatedStat icon={<Building size={36} />} end={200} suffix="+" label="مؤسسة تخدمها" /></ScrollReveal>
             <ScrollReveal delay="0.6s"><AnimatedStat icon={<Users size={36} />} end={5000} suffix="+" label="عميل سعيد" /></ScrollReveal>
          </div>

        </div>
      </section>

      {/* === Our Services Section === */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-20 max-w-3xl mx-auto">
             <span className="text-[#8D6E52] font-bold tracking-widest uppercase mb-4 block">خدماتنا الاحترافية</span>
             <h2 className="text-4xl md:text-5xl font-black text-[#3E2F23] mb-8 leading-[1.4]">نقدم حلول تنظيف متكاملة</h2>
             <p className="text-gray-500 text-xl leading-[1.7]">مهما كانت احتياجاتك، لدينا الفريق والأدوات المناسبة لتقديم أفضل النتائج.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <ScrollReveal key={idx} delay={`${idx * 0.1}s`}>
                <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-default relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-2 h-0 bg-[#8D6E52] group-hover:h-full transition-all duration-300"></div>
                  <div className="w-16 h-16 bg-[#F9F5F0] rounded-2xl flex items-center justify-center text-[#8D6E52] mb-8 group-hover:bg-[#8D6E52] group-hover:text-white transition-colors duration-300 transform group-hover:-rotate-6">
                      {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#3E2F23] mb-4 group-hover:text-[#8D6E52] transition">{service.title}</h3>
                  <p className="text-gray-500 leading-[1.8] mb-8 text-lg">{service.desc}</p>
                  <Link to="/services" className="inline-flex items-center text-[#8D6E52] font-bold hover:gap-3 transition-all text-lg mt-auto">
                      تفاصيل الخدمة <ArrowLeft size={20} className="mr-2" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/services" className="inline-block bg-[#8D6E52] text-white px-14 py-5 rounded-full font-bold shadow-xl hover:bg-[#3E2F23] hover:shadow-2xl transition transform hover:-translate-y-1 text-lg">
               عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </section>

      {/* === Process Section === */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-20 items-center">
               <div className="w-full md:w-1/2">
                  <ScrollReveal>
                    <h2 className="text-4xl lg:text-5xl font-black text-[#3E2F23] mb-12 leading-[1.5]">
                      كيف نضمن لك <br/> تجربة خالية من المتاعب؟
                    </h2>
                  </ScrollReveal>
                  <div className="space-y-10">
                     {processSteps.map((step, idx) => (
                        <ScrollReveal key={idx} delay={`${idx * 0.2}s`} animation="animate-fade-in-left">
                          <div className="flex gap-8 group">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shrink-0 ${step.color} shadow-lg group-hover:scale-110 transition duration-300`}>
                                {step.num}
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-[#3E2F23] mb-3">{step.title}</h4>
                                <p className="text-gray-500 leading-[1.8] text-lg">{step.desc}</p>
                            </div>
                          </div>
                        </ScrollReveal>
                     ))}
                  </div>
               </div>
               <ScrollReveal className="w-full md:w-1/2 relative" animation="animate-fade-in-up">
                  <div className="absolute inset-0 bg-[#F9F5F0] rounded-full transform translate-x-12 translate-y-12 -z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop" 
                    alt="Process" 
                    className="rounded-3xl shadow-2xl w-full object-cover h-[400px] md:h-[500px]"
                  />
               </ScrollReveal>
            </div>
         </div>
      </section>

      {/* === AI Assistant Section === */}
      <section className="py-24 bg-[#3E2F23] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8D6E52] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8D6E52] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
                  {/* Chat UI */}
                  <ScrollReveal className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1" delay="0.3s">
                      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 relative transform transition hover:-translate-y-2 duration-500">
                          <div className="bg-[#1a130e] p-6 flex items-center justify-between text-white border-b border-white/5">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                                      <Bot size={24} className="text-green-400" />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-lg">مساعد الهدف</h3>
                                      <p className="text-xs text-gray-400">يعمل بالذكاء الاصطناعي</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                  <span className="text-xs text-green-400 font-bold">متصل</span>
                              </div>
                          </div>
                          <div 
                             ref={chatContainerRef}
                             className="p-6 bg-[#f8f9fa] h-[400px] flex flex-col gap-6 overflow-y-auto custom-scrollbar scroll-smooth"
                          >
                              {chatHistory.map((msg, i) => (
                                  <ChatMessage key={i} isBot={msg.isBot} text={msg.text} />
                              ))}
                          </div>
                          <form onSubmit={handleChatSubmit} className="p-5 bg-white border-t border-gray-100 flex items-center gap-3">
                              <input 
                                type="text" 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="اسأل عن الأسعار أو الخدمات..." 
                                className="flex-grow bg-gray-50 border border-gray-200 rounded-full px-6 py-4 text-sm focus:ring-2 focus:ring-[#8D6E52] outline-none text-right transition" 
                                dir="rtl" 
                              />
                              <button 
                                type="submit" 
                                disabled={!chatInput.trim()}
                                className="w-12 h-12 bg-[#8D6E52] text-white rounded-full flex items-center justify-center hover:bg-[#2c2119] transition shadow-lg transform hover:scale-110 disabled:opacity-50 disabled:scale-100"
                              >
                                  <Send size={20} className="rotate-180" />
                              </button>
                          </form>
                      </div>
                  </ScrollReveal>

                  {/* Right: Text Info */}
                  <ScrollReveal className="w-full lg:w-1/2 text-right text-white order-1 lg:order-2">
                      <div className="inline-block bg-[#8D6E52] text-white px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-lg border border-white/20">جديد وحصري</div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[1.4]">
                          استشارات تنظيف <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#B89F88] to-white">ذكية وفورية</span>
                      </h2>
                      <p className="text-gray-400 text-xl mb-12 leading-[1.8] font-light">
                          لا داعي للبحث طويلاً. تقنية الذكاء الاصطناعي لدينا مدربة للإجابة على جميع استفساراتك حول التنظيف المنزلي، إزالة البقع الصعبة، وترشيح الباقة الأنسب لمنزلك في ثوانٍ.
                      </p>
                      
                      <div className="space-y-6">
                          <FeatureRow icon={<Clock size={24} />} title="رد فوري على مدار الساعة 24/7" darkMode />
                          <FeatureRow icon={<Shield size={24} />} title="نصائح موثوقة وأسعار السوق" darkMode />
                          <FeatureRow icon={<Zap size={24} />} title="حجز مباشر وسريع للخدمات" darkMode />
                      </div>
                  </ScrollReveal>
              </div>
          </div>
      </section>

      {/* === Previous Works Carousel (Infinite Marquee) === */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
            <ScrollReveal>
                <span className="text-[#8D6E52] font-bold uppercase tracking-widest text-lg block mb-2">سابقة أعمالنا</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#3E2F23]">مشاريع نفذناها بإتقان</h2>
            </ScrollReveal>
        </div>
        
        {/* Infinite Marquee Container */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-scroll hover:[animation-play-state:paused] py-4">
                {/* Duplicate the array twice to ensure smooth looping */}
                {[...previousWorks, ...previousWorks].map((work, index) => (
                    <div key={`${work.id}-${index}`} className="w-[320px] md:w-[380px] shrink-0 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 mx-4">
                        {/* Image Area */}
                        <div className="relative h-56 overflow-hidden">
                            <img src={work.image} alt={work.service} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                            
                            {/* Date Badge */}
                            <div className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-xl text-center shadow-lg min-w-[60px]">
                                <span className="block text-xl font-bold leading-none">{work.date.split(' ')[0]}</span>
                                <span className="text-[10px] font-bold">{work.date.split(' ')[1]}</span>
                            </div>
                            
                            {/* Client Image Overlay (Simulated) */}
                            <div className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow-md flex -space-x-3 space-x-reverse">
                                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                <div className="w-8 h-8 rounded-full bg-[#3E2F23] border-2 border-white flex items-center justify-center text-xs text-white font-bold">2+</div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[#3E2F23] mb-1">سابقة أعمالنا في {work.service}</h3>
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="text-sm text-gray-500 font-bold">اسم العميل: <span className="text-[#8D6E52]">{work.client}</span></span>
                                <span className="text-sm text-gray-400">نوع الخدمة: {work.service}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-400 ml-2">تقييم الخدمة:</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(work.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* === Blog Section === */}
      <section className="py-24 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6">
              <ScrollReveal className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                  <div className="text-right">
                      <span className="text-[#8D6E52] font-bold tracking-widest uppercase mb-4 block">المدونة</span>
                      <h2 className="text-4xl md:text-5xl font-black text-[#3E2F23]">نصائح تهم منزلك</h2>
                  </div>
                  <Link to="/blog" className="hidden md:flex items-center gap-2 text-[#8D6E52] font-bold hover:translate-x-[-5px] transition-transform text-lg">
                      عرض كل المقالات <ArrowLeft size={24} />
                  </Link>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
                  {blogPosts.slice(0, 4).map((post, index) => (
                      <ScrollReveal key={post.id} delay={`${index * 0.15}s`}>
                          <article className="bg-white rounded-3xl shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 h-full">
                              <div className="relative overflow-hidden h-60">
                                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
                                  <img 
                                      src={post.featured_media_url} 
                                      alt={post.title.rendered} 
                                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                                  />
                                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#8D6E52] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm z-20">
                                      {post.category_name}
                                  </span>
                              </div>
                              <div className="p-6 flex-grow flex flex-col">
                                  <div className="flex items-center gap-2 text-xs text-gray-400 font-bold mb-3">
                                      <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                      <span className="flex items-center gap-1"><BookOpen size={10} /> {post.author_name}</span>
                                  </div>
                                  <h3 
                                      className="text-lg font-bold text-[#3E2F23] mb-3 leading-snug group-hover:text-[#8D6E52] transition line-clamp-2"
                                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                  />
                                  <div className="mt-auto pt-4 border-t border-gray-100">
                                      <Link to={`/blog/${post.id}`} className="text-[#8D6E52] font-bold text-sm flex items-center gap-1 group/link">
                                          اقرأ المقال <ChevronLeft size={14} className="group-hover/link:-translate-x-1 transition-transform" />
                                      </Link>
                                  </div>
                              </div>
                          </article>
                      </ScrollReveal>
                  ))}
              </div>
              
              <div className="text-center mt-12 md:hidden">
                  <Link to="/blog" className="inline-block border border-[#8D6E52] text-[#8D6E52] px-8 py-3 rounded-xl font-bold">
                      عرض كل المقالات
                  </Link>
              </div>
          </div>
      </section>

      {/* === Map Section (Full Width with Sepia) === */}
      <section className="w-full h-[400px] bg-gray-200 relative">
          <iframe 
            src="https://maps.google.com/maps?q=Riyadh%2C%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'sepia(0.4) contrast(1.1)' }} 
            allowFullScreen 
            loading="lazy" 
            title="Location Map"
          ></iframe>
          <div className="absolute inset-0 bg-[#8D6E52]/10 pointer-events-none"></div>
          {/* Overlay Card */}
          <div className="absolute bottom-6 right-6 bg-white p-6 rounded-2xl shadow-2xl max-w-xs hidden md:block">
              <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#F9F5F0] rounded-full flex items-center justify-center text-[#8D6E52]">
                      <MapPin size={20} />
                  </div>
                  <div>
                      <h4 className="font-bold text-[#3E2F23] mb-1">تفضل بزيارتنا</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">الرياض، المملكة العربية السعودية. حي العقيق، شارع التخصصي.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* === CTA Banner (Final) === */}
      <section className="bg-[#8D6E52] py-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <div className="container mx-auto px-6 relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">هل منزلك بحاجة إلى تنظيف احترافي؟</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">لا تتردد في طلب المساعدة. فريقنا جاهز لتحويل منزلك إلى واحة من النظافة والراحة.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/contact" className="bg-white text-[#8D6E52] px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-[#3E2F23] hover:text-white transition duration-300 transform hover:-translate-y-1">
                      احجز خدمتك الآن
                  </Link>
                  <a href="tel:+966500000000" className="flex items-center justify-center gap-2 border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition">
                      <Zap size={20} /> اتصل بنا: 0500000000
                  </a>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;