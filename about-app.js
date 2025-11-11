function AboutApp() {
  try {
    const team = [
      {
        name: 'Alex Johnson',
        role: 'Digital Marketing Lead',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        bio: 'SEO specialist with 5+ years of experience in driving organic growth and social media strategies.'
      },
      {
        name: 'Sarah Chen',
        role: 'Lead Graphic Designer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        bio: 'Creative designer passionate about crafting beautiful visual identities and user experiences.'
      },
      {
        name: 'Michael Rodriguez',
        role: 'Full Stack Developer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        bio: 'MERN stack expert building scalable web applications with clean, efficient code.'
      },
      {
        name: 'Emily Park',
        role: 'UI/UX Designer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        bio: 'Design thinking advocate focused on creating intuitive and engaging user interfaces.'
      }
    ];

    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-padding bg-gradient-to-b from-[var(--secondary-color)] to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Our Agency</h1>
            <p className="text-xl text-[var(--text-light)] max-w-3xl mx-auto mb-12">
              We are a passionate team of 4 creative professionals dedicated to transforming businesses 
              through innovative digital solutions. Our expertise spans across digital marketing, graphic design, 
              and web development.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[var(--secondary-color)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-[var(--text-light)]">Pushing boundaries with creative solutions</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Quality</h3>
                <p className="text-[var(--text-light)]">Delivering excellence in every project</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Partnership</h3>
                <p className="text-[var(--text-light)]">Building lasting relationships with clients</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingContact />
      </div>
    );
  } catch (error) {
    console.error('AboutApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AboutApp />);