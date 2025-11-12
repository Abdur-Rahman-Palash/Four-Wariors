function ContactForm() {
  try {
    // WhatsApp Configuration
    // Replace 'YOUR_GROUP_INVITATION_CODE' with your actual WhatsApp group invitation code
    // How to get it: Open WhatsApp group → Group info (i) → Invite via link → Copy link
    // Extract the code from: https://chat.whatsapp.com/INVITATION_CODE
    const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm';

    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      message: ''
    });
    const [submitted, setSubmitted] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const services = [
      'Digital Marketing',
      'Graphic Design',
      'Web Development',
      'All Services'
    ];

    const budgets = [
      'Under $500',
      '$500 - $1,000',
      '$1,000 - $5,000',
      '$5,000 - $10,000',
      'Above $10,000'
    ];

    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
      if (!formData.service) newErrors.service = 'Please select a service';
      if (!formData.budget) newErrors.budget = 'Please select a budget range';
      if (!formData.message.trim()) newErrors.message = 'Message is required';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!validateForm()) return;

      // Create formatted WhatsApp message
      const whatsappMessage = `📬 *New Inquiry from Website!*%0A%0A👤 *Name:* ${encodeURIComponent(formData.name)}%0A📧 *Email:* ${encodeURIComponent(formData.email)}%0A📱 *Phone:* ${formData.phone ? encodeURIComponent(formData.phone) : 'Not provided'}%0A🎯 *Service:* ${encodeURIComponent(formData.service)}%0A💰 *Budget:* ${encodeURIComponent(formData.budget)}%0A%0A📝 *Details:*%0A${encodeURIComponent(formData.message)}`;

      // Send to WhatsApp
      window.open(`https://api.whatsapp.com/send?text=${whatsappMessage}`, '_blank');

      setSubmitted(true);
      console.log('Inquiry sent via WhatsApp:', formData);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
      }, 4000);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6" data-name="contact-form" data-file="components/ContactForm.js">
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-fadeIn">
            <div className="font-bold mb-1">✓ Thank you for reaching out!</div>
            <div className="text-sm">We've received your message and will get back to you within 24 hours.</div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Service Required *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none ${
              errors.service ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a service...</option>
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
          {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Budget Range *</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none ${
              errors.budget ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select budget range...</option>
            {budgets.map((budget, index) => (
              <option key={index} value={budget}>{budget}</option>
            ))}
          </select>
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Project Details *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about your project, goals, and timeline..."
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        <button type="submit" className="btn-primary w-full hover:shadow-lg transition-all duration-300">
          📬 Send Inquiry
        </button>

        <p className="text-center text-xs text-[var(--text-light)]">
          * Required fields. We respect your privacy and will never share your information.
        </p>
      </form>
    );
  } catch (error) {
    console.error('ContactForm component error:', error);
    return null;
  }
}
