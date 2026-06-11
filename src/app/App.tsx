import "../styles/fonts.css";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { WelcomeLetterSection } from "./components/WelcomeLetterSection";
import { VenueSection } from "./components/VenueSection";
import { RSVPSection } from "./components/RSVPFormSection";
import { HeartSchedule } from "./components/HeartSchedule";
import { Footer } from "./components/Footer";
import { SCHEDULE } from "./components/ScheduleData";


export default function App() {
  return (
    <div
      className="min-h-screen bg-[#faf7f2] text-[#2c2416] overflow-x-hidden"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(201,168,124,0.3) transparent",
      }}
      
    >
      
      <Header />
      <main>
        <HeroSection />
        <WelcomeLetterSection />
        <HeartSchedule
         items={SCHEDULE}
          title="💕 Расписание дня"
          subtitle="Наш путь на вечер"
          />
        <VenueSection />
        <RSVPSection />
      </main>
      <Footer />
    </div>
  );
}
