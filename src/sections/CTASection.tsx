import { Phone, Mail } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { contact } from '../data/company'

export default function CTASection() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <p className="font-mono text-sm text-cyan-600 mb-3">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
              Let&rsquo;s Build Reliable Engineering Solutions Together
            </h2>
            <p className="mt-4 text-steel-500">
              Have an electrical, automation, control panel, or industrial engineering
              requirement? Get in touch with {`BPAC Industrial Control Service`}.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 text-navy-950 hover:text-cyan-600 transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy-950 text-cyan-400">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-semibold">{contact.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-navy-950 hover:text-cyan-600 transition-colors break-all"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-950 text-cyan-400">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-semibold">{contact.email}</span>
              </a>
            </div>

            <div className="mt-8 rounded-sm border border-steel-200 bg-steel-50 p-5 text-sm text-steel-500">
              <p className="font-medium text-navy-950">
                {contact.address.line}, {contact.address.city}, {contact.address.province}{' '}
                {contact.address.zip}, {contact.address.country}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-sm border border-steel-200 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
