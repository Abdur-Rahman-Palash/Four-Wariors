function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navItems = [
      { label: 'Home', href: 'index.html' },
      { label: 'About', href: 'about.html' },
      { label: 'Services', href: 'services.html' },
      { label: 'Portfolio', href: 'portfolio.html' },
      { label: 'Testimonials', href: 'testimonials.html' },
      { label: 'Contact', href: 'contact.html' }
    ];

    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">CreativeAgency</div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="text-[var(--text-dark)] hover:text-[var(--primary-color)] transition-colors">
                  {item.label}
                </a>
              ))}
              <a href="contact.html" className="btn-primary">Hire Us</a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)]">
                  {item.label}
                </a>
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