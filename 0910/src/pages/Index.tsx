import ProfileCard from "@/components/ProfileCard";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ProfileCard />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default Index;