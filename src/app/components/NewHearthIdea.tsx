import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ScheduleItem {
  id: number;
  time: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
}

interface Props {
  items: ScheduleItem[];
  title?: string;
}

export function StoryTimeline({
  items,
  title = "Наш день",
}: Props) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  const next = () => {
    if (index < items.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (!current) return null;

  return (
    <div
      onClick={next}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(160deg, ${current.bgColor}, #fff)`,
        padding: 24,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      {/* Header */}
      <div style={{ position: "absolute", top: 20, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia, serif", color: "#a0627a" }}>
          {title}
        </div>

        {/* Progress */}
        <div style={{ marginTop: 8, display: "flex", gap: 6, justifyContent: "center" }}>
          {items.map((_, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 4,
                borderRadius: 999,
                background: i <= index ? current.color : "#e7d6dd",
              }}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          style={{
            maxWidth: 420,
            width: "100%",
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Emoji */}
          <div style={{ fontSize: 42, marginBottom: 12 }}>
            {current.emoji}
          </div>

          {/* Time */}
          <div
            style={{
              color: current.color,
              fontFamily: "Georgia, serif",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {current.time}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "Georgia, serif",
              margin: 0,
              fontSize: "1.4rem",
              color: "#3d1a24",
            }}
          >
            {current.title}
          </h2>

          {/* Description */}
          <p
            style={{
              marginTop: 12,
              color: "#7a5a68",
              fontFamily: "Georgia, serif",
              lineHeight: 1.5,
            }}
          >
            {current.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation hint */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          fontSize: 12,
          color: "#a0627a",
          fontFamily: "Georgia, serif",
          opacity: 0.8,
        }}
      >
        тап — дальше · свайп можно добавить позже
      </div>

      {/* Prev click zone (optional) */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "30%",
          height: "100%",
        }}
      />
    </div>
  );
}