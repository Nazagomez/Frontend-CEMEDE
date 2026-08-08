import { LandingHeader } from '@/components/landing/LandingHeader'
import { LandingHero } from '@/components/landing/LandingHero'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { PlayasSection } from '@/components/landing/PlayasSection'
import { LandingFooter } from '@/components/landing/LandingFooter'

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <LandingHeader />
      <LandingHero />
      <FeaturesSection />
      <PlayasSection />
      <LandingFooter />
    </div>
  )
}