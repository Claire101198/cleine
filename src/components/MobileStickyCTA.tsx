import { useEffect, useState } from 'react'
import { Phone, FileText } from 'lucide-react'
import { contact } from '../data/company'

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-white/10 bg-navy-950/95 backdrop-blur">
      <a
        href={contact.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-steel-100 border-r border-white/10"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call Now
      </a>
      <a
        href="#contact"
        className="flex flex-1 items-center justify-center gap-2 bg-cyan-500 py-3.5 text-sm font-semibold text-navy-950"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Request a Quote
      </a>
    </div>
  )
}
