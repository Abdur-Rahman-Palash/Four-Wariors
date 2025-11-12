function TeamMemberModal({ member, onClose }) {
  try {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    // Generate initials for fallback avatar
    const initials = member.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();

    React.useEffect(() => {
      // Close modal on Escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleBackdropClick = (e) => {
      // Close if clicking outside the modal content
      if (e.target.id === 'modal-backdrop') onClose();
    };

    return (
      <div 
        id="modal-backdrop"
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn relative">
          {/* Close button - fixed at top right */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-full p-2 z-50 shadow-lg"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header with image */}
          <div className="relative -mt-12 h-72 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
            {/* Fallback avatar */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                <span className="text-8xl font-bold text-white opacity-80">{initials}</span>
              </div>
            )}
            
            {/* Member image */}
            <img 
              src={member.image} 
              alt={member.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageLoaded(true);
                setImageError(true);
              }}
              className={`w-full h-full object-cover transition-all duration-300 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">{member.name}</h2>
            <p className="text-lg text-[var(--primary-color)] font-semibold mb-4">{member.role}</p>
            
            <p className="text-[var(--text-light)] text-base leading-relaxed mb-6">
              {member.bio}
            </p>

            {/* Links section */}
            <div className="border-t pt-6">
              <h3 className="text-base font-bold mb-4 text-gray-900">Connect</h3>
              <div className="flex gap-3 flex-wrap">
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2 text-sm"
                  >
                    <span>📁</span>
                    <span>Portfolio</span>
                  </a>
                )}
                
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-gray-800 text-gray-800 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm flex items-center gap-2"
                  >
                    <span>🐙</span>
                    <span>GitHub</span>
                  </a>
                )}

                {member.telegram && (
                  <a
                    href={member.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2"
                  >
                    <span>✈️</span>
                    <span>Telegram</span>
                  </a>
                )}

                {member.whatsapp && (
                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-all duration-300 text-sm flex items-center gap-2"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  } catch (error) {
    console.error('TeamMemberModal component error:', error);
    return null;
  }
}
