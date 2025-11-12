function Icon({ iconName }) {
  try {
    const iconMap = {
      'megaphone': '📢',
      'palette': '🎨',
      'code': '💻',
      'megaphone-square': '📢',
    };

    const emoji = iconMap[iconName] || '✨';

    return (
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-[var(--secondary-color)]"
        data-name="icon"
        data-file="components/Icon.js"
      >
        <div className="text-3xl">{emoji}</div>
      </div>
    );
  } catch (error) {
    console.error('Icon component error:', error);
    return null;
  }
}