function ServiceCard({ icon, title, description }) {
  try {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg card-hover" data-name="service-card" data-file="components/ServiceCard.js">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-blue-100">
          <div className={`icon-${icon} text-2xl text-[var(--primary-color)]`}></div>
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-[var(--text-light)] mb-6">{description}</p>
        <a href="services.html" className="inline-flex items-center text-[var(--primary-color)] font-semibold hover:underline">
          Learn More
          <div className="icon-arrow-right text-sm ml-2"></div>
        </a>
      </div>
    );
  } catch (error) {
    console.error('ServiceCard component error:', error);
    return null;
  }
}