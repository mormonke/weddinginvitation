const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdeBWEMrwNBlVwW0FAyqzcWkeP5k32nQl7dRcEyCC0AoSK2Rg/viewform?usp=publish-editor"; 

export function RSVPSection() {
  return (
    
    <section id="rsvp" className="bg-[#faf7f2] min-h-screen py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-[#c9a87c]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            03
          </span>
          <div className="flex-1 h-px bg-[rgba(122,92,74,0.15)]" />
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-[#7a6a58]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Анкета
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-8 max-w-lg mx-auto">
          <h2
            className="text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#2c2416]"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Присоеденитесь ли вы к празднованию?
          </h2>
          <p
            className="text-[#7a6a58] leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem" }}
          >
            Просим вас подтвердить своё присутствие до <strong className="text-[#7a5c4a]"> 15 августа 2026 года. </strong>.
            Мы будем счастливы разделить этот особенный день вместе с вами.
          </p>
          <p
            className="text-[#7a6a58] leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem" }}
          >
           Пожалуйста, заполните форму ниже и сообщите, сможете ли вы присутствовать на нашем торжестве.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 py-4 px-10 bg-[#7a5c4a] text-[#faf7f2] text-[11px] uppercase tracking-[0.25em] hover:bg-[#6a4c3a] transition-colors"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
           Заполнить
          </a>
        </div>
      </div>
    </section>
  );
}
