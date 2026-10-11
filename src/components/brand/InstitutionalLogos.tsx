import logoCemede from '@/assets/logo-cemede.png'
import logoUnaChorotega from '@/assets/logo-una-chorotega.png'

type LogoSize = 'sm' | 'md' | 'lg'
type LogoTone = 'onDark' | 'onLight'

interface InstitutionalLogosProps {
  size?: LogoSize
  tone?: LogoTone
  framed?: boolean
}

const CEMEDE_SIZE: Record<LogoSize, string> = {
  sm: 'h-9 sm:h-10',
  md: 'h-10 sm:h-12',
  lg: 'h-14 sm:h-16',
}

const UNA_SIZE: Record<LogoSize, string> = {
  sm: 'h-6 max-w-[6.5rem] sm:max-w-[8.5rem]',
  md: 'h-8 max-w-[9rem] sm:h-9 sm:max-w-[13rem]',
  lg: 'h-10 max-w-[12rem] sm:h-12 sm:max-w-[16rem]',
}

/** Official CEMEDE and Universidad Nacional Chorotega marks. */
export function InstitutionalLogos({ size = 'md', tone = 'onDark', framed = false }: InstitutionalLogosProps) {
  const dividerClass = tone === 'onDark' ? 'bg-white/30' : 'bg-navy-900/15'
  const logos = (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <img src={logoCemede} alt="CEMEDE, Universidad Nacional" className={`${CEMEDE_SIZE[size]} w-auto shrink-0`} />
      <span className={`hidden h-8 w-px shrink-0 sm:block ${dividerClass}`} aria-hidden />
      <img
        src={logoUnaChorotega}
        alt="Universidad Nacional de Costa Rica, Sede Regional Chorotega"
        className={`${UNA_SIZE[size]} w-auto object-contain object-left`}
      />
    </div>
  )
  if (!framed) return logos
  return <div className="inline-flex rounded-2xl bg-white px-2.5 py-1.5 shadow-sm sm:px-3">{logos}</div>
}
