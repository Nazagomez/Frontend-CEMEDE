import { LandingHeader } from '@/components/landing/LandingHeader'
import { LandingHero } from '@/components/landing/LandingHero'
import { PlayasSection } from '@/components/landing/PlayasSection'
import { CalculadoraCapacidad } from '@/components/landing/CalculadoraCapacidad'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingHeader />
      <LandingHero />
      <PlayasSection />
      <CalculadoraCapacidad />
      <FeaturesSection />
      <LandingFooter />
    </div>
  )
}