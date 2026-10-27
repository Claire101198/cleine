import SectionHeader from '../components/SectionHeader'
import TeamMemberCard from '../components/TeamMemberCard'
import { team } from '../data/team'
import { teamIntro } from '../data/company'

export default function TeamSection() {
  return (
    <section id="team" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader kicker="Our Team" title="Skilled and Dedicated Professionals" subtitle={teamIntro} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
