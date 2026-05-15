import { HeroSection } from './HeroSection'
import { AboutSection } from './AboutSection'
import { ServicesSection } from './ServicesSection'
import { TikTokSection } from './TikTokSection'
import { ExperienceSection } from './ExperienceSection'
import { FAQSection } from './FAQSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TikTokSection />
      <ExperienceSection />
      <FAQSection />
    </main>
  )
}
