function Footer() {
  try {
    return (
      <footer className="bg-slate-900 text-white section-padding" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
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
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-facebook text-lg"></div>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-twitter text-lg"></div>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-instagram text-lg"></div>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors">
                  <div className="icon-linkedin text-lg"></div>
                </a>
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