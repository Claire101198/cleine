import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/company'

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-steel-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Our Services"
          title="Engineering Solutions You Can Trust"
          subtitle="From panel fabrication to plant-wide automation, every service is delivered by the same team &mdash; from planning through maintenance."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
