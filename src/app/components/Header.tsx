import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Ждем вас!", href: "#welcome" },
  { label: "Расписание дня", href: "#schedule" },
  { label: "Место проведения", href: "#venue" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#395111]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(122,92,74,0.12)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Monogram */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          className="flex flex-col items-center leading-none group"
        >
          <span
            className="text-2xl tracking-widest text-[#E7EAE3] transition-opacity group-hover:opacity-60"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            И & Д
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#E7EAE3] mt-0.5"
            style={{ fontFamily: "'Lato', sans-serif" }}>
            Август 29, 2026
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-[11px] uppercase tracking-[0.2em] text-[#E7EAE3] hover:text-[#E7EAE37e] transition-colors "
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#rsvp")}
            className="px-5 py-2 border border-[#E7EAE3] text-[#E7EAE3] text-[11px] uppercase tracking-[0.2em] hover:bg-[#E7EAE348] hover:text-[#faf7f2] transition-all"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Заполнить!
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#382005] p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#faf7f2] border-t border-[rgba(122,92,74,0.12)] ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left py-3 text-[12px] uppercase tracking-[0.2em] text-[#382005] hover:text-[#382005] border-b border-[rgba(122,92,74,0.08)] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
