import React from 'react';
import { Home, Briefcase, Sofa, Bug, Sparkles, Droplet, ArrowLeft, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
    const services = [
        {
            icon: <Home size={32} />,
            title: "تنظيف المنازل والشقق",
            desc: "خدمة شاملة تشمل جميع غرف المنزل، المطابخ، والحمامات بأدق التفاصيل. نضمن لك منزلاً لامعاً وصحياً.",
            features: ["تلميع الأرضيات", "تنظيف النوافذ", "تعقيم الحمامات"]
        },
        {
            icon: <Sofa size={32} />,
            title: "تنظيف الكنب والمجالس",
            desc: "إزالة البقع الصعبة وتعقيم الأقمشة باستخدام البخار ومواد متخصصة تحافظ على جودة القماش.",
            features: ["إزالة البقع المستعصية", "تعقيم بالبخار", "تجفيف سريع"]
        },
        {
            icon: <Briefcase size={32} />,
            title: "تنظيف الشركات والمكاتب",
            desc: "عقود تنظيف دورية للشركات لضمان بيئة عمل نظيفة وجذابة تزيد من إنتاجية الموظفين.",
            features: ["عقود سنوية وشهرية", "تنظيف خارج ساعات العمل", "معدات احترافية"]
        },
        {
            icon: <Bug size={32} />,
            title: "مكافحة الحشرات",
            desc: "القضاء على جميع أنواع الحشرات الزاحفة والطائرة بمبيدات آمنة وفعالة ومرخصة.",
            features: ["مبيدات بدون رائحة", "ضمان 6 أشهر", "زيارات متابعة"]
        },
        {
            icon: <Sparkles size={32} />,
            title: "جلي وتلميع الرخام",
            desc: "استعادة لمعان الرخام والسيراميك باستخدام أحدث أجهزة الجلي والكريستال.",
            features: ["معالجة الشقوق", "تلميع بالكريستال", "عزل وحماية"]
        },
        {
            icon: <Droplet size={32} />,
            title: "تعقيم وتطهير",
            desc: "خدمات تعقيم ضد الفيروسات والبكتيريا لحماية صحة عائلتك باستخدام مواد معتمدة.",
            features: ["تعقيم الأسطح", "مواد آمنة للأطفال", "قضاء على 99% من الجراثيم"]
        }
    ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* === Professional Header === */}
      <div className="relative w-full bg-gradient-to-br from-[#8D6E52] to-[#5d4838] overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 text-white">
          {/* Bubbles */}
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
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-sm font-medium text-yellow-100 mb-6 animate-fade-in-up">
                  <Star size={14} className="animate-pulse" />
                  <span>خدمات احترافية بجودة عالمية</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  خدماتنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9F5F0] to-[#B89F88]">المتكاملة</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  نقدم لك مجموعة شاملة من حلول التنظيف المصممة خصيصاً لتلبية احتياجات منزلك أو مكتبك بأعلى معايير الجودة.
              </p>
          </div>
      </div>

      {/* === Services Grid === */}
      <div className="container mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
                    <div className="w-16 h-16 bg-[#F9F5F0] rounded-2xl flex items-center justify-center text-[#8D6E52] mb-6 group-hover:bg-[#8D6E52] group-hover:text-white transition-colors duration-300 transform group-hover:-rotate-6">
                        {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#3E2F23] mb-4 group-hover:text-[#8D6E52] transition">{service.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 h-20">{service.desc}</p>
                    
                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                        {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <CheckCircle size={16} className="text-green-500" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/contact" className="w-full block text-center bg-gray-50 border border-gray-200 text-[#3E2F23] font-bold py-3 rounded-xl hover:bg-[#8D6E52] hover:text-white hover:border-[#8D6E52] transition-colors">
                        اطلب الخدمة
                    </Link>
                </div>
            ))}
        </div>
      </div>

      {/* === CTA Section === */}
      <section className="bg-[#3E2F23] py-20 text-white mt-10">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6">لم تجد الخدمة التي تبحث عنها؟</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
                  نحن نقدم حلول مخصصة حسب الطلب. تواصل معنا وأخبرنا بما تحتاجه، وسنقدم لك عرض سعر مناسب.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[#B89F88] text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-[#3E2F23] transition duration-300 shadow-lg">
                  تواصل معنا الآن <ArrowLeft size={20} />
              </Link>
          </div>
      </section>

    </div>
  );
};

export default Services;