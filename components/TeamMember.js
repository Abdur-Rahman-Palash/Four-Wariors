function TeamMember({ name, role, image, bio, portfolio, github, onCardClick }) {
  try {
    return (
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2" 
        data-name="team-member" 
        data-file="components/TeamMember.js"
        onClick={() => onCardClick && onCardClick({ name, role, image, bio, portfolio, github })}
      >
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-[var(--primary-color)] font-semibold mb-3">{role}</p>
          <p className="text-[var(--text-light)] text-sm">{bio}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TeamMember component error:', error);
    return null;
  }
}