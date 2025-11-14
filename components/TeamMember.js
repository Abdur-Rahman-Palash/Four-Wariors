function TeamMember({ name, role, image, bio, onClick }) {
  try {
    const [isHovered, setIsHovered] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    // Generate initials for fallback avatar
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();

    return (
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group" 
        data-name="team-member" 
        data-file="components/TeamMember.js"
        title="Click to view details"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={typeof onClick === 'function' ? onClick : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={e => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(); } }}
      >
        <div className="relative overflow-hidden h-64 bg-gradient-to-br from-blue-100 to-purple-100">
          {/* Fallback avatar */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
              <span className="text-5xl font-bold text-white">{initials}</span>
            </div>
          )}
          
          {/* Team member image */}
          <img 
            src={image} 
            alt={name}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageLoaded(true);
              setImageError(true);
            }}
            className={`w-full h-full object-cover transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'} ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          />
          
          {/* Overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300"></div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{name}</h3>
          <p className="text-[var(--primary-color)] font-semibold mb-3 text-sm">{role}</p>
          <p className="text-[var(--text-light)] text-sm line-clamp-2 leading-relaxed">{bio}</p>
          <p className={`text-xs text-[var(--primary-color)] mt-4 font-semibold transition-all duration-300 flex items-center gap-1 ${isHovered ? 'opacity-100 translate-x-1' : 'opacity-70'}`}>
            Click to view details <span>→</span>
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TeamMember component error:', error);
    return null;
  }
}