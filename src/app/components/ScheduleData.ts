import type { ScheduleItem } from "./HeartSchedule";

export const SCHEDULE: ScheduleItem[] = [
  { id: 0, time: "15:00", title: "Сбор гостей",  description: "Рады видеть вас и начать вместе этот особенный вечер. ", emoji: "🎉", color: "#c97c3a", bgColor: "#fff3e0" },
  { id: 1, time: "16:00", title: "Церемония бракосочетания",        description: "Главный момент нашего дня, когда мы скажем друг другу “да”.",        emoji: "🤍", color: "#5b7fa6", bgColor: "#e8f0fb" },
  { id: 2, time: "17:00", title: "Банкет",           description: "Продолжение праздника в атмосфере уюта, смеха и торжества.",         emoji: "🥂", color: "#e07c3a", bgColor: "#fff0e6" },
  { id: 3, time: "21:00 - 22:00", title: "Конец",       description: "Наш праздник завершается, но воспоминания останутся навсегда.",          emoji: "🌙", color: "#c060a0", bgColor: "#fce8f5" },
];