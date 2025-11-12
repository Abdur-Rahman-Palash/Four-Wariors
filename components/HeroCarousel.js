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
      <div className="relative h-screen overflow-hidden" data-name="hero-carousel" data-file="components/HeroCarousel.js">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex items-center justify-center h-full text-center text-white px-6">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="portfolio.html" className="btn-primary">View Portfolio</a>
                  <a href="contact.html#contact" className="btn-secondary bg-white hover:bg-gray-100 text-[var(--primary-color)] border-white">Contact Now</a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('HeroCarousel component error:', error);
    return null;
  }
}