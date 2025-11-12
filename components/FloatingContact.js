function FloatingContact() {
  try {
    return (
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50" data-name="floating-contact" data-file="components/FloatingContact.js">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-2xl"
          title="Chat on WhatsApp"
        >
          💬
        </a>
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 text-2xl"
          title="Chat on Telegram"
        >
          ✈️
        </a>
      </div>
    );
  } catch (error) {
    console.error('FloatingContact component error:', error);
    return null;
  }
}