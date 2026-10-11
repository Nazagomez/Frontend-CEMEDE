import { LandingHeader } from '@/components/landing/LandingHeader'
import { LandingHero } from '@/components/landing/LandingHero'
import { HistoriaSection } from '@/components/landing/HistoriaSection'
import { PlayasSection } from '@/components/landing/PlayasSection'
import { CalculadoraCapacidad } from '@/components/landing/CalculadoraCapacidad'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { LandingFooter } from '@/components/landing/LandingFooter'
import heroCosta from '@/assets/hero-costa.jpg'

const HERO_VIDEO = '/hero-pacifico.m4v'

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#062833]" aria-hidden>
        <img src={heroCosta} alt="" className="hero-still absolute inset-0 h-full w-full object-cover object-[center_40%]" />
        <video className="hero-video absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={heroCosta}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#062833]/25 via-[#062833]/40 to-[#062833]/48" />
      </div>
      <LandingHeader />
      <LandingHero />
      <HistoriaSection />
      <PlayasSection />
      <CalculadoraCapacidad />
      <FeaturesSection />
      <LandingFooter />
    </div>
  )
}