function ContactApp() {
  try {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-padding bg-gradient-to-b from-[var(--secondary-color)] to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
                Ready to start your project? Contact us today and let's discuss how we can help bring your vision to life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Other Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <div className="icon-message-circle text-2xl text-white"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                      <p className="text-[var(--text-light)]">Chat with us instantly</p>
                    </div>
                  </a>

                  <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <div className="icon-send text-2xl text-white"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Telegram</h3>
                      <p className="text-[var(--text-light)]">Message us on Telegram</p>
                    </div>
                  </a>

                  <div className="p-6 bg-[var(--secondary-color)] rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                        <div className="icon-facebook text-xl"></div>
                      </a>
                      <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                        <div className="icon-twitter text-xl"></div>
                      </a>
                      <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                        <div className="icon-instagram text-xl"></div>
                      </a>
                      <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] hover:text-white transition-colors">
                        <div className="icon-linkedin text-xl"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingContact />
      </div>
    );
  } catch (error) {
    console.error('ContactApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContactApp />);