import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
      setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
    setFormData({ name: '', phone: '', service: '', message: '' });
  };

  const faqs = [
      { q: "كم تكلفة تنظيف الشقة؟", a: "تعتمد التكلفة على مساحة الشقة والخدمات المطلوبة. تبدأ الأسعار عادة من 350 ريال. يفضل التواصل معنا للحصول على عرض سعر دقيق." },
      { q: "هل توفرون مواد التنظيف؟", a: "نعم، فريقنا يأتي مجهزاً بجميع المعدات ومواد التنظيف الآمنة والفعالة. لا داعي لتوفير أي شيء." },
      { q: "هل العمالة مدربة وموثوقة؟", a: "بالتأكيد. جميع موظفينا يخضعون لتدريب مكثف وفحص أمني لضمان تقديم خدمة احترافية وآمنة." },
      { q: "كيف يمكنني حجز موعد؟", a: "يمكنك الحجز عن طريق الاتصال بنا، إرسال رسالة واتساب، أو ملء النموذج في هذه الصفحة." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* === Professional Header === */}
      <div className="relative w-full bg-gradient-to-br from-[#8D6E52] to-[#5d4838] overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 text-white">
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-white/10 backdrop-blur-sm"
                  style={{
                    width: `${Math.random() * 60 + 20}px`,
                    height: `${Math.random() * 60 + 20}px`,
                    left: `${Math.random() * 100}%`,
                    bottom: '-50px',
                    animation: `floatUp ${Math.random() * 15 + 10}s linear infinite`,
                    animationDelay: `-${Math.random() * 10}s`
                  }}
                />
            ))}
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up">
                  تواصل <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9F5F0] to-[#B89F88]">معنا</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed font-light animate-fade-in-up">
                  نحن هنا للإجابة على استفساراتك وتلبية طلباتك. لا تتردد في الاتصال بنا للحصول على استشارة مجانية.
              </p>
          </div>
      </div>

      <div className="container mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            
            {/* Contact Info (Left Side) */}
            <div className="bg-[#3E2F23] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                
                <div>
                    <h3 className="text-3xl font-bold mb-10 relative z-10">بيانات التواصل</h3>
                    <div className="space-y-8 relative z-10">
                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 bg-[#8D6E52]/20 border border-[#8D6E52]/50 text-[#B89F88] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#8D6E52] group-hover:text-white transition duration-300">
                                <Phone size={22} />
                            </div>
                            <div className="pt-1">
                                <p className="text-gray-400 text-xs font-bold uppercase mb-1">اتصل بنا</p>
                                <p className="text-xl font-bold dir-ltr text-right group-hover:text-[#B89F88] transition">+966 50 000 0000</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 bg-[#8D6E52]/20 border border-[#8D6E52]/50 text-[#B89F88] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#8D6E52] group-hover:text-white transition duration-300">
                                <Mail size={22} />
                            </div>
                            <div className="pt-1">
                                <p className="text-gray-400 text-xs font-bold uppercase mb-1">راسلنا</p>
                                <p className="text-lg font-bold group-hover:text-[#B89F88] transition">info@elhadaf-clean.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5 group">
                            <div className="w-12 h-12 bg-[#8D6E52]/20 border border-[#8D6E52]/50 text-[#B89F88] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#8D6E52] group-hover:text-white transition duration-300">
                                <MapPin size={22} />
                            </div>
                            <div className="pt-1">
                                <p className="text-gray-400 text-xs font-bold uppercase mb-1">مقرنا</p>
                                <p className="text-lg font-bold leading-relaxed group-hover:text-[#B89F88] transition">الرياض، المملكة العربية السعودية، شارع التخصصي</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-12 relative z-10">
                    <p className="text-gray-400 text-sm font-bold mb-4">تابعنا على منصات التواصل:</p>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Instagram].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8D6E52] hover:scale-110 transition duration-300">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form (Right Side) */}
            <div className="p-10 md:p-14 bg-white">
                <h3 className="text-3xl font-bold text-[#3E2F23] mb-2">أرسل استفسارك</h3>
                <p className="text-gray-500 mb-8">سيسعد فريقنا بالرد عليك في أسرع وقت ممكن.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-bold text-sm mb-2">الاسم</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#8D6E52] focus:ring-4 focus:ring-[#8D6E52]/10 outline-none transition bg-gray-50"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 font-bold text-sm mb-2">رقم الجوال</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#8D6E52] focus:ring-4 focus:ring-[#8D6E52]/10 outline-none transition bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold text-sm mb-2">الخدمة</label>
                            <select 
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#8D6E52] focus:ring-4 focus:ring-[#8D6E52]/10 outline-none transition bg-gray-50"
                            >
                                <option value="">اختر...</option>
                                <option value="home">تنظيف منازل</option>
                                <option value="office">تنظيف مكاتب</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold text-sm mb-2">الرسالة</label>
                        <textarea 
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#8D6E52] focus:ring-4 focus:ring-[#8D6E52]/10 outline-none transition bg-gray-50"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#8D6E52] text-white py-4 font-bold rounded-xl shadow-lg hover:bg-[#3E2F23] hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 text-lg"
                    >
                        <Send size={20} className="ml-1" />
                        إرسال الآن
                    </button>
                </form>
            </div>

        </div>
      </div>

      {/* === FAQ Section === */}
      <section className="py-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-12">
                  <span className="text-[#8D6E52] font-bold tracking-widest uppercase mb-2 block">الأسئلة الشائعة</span>
                  <h2 className="text-3xl md:text-4xl font-black text-[#3E2F23]">أجوبة لأهم استفساراتكم</h2>
              </div>
              
              <div className="space-y-4">
                  {faqs.map((faq, i) => (
                      <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#8D6E52]/30 bg-gray-50">
                          <button 
                             onClick={() => toggleFaq(i)}
                             className="w-full flex items-center justify-between p-6 text-right focus:outline-none"
                          >
                              <div className="flex items-center gap-3">
                                  <HelpCircle className="text-[#8D6E52]" size={20} />
                                  <span className="font-bold text-[#3E2F23] text-lg">{faq.q}</span>
                              </div>
                              {openFaq === i ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                          </button>
                          <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <p className="text-gray-600 leading-relaxed pr-8 border-r-2 border-[#8D6E52]/20 mr-1">{faq.a}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* === Full Width Map === */}
      <section className="h-[400px] w-full relative grayscale hover:grayscale-0 transition duration-700">
           <iframe
               width="100%"
               height="100%"
               frameBorder="0"
               title="map"
               src="https://maps.google.com/maps?q=Riyadh%2C%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed"
               style={{ filter: 'contrast(1.1) opacity(0.9)' }}
             ></iframe>
             <div className="absolute inset-0 bg-[#8D6E52]/10 pointer-events-none"></div>
      </section>

    </div>
  );
};

export default Contact;