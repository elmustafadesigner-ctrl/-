import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/wordpressService';
import { BlogPost } from '../types';
import { Loader, ChevronLeft, ChevronRight, Search, Sparkles, Home, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const postsPerPage = 6;

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  // Filter posts based on search
  const filteredPosts = posts.filter(post => 
    post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to top of list, not top of page
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* === Professional Blog Header (Hero Style) === */}
      <div className="relative w-full bg-gradient-to-br from-[#8D6E52] to-[#5d4838] overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32 text-white">
          
          {/* Animated Bubbles Background (Same as Home) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white/10 backdrop-blur-sm"
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

          {/* Decorative Patterns */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B89F88]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
              
              {/* Breadcrumb & Badge */}
              <div className="flex flex-col items-center gap-4 mb-6 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 text-sm font-medium text-yellow-100">
                      <Sparkles size={14} className="animate-pulse" />
                      <span>مركز المعرفة والنصائح</span>
                  </div>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  المدونة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9F5F0] to-[#B89F88]">والمقالات</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  اكتشف أحدث النصائح والحيل للحفاظ على نظافة منزلك، وإرشادات الخبراء لبيئة صحية وآمنة لعائلتك.
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <input 
                      type="text" 
                      placeholder="ابحث عن مقال (مثال: تنظيف السجاد)..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-4 pr-12 pl-6 rounded-full bg-white/95 text-dark placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-[#B89F88]/30 shadow-2xl transition-all"
                  />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-primary">
                      <Search size={22} />
                  </div>
              </div>

              {/* Breadcrumbs Navigation */}
              <div className="mt-8 flex justify-center items-center gap-2 text-sm text-white/60 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <Link to="/" className="hover:text-white transition flex items-center gap-1"><Home size={14} /> الرئيسية</Link>
                  <ChevronLeft size={14} />
                  <span className="text-white font-bold">المدونة</span>
              </div>

          </div>
      </div>

      {/* === Blog Content === */}
      <div className="container mx-auto px-6 py-20 -mt-10 relative z-20">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl shadow-lg p-10">
             <Loader className="animate-spin text-primary h-12 w-12 mb-4" />
             <p className="text-gray-500 font-bold">جاري جلب أحدث المقالات...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            {!loading && searchTerm && (
                <div className="mb-8 text-gray-500 font-bold">
                    تم العثور على {filteredPosts.length} مقال لـ "{searchTerm}"
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post, index) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full group overflow-hidden">
                  
                  {/* Image Section */}
                  <div className="h-60 overflow-hidden relative">
                      <img 
                          src={post.featured_media_url || `https://picsum.photos/800/600?random=${post.id}`} 
                          alt={post.title.rendered} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                      />
                      {/* Overlay with subtle color shift */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-[#8D6E52]/20 transition-colors duration-300"></div>
                      
                      {/* Floating Category Badge */}
                      <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm z-10">
                          {post.category_name || 'نصائح عامة'}
                      </span>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col relative">
                    {/* Date & Author */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold mb-4">
                        <span className="flex items-center gap-1"><BookOpen size={12} /> {post.author_name}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
                    </div>

                    <h2 
                      className="text-xl font-bold text-dark mb-4 leading-[1.6] group-hover:text-primary transition-colors line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    
                    <div 
                      className="text-gray-500 mb-6 text-sm leading-relaxed line-clamp-3 font-light"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />

                    {/* Button */}
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                        <Link to={`/blog/${post.id}`} className="text-primary font-bold text-sm flex items-center gap-1 group/btn">
                            أكمل القراءة 
                            <ChevronLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                        </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {!loading && filteredPosts.length > 0 && (
              <div className="mt-20 flex justify-center items-center gap-3 animate-fade-in-up">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition border ${
                    currentPage === 1 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                      : 'border-primary text-primary hover:bg-primary hover:text-white shadow-md'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-full font-bold transition flex items-center justify-center text-sm ${
                        currentPage === i + 1
                          ? 'bg-primary text-white shadow-lg scale-110 ring-4 ring-primary/20'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition border ${
                    currentPage === totalPages 
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                      : 'border-primary text-primary hover:bg-primary hover:text-white shadow-md'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            )}
            
            {!loading && filteredPosts.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-dark mb-2">لم يتم العثور على نتائج</h3>
                    <p className="text-gray-500">جرب البحث بكلمات مختلفة أو تصفح المقالات المتاحة.</p>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;