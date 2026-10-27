import { FileText } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { engineeringCapabilities, capabilityStages } from '../data/company'

export default function EngineeringCapabilities() {
  return (
    <section id="capabilities" className="bg-navy-950 py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-[0.15]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Engineering Capabilities"
          title="Engineering Capabilities"
          subtitle="Technical groundwork behind every panel we build and every system we install."
          light
        />

        <div className="mt-12 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {engineeringCapabilities.map((item) => (
              <div
                key={item}
                className="corner-marks flex items-center gap-2.5 rounded-sm border border-white/10 bg-white/[0.03] p-4 text-sm text-steel-100"
              >
                <FileText className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-xs tracking-tight text-cyan-400 mb-6">PROCESS</p>
            <ol className="relative">
              <div
                className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10"
                aria-hidden="true"
              />
              {capabilityStages.map((stage, i) => (
                <li key={stage} className="relative flex items-center gap-4 py-3">
                  <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-navy-950 font-mono text-xs text-cyan-400">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base text-steel-100">{stage}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
