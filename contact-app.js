function ContactApp() {
  try {
    const contactInfo = [
      {
        icon: '📍',
        title: 'Office Location',
        details: 'CreativeAgency HQ',
        description: 'Visit us at our office'
      },
      {
        icon: '⏰',
        title: 'Business Hours',
        details: 'Mon - Fri: 9AM - 6PM',
        description: 'Saturday by appointment'
      },
      {
        icon: '📧',
        title: 'Email Support',
        details: 'hello@creativeagency.com',
        description: 'Response within 24 hours'
      },
      {
        icon: '☎️',
        title: 'Phone Support',
        details: '+1 (555) 123-4567',
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

    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Contact Information Grid */}
        <section className="section-padding bg-[var(--secondary-color)]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Contact Information</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                  <p className="text-[var(--primary-color)] font-semibold mb-2">{info.details}</p>
                  <p className="text-sm text-[var(--text-light)]">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
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