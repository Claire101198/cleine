import SectionHeader from '../components/SectionHeader'
import { company, lifecycle } from '../data/company'

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="About BPAC" title={`About ${company.name}`} />

        <div className="mt-8 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-5 text-steel-500 text-base sm:text-lg leading-relaxed">
            <p>
              {company.name} is a Philippine-based engineering company specializing in electrical
              installation, industrial automation, control panel fabrication, PLC programming,
              testing and commissioning, and electrical maintenance.
            </p>
            <p>
              We provide reliable, safe, and cost-effective engineering solutions for industrial,
              commercial, and infrastructure projects, helping clients improve operational
              efficiency through quality workmanship, technical expertise, and innovative
              automation solutions.
            </p>
            <p>
              Our services cover the complete project lifecycle &mdash; from project planning and
              engineering design through installation, testing, commissioning, and maintenance.
            </p>
          </div>

          <div className="rounded-sm border border-steel-200 bg-steel-50 p-6 corner-marks text-navy-950">
            <p className="font-mono text-xs tracking-tight text-cyan-600 mb-3">WHAT WE STAND FOR</p>
            <ul className="space-y-3 text-sm text-steel-500">
              <li>&middot; Reliability and safety in every deployment</li>
              <li>&middot; Technical expertise across electrical &amp; automation disciplines</li>
              <li>&middot; Quality workmanship on every panel and installation</li>
              <li>&middot; Cost-effective, innovative engineering solutions</li>
            </ul>
          </div>
        </div>

        {/* Project lifecycle &mdash; a genuine sequence, so it earns numbered steps */}
        <div className="mt-20">
          <p className="font-mono text-xs tracking-tight text-cyan-600 mb-6">PROJECT LIFECYCLE</p>
          <ol className="relative grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            <div
              className="hidden lg:block absolute top-5 left-[8.5%] right-[8.5%] h-px bg-steel-200"
              aria-hidden="true"
            />
            {lifecycle.map((stage, i) => (
              <li key={stage} className="relative flex flex-col items-start">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-cyan-400 font-mono text-sm z-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-3 text-sm font-semibold text-navy-950">{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
