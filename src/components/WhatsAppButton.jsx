import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "919000000000"; // 👈 Apna number yahan dalo (91 + 10 digits)
  const message = "Hello Caballero! I'm interested in your premium collection.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
      
      {/* Hover Tooltip Message */}
      <div
        className="transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(10px)',
          pointerEvents: 'none',
        }}
      >
        <div
          className="relative px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap"
          style={{
            background: '#1C1C1E',
            border: '1px solid rgba(200,160,80,0.2)',
          }}
        >
          <p className="text-xs font-bold" style={{ color: '#C8A050' }}>Need Help?</p>
          <p className="text-[11px]" style={{ color: 'rgba(245,240,232,0.75)' }}>
            Chat with us on WhatsApp!
          </p>
          {/* Arrow pointing right */}
          <div
            className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '8px solid #1C1C1E',
            }}
          />
        </div>
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-[#25D366] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
        style={{
          width: '60px',
          height: '60px',
          boxShadow: hovered
            ? '0 6px 28px rgba(37,211,102,0.6)'
            : '0 4px 20px rgba(37,211,102,0.4)',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '28px', height: '28px' }}
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.52.666 4.884 1.83 6.93L2 30l7.304-1.814A13.916 13.916 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 01-5.832-1.598l-.418-.248-4.332 1.076 1.094-4.216-.274-.434A11.46 11.46 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.292-8.584c-.344-.172-2.036-1.004-2.352-1.118-.316-.114-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.708-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.7.154-.154.344-.402.516-.602.172-.2.23-.344.344-.574.114-.23.058-.43-.028-.602-.086-.172-.776-1.87-1.064-2.562-.28-.674-.564-.582-.776-.592l-.66-.012a1.27 1.27 0 00-.92.43c-.316.344-1.206 1.178-1.206 2.872s1.234 3.332 1.406 3.562c.172.23 2.428 3.708 5.882 5.198.822.354 1.464.566 1.964.724.824.262 1.574.224 2.168.136.66-.098 2.036-.832 2.322-1.634.286-.802.286-1.49.2-1.634-.086-.144-.316-.23-.66-.402z" />
        </svg>
      </a>

    </div>
  );
};

export default WhatsAppButton;