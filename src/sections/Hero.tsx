import { ArrowRight, ChevronDown } from 'lucide-react'
import { company } from '../data/company'
import { heroPhotos } from '../data/photos'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-navy-950 pt-16">
      <div className="absolute inset-0">
        <img
          src={heroPhotos.switchgearHall}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-lines bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div
          className="max-w-3xl"
          style={{ animation: 'hero-in 0.7s ease-out both' }}
        >
          <p className="font-mono text-sm text-cyan-400 mb-5">
            Electrical Engineering &middot; Industrial Automation &middot; Philippines
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08]">
            {company.tagline}
          </h1>
          <p className="mt-6 text-lg text-steel-200 max-w-2xl">
            Engineering solutions for industrial, commercial, and infrastructure projects &mdash;
            from electrical installation and automation to control panel fabrication,
            commissioning, and maintenance.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-navy-950 hover:bg-cyan-400 transition-colors"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 px-6 py-3.5 text-sm font-semibold text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl border-t border-white/10 pt-8">
          {[
            'Electrical Installation',
            'Industrial Automation',
            'Control Panel Fabrication',
            'Testing & Commissioning',
          ].map((label) => (
            <div key={label}>
              <dt className="text-sm text-steel-300">{label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
      >
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </a>

      <style>{`
        @keyframes hero-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="hero-in"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
