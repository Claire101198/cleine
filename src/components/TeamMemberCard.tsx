import type { TeamMember } from '../data/company'

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="rounded-sm border border-steel-200 bg-white overflow-hidden">
      <div className="aspect-square overflow-hidden bg-steel-100">
        <img
          src={member.photo}
          alt={`Portrait of ${member.name}, ${member.role}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-base font-semibold text-navy-950">{member.name}</h3>
        <p className="mt-0.5 text-sm font-mono text-cyan-600">{member.role}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-steel-500">
          {member.responsibilities.map((r) => (
            <li key={r} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
