import type { Service } from '../data/company'
import { serviceIcons } from '../utils/icons'
import { servicePhotoByServiceId } from '../data/photos'

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.id]
  const photo = servicePhotoByServiceId[service.id]

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-steel-200 bg-white hover:border-cyan-500/50 transition-colors">
      <div className="relative h-40 overflow-hidden">
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-navy-950/40" />
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-sm bg-navy-950 text-cyan-400">
          {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-navy-950">{service.title}</h3>
        <p className="mt-2 text-sm text-steel-500">{service.summary}</p>
        {service.items.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-steel-500">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
