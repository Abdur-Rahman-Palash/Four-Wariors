function HeroCarousel() {
  try {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const slides = [
      {
        title: 'We Design, Develop & Market',
        subtitle: 'Digital Experiences That Deliver Results',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
      },
      {
        title: 'Transform Your Brand',
        subtitle: 'With Creative Design Solutions',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80'
      },
      {
        title: 'Build Your Digital Future',
        subtitle: 'With Modern Web Technology',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80'
      }
    ];

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="relative h-96 md:h-screen overflow-hidden bg-gray-900" data-name="hero-carousel" data-file="components/HeroCarousel.js">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(37,99,235,0.7) 0%, rgba(0,0,0,0.6) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex items-center justify-center h-full text-center text-white px-4 md:px-6">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">{slide.title}</h1>
                <p className="text-lg md:text-2xl mb-6 md:mb-8 text-gray-100">{slide.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <a href="portfolio.html" className="btn-primary inline-block px-6 md:px-8 py-2 md:py-3">View Portfolio</a>
                  <a href="contact.html#contact" className="btn-secondary bg-white hover:bg-gray-100 text-[var(--primary-color)] border-white inline-block px-6 md:px-8 py-2 md:py-3">Contact Now</a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button type="button"
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute top-6 right-6 flex space-x-2 z-10 hidden md:flex">
          <button type="button" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all" aria-label="Previous slide">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button type="button" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all" aria-label="Next slide">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('HeroCarousel component error:', error);
    return null;
  }
}
