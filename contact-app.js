function ContactApp() {
  try {
    const defaultCompanyInfo = { email: 'fourwarriors24@gmail.com', phone: '+8801971233127', address: 'Dadul, Kazihal, Attpukurhat, Fulbari, Dinajpur, Bangladesh', hours: 'Mon - Fri: 9AM - 6PM', whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm', telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1' };
    const companyInfo = React.useMemo(() => { try { return JSON.parse(localStorage.getItem('fw_company_info') || 'null') || defaultCompanyInfo; } catch(e){ return defaultCompanyInfo; } }, []);

    const contactInfo = [
      {
        icon: '📍',
        title: 'Office Location',
        details: companyInfo.address,
        description: 'Visit us at our office'
      },
      {
        icon: '⏰',
        title: 'Business Hours',
        details: companyInfo.hours,
        description: 'Saturday by appointment'
      },
      {
        icon: '📧',
        title: 'Email Support',
        details: companyInfo.email,
        description: 'Response within 24 hours'
      },
      {
        icon: '☎️',
        title: 'Phone Support',
        details: companyInfo.phone,
        description: 'Available during business hours'
      }
    ];

    const faqs = [
      {
        question: 'What is your response time?',
        answer: 'We typically respond to inquiries within 24 hours during business days.'
      },
      {
        question: 'Do you offer free consultations?',
        answer: 'Yes! We offer a free 30-minute consultation call to discuss your project needs.'
      },
      {
        question: 'What are your payment terms?',
        answer: 'We offer flexible payment options: 50% upfront and 50% on completion. Custom plans available.'
      },
      {
        question: 'Can you work with international clients?',
        answer: 'Absolutely! We have experience working with clients worldwide across multiple time zones.'
      }
    ];

    const [expandedFaq, setExpandedFaq] = React.useState(null);

    function ContactContent() {
      const [mode, setMode] = React.useState(() => {
        const h = (window.location.hash || '').replace('#', '');
        return h === 'hire' ? 'hire' : 'contact';
      });

      React.useEffect(() => {
        function onHash() {
          const h = (window.location.hash || '').replace('#', '');
          setMode(h === 'hire' ? 'hire' : 'contact');
        }
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
      }, []);

      if (mode === 'hire') {
        return (
          <div>
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6">Hire Us</h1>
              <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
                Ready to start your next project? Tell us about your vision and let's bring it to life together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us Your Project Details</h2>
                <ContactForm />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Quick Connect</h2>
                <div className="space-y-6">
                  <a href={companyInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mr-4 text-2xl">
                      💬
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                      <p className="text-[var(--text-light)]">Chat with us instantly</p>
                    </div>
                  </a>

                  <a href={companyInfo.telegram} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mr-4 text-2xl">
                      ✈️
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Telegram</h3>
                      <p className="text-[var(--text-light)]">Message us on Telegram</p>
                    </div>
                  </a>

                  <div className="p-6 bg-[var(--secondary-color)] rounded-xl">
                    <h3 className="font-bold text-lg mb-3">Contact Info</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-[var(--text-light)]">📧 Email</p>
                        <p className="font-semibold">{companyInfo.email}</p>
                      </div>
                      <div>
                        <p className="text-[var(--text-light)]">☎️ Phone</p>
                        <p className="font-semibold">{companyInfo.phone}</p>
                      </div>
                      <div>
                        <p className="text-[var(--text-light)]">⏰ Hours</p>
                        <p className="font-semibold">{companyInfo.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // default: contact mode
      return (
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-[var(--text-light)] max-w-2xl mx-auto">Have a question or need support? Reach out via any of the channels below.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                <p className="text-[var(--primary-color)] font-semibold mb-2">{info.details}</p>
                <p className="text-sm text-[var(--text-light)]">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button type="button"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left font-semibold hover:bg-[var(--secondary-color)] transition-colors flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-xl transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-[var(--secondary-color)] border-t border-gray-200 text-[var(--text-light)]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white">
        <Header />

        <section className="section-padding bg-gradient-to-b from-[var(--secondary-color)] to-white">
          <div className="max-w-7xl mx-auto">
            <ContactContent />
          </div>
        </section>

        {/* Additional sections (Why Choose Us, FAQ duplication removed) */}
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
