import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { navItems, contact } from '../data/company'
import logo from '../assets/logo/blink-logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the viewport is resized back to desktop width
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled || open ? 'bg-navy-950/95 backdrop-blur shadow-lg shadow-navy-950/20' : 'bg-navy-950/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-2 shrink-0" aria-label="BPAC Industrial Control Service home">
            <img src={logo} alt="BLINK Power & Control logo" className="h-7 w-auto" />
            <span className="hidden sm:block font-display font-semibold text-white text-sm leading-tight">
              BPAC INDUSTRIAL
              <br />
              CONTROL SERVICE
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-steel-200 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-1.5 text-sm text-steel-200 hover:text-cyan-400 transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {contact.phoneDisplay}
            </a>
            <a
              href="#contact"
              className="rounded-sm bg-cyan-500 px-4 py-2 text-sm font-semibold text-navy-950 hover:bg-cyan-400 transition-colors"
            >
              Request a Quote
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 text-steel-100"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden border-t border-white/10 bg-navy-950 px-4 pb-6 pt-2"
        >
          <ul className="flex flex-col divide-y divide-white/5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-steel-100 hover:text-cyan-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-sm bg-cyan-500 px-4 py-3 text-center text-sm font-semibold text-navy-950"
          >
            Request a Quote
          </a>
          <a
            href={contact.phoneHref}
            className="mt-3 flex items-center justify-center gap-1.5 text-sm text-steel-300"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  )
}
