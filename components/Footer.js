function Footer() {
  try {
    return (
      <footer className="bg-slate-900 text-white section-padding" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">CreativeAgency</h3>
              <p className="text-gray-400">Designing, developing & marketing digital experiences that deliver results.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="index.html" className="block text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="about.html" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="services.html" className="block text-gray-400 hover:text-white transition-colors">Services</a>
                <a href="portfolio.html" className="block text-gray-400 hover:text-white transition-colors">Portfolio</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-gray-400">
                <p>Digital Marketing</p>
                <p>Graphic Design</p>
                <p>Web Development</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.2-3.3 3-3.3.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.3V12h2.2l-.4 2.9h-1.8v7A10 10 0 0022 12z"/></svg>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.7-.6.4-1.3.7-2 .9-.6-.7-1.6-1.1-2.6-1.1-2 0-3.7 1.7-3.7 3.8 0 .3 0 .6.1.9-3.1-.2-5.9-1.6-7.8-3.9-.3.6-.5 1.2-.5 2 0 1.4.7 2.7 1.8 3.4-.6 0-1.3-.2-1.9-.5v.1c0 1.9 1.3 3.6 3.1 4-.3.1-.6.1-.9.1-.2 0-.5 0-.7-.1.5 1.6 2 2.7 3.8 2.7-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.6 0-.9-.1 1.8 1.1 4 1.8 6.3 1.8 7.5 0 11.6-6.3 11.6-11.8v-.5c.8-.6 1.4-1.3 2-2.1-.7.3-1.5.6-2.3.7z"/></svg>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM18.5 6a.9.9 0 11-1.8 0 .9.9 0 011.8 0z"/></svg>
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 004.98 8H4.99A2.5 2.5 0 004.98 3.5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.7-1.6 3.6-1.6 3.8 0 4.5 2.5 4.5 5.8V21H16v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.5 1.6-2.5 3.3V21H9z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Visit Us</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Dadul, Kazihal, Attpukurhat,<br/>Fulbari, Dinajpur, Bangladesh</p>
                <p className="mt-3"><a href="https://four-wariors.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--primary-color)] transition-colors">four-wariors.vercel.app</a></p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CreativeAgency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}