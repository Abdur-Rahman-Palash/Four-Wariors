function TeamMemberModal({ member, isOpen, onClose }) {
  if (!isOpen || !member) return null;

  try {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        data-name="team-member-modal"
        data-file="components/TeamMemberModal.js"
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div className="relative">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-80 object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2">{member.name}</h2>
            <p className="text-[var(--primary-color)] font-semibold mb-4 text-lg">{member.role}</p>
            <p className="text-[var(--text-light)] mb-8 text-base leading-relaxed">{member.bio}</p>

            {/* Links section */}
            <div className="flex gap-4">
              {member.portfolio && (
                <a 
                  href={member.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[var(--primary-color)] text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors duration-300"
                >
                  View Portfolio
                </a>
              )}
              {member.github && (
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-gray-900 transition-colors duration-300"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TeamMemberModal component error:', error);
    return null;
  }
}
