function ServicesApp() {
  try {
    const services = [
      {
        icon: 'megaphone',
        title: 'Digital Marketing',
        description: 'Grow your online presence with our data-driven marketing strategies.',
        features: [
          'Search Engine Optimization (SEO)',
          'Social Media Marketing & Management',
          'Content Marketing Strategy',
          'Brand Development & Positioning',
          'Pay-Per-Click Advertising',
          'Email Marketing Campaigns'
        ]
      },
      {
        icon: 'palette',
        title: 'Graphic Design',
        description: 'Visual storytelling that captures attention and communicates your brand message.',
        features: [
          'Logo & Brand Identity Design',
          'Poster & Banner Design',
          'UI/UX Design for Web & Mobile',
          'Social Media Graphics',
          'Marketing Collateral',
          'Illustration & Infographics'
        ]
      },
      {
        icon: 'code',
        title: 'Web Development',
        description: 'Modern, responsive websites built with cutting-edge MERN stack technology.',
        features: [
          'Custom Website Development',
          'E-commerce Solutions',
          'Progressive Web Apps',
          'API Development & Integration',
          'Database Design & Management',
          'Performance Optimization'
        ]
      }
    ];

    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-padding bg-gradient-to-b from-[var(--secondary-color)] to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to help your business thrive in the digital landscape
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-7xl mx-auto space-y-16">
            {services.map((service, index) => (
              <ServiceDetail key={index} {...service} reverse={index % 2 !== 0} />
            ))}
          </div>
        </section>

        <section className="section-padding bg-[var(--primary-color)] text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Let's discuss how we can help transform your digital presence</p>
            <a href="contact.html" className="btn-primary bg-white text-[var(--primary-color)] hover:bg-gray-100">
              Get a Quote
            </a>
          </div>
        </section>

        <Footer />
        <FloatingContact />
      </div>
    );
  } catch (error) {
    console.error('ServicesApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ServicesApp />);