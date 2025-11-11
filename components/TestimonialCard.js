function TestimonialCard({ name, company, role, image, rating, text }) {
  try {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300" data-name="testimonial-card" data-file="components/TestimonialCard.js">
        <div className="flex items-center mb-4">
          <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-[var(--text-light)] text-sm">{role}, {company}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <div key={i} className="icon-star text-yellow-400 text-lg"></div>
          ))}
        </div>
        
        <p className="text-[var(--text-light)] italic">"{text}"</p>
      </div>
    );
  } catch (error) {
    console.error('TestimonialCard component error:', error);
    return null;
  }
}