function StatsSection() {
  try {
    const [counters, setCounters] = React.useState([0, 0, 0, 0]);
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef(null);

    const stats = [
      { number: 50, label: 'Projects Completed', suffix: '+' },
      { number: 10, label: 'International Clients', suffix: '+' },
      { number: 4, label: 'Expert Team Members', suffix: '' },
      { number: 100, label: 'Client Satisfaction', suffix: '%' }
    ];

    // Intersection Observer to detect when section is visible
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, [isVisible]);

    // Animate counters when section becomes visible
    React.useEffect(() => {
      if (!isVisible) return;

      const animationDuration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = animationDuration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        const newCounters = stats.map(stat => {
          return Math.floor(stat.number * progress);
        });

        setCounters(newCounters);

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(stats.map(stat => stat.number));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, [isVisible]);

    return (
      <section 
        ref={sectionRef}
        className="section-padding bg-[var(--primary-color)] text-white" 
        data-name="stats-section" 
        data-file="components/StatsSection.js"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2">
                  {counters[index]}{stat.suffix}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('StatsSection component error:', error);
    return null;
  }
}
