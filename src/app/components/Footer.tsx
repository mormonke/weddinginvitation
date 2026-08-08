export function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2c2416] text-[#e8ddd3] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 pb-12 border-b border-[rgba(201,168,124,0.15)]">
          {/* Monogram */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span
              className="text-4xl text-[#c9a87c]"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
            >
              И & Д
            </span>
            <span
              className="text-[9px] uppercase tracking-[0.3em] text-[#8a7a68]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Август 29, 2026
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
            {[
              { label: "Ждем вас!", href: "#welcome" },
              { label: "Расписание дня", href: "#schedule" },
              { label: "Место проведение", href: "#venue" },
              { label: "Анкета", href: "#rsvp" },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-[10px] uppercase tracking-[0.2em] text-[#8a7a68] hover:text-[#c9a87c] transition-colors"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Middle: venue & contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-[rgba(201,168,124,0.15)]">
          <div className="flex flex-col gap-2">
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-[#c9a87c] mb-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Церемония &amp; Банкет
            </p>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", color: "#c9b8a8" }}>
              Jannat Regency
            </p>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.9rem", color: "#8a7a68" }}>
              Аалы Токомбаева улица, 21/2
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-[#c9a87c] mb-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Contact
            </p>
            <a
              href="mailto:hello@eleanorjames.com"
              className="text-[#8a7a68] hover:text-[#c9a87c] transition-colors"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem" }}
            >
              danyamiki04@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-[#c9a87c] mb-1"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Анкета до
            </p>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", color: "#c9b8a8" }}>
              15 Августа, 2026
            </p>
            <button
              onClick={() => handleNav("#rsvp")}
              className="mt-1 self-start text-[10px] uppercase tracking-[0.2em] text-[#c9a87c] hover:text-[#faf7f2] transition-colors flex items-center gap-2 group"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <span>Заполнить</span>
              <span className="w-4 h-px bg-current group-hover:w-6 transition-all" />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8">
          <p
            className="text-[10px] text-[#5a4a3a] tracking-wide text-center md:text-left"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            © 2026 Илона & Даниил · Сделано с любовью для нашего свадебного дня
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#c9a87c] text-xs">✦</span>
            <span
              className="text-[10px] uppercase tracking-[0.2em] text-[#5a4a3a]"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Jannat Regency.
            </span>
            <span className="text-[#c9a87c] text-xs">✦</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
