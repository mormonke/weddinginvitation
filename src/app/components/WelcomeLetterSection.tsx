export function WelcomeLetterSection() {
  return (
    <section id="welcome" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-[#c9a87c]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            
          </span>
          <div className="flex-1 h-px bg-[rgba(122,92,74,0.15)]" />
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-[#7a6a58]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-[#e8ddd3]">
              <img
                src="https://drive.google.com/file/d/1WejroPC3bL5pTER1SbBgQrc_QuJGGUBP/view?usp=sharing"
                alt="Eleanor and James together in a garden"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a87c]/30 -z-10" />
          </div>

          {/* Letter */}
          <div className="flex flex-col gap-8 pt-4">
            <h2
              className="text-[clamp(2rem,5vw,3.25rem)] leading-tight text-[#2c2416]"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
            >
              Ждем вас!
            </h2>

            <div
              className="flex flex-col gap-5 text-[#5a4a3a] leading-relaxed"
              style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.1rem" }}
            >
              <p>
                Дорогие родные и друзья,
              </p>
              <p>
               Есть особая форма счастья — тихая и глубокая, которая приходит не внезапно, а постепенно, словно мягкий утренний свет, наполняющий комнату теплом и спокойствием. Именно так в нашу жизнь вошла любовь.
              </p>
              <p>
               29 августа мы будем счастливы разделить с вами один из самых важных моментов нашей жизни. В окружении самых близких людей — тех, кто сформировал нас и сопровождал на каждом этапе пути, — мы произнесём наши свадебные клятвы в Jannat Regency.
              </p>
              <p>
               Для нас бесценно начать эту новую главу вместе с вами..
              </p>
              <p className="text-[#7a5c4a]" style={{ fontStyle: "italic" }}>
                Со всей нашей любовью,<br />Илона &amp; Даниил
              </p>
            </div>

            {/* Ornamental divider */}
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-px bg-[#c9a87c]" />
              <span className="text-[#c9a87c] text-lg">✦</span>
              <div className="w-8 h-px bg-[#c9a87c]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
