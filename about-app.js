function AboutApp() {
  try {
    const [selectedMember, setSelectedMember] = React.useState(null);

    const defaultTeam = [
      {
        name: 'Abdur Rahman',
        role: 'Frontend Developer & Graphics Designer',
        image: 'https://i.ibb.co/GQ2MXkD7/Whats-App-Image-2025-10-29-at-23-59-06-46b7c15f.jpg',
        bio: 'Frontend Developer & Graphics Designer | React | AI-Assisted Websites | PSD → HTML | WordPress & SEO.',
      },
      {
        name: 'Md Jahid Hasan',
        role: 'Digital marketer',
        image: 'https://i.ibb.co.com/TxcgbNHv/Picsart-25-11-13-17-28-01-238.png',
        bio: 'Creative designer passionate about crafting beautiful visual identities and user experiences.',
      },
      
      
    ,  {
        name: 'Sohanur Islam Sujon',
        role: 'Graphic Designer',
        image: 'https://i.ibb.co/Z7Pb3ZX/sujon.png',
        bio: 'Design thinking advocate focused on creating intuitive and engaging user interfaces.',
      }
    ];
    // Ensure the live site's localStorage includes our new member.
    try {
      const stored = JSON.parse(localStorage.getItem('fw_team') || 'null');
      const newMember = defaultTeam.find(m => m && m.name === 'Sohanur Islam Sujon');
      if (newMember) {
        if (!Array.isArray(stored)) {
          localStorage.setItem('fw_team', JSON.stringify(defaultTeam));
        } else if (!stored.some(m => m && m.name === newMember.name)) {
          const merged = [...stored, newMember];
          localStorage.setItem('fw_team', JSON.stringify(merged));
        }
      }
    } catch (e) { /* ignore localStorage errors */ }

    const team = React.useMemo(() => { try { return JSON.parse(localStorage.getItem('fw_team') || 'null') || defaultTeam; } catch(e){ return defaultTeam; } }, []);

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
                <TeamMember
                  key={index}
                  {...member}
                  onClick={() => setSelectedMember(member)}
                />
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