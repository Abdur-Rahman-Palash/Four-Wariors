function ProjectCard({ title, category, image, description, tools }) {
  try {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-name="project-card" data-file="components/ProjectCard.js">
        <div className="relative overflow-hidden h-64">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
          <div className="absolute top-4 right-4">
            <span className="px-4 py-1 bg-[var(--primary-color)] text-white text-sm font-semibold rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-[var(--text-light)] mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tools.map((tool, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                {tool}
              </span>
            ))}
          </div>
          <a href="contact.html" className="inline-flex items-center text-[var(--primary-color)] font-semibold hover:underline">
            Get Similar Project
            <div className="icon-arrow-right text-sm ml-2"></div>
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProjectCard component error:', error);
    return null;
  }
}
