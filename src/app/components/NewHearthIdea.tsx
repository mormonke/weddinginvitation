import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { ScheduleItem } from "./ScheduleData";

interface Props {
  items: ScheduleItem[];
  title?: string;
  subtitle?: string;
}

const PRIMARY = "#395111";

export function WeddingTimeline({
  items,
  title = "Свадебный день",
  subtitle = "История нашего вечера",
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        padding: "120px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 100 }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 2.6rem)",
            color: "#1f2a14",
            margin: 0,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            marginTop: 10,
            fontFamily: "Georgia, serif",
            color: "rgba(57,81,17,0.75)",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* TIMELINE */}
      <div
        style={{
          position: "relative",
          maxWidth: 900,
          margin: "0 auto",
          padding: "40px 0",
        }}
      >
        {/* CENTER LINE */}
        <div
          style={{
            position: "absolute",
            left: isMobile ? "32px" : "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(57,81,17,0.25)",
            transform: isMobile ? "none" : "translateX(-50%)",
          }}
        />

        {items.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                justifyContent: isMobile
                  ? "center"
                  : isLeft
                  ? "flex-start"
                  : "flex-end",
                position: "relative",
                marginBottom: 70,
              }}
            >
              {/* DOT */}
              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "32px" : "50%",
                  top: 16,
                  transform: isMobile ? "none" : "translateX(-50%)",

                  width: isMobile ? 24 : 10,
                  height: isMobile ? 24 : 10,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: "50%",

                  background: isMobile
                    ? "rgba(57,81,17,0.08)"
                    : PRIMARY,

                  boxShadow: isMobile
                    ? "none"
                    : "0 0 0 6px rgba(57,81,17,0.12)",

                  flexShrink: 0,
                }}
              >
                {/* STAR */}
                {isMobile ? (
                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: 1,
                      color: PRIMARY,
                      fontWeight: 600,
                      display: "block",
                    }}
                  >
                    ✦
                  </span>
                ) : (
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{ display: "block" }}
                  >
                    <path d="M12 2l2.4 6.9L21 12l-6.6 3.1L12 22l-2.4-6.9L3 12l6.6-3.1L12 2z" />
                  </svg>
                )}
              </div>

              {/* CARD */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                style={{
                  width: isMobile ? "88%" : "42%",
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 18,
                  padding: "20px 22px",
                  border: "1px solid rgba(57,81,17,0.10)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  textAlign: isMobile ? "left" : isLeft ? "right" : "left",
                }}
              >
                {/* TIME */}
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    color: PRIMARY,
                    fontWeight: 600,
                  }}
                >
                  {item.time}
                </div>

                {/* TITLE */}
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                    fontWeight: 700,
                    color: "#1f2a14",
                  }}
                >
                  {item.title}
                </div>

                {/* DESCRIPTION */}
                <p
                  style={{
                    marginTop: 10,
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    color: "rgba(31,42,20,0.72)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}