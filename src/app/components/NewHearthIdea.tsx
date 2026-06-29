import { motion } from "motion/react";
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
            fontSize: "2.6rem",
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
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: `rgba(57,81,17,0.25)`,
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
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                position: "relative",
                marginBottom: 70,
              }}
            >
              {/* DOT */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 18,
                  transform: "translateX(-50%)",
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: PRIMARY,
                  boxShadow: "0 0 0 6px rgba(57,81,17,0.12)",
                }}
              />

              {/* CARD */}
              <motion.div
                whileHover={{ scale: 1.015 }}
                style={{
                  width: "42%",
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 18,
                  padding: "20px 22px",
                  border: "1px solid rgba(57,81,17,0.10)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  textAlign: isLeft ? "right" : "left",
                }}
              >
                {/* TIME */}
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.85rem",
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
                    fontSize: "1.15rem",
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
                    fontSize: "0.9rem",
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