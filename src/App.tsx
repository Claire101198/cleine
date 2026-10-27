import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileStickyCTA from './components/MobileStickyCTA'
import Hero from './sections/Hero'
import AboutSection from './sections/AboutSection'
import ServicesGrid from './sections/ServicesGrid'
import EngineeringCapabilities from './sections/EngineeringCapabilities'
import WhyChooseUs from './sections/WhyChooseUs'
import TeamSection from './sections/TeamSection'
import VisionMissionSection from './sections/VisionMissionSection'
import Certifications from './sections/Certifications'
import CTASection from './sections/CTASection'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesGrid />
        <EngineeringCapabilities />
        <WhyChooseUs />
        <TeamSection />
        <VisionMissionSection />
        <Certifications />
        <CTASection />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
