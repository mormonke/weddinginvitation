const venueDetails = [
  { label: "Venue", value: "Jannat Regency, малая летняя терраса " },
  { label: "Address", value: "г.Бишкек, ул.Аалы Токомбаева улица, 21/2" },
  { label: "Date", value: "Суббота, Август 29, 2026" },
  { label: "Dress Code", value: "Костюмы, вечерние платья." },
];

export function VenueSection() {
  return (
    <section id="venue" className="bg-[#faf7f2] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-[#c9a87c]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            02
          </span>
          <div className="flex-1 h-px bg-[rgba(122,92,74,0.15)]" />
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-[#7a6a58]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Место проведения
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Details */}
          <div className="flex flex-col gap-8">
            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#2c2416]"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }} translate="no"
            >
              Jannat Regency
            </h2>

            <p
              className="text-[#7a6a58] leading-relaxed"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem" }} translate="no"
            >
             Расположенный в сердце города Бишкек, Jannat Regency сочетает в себе современную элегантность и атмосферу утончённого восточного гостеприимства. Этот отель станет прекрасным местом для нашего особенного дня, где каждая деталь будет наполнена теплом, радостью и атмосферой праздника.
            </p>

            {/* Details list */}
            <div className="flex flex-col gap-0 border-t border-[rgba(122,92,74,0.12)]">
              {venueDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex gap-4 py-4 border-b border-[rgba(122,92,74,0.12)]" translate="no"
                >
                  <span
                    className="w-28 shrink-0 text-[10px] uppercase tracking-[0.2em] text-[#c9a87c] pt-0.5"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    {detail.label}
                  </span>
                  <span
                    className="text-[#2c2416] text-sm"
                    style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem" }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Map link */}
            <a
              href="https://go.2gis.com/UxloQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#7a5c4a] hover:text-[#c9a87c] transition-colors group"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <span>View on Map</span>
              <span className="w-8 h-px bg-current group-hover:w-12 transition-all" />
            </a>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/3] overflow-hidden bg-[#e8ddd3]">
              <img
                src="https://i3.photo.2gis.com/images/branch/0/30258560175594747_96fb.jpg"
                alt="Rosewood Estate grand ballroom with gold floral ceiling"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden bg-[#e8ddd3]">
                <img
                  src="https://i0.photo.2gis.com/photo-gallery/b087aaff-b98f-4837-80c7-320fece079ad.jpg"
                  alt="Elegant table settings at the reception"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square overflow-hidden bg-[#e8ddd3]">
                <img
                  src="https://i2.photo.2gis.com/images/branch/112/15762598707954828_9042.jpg"
                  alt="Beautifully arranged dinner tables in the venue"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
