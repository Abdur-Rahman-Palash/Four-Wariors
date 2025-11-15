function TestimonialsApp() {
  try {
    const testimonials = [
      {
        name: 'John Davis',
        company: 'TechStart Inc.',
        role: 'CEO',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&fm=webp&q=75',
        rating: 5,
        text: 'Outstanding work! They transformed our digital presence and increased our online engagement by 400%. Highly professional team.'
      },
      {
        name: 'Lisa Martinez',
        company: 'Fashion Forward',
        role: 'Marketing Director',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&fm=webp&q=75',
        rating: 5,
        text: 'The graphic design work exceeded our expectations. Our brand identity is now modern, cohesive, and truly represents who we are.'
      },
      {
        name: 'Robert Chen',
        company: 'Green Earth Co.',
        role: 'Founder',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&fm=webp&q=75',
        rating: 5,
        text: 'Their web development expertise is top-notch. The MERN stack solution they built is fast, scalable, and user-friendly.'
      },
      {
        name: 'Emma Wilson',
        company: 'Bloom Bakery',
        role: 'Owner',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&fm=webp&q=75',
        rating: 5,
        text: 'Best investment we made! The website and marketing campaign they created brought us 50+ new customers in the first month.'
      },
      {
        name: 'Michael Brown',
        company: 'FitLife Gym',
        role: 'Manager',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&fm=webp&q=75',
        rating: 5,
        text: 'Professional, creative, and responsive. They understood our vision and delivered exactly what we needed. Excellent communication.'
      },
      {
        name: 'Sophia Lee',
        company: 'Urban Realty',
        role: 'Real Estate Agent',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&fm=webp&q=75',
        rating: 5,
        text: 'Their SEO work brought us to the first page of Google. Our leads have tripled since working with them. Amazing results!'
      }
    ];

    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-padding bg-gradient-to-b from-[var(--secondary-color)] to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Client Testimonials</h1>
            <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--primary-color)] text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Join Our Happy Clients</h2>
            <p className="text-xl mb-8">Experience the difference of working with a dedicated creative team</p>
            <a href="contact.html" className="btn-primary bg-white text-[var(--primary-color)] hover:bg-gray-100">
              Start Your Project
            </a>
          </div>
        </section>

        <Footer />
        <FloatingContact />
      </div>
    );
  } catch (error) {
    console.error('TestimonialsApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestimonialsApp />);