function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = React.useState(false);

    const defaultCompanyInfo = { name: 'Noventrix Tech Agency', facebook: 'https://www.facebook.com/', twitter: 'https://twitter.com/', instagram: 'https://www.instagram.com/', linkedin: 'https://www.linkedin.com/' };
    const companyInfo = React.useMemo(() => { try { return JSON.parse(localStorage.getItem('fw_company_info') || 'null') || defaultCompanyInfo; } catch(e){ return defaultCompanyInfo; } }, []);

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
            <a href="index.html" className="text-2xl font-bold text-gradient">{companyInfo.name}</a>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.hasDropdown ? (
                    <>
                      <button type="button"
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        className="text-[var(--text-dark)] hover:text-[var(--primary-color)] transition-colors flex items-center gap-1"
                      >
                        {item.label}
                        <span className={`text-sm transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      
                      {isServicesDropdownOpen && (
                        <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                          {serviceItems.map((service, sIndex) => (
                            <button type="button"
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
              <div className="flex items-center space-x-3 mr-2">
                <a href={companyInfo.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.2-3.3 3-3.3.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.3V12h2.2l-.4 2.9h-1.8v7A10 10 0 0022 12z"/></svg>
                </a>
                <a href={companyInfo.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.7-.6.4-1.3.7-2 .9-.6-.7-1.6-1.1-2.6-1.1-2 0-3.7 1.7-3.7 3.8 0 .3 0 .6.1.9-3.1-.2-5.9-1.6-7.8-3.9-.3.6-.5 1.2-.5 2 0 1.4.7 2.7 1.8 3.4-.6 0-1.3-.2-1.9-.5v.1c0 1.9 1.3 3.6 3.1 4-.3.1-.6.1-.9.1-.2 0-.5 0-.7-.1.5 1.6 2 2.7 3.8 2.7-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.6 0-.9-.1 1.8 1.1 4 1.8 6.3 1.8 7.5 0 11.6-6.3 11.6-11.8v-.5c.8-.6 1.4-1.3 2-2.1-.7.3-1.5.6-2.3.7z"/></svg>
                </a>
                <a href={companyInfo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM18.5 6a.9.9 0 11-1.8 0 .9.9 0 011.8 0z"/></svg>
                </a>
                <a href={companyInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 004.98 8H4.99A2.5 2.5 0 004.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.7-1.6 3.6-1.6 3.8 0 4.5 2.5 4.5 5.8V21H16v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.5 1.6-2.5 3.3V21H9z"/></svg>
                </a>
              </div>
              <a href="contact.html#hire" className="btn-primary">Hire Us</a>
            </div>

            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasDropdown ? (
                    <>
                      <button type="button" 
                        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                        className="w-full text-left py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)] flex justify-between items-center"
                      >
                        {item.label}
                        <span className={`text-sm transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      
                      {isServicesDropdownOpen && (
                        <div className="ml-4 space-y-2 mt-2">
                          {serviceItems.map((service, sIndex) => (
                            <button type="button"
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