function ServiceDetail({ icon, title, description, features, reverse }) {
  try {
    return (
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`} data-name="service-detail" data-file="components/ServiceDetail.js">
        <div className="flex-1">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-blue-100">
            <div className={`icon-${icon} text-3xl text-[var(--primary-color)]`}></div>
          </div>
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-[var(--text-light)] mb-8">{description}</p>
          <a href="contact.html" className="btn-primary">
            Get a Quote
          </a>
        </div>
        
        <div className="flex-1">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <div className="icon-check text-sm text-green-600"></div>
                </div>
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ServiceDetail component error:', error);
    return null;
  }
}