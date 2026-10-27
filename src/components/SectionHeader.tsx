type SectionHeaderProps = {
  kicker?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {kicker && (
        <p
          className={`mb-3 font-mono text-sm tracking-tight ${
            light ? 'text-cyan-400' : 'text-cyan-600'
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-navy-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg ${light ? 'text-steel-200' : 'text-steel-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
