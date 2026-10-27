import { FileCheck2 } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { certifications, additionalTrainingCertificate } from '../data/certifications'
import { certificationStatement } from '../data/company'

export default function Certifications() {
  return (
    <section id="certifications" className="bg-steel-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Credentials"
          title="Company Licenses, Certifications & Registrations"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <figure
              key={cert.title}
              className="corner-marks rounded-sm border border-steel-200 bg-white p-4 text-navy-950"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-steel-100">
                <img src={cert.image} alt={cert.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-3 flex items-start gap-2 text-sm font-medium">
                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
                {cert.title}
              </figcaption>
            </figure>
          ))}

          <figure className="corner-marks rounded-sm border border-steel-200 bg-white p-4 text-navy-950">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-steel-100">
              <img
                src={additionalTrainingCertificate}
                alt="Additional training certificate of completion"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-start gap-2 text-sm font-medium">
              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" aria-hidden="true" />
              Training Certificate
            </figcaption>
          </figure>
        </div>

        <p className="mt-10 max-w-3xl text-sm text-steel-500 border-t border-steel-200 pt-8">
          {certificationStatement}
        </p>
      </div>
    </section>
  )
}
