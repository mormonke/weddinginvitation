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
    <section id="schedule" style={{ padding: "120px 20px" }}>
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
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* MOBILE VERSION */}
      {isMobile && (
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(57,81,17,0.25)",
            }}
          />

          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 60,
                paddingLeft: 40,
                position: "relative",
              }}
            >
              {/* DOT */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: PRIMARY,
                  marginTop: 8,
                  flexShrink: 0,
                }}
              />

              {/* CARD */}
              <Card item={item} align="left" />
            </motion.div>
          ))}
        </div>
      )}

      {/* DESKTOP VERSION */}
      {!isMobile && (
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          {/* LINE */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(57,81,17,0.25)",
              transform: "translateX(-50%)",
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
                style={{
                  display: "flex",
                  marginBottom: 70,
                  alignItems: "center",
                }}
              >
                {/* LEFT */}
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 40,
                  }}
                >
                  {isLeft && <Card item={item} align="right" />}
                </div>

                {/* DOT */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: PRIMARY,
                  }}
                />

                {/* RIGHT */}
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: 40,
                  }}
                >
                  {!isLeft && <Card item={item} align="left" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* CARD */
function Card({
  item,
  align,
}: {
  item: ScheduleItem;
  align: "left" | "right";
}) {
  return (
    <div
      style={{
        maxWidth: 320,
        width: "100%",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(10px)",
        borderRadius: 18,
        padding: 20,
        border: "1px solid rgba(57,81,17,0.10)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        textAlign: align === "right" ? "right" : "left",
      }}
    >
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "0.9rem",
          color: PRIMARY,
          fontWeight: 600,
        }}
      >
        {item.time}
      </div>

      <div
        style={{
          marginTop: 6,
          fontFamily: "Georgia, serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#1f2a14",
        }}
      >
        {item.title}
      </div>

      <p
        style={{
          marginTop: 10,
          fontFamily: "Georgia, serif",
          fontSize: "0.9rem",
          color: "rgba(31,42,20,0.72)",
          lineHeight: 1.6,
        }}
      >
        {item.description}
      </p>
    </div>
  );
}