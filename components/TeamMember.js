function TeamMember({ name, role, image, bio }) {
  try {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer" 
        data-name="team-member" 
        data-file="components/TeamMember.js"
        title="Click to view details"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden h-64 bg-gray-200">
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-[var(--primary-color)] font-semibold mb-3">{role}</p>
          <p className="text-[var(--text-light)] text-sm line-clamp-2">{bio}</p>
          <p className={`text-xs text-[var(--primary-color)] mt-4 font-semibold transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
            Click to view details →
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TeamMember component error:', error);
    return null;
  }
}