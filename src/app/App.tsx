import "../styles/fonts.css";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { WelcomeLetterSection } from "./components/WelcomeLetterSection";
import { VenueSection } from "./components/VenueSection";
import { RSVPSection } from "./components/RSVPFormSection";
import { Footer } from "./components/Footer";
import { WeddingTimeline } from "./components/NewHearthIdea";
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
             <WeddingTimeline items={SCHEDULE}/>
        <VenueSection />
        <RSVPSection />
      </main>
      <Footer />
    </div>
  );
}
