import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import type { ScheduleItem } from "./ScheduleData";
import { getEventColors } from "./getEventColors";

interface Props {
  items: ScheduleItem[];
  title?: string;
  subtitle?: string;
}

export function WeddingTimeline({
  items,
  title = "Свадебный день",
  subtitle = "История нашего вечера",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 20px",
        background: "linear-gradient(180deg, #FAF7F2 0%, #FFFFFF 100%)",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "2.4rem",
            margin: 0,
            color: "#3d1a24",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            marginTop: 10,
            fontFamily: "Georgia, serif",
            color: "#a0627a",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* WRAPPER */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          position: "relative",
          paddingLeft: 40,
        }}
      >
        {/* LINE BACKGROUND */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 0,
            bottom: 0,
            width: 2,
            background: "rgba(232,82,122,0.12)",
          }}
        />

        {/* PROGRESS LINE (Apple style) */}
        <motion.div
          style={{
            position: "absolute",
            left: 18,
            top: 0,
            width: 2,
            background: "linear-gradient(#e8527a, #c060a0)",
            transformOrigin: "top",
            scaleY: scrollYProgress,
          }}
        />

        {/* ITEMS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 90 }}>
          {items.map((item, i) => {
            const colors = getEventColors(item.type);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* DOT */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: colors.color,
                    marginTop: 6,
                    boxShadow: `0 0 0 8px rgba(192, 138, 122, 0.12)`,
                    zIndex: 2,
                  }}
                />

                {/* CARD */}
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 22,
                    padding: "20px 22px",
                    border: "1px solid rgba(192, 138, 122, 0.15)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                    maxWidth: 520,
                    width: "100%",
                    
                  }}
                >
                  {/* TIME */}
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      color: colors.color,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {item.time}
                  </div>

                  {/* TITLE */}
                  <div
                    style={{
                      marginTop: 6,
                      fontFamily: "Georgia, serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "#3d1a24",
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{item.emoji}</span>
                    {item.title}
                  </div>

                  {/* DESCRIPTION */}
                  <p
                    style={{
                      marginTop: 10,
                      fontFamily: "Georgia, serif",
                      fontSize: "0.95rem",
                      color: "#7a5a68",
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
      </div>
    </section>
  );
}