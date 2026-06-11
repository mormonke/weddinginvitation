export function HeroSection() {
  const handleRSVP = () => {
    const el = document.querySelector("#rsvp");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

   return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="background.png"
          alt="Wedding ceremony aisle with floral arrangements"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2416]/60 via-[#2c2416]/30 to-[#E7EAE3]/60" />
        <div className="absolute inset-0 bg-[#E7EAE3]/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-16 max-w-4xl mx-auto">
        {/* Pre-heading */}
        <p
          className="text-[11px] uppercase tracking-[0.35em] text-[#E7EAE3] mb-8"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Приглашаем вас на торжественное событие!
        </p>

        {/* Names */}
        <h1
          className="text-[clamp(3.5rem,10vw,7rem)] leading-none text-[#E7EAE3] drop-shadow-sm mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          Илона
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-48 h-px bg-[#ffffff]" />
          <span
            className="text-[16px] uppercase tracking-[0.3em] text-[#ffffff]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            &amp;
          </span>
          <div className="w-48 h-px bg-[#ffffff]" />
        </div>
        <h1
          className="text-[clamp(3.5rem,10vw,7rem)] leading-none text-[#E7EAE3] drop-shadow-sm mb-10"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          Даниил
        </h1>

        {/* Date & Location */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-[#f5f0e8] mb-12"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <span className="text-[13px] tracking-widest uppercase">Август 29, 2026</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-[#E7EAE3]" />
          <span className="text-[13px] tracking-widest uppercase">Jannat Regency</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRSVP}
            className="px-10 py-3.5  text-[#E7EAE3] text-[11px] uppercase tracking-[0.25em] hover:bg-[#3951118a] transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Заполнить анкету
          </button>
          
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-10 bg-[#ffffff] animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#ffffff]"
            style={{ fontFamily: "'Lato', sans-serif" }}>
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
