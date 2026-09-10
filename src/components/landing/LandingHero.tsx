import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, CircleCheck, Leaf } from 'lucide-react'
import heroPlaya from '@/assets/hero-playa.jpeg'

const overlayHero = 'linear-gradient(160deg, rgba(0,19,31,0.55) 0%, rgba(0,35,65,0.35) 45%, rgba(22,69,110,0.3) 100%)'
const sombraTexto = '0 2px 20px rgba(0,0,0,0.55)'

function irAPlayas() {
  document.getElementById('playas')?.scrollIntoView({ behavior: 'smooth' })
}

export function LandingHero() {
  return (
    <section className="relative isolate flex min-h-[94vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center sm:px-6">
      <div className="hero-zoom absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroPlaya})` }} />
      <div className="absolute inset-0" style={{ backgroundImage: overlayHero }} />

      <div className="hero-fade-up relative flex flex-col items-center">
        <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white" style={{ textShadow: sombraTexto }}>
          CEMEDE · Universidad Nacional de Costa Rica
        </span>

        <h1 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl" style={{ textShadow: sombraTexto }}>
          Visitar la costa también es aprender a cuidarla
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white sm:text-base" style={{ textShadow: sombraTexto }}>
          Conocé cuánta gente puede recibir una playa hoy, sin comprometer sus ecosistemas ni la experiencia de quienes la visitan.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/visitante"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl sm:w-auto"
          >
            Continuar como visitante
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={irAPlayas}
            className="w-full rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
          >
            Explorar playas
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={irAPlayas}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-xs font-medium text-white/80 transition-colors hover:text-white"
      >Conocé el sistema
        <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden />
      </button>

      <svg className="absolute -bottom-px left-0 w-full text-slate-50" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,64 C240,110 480,10 720,40 C960,70 1200,110 1440,56 L1440,100 L0,100 Z" />
      </svg>
    </section>
  )
}