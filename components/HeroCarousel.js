function HeroCarousel() {
  try {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    // Use optimized WebP images (Unsplash supports fm=webp) and smaller sizes where appropriate.
    const slides = [
      {
        title: 'We Design, Develop & Market',
        subtitle: 'Digital Experiences That Deliver Results',
        icon: '🚀',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&fm=webp&q=75',
        color: '#3B82F6'
      },
      {
        title: 'Transform Your Brand',
        subtitle: 'With Creative Design Solutions',
        icon: '🎨',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&auto=format&fit=crop&fm=webp&q=75',
        color: '#8B5CF6'
      },
      {
        title: 'Build Your Digital Future',
        subtitle: 'With Modern Web Technology',
        icon: '💻',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&fm=webp&q=75',
        color: '#EC4899'
      }
    ];

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="relative h-96 md:h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800" data-name="hero-carousel" data-file="components/HeroCarousel.js">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `linear-gradient(135deg, ${slide.color}cc 0%, rgba(0,0,0,0.8) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Animated grid overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.1) 25%, rgba(255,255,255,.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.1) 75%, rgba(255,255,255,.1) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px'
            }}></div>

            {/* Content */}
            <div className="flex items-center justify-center h-full text-center text-white px-4 md:px-6">
              <div className={`max-w-4xl transform transition-all duration-1000 ${index === currentSlide ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                {/* Icon with animation */}
                <div className="mb-4 md:mb-6 animate-bounce text-6xl md:text-8xl">
                  {slide.icon}
                </div>
                
                {/* Title with gradient effect */}
                <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                    {slide.title}
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-3xl mb-6 md:mb-10 text-gray-100 drop-shadow-md font-light">
                  {slide.subtitle}
                </p>
                
                {/* CTA Buttons with hover effects */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                  <a href="portfolio.html" className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="relative z-10">View Portfolio</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </a>
                  <a href="contact.html#contact" className="group relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 border-2 border-white text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent">
                    <span className="relative z-10">Contact Now</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute inset-0 text-gray-900 font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">Contact Now</span>
                  </a>
                </div>

                {/* Stats */}
                <div className="mt-10 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-300">50+</div>
                    <div className="text-sm md:text-base text-gray-300">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-purple-300">100%</div>
                    <div className="text-sm md:text-base text-gray-300">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-pink-300">4</div>
                    <div className="text-sm md:text-base text-gray-300">Expert Team</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Hidden img to help browsers prioritize the LCP image (first slide) */}
        <img src={slides[0].image} alt="Hero background" width="1400" height="800" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} aria-hidden="true" fetchpriority="high" />

        {/* Navigation Dots - Enhanced */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button type="button"
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full backdrop-blur-md ${
                index === currentSlide 
                  ? 'bg-white w-10 h-3 shadow-lg shadow-white/50' 
                  : 'bg-white/30 w-3 h-3 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation - Enhanced */}
        <div className="absolute top-1/2 left-6 right-6 flex justify-between items-center z-10 hidden md:flex pointer-events-none">
          <button type="button" 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} 
            className="pointer-events-auto group bg-white/10 hover:bg-white/30 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md hover:shadow-lg hover:shadow-white/20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} 
            className="pointer-events-auto group bg-white/10 hover:bg-white/30 text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md hover:shadow-lg hover:shadow-white/20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 left-6 md:left-8 z-10 text-white text-sm md:text-base font-mono backdrop-blur-md bg-white/10 px-4 py-2 rounded-full">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    );
  } catch (error) {
    console.error('HeroCarousel component error:', error);
    return null;
  }
}