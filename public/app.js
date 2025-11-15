class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button type="button" onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const services = [
      {
        icon: 'megaphone',
        title: 'Digital Marketing',
        description: 'SEO, social media marketing, and branding strategies that drive results and grow your audience.',
        id: 'digital-marketing'
      },
      {
        icon: 'palette',
        title: 'Graphic Design',
        description: 'Logo, poster, banner, and UI/UX design that captures attention and communicates your brand.',
        id: 'graphic-design'
      },
      {
        icon: 'code',
        title: 'Web Development',
        description: 'Responsive websites and web apps using MERN stack for seamless digital experiences.',
        id: 'web-development'
      }
    ];

    // Load projects from localStorage for portfolio section
    const defaultProjects = [
      {
        title: 'E-Commerce Platform',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&fm=webp&q=75',
        description: 'Full-stack e-commerce solution with payment integration',
        tools: ['React', 'Node.js', 'MongoDB']
      },
      {
        title: 'Brand Identity Design',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&fm=webp&q=75',
        description: 'Complete brand identity for a tech startup',
        tools: ['Illustrator', 'Photoshop', 'Figma']
      },
      {
        title: 'Social Media Campaign',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&fm=webp&q=75',
        description: 'Multi-platform social media marketing strategy',
        tools: ['Meta Ads', 'Analytics', 'Canva']
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

    return (
      <div className="min-h-screen bg-white" data-name="app" data-file="app.js">
        <Header />
        <HeroCarousel />
        
        <section className="section-padding bg-[var(--secondary-color)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-[var(--text-light)] max-w-2xl mx-auto">
                We deliver comprehensive digital solutions tailored to your business needs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} id={service.id}>
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-[var(--text-light)] max-w-2xl mx-auto">
                Explore our latest work and see how we've helped businesses achieve their goals
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
            <div className="text-center mt-12">
              <a href="portfolio.html" className="btn-primary">
                View All Projects
              </a>
            </div>
          </div>
        </section>

        <StatsSection />
        <Footer />
        <FloatingContact />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
