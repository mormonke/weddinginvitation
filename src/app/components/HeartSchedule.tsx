import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
}

export interface HeartScheduleProps {
  items: ScheduleItem[];
  title?: string;
  subtitle?: string;
  height?: string;
  /** Minimum ms between card reveals. Default: 600 */
  revealDelay?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPath(pts: [number, number][]): string {
  if (pts.length < 2) return pts.length === 1 ? `M ${pts[0][0]} ${pts[0][1]}` : "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mid = (y0 + y1) / 2;
    d += ` C ${x0} ${mid}, ${x1} ${mid}, ${x1} ${y1}`;
  }
  return d;
}

function makeWaypoints(n: number): [number, number][] {
  const top = 8, bottom = 84;
  const step = n > 1 ? (bottom - top) / (n - 1) : 0;
  return Array.from({ length: n }, (_, i) => [
    i % 2 === 0 ? 62 : 38,
    top + i * step,
  ] as [number, number]);
}

// Card size scales up when fewer items
function cardSize(n: number) {
  if (n <= 3) return { width: "clamp(200px, 44%, 340px)", padding: "20px 22px", emoji: 56, titleSize: "1.2rem",  timeSize: "0.95rem", descSize: "0.9rem",  emojiBox: 64 };
  if (n <= 5) return { width: "clamp(180px, 42%, 300px)", padding: "17px 19px", emoji: 46, titleSize: "1.08rem", timeSize: "0.88rem", descSize: "0.82rem", emojiBox: 54 };
  return         { width: "clamp(160px, 38%, 260px)", padding: "14px 16px", emoji: 36, titleSize: "0.98rem", timeSize: "0.8rem",  descSize: "0.75rem", emojiBox: 44 };
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HeartSchedule({
  items,
  title = "💕 Наш путь на этот вечер",
  subtitle = "Нажми — сердечко идёт по кривой",
  height = "100vh",
  revealDelay = 600,
}: HeartScheduleProps) {
  const [count, setCount]       = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const countRef      = useRef(0);
  const lockedRef     = useRef(false);
  const completedRef  = useRef(false);
  const unlockedAtRef = useRef(0);
  const lastRevealRef = useRef(0);
  const sectionRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const reveal = () => {
    const now = Date.now();
    if (now - lastRevealRef.current < revealDelay) return;
    if (countRef.current >= items.length) return;
    lastRevealRef.current = now;
    countRef.current += 1;
    setCount(countRef.current);
    if (countRef.current >= items.length) {
      completedRef.current = true;
      lockedRef.current    = false;
    }
  };

  const unlock = () => {
    lockedRef.current     = false;
    unlockedAtRef.current = Date.now();
  };

  // Snap to section when scroll stops and section is partially in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let timer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (completedRef.current) return;
        const cooldownOver = Date.now() - unlockedAtRef.current > 600;
        if (!cooldownOver) return;

        const rect = section.getBoundingClientRect();
        const vh   = window.innerHeight;

        // Section is partially visible (between -50vh and +50vh from top)
        const partiallyVisible = rect.top < vh * 0.6 && rect.bottom > vh * 0.4;
        const notAligned       = Math.abs(rect.top) > 4; // not already snapped

        if (partiallyVisible && notAligned) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => { lockedRef.current = true; }, 500);
        }
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      if (e.deltaY > 0) {
        if (countRef.current < items.length) { e.preventDefault(); reveal(); }
        else unlock();
      } else {
        unlock();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [items.length, revealDelay]);

  // Touch
  useEffect(() => {
    let startY = 0;
    let lastSwipeAt = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchEnd   = (e: TouchEvent) => {
      if (!lockedRef.current) return;
      const deltaY = startY - e.changedTouches[0].clientY;
      const now    = Date.now();
      if (deltaY > 30) {
        if (countRef.current < items.length) {
          if (now - lastSwipeAt < revealDelay) return;
          lastSwipeAt = now;
          e.preventDefault();
          reveal();
        } else unlock();
      } else if (deltaY < -30) {
        unlock();
      }
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend",   onTouchEnd,   { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [items.length, revealDelay]);

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = activeId !== null ? items.find(it => it.id === activeId) ?? null : null;
  const bgItem = count > 0 ? items[count - 1] : null;

  return (
     <section id="schedule" className="bg-[#faf7f2] py-24 md:py-32">
    <div ref={sectionRef} style={{ width: "100%", height, overflow: "hidden", position: "relative" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: bgItem
          ? `linear-gradient(160deg, ${bgItem.bgColor} 0%, #fff5f7 100%)`
          : "linear-gradient(160deg, #fff5f7 0%, #fce8f5 100%)",
        transition: "background 0.7s ease",
      }} />

      {/* Badge — only visible when something is hovered/tapped */}
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 40 }}>
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: -6, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                borderRadius: 9999, padding: "6px 14px",
                background: activeItem.bgColor,
                boxShadow: "0 2px 12px rgba(232,82,122,0.15)",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{activeItem.emoji}</span>
              <span style={{ color: activeItem.color, fontFamily: "Georgia, serif", fontSize: "0.78rem", fontWeight: 600 }}>
                {activeItem.time} · {activeItem.title}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll hint */}
      <AnimatePresence>
        {count > 0 && count < items.length && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
              zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              pointerEvents: "none",
            }}
          >
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ color: "#e8527a", fontSize: "1.2rem" }}>↓</motion.div>
            <span style={{ color: "#a0627a", fontSize: "0.68rem", fontFamily: "Georgia, serif" }}>
              {count} / {items.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {count === 0 ? (
        <IntroScreen title={title} subtitle={subtitle} isMobile={isMobile} onTap={isMobile ? reveal : undefined} />
      ) : isMobile ? (
        <MobileLayout items={items} count={count} onActive={setActiveId} reveal={reveal} />
      ) : (
        <DesktopLayout items={items} count={count} onActive={setActiveId} />
      )}
    </div>
    </section>
  );
  
}

