function FloatingContact() {
  try {
    return (
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50" data-name="floating-contact" data-file="components/FloatingContact.js">
        <a
          href="https://chat.whatsapp.com/CCfz7x1ZqsvKXDCGMnLNCm"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          title="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.66 5.36A10 10 0 0012 22a9.9 9.9 0 004.9-1.2L22 22l-1.2-5.1A10 10 0 0012 2zm1.6 14.2c-.2.6-.9 1-1.6.9-1.2-.1-2.4-1.2-3.2-2.4-.8-1.2-.9-2.3-.8-2.5.1-.2.3-.3.5-.5.2-.1.3-.2.4-.3.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1.1-.3.1-.5 0-.2 0-.4-.1-.5-.1-.1-.2-.2-.3-.3-.1-.1-.3-.3-.5-.3-.2 0-.3 0-.5.1-.1 0-.4.2-.7.5-.3.3-.8.8-1.1 1.2-.3.4-.6.8-.8 1.3-.2.4-.2.9.1 1.4.3.5 1 1.2 1.8 2 1.1 1.1 2.6 2.2 4 2 1.1-.2 1.7-.8 1.9-1 .2-.3.2-.6.1-.8-.1-.2-.2-.3-.4-.6z"/></svg>
        </a>
        <a
          href="https://t.me/+rIv1Kf6xr7pmNTM1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          title="Chat on Telegram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 3L3 10l5 2 2 6 2-4 4 3z"/></svg>
        </a>
      </div>
    );
  } catch (error) {
    console.error('FloatingContact component error:', error);
    return null;
  }
}