export type ScheduleType =
  | "guest"
  | "ceremony"
  | "party"
  | "end";

export interface ScheduleItem {
  id: number;
  type: ScheduleType;
  time: string;
  title: string;
  description: string;
}

export const SCHEDULE: ScheduleItem[] = [
  {
    id: 0,
    type: "guest",
    time: "15:00",
    title: "Сбор гостей",
    description: "Рады видеть вас и начать вместе этот особенный вечер.",
  },
  {
    id: 1,
    type: "ceremony",
    time: "16:00",
    title: "Церемония бракосочетания",
    description: "Главный момент нашего дня, когда мы скажем друг другу “да”.",
  },
  {
    id: 2,
    type: "party",
    time: "17:00",
    title: "Банкет",
    description: "Продолжение праздника в атмосфере уюта, смеха и торжества.",
  },
  {
    id: 3,
    type: "end",
    time: "21:00 - 22:00",
    title: "Конец вечера",
    description: "Наш праздник завершается, но воспоминания останутся навсегда.",
  },
];