// ─── Desktop: curved path ─────────────────────────────────────────────────────

function DesktopLayout({ items, count, onActive }: { items: ScheduleItem[]; count: number; onActive: (id: number | null) => void }) {
  const waypoints = makeWaypoints(items.length);
  const fullPath  = buildPath(waypoints);
  const sizes     = cardSize(items.length);
  const heartPos  = waypoints[count - 1];
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleEnter = (id: number) => { setHoveredId(id); onActive(id); };
  const handleLeave = () => { setHoveredId(null); onActive(null); };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none">
        <path d={fullPath} stroke="#f9c8d8" strokeWidth="0.6" strokeDasharray="1.5 1.2" opacity="0.8" vectorEffect="non-scaling-stroke" />
        {count > 1 && (
          <path d={buildPath(waypoints.slice(0, count))} stroke="url(#hg)" strokeWidth="0.8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        )}
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9c8d8" />
            <stop offset="100%" stopColor="#c060a0" />
          </linearGradient>
        </defs>
      </svg>

      {items.slice(0, count).map((item, i) => {
        const [xPct, yPct] = waypoints[i];
        const isRight = xPct > 50;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.72, x: isRight ? 22 : -22 }}
            animate={{ opacity: 1, scale: hoveredId === item.id ? 1.03 : 1, x: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onMouseEnter={() => handleEnter(item.id)}
            onMouseLeave={handleLeave}
            style={{
              position: "absolute",
              top: `${yPct}%`,
              ...(isRight ? { left: `${xPct}%` } : { right: `${100 - xPct}%` }),
              transform: "translateY(-50%)",
              width: sizes.width,
              background: "#ffffff",
              border: `2px solid ${hoveredId === item.id || i === count - 1 ? item.color + "70" : "rgba(232,82,122,0.1)"}`,
              borderRadius: 16,
              padding: sizes.padding,
              boxShadow: hoveredId === item.id
                ? `0 10px 32px ${item.color}40`
                : i === count - 1 ? `0 6px 24px ${item.color}28` : "0 1px 6px rgba(232,82,122,0.08)",
              cursor: "default",
              pointerEvents: "all",
              transition: "box-shadow 0.25s, border-color 0.25s",
              zIndex: hoveredId === item.id ? 20 : 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: sizes.emojiBox, height: sizes.emojiBox, borderRadius: 12,
                background: item.bgColor, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: sizes.emoji, flexShrink: 0,
              }}>
                {item.emoji}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: item.color, fontFamily: "Georgia, serif", fontWeight: 600, fontSize: sizes.timeSize, lineHeight: 1.2 }}>
                  {item.time}
                </div>
                <div style={{ color: "#3d1a24", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: sizes.titleSize, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {item.title}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {hoveredId === item.id && (
                <motion.p
                  key="desc"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ color: "#a0627a", fontFamily: "Georgia, serif", fontSize: sizes.descSize, margin: "8px 0 0", lineHeight: 1.5, overflow: "hidden" }}
                >
                  {item.description}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Heart */}
      <motion.div
        animate={{ left: `${heartPos[0]}%`, top: `${heartPos[1]}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        style={{ position: "absolute", zIndex: 30, transform: "translate(-50%, -50%)" }}
      >
        <motion.div
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          style={{ fontSize: 26, filter: "drop-shadow(0 2px 8px rgba(232,82,122,0.55))", lineHeight: 1 }}
        >
          ❤️
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Mobile: creative card-deal animation ─────────────────────────────────────

// Each card gets a subtle fixed tilt so the stack looks organic
const TILTS = [-2, 1.5, -1, 2.5, -1.8, 1, -2.2, 1.8];

function MobileLayout({ items, count, onActive, reveal }: { items: ScheduleItem[]; count: number; onActive: (id: number | null) => void; reveal: () => void }) {
  const currentItem  = items[count - 1];
  const lastCardRef  = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    lastCardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [count]);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => {
      const next = prev === id ? null : id;
      onActive(next);
      return next;
    });
  };

  const handleAreaClick = () => {
    if (count < items.length) reveal();
  };

  return (
    <div
      onClick={handleAreaClick}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "56px 20px 28px",
        overflow: "hidden",
        cursor: count < items.length ? "pointer" : "default",
      }}
    >
      {/* Heart counter at top */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          style={{ fontSize: 22 }}
        >
          ❤️
        </motion.span>
        <span style={{ color: "#a0627a", fontFamily: "Georgia, serif", fontSize: "0.8rem" }}>
          {count} / {items.length}
        </span>
      </div>

      {/* Scrollable stack */}
      <div style={{
        width: "100%", maxWidth: 340,
        display: "flex", flexDirection: "column",
        justifyContent: "space-evenly",
        overflowY: "auto", scrollbarWidth: "none",
        flex: 1,
        minHeight: 0,
      }}>
        {items.slice(0, count).map((item, i) => {
          const isLast  = i === count - 1;
          const tilt    = TILTS[i % TILTS.length];

          return (
            <motion.div
              key={item.id}
              ref={isLast ? lastCardRef : undefined}
              initial={{ opacity: 0, y: -120, rotate: tilt * 4, scale: 0.7 }}
              animate={{
                opacity: 1, y: 0,
                rotate: isLast || expandedId === item.id ? 0 : tilt,
                scale: isLast || expandedId === item.id ? 1 : 0.97,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22, opacity: { duration: 0.2 } }}
              onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}
              style={{
                background: isLast || expandedId === item.id ? "#ffffff" : "rgba(255,255,255,0.86)",
                border: `2px solid ${isLast || expandedId === item.id ? item.color + "80" : item.color + "20"}`,
                borderRadius: 20,
                padding: "13px 15px",
                boxShadow: isLast || expandedId === item.id
                  ? `0 10px 36px ${item.color}35, 0 2px 8px rgba(0,0,0,0.06)`
                  : "0 1px 5px rgba(232,82,122,0.07)",
                display: "flex", alignItems: "center", gap: 12,
                transformOrigin: "top center",
                cursor: "pointer",
                pointerEvents: "all",
              }}
            >
              {/* Emoji bubble */}
              <motion.div
                animate={isLast ? { scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `linear-gradient(135deg, ${item.bgColor}, white)`,
                  border: `1.5px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0,
                  boxShadow: isLast ? `0 4px 12px ${item.color}28` : "none",
                }}
              >
                {item.emoji}
              </motion.div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 1 }}>
                  <span style={{
                    background: item.color, color: "#fff",
                    borderRadius: 6, padding: "1px 7px",
                    fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "0.68rem",
                    flexShrink: 0,
                  }}>
                    {item.time}
                  </span>
                  <span style={{
                    color: "#3d1a24", fontFamily: "Georgia, serif", fontWeight: 700,
                    fontSize: "0.92rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {item.title}
                  </span>
                </div>
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.p
                      key="desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ color: "#a0627a", fontFamily: "Georgia, serif", fontSize: "0.73rem", margin: "4px 0 0", lineHeight: 1.5, overflow: "hidden" }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tap to reveal button — shown while cards are being revealed */}
      <AnimatePresence>
        {count < items.length && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={reveal}
            style={{
              flexShrink: 0,
              marginTop: 12,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              padding: "8px 20px",
              zIndex: 50,
            }}
          >
            <TapHint color={currentItem.color} />
            <span style={{ color: currentItem.color, fontFamily: "Georgia, serif", fontSize: "0.75rem", opacity: 0.85 }}>
              нажми чтобы открыть
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tap hint — shown when all cards revealed and nothing expanded yet */}
      <AnimatePresence>
        {count === items.length && expandedId === null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              flexShrink: 0, marginTop: 12,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              pointerEvents: "none", zIndex: 50,
            }}
          >
            <span style={{ color: currentItem.color, fontFamily: "Georgia, serif", fontSize: "0.7rem", opacity: 0.8 }}>
              нажми на карточку
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom glow */}
      <motion.div
        key={count}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "25%",
          background: `linear-gradient(to top, ${currentItem.bgColor}cc, transparent)`,
          pointerEvents: "none", zIndex: -1,
        }}
      />
    </div>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────

function IntroScreen({ title, subtitle, isMobile, onTap }: { title: string; subtitle: string; isMobile: boolean; onTap?: () => void }) {
  return (
    <div onClick={onTap} style={{
      position: "absolute", inset: 0, zIndex: 10,
      pointerEvents: isMobile ? "all" : "none",
      cursor: isMobile ? "pointer" : "default",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center", gap: 12, padding: "0 24px",
    }}>
      <motion.div animate={{ scale: [1, 1.22, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}
        style={{ fontSize: isMobile ? 48 : 64 }}>
        ❤️
      </motion.div>
      <h1 style={{ color: "#e8527a", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "clamp(1.4rem, 5vw, 2rem)", margin: 0 }}>
        {title}
      </h1>
      <p style={{ color: "#a0627a", fontFamily: "Georgia, serif", fontSize: "clamp(0.85rem, 3vw, 1rem)", margin: 0 }}>
        {isMobile ? "Нажми на экран — карточки появляются одна за одной" : subtitle}
      </p>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
        style={{ color: "#e8527a", fontSize: "1.5rem", marginTop: 8 }}>
        ↓
      </motion.div>
    </div>
  );
}

// ─── Tap hint animation ───────────────────────────────────────────────────────

function TapHint({ color }: { color: string }) {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
      {/* Ripple rings */}
      <motion.circle
        cx="18" cy="30" r="10"
        stroke={color} strokeWidth="1.5" fill="none"
        initial={{ scale: 0.6, opacity: 0.8 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "18px 30px" }}
      />
      <motion.circle
        cx="18" cy="30" r="10"
        stroke={color} strokeWidth="1.5" fill="none"
        initial={{ scale: 0.6, opacity: 0.8 }}
        animate={{ scale: 1.6, opacity: 0 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut", delay: 0.4 }}
        style={{ transformOrigin: "18px 30px" }}
      />
      {/* Finger */}
      <motion.g
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        {/* Fingertip */}
        <ellipse cx="18" cy="10" rx="5" ry="6" fill={color} opacity="0.9" />
        {/* Finger body */}
        <rect x="13" y="10" width="10" height="14" rx="4" fill={color} opacity="0.9" />
        {/* Knuckle lines */}
        <line x1="14.5" y1="16" x2="21.5" y2="16" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
        <line x1="14.5" y1="19" x2="21.5" y2="19" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      </motion.g>
    </svg>
  );
}
