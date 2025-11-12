function AboutApp() {
  try {
    const [selectedMember, setSelectedMember] = React.useState(null);

    const team = [
      {
        name: 'Abdur Rahman',
        role: 'Frontend Developer & Graphics Designer',
        image: 'https://drive.google.com/uc?export=view&id=1WYmT0Pzn2ipuAgj8mNTuw6TtIJ9bRM1P',
        bio: 'Frontend Developer & Graphics Designer | React | AI-Assisted Websites | PSD → HTML | WordPress & SEO.',
        portfolio: 'https://portfolio-edit-t3uy.vercel.app/',
        github: 'https://github.com/Abdur-Rahman-Palash',
        telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1',
        whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm'
      },
      {
        name: 'Sarah Chen',
        role: 'Lead Graphic Designer',
        image: 'https://i.pravatar.cc/300?img=2&u=sarahchen',
        bio: 'Creative designer passionate about crafting beautiful visual identities and user experiences.',
        portfolio: 'https://sarahchen.portfolio.com',
        github: 'https://github.com/sarahchen',
        telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1',
        whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm'
      },
      {
        name: 'Michael Rodriguez',
        role: 'Full Stack Developer',
        image: 'https://i.pravatar.cc/300?img=3&u=michaelrodriguez',
        bio: 'MERN stack expert building scalable web applications with clean, efficient code.',
        portfolio: 'https://michaelrodriguez.portfolio.com',
        github: 'https://github.com/michaelrodriguez',
        telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1',
        whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm'
      },
      {
        name: 'Emily Park',
        role: 'UI/UX Designer',
        image: 'https://i.pravatar.cc/300?img=4&u=emilypark',
        bio: 'Design thinking advocate focused on creating intuitive and engaging user interfaces.',
        portfolio: 'https://emilypark.portfolio.com',
        github: 'https://github.com/emilypark',
        telegram: 'https://t.me/+rIv1Kf6xr7pmNTM1',
        whatsapp: 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm'
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
                <div 
                  key={index} 
                  onClick={() => setSelectedMember(member)}
                  style={{ cursor: 'pointer' }}
                >
                  <TeamMember {...member} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {selectedMember && (
          <TeamMemberModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}

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