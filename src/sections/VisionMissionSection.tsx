import { CheckCircle2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { vision, missionIntro, missionItems, coreValues } from '../data/company'
import { coreValueIcons } from '../utils/icons'

export default function VisionMissionSection() {
  return (
    <section id="vision-mission" className="bg-steel-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Vision, Mission & Core Values" title="What Drives Us" />

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <div className="rounded-sm bg-navy-950 p-8 sm:p-10 corner-marks text-white">
            <h3 className="font-mono text-xs tracking-tight text-cyan-400 mb-4">VISION</h3>
            <p className="text-xl sm:text-2xl font-display font-semibold leading-snug">
              {vision}
            </p>
          </div>

          <div className="rounded-sm border border-steel-200 bg-white p-8 sm:p-10">
            <h3 className="font-mono text-xs tracking-tight text-cyan-600 mb-2">OUR MISSION</h3>
            <p className="text-sm text-steel-500 mb-5">{missionIntro}</p>
            <ul className="space-y-3">
              {missionItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-950">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-xs tracking-tight text-cyan-600 mb-6">CORE VALUES</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => {
              const Icon = coreValueIcons[i]
              return (
                <div key={value.title} className="rounded-sm border border-steel-200 bg-white p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-950 text-cyan-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold text-navy-950">{value.title}</h4>
                  <p className="mt-2 text-sm text-steel-500">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
