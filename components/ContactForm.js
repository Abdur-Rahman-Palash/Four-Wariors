function ContactForm() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: ''
    });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6" data-name="contact-form" data-file="components/ContactForm.js">
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            Thank you! We'll get back to you soon.
          </div>
        )}
        
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Send Message
        </button>
      </form>
    );
  } catch (error) {
    console.error('ContactForm component error:', error);
    return null;
  }
}
