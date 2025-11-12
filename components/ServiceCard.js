function ServiceCard({ icon, title, description }) {
  try {
    const [isHovered, setIsHovered] = React.useState(false);

    // Define gradient backgrounds for each service
    const gradients = {
      'megaphone': 'from-purple-400 to-pink-600',
      'palette': 'from-blue-400 to-cyan-600',
      'code': 'from-green-400 to-teal-600'
    };

    const gradient = gradients[icon] || 'from-blue-400 to-cyan-600';

    return (
      <div 
        className="relative group"
        data-name="service-card"
        data-file="components/ServiceCard.js"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
        
        {/* Card container */}
        <div className={`relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-500 ${isHovered ? 'shadow-2xl -translate-y-2 border-gray-200' : ''}`}>
          
          {/* Icon container with animation */}
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} relative overflow-hidden transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse"></div>
            <div className={`icon-${icon} text-4xl text-white relative z-10 transition-transform duration-500 ${isHovered ? 'scale-125' : ''}`}></div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 text-gray-900 transition-colors duration-300">{title}</h3>

          {/* Description */}
          <p className="text-[var(--text-light)] mb-6 leading-relaxed transition-colors duration-300">{description}</p>

          {/* CTA Button */}
          <a 
            href="services.html" 
            className={`inline-flex items-center font-semibold transition-all duration-300 gap-2 ${
              isHovered 
                ? 'text-white bg-gradient-to-r ' + gradient + ' px-4 py-2 rounded-lg' 
                : 'text-[var(--primary-color)] hover:underline'
            }`}
          >
            Learn More
            <div className={`icon-arrow-right text-sm transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}></div>
          </a>

          {/* Floating particles effect on hover */}
          {isHovered && (
            <>
              <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute top-1/2 right-4 w-1 h-1 bg-gradient-to-br from-green-400 to-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ServiceCard component error:', error);
    return null;
  }
}