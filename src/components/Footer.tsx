import { Phone, Mail, Facebook } from 'lucide-react'
import { company, contact, navItems } from '../data/company'
import logo from '../assets/logo/blink-logo.png'

const footerServices = [
  'Electrical Engineering',
  'Industrial Automation',
  'Control Panel Fabrication',
  'PLC Programming',
  'Testing & Commissioning',
  'Electrical Maintenance',
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-steel-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="BLINK Power & Control logo" className="h-7 w-auto" />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">{company.name}</p>
            <p className="mt-1 text-sm text-steel-400">{company.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Navigate</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {footerServices.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2 hover:text-cyan-400 transition-colors break-all"
                >
                  <Mail className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-4 w-4 shrink-0" aria-hidden="true" />
                {contact.facebookPageName}
              </li>
              <li className="text-steel-400">
                {contact.address.line}, {contact.address.city}, {contact.address.province}{' '}
                {contact.address.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 trace-divider" aria-hidden="true" />

        <p className="mt-6 text-xs text-steel-500">
          &copy; 2026 {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
