import { BlogPost } from '../types';

// CONFIGURATION: Change this URL to your actual WordPress site URL
// Example: const WP_API_URL = 'https://your-domain.com/wp-json/wp/v2';
const WP_API_URL = 'https://public-api.wordpress.com/wp/v2/sites/techcrunch.com'; // Demo API

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: { rendered: "5 نصائح ذهبية لإزالة بقع القهوة من السجاد" },
    excerpt: { rendered: "تعتبر بقع القهوة من أصعب التحديات التي تواجه نظافة السجاد، ولكن مع هذه الحيل المنزلية البسيطة يمكنك استعادة رونق سجادك..." },
    content: { rendered: `
      <h3>لماذا تعتبر بقع القهوة صعبة؟</h3>
      <p>تعتبر بقع القهوة من أصعب التحديات التي تواجه نظافة السجاد بسبب صبغة التانين القوية الموجودة في البن، والتي تلتصق بألياف السجاد بسرعة وتترك أثراً بنياً يصعب إزالته إذا جف.</p>
      
      <img src="https://images.unsplash.com/photo-1576089235406-dbbf596dc57e?q=80&w=800&auto=format&fit=crop" alt="Coffee Stain" style="width:100%; border-radius: 16px; margin: 20px 0;" />

      <h3>خطوات إزالة البقعة:</h3>
      <p>إليك الخطوات التفصيلية التي ينصح بها خبراؤنا:</p>
      
      <h4>1. التدخل السريع (القاعدة الذهبية)</h4>
      <p>أهم خطوة هي تجفيف البقعة فور حدوثها. استخدم منشفة ورقية بيضاء واضغط برفق لامتصاص السائل. <strong>لا تفرك البقعة أبداً</strong>، فالفرك ينشر السائل إلى مساحة أكبر ويدفعه لعمق الألياف.</p>

      <h4>2. استخدام محلول الخل والماء</h4>
      <p>اخلط ملعقة كبيرة من الخل الأبيض مع كوب من الماء الدافئ. الخل يساعد على تفكيك صبغة القهوة دون الإضرار بنسيج السجاد.</p>
      <ul>
        <li>ضع القليل من المحلول على قماشة نظيفة.</li>
        <li>ربت على البقعة من الخارج إلى الداخل.</li>
        <li>كرر العملية حتى يختفي الأثر.</li>
      </ul>

      <h4>3. الشطف والتجفيف</h4>
      <p>بعد زوال البقعة، استخدم قماشة مبللة بماء بارد لإزالة بقايا الخل، ثم جفف المنطقة جيداً بمجفف الشعر أو مروحة.</p>

      <h3>متى تتصل بالمحترفين؟</h3>
      <p>إذا كانت البقعة قديمة وجافة، أو إذا كان السجاد من النوع الحريري أو الصوف الطبيعي باهظ الثمن، فإننا ننصح بشدة بطلب خدمة <strong>التنظيف بالبخار</strong>. الحرارة العالية والشفط القوي يضمنان إزالة البقعة تماماً دون تلف الوبر.</p>
      
      <blockquote>"الحفاظ على نظافة السجاد ليس مجرد مظهر، بل هو استثمار في صحة منزلك وعمر مفروشاتك الافتراضي." - خبير التنظيف في الهدف كلين.</blockquote>
    ` },
    date: "2023-10-15T10:00:00",
    featured_media_url: "https://images.unsplash.com/photo-1576089235406-dbbf596dc57e?q=80&w=800&auto=format&fit=crop",
    author_name: "خبير التنظيف",
    category_name: "تنظيف السجاد"
  },
  {
    id: 2,
    title: { rendered: "لماذا يجب تنظيف فلاتر المكيف بانتظام؟" },
    excerpt: { rendered: "تراكم الغبار في فلاتر المكيف لا يؤثر فقط على كفاءة التبريد، بل يشكل خطراً حقيقياً على صحة الجهاز التنفسي لعائلتك..." },
    content: { rendered: "<p>محتوى المقال التفصيلي هنا...</p>" },
    date: "2023-10-12T10:00:00",
    featured_media_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    author_name: "مهندس الصيانة",
    category_name: "الصيانة"
  },
  {
    id: 3,
    title: { rendered: "دليلك الشامل لتعقيم المنزل بعد المرض" },
    excerpt: { rendered: "بعد موجة من الانفلونزا أو المرض في المنزل، يصبح التعقيم ضرورة قصوى. إليك الأماكن التي يغفل عنها الكثيرون..." },
    content: { rendered: "<p>محتوى المقال التفصيلي هنا...</p>" },
    date: "2023-10-10T10:00:00",
    featured_media_url: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop",
    author_name: "د. سارة أحمد",
    category_name: "صحة عامة"
  },
  {
    id: 4,
    title: { rendered: "تنظيف الكنب: البخار أم التنظيف الجاف؟" },
    excerpt: { rendered: "تحتار الكثير من ربات البيوت بين تقنيات تنظيف الكنب المختلفة. في هذا المقال نوضح الفرق ونساعدك في اختيار الأنسب..." },
    content: { rendered: "<p>محتوى المقال التفصيلي هنا...</p>" },
    date: "2023-10-08T10:00:00",
    featured_media_url: "https://images.unsplash.com/photo-1632829882891-5047ccc4d1f7?q=80&w=800&auto=format&fit=crop",
    author_name: "فريق الهدف",
    category_name: "أثاث منزلي"
  },
  {
      id: 5, title: { rendered: "كيفية اختيار شركة التنظيف المناسبة" }, excerpt: { rendered: "نصائح لاختيار الشركة الأفضل..." }, content: { rendered: "<p>...</p>" }, category_name: "نصائح عامة", date: "2023-10-05T10:00:00", author_name: "محمد علي", featured_media_url: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800&auto=format&fit=crop"
  },
  {
      id: 6, title: { rendered: "5 أخطاء شائعة عند تنظيف المطابخ" }, excerpt: { rendered: "تجنب هذه الأخطاء في مطبخك..." }, content: { rendered: "<p>...</p>" }, category_name: "المطبخ", date: "2023-10-03T10:00:00", author_name: "شيف منزلي", featured_media_url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"
  }
];

export const fetchPosts = async (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPosts);
    }, 800);
  });
};

export const getPostById = async (id: number): Promise<BlogPost | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const post = mockPosts.find(p => p.id === id);
            resolve(post);
        }, 500);
    });
};

export const getRelatedPosts = async (currentId: number): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const related = mockPosts.filter(p => p.id !== currentId).slice(0, 3);
            resolve(related);
        }, 500);
    });
};