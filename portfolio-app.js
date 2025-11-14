function PortfolioApp() {
  try {
    const [filter, setFilter] = React.useState('all');

    // Load projects from localStorage if available, otherwise use defaults
    const defaultProjects = [
      {
        title: 'E-Commerce Platform',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&q=80',
        description: 'Full-stack e-commerce solution with payment integration',
        tools: ['React', 'Node.js', 'MongoDB']
      },
      {
        title: 'Brand Identity Design',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
        description: 'Complete brand identity for a tech startup',
        tools: ['Illustrator', 'Photoshop', 'Figma']
      },
      {
        title: 'Social Media Campaign',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
        description: 'Multi-platform social media marketing strategy',
        tools: ['Meta Ads', 'Analytics', 'Canva']
      },
      {
        title: 'Restaurant Website',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
        description: 'Responsive restaurant website with online ordering',
        tools: ['React', 'Express', 'Stripe']
      },
      {
        title: 'Mobile App UI/UX',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
        description: 'Modern mobile app interface design',
        tools: ['Figma', 'Adobe XD']
      },
      {
        title: 'SEO Optimization',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=600&q=80',
        description: 'Increased organic traffic by 300%',
        tools: ['SEMrush', 'Google Analytics']
      }
    ];

    const loadProjects = () => {
      try {
        const raw = localStorage.getItem('fw_projects');
        if (!raw) return defaultProjects;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return defaultProjects;
        return parsed;
      } catch (err) {
        console.warn('Failed to read projects from localStorage, using defaults', err);
        return defaultProjects;
      }
    };

    const projects = loadProjects();

    const categories = ['all', 'web', 'design', 'marketing'];
    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <section className="section-padding bg-[var(--secondary-color)]">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-6">Our Portfolio</h1>
            <p className="text-xl text-[var(--text-light)] text-center max-w-3xl mx-auto mb-12">
              Explore our latest projects and see how we've helped businesses achieve their goals
            </p>
            
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {categories.map((cat) => (
                <button type="button"
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    filter === cat 
                      ? 'bg-[var(--primary-color)] text-white' 
                      : 'bg-white text-[var(--text-dark)] hover:bg-gray-100'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <FloatingContact />
      </div>
    );
  } catch (error) {
    console.error('PortfolioApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PortfolioApp />);