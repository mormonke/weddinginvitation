import type { ScheduleType } from "./ScheduleData";

export function getEventColors(type: ScheduleType) {
  switch (type) {
    case "guest":
      return {
        color: "#C08A7A",   // warm rose
        bg: "#FFF6F2",      // milk blush
      };

    case "ceremony":
      return {
        color: "#8C7AA6",   // muted lavender
        bg: "#F6F3FB",      // soft violet mist
      };

    case "party":
      return {
        color: "#B58B6A",   // champagne gold
        bg: "#FFF8EF",      // warm cream
      };

    case "end":
      return {
        color: "#6F6A7A",   // dusk gray
        bg: "#F4F2F6",      // soft fog
      };

    default:
      return {
        color: "#C08A7A",
        bg: "#FFF6F2",
      };
  }
}