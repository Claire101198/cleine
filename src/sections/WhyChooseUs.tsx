import SectionHeader from '../components/SectionHeader'
import { whyUs } from '../data/company'
import { whyUsIcons } from '../utils/icons'

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Why Choose Us"
          title="Why Choose BPAC Industrial Control Service?"
          subtitle="Your trusted partner for reliable electrical and automation solutions."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = whyUsIcons[i]
            return (
              <div
                key={item.title}
                className="rounded-sm border border-steel-200 p-6 hover:border-cyan-500/50 transition-colors"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy-950 text-cyan-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm text-steel-500">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
