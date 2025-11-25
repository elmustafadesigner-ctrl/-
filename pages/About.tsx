import React from 'react';
import { Target, Shield, Heart, Users, CheckCircle, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const About: React.FC = () => {
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
                  قصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9F5F0] to-[#B89F88]">الهدف كلين</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed font-light animate-fade-in-up">
                  أكثر من مجرد شركة تنظيف.. نحن شركاؤك في خلق بيئة صحية، آمنة، ومريحة لك ولعائلتك.
              </p>
          </div>
      </div>

      {/* === Story & Vision === */}
      <div className="container mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="bg-white p-10 md:p-14 rounded-3xl shadow-2xl border border-gray-100">
            
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                    <span className="text-[#8D6E52] font-bold tracking-widest uppercase mb-2 block">من نحن</span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#3E2F23] mb-8 leading-snug">
                        رؤية عصرية لمفهوم <br/><span className="text-[#8D6E52]">النظافة الشاملة</span>
                    </h2>
                    
                    <div className="space-y-6 text-gray-600 text-lg leading-loose font-light">
                        <p>
                            تأسست شركة "الهدف كلين" انطلاقاً من حاجة السوق السعودي لخدمات تنظيف تتسم بالاحترافية الحقيقية والمصداقية. لاحظنا أن الكثيرين يعانون من العمالة غير المدربة والمواد الرديئة، فقررنا أن نكون البديل الأفضل.
                        </p>
                        <p>
                            نحن نؤمن بأن النظافة ليست مجرد إزالة للأوساخ الظاهرة، بل هي علم وفن. لذلك، نستثمر باستمرار في تدريب كوادرنا واستيراد أحدث أجهزة البخار والتعقيم لضمان نتائج تبهر عملاءنا في كل مرة.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["خبرة تزيد عن 10 سنوات", "عمالة نظامية 100%", "مواد آمنة للأطفال والحيوانات", "ضمان الرضا الذهبي"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-[#8D6E52]" />
                                <span className="text-[#3E2F23] font-bold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-[#8D6E52] rounded-[40px] rotate-3 opacity-10"></div>
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <img src="https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=600&auto=format&fit=crop" alt="Cleaning Professional" className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8" />
                        <img src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=600&auto=format&fit=crop" alt="Clean Home" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="mt-20 pt-16 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-center text-[#3E2F23] mb-12">قيمنا الراسخة</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <ValueBox icon={<Shield size={32} />} title="الأمانة" desc="نعتبر منزلك هو منزلنا، ونحرص على ممتلكاتك وخصوصيتك." />
                    <ValueBox icon={<Target size={32} />} title="الجودة" desc="لا نرضى بأقل من الكمال، ونهتم بأدق التفاصيل الصغيرة." />
                    <ValueBox icon={<Heart size={32} />} title="الشغف" desc="نحب ما نقوم به، وهذا ينعكس على جودة النتائج." />
                    <ValueBox icon={<Users size={32} />} title="الالتزام" desc="نحترم وقتك ونلتزم بالمواعيد المتفق عليها بدقة." />
                </div>
            </div>
        </div>
      </div>

      {/* === Follow Us Section === */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#3E2F23] mb-8">كن جزءاً من عائلتنا</h2>
              <p className="text-gray-500 mb-10 text-lg">تابعنا على وسائل التواصل الاجتماعي للحصول على نصائح يومية وعروض حصرية.</p>
              
              <div className="flex justify-center gap-6">
                  {[
                      { icon: <Facebook />, label: "فيسبوك", color: "hover:bg-blue-600" },
                      { icon: <Instagram />, label: "انستجرام", color: "hover:bg-pink-600" },
                      { icon: <Twitter />, label: "تويتر", color: "hover:bg-blue-400" },
                      { icon: <Linkedin />, label: "لينكد إن", color: "hover:bg-blue-700" }
                  ].map((item, i) => (
                      <a key={i} href="#" className={`w-14 h-14 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 shadow-sm ${item.color}`}>
                          {item.icon}
                      </a>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

const ValueBox = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-[#8D6E52] group transition-all duration-300 text-center">
        <div className="w-16 h-16 mx-auto bg-white text-[#8D6E52] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-[#3E2F23] mb-3 group-hover:text-white">{title}</h3>
        <p className="text-gray-500 leading-relaxed group-hover:text-white/90">{desc}</p>
    </div>
);

export default About;