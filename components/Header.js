function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = React.useState(false);

    const navItems = [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Services', href: 'services.html', hasDropdown: true },
      { label: 'Portfolio', href: 'portfolio.html' },
      { label: 'Testimonials', href: 'testimonials.html' },
      { label: 'Contact', href: 'contact.html#contact' }
    ];

    const serviceItems = [
      { label: 'Digital Marketing', id: 'digital-marketing' },
      { label: 'Graphic Design', id: 'graphic-design' },
      { label: 'Web Development', id: 'web-development' }
    ];

    const handleServiceClick = (id) => {
      // If on home page, scroll to section
      if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsServicesDropdownOpen(false);
        }
      } else {
        // If not on home page, navigate to services page
        window.location.href = 'services.html';
      }
    };

    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">CreativeAgency</div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <button 
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        className="text-[var(--text-dark)] hover:text-[var(--primary-color)] transition-colors flex items-center gap-1"
                      >
                        {item.label}
                        <span className={`text-sm transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      
                      {isServicesDropdownOpen && (
                        <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                          {serviceItems.map((service, sIndex) => (
                            <button
                              key={sIndex}
                              onClick={() => handleServiceClick(service.id)}
                              className="w-full text-left px-4 py-2 text-[var(--text-dark)] hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-colors"
                            >
                              {service.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={item.href} className="text-[var(--text-dark)] hover:text-[var(--primary-color)] transition-colors">
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <a href="contact.html#hire" className="btn-primary">Hire Us</a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <>
                      <button 
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        className="w-full text-left py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)] flex justify-between items-center"
                      >
                        {item.label}
                        <span className={`text-sm transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      
                      {isServicesDropdownOpen && (
                        <div className="ml-4 space-y-2 mt-2">
                          {serviceItems.map((service, sIndex) => (
                            <button
                              key={sIndex}
                              onClick={() => handleServiceClick(service.id)}
                              className="w-full text-left py-1 text-sm text-[var(--text-light)] hover:text-[var(--primary-color)]"
                            >
                              {service.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a href={item.href} className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)]">
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </nav>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}