import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPosts, getPostById, getRelatedPosts } from '../services/wordpressService';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ArrowRight, Share2, Facebook, Twitter, Linkedin, ChevronLeft } from 'lucide-react';

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const loadPostData = async () => {
            if (!id) return;
            setLoading(true);
            const postData = await getPostById(parseInt(id));
            if (postData) {
                setPost(postData);
                const related = await getRelatedPosts(parseInt(id));
                setRelatedPosts(related);
            }
            setLoading(false);
        };
        loadPostData();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#8D6E52]"></div>
        </div>
    );

    if (!post) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">المقال غير موجود</div>;

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 h-1.5 bg-[#8D6E52] z-[60]" style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}></div>

            {/* Header / Hero */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img 
                    src={post.featured_media_url} 
                    alt={post.title.rendered} 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-20 md:pb-32">
                        <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition gap-2 font-bold backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                             <ArrowRight size={16} /> العودة للمدونة
                        </Link>
                        <span className="block text-[#B89F88] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">{post.category_name}</span>
                        <h1 
                            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-4xl mb-8"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div className="flex flex-wrap gap-6 text-white/90 text-sm md:text-base font-medium">
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-[#B89F88]" />
                                <span>{post.author_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-[#B89F88]" />
                                <span>{new Date(post.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-[#B89F88]" />
                                <span>3 دقائق قراءة</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <article 
                            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#3E2F23] prose-p:text-gray-600 prose-p:leading-loose prose-a:text-[#8D6E52] prose-img:rounded-3xl prose-img:shadow-xl"
                            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        />
                        
                        {/* Tags / Share */}
                        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-2">
                                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-bold">#تنظيف</span>
                                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-bold">#نصائح_منزلية</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-[#3E2F23]">مشاركة المقال:</span>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90"><Facebook size={18} /></button>
                                    <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:opacity-90"><Twitter size={18} /></button>
                                    <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:opacity-90"><Linkedin size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-12">
                        {/* Author Box */}
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
                            <div className="w-24 h-24 mx-auto bg-[#8D6E52] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg border-4 border-white">
                                {post.author_name ? post.author_name.charAt(0) : 'A'}
                            </div>
                            <h3 className="text-xl font-bold text-[#3E2F23] mb-2">{post.author_name}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">خبير متخصص في مجال التنظيف والصيانة المنزلية، يشارك نصائح عملية لمساعدة الأسر على الاستمتاع بحياة صحية.</p>
                            <Link to="/about" className="text-[#8D6E52] font-bold text-sm hover:underline">عرض الملف الشخصي</Link>
                        </div>

                        {/* Related Posts */}
                        <div>
                            <h3 className="text-xl font-black text-[#3E2F23] mb-6 border-r-4 border-[#8D6E52] pr-3">مقالات ذات صلة</h3>
                            <div className="space-y-6">
                                {relatedPosts.map(relPost => (
                                    <Link key={relPost.id} to={`/blog/${relPost.id}`} className="flex gap-4 group">
                                        <img 
                                            src={relPost.featured_media_url} 
                                            alt={relPost.title.rendered} 
                                            className="w-24 h-24 rounded-xl object-cover shadow-sm group-hover:scale-105 transition duration-300"
                                        />
                                        <div>
                                            <span className="text-xs text-[#8D6E52] font-bold mb-1 block">{relPost.category_name}</span>
                                            <h4 
                                                className="font-bold text-[#3E2F23] leading-snug group-hover:text-[#8D6E52] transition line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: relPost.title.rendered }}
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        
                        {/* CTA Box */}
                        <div className="bg-[#3E2F23] p-8 rounded-3xl text-white text-center relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-[#8D6E52] rounded-full blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                             <h3 className="text-2xl font-bold mb-4 relative z-10">هل أعجبك المقال؟</h3>
                             <p className="text-gray-300 mb-8 text-sm relative z-10">اشترك في نشرتنا البريدية للحصول على أحدث نصائح التنظيف مباشرة إلى بريدك.</p>
                             <input type="email" placeholder="بريدك الإلكتروني" className="w-full px-4 py-3 rounded-xl text-dark mb-4 text-sm focus:outline-none" />
                             <button className="w-full bg-[#8D6E52] py-3 rounded-xl font-bold hover:bg-white hover:text-[#3E2F23] transition">اشتراك الآن</button>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;