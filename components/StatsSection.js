function StatsSection() {
  try {
    const stats = [
      { number: '50+', label: 'Projects Completed' },
      { number: '10+', label: 'International Clients' },
      { number: '4', label: 'Expert Team Members' },
      { number: '100%', label: 'Client Satisfaction' }
    ];

    return (
      <section className="section-padding bg-[var(--primary-color)] text-white" data-name="stats-section" data-file="components/StatsSection.js">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
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