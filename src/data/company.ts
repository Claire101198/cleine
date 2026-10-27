// Structured company data — the single source of truth for site copy.
// Update this file to change contact details, services, team, etc.
// throughout the whole site.

export const company = {
  name: 'BPAC Industrial Control Service',
  brandMark: 'BLINK Power & Control',
  tagline: 'Reliable Electrical and Automation Solutions',
  secondaryTagline: 'Engineering Solutions You Can Trust',
  description:
    'BPAC Industrial Control Service is a Philippine-based engineering company specializing in electrical installation, industrial automation, control panel fabrication, PLC programming, testing and commissioning, and electrical maintenance.',
}

export const contact = {
  phone: '09977347428',
  phoneDisplay: '0997 734 7428',
  phoneHref: 'tel:+639977347428',
  email: 'almazanjamesmark0@gmail.com',
  emailSecondary: 'james.bpacics.com@gmail.com',
  address: {
    line: 'Lumbang na Matanda',
    city: 'Calaca City',
    province: 'Batangas',
    zip: '4212',
    country: 'Philippines',
  },
  facebookPageName: 'Blink Power & Control',
}

export type NavItem = { label: string; href: string }

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Team', href: '#team' },
  { label: 'Vision & Mission', href: '#vision-mission' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const lifecycle = [
  'Planning',
  'Design',
  'Installation',
  'Testing',
  'Commissioning',
  'Maintenance',
]

export type Service = {
  id: string
  title: string
  summary: string
  items: string[]
}

export const services: Service[] = [
  {
    id: 'control-panel-fabrication',
    title: 'Control Panel Fabrication',
    summary:
      'Custom-built panels engineered and assembled to match the load, layout, and standards each project calls for.',
    items: ['PLC Panels', 'MCC Panels', 'Distribution Panels', 'VFD Panels'],
  },
  {
    id: 'plc-programming',
    title: 'PLC Programming',
    summary:
      'Programmable logic controller programming and industrial control implementation for automated processes and machinery.',
    items: [],
  },
  {
    id: 'electrical-installation',
    title: 'Electrical Installation',
    summary: 'End-to-end electrical installation for industrial, commercial, and infrastructure sites.',
    items: [
      'Industrial Electrical Installation',
      'Power Distribution Systems',
      'Cable Tray Installation',
      'Conduit Installation',
      'Equipment Installation',
      'Lightning Systems',
    ],
  },
  {
    id: 'industrial-automation',
    title: 'Industrial Automation',
    summary: 'Automation solutions that improve operational efficiency across processes and machines.',
    items: ['HMI Development', 'Process Automation', 'Machine Automation'],
  },
  {
    id: 'testing-commissioning',
    title: 'Testing & Commissioning',
    summary: 'Thorough testing and commissioning to verify systems perform safely and as designed.',
    items: ['Functional Testing', 'Loop Checking', 'I/O Testing', 'Equipment Commissioning', 'Troubleshooting'],
  },
  {
    id: 'electrical-maintenance',
    title: 'Electrical Maintenance',
    summary: 'Preventive and corrective maintenance programs that keep operations reliable.',
    items: [
      'Preventive Maintenance',
      'Corrective Maintenance',
      'Shutdown Maintenance',
      'Emergency Troubleshooting',
      'Technical Support',
    ],
  },
  {
    id: 'auxiliary-systems',
    title: 'Auxiliary Systems',
    summary: 'Supporting systems that round out a facility\u2019s safety and communication infrastructure.',
    items: [
      'CCTV Surveillance Systems',
      'Fire Alarm Systems (FDAS)',
      'Data and Communication',
      'Hardware and Software Systems',
    ],
  },
]

export const engineeringCapabilities = [
  'Electrical Design',
  'Single Line Diagrams',
  'Load Schedule',
  'Short Circuit Analysis',
  'Voltage Drop Analysis',
  'Panel Layout Design',
  'As-Built Drawings',
]

export const capabilityStages = [
  'Design',
  'Engineering Analysis',
  'Documentation',
  'Installation',
  'Testing',
  'Commissioning',
]

export type WhyUsItem = { title: string; description: string }

export const whyUs: WhyUsItem[] = [
  {
    title: 'Experienced Engineering Team',
    description:
      'Qualified professionals with expertise in electrical installation, industrial automation, PLC programming, and control systems.',
  },
  {
    title: 'Quality Workmanship',
    description:
      'Every project is executed with attention to detail while following applicable engineering standards and industry best practices.',
  },
  {
    title: 'Safety First',
    description:
      'We prioritize workplace safety by implementing safe work practices and complying with occupational safety requirements.',
  },
  {
    title: 'On-Time Project Delivery',
    description:
      'We understand the importance of project schedules and work to complete projects efficiently without compromising quality.',
  },
  {
    title: 'Innovative Solutions',
    description:
      'We provide practical and cost-effective engineering and automation solutions tailored to our clients\u2019 operational needs.',
  },
  {
    title: 'Customer-Focused Service',
    description:
      'We value long-term partnerships by providing responsive communication, dependable support, and professional service throughout every project.',
  },
]

export const vision =
  'To be a trusted leader in electrical engineering, industrial automation, and control system solutions, delivering innovative, reliable, and safe services that contribute to the growth and success of our clients and the industries we serve.'

export const missionIntro = 'At BPAC Industrial Control Service, we are committed to:'

export const missionItems = [
  'Delivering high-quality electrical engineering and industrial automation solutions.',
  'Providing safe, efficient, and cost-effective services that meet industry standards.',
  'Building long-term partnerships through integrity, professionalism, and customer satisfaction.',
  'Continuously improving our technical expertise and embracing innovation to meet evolving industry needs.',
  'Contributing to the success of our clients by delivering dependable engineering solutions with excellence.',
]

export type CoreValue = { title: string; description: string }

export const coreValues: CoreValue[] = [
  {
    title: 'Quality',
    description: 'We strive for excellence in every project through skilled workmanship and attention to detail.',
  },
  {
    title: 'Integrity',
    description: 'We conduct our business with honesty, transparency, and accountability.',
  },
  {
    title: 'Safety',
    description: 'We prioritize the health and safety of our employees, clients, and the communities we serve.',
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and engineering practices to deliver effective and sustainable solutions.',
  },
  {
    title: 'Customer Commitment',
    description: 'We are dedicated to understanding our clients\u2019 needs and providing reliable service that exceeds expectations.',
  },
  {
    title: 'Teamwork',
    description: 'We believe that collaboration, respect, and continuous learning drive our success.',
  },
]

export type TeamMember = {
  id: string
  name: string
  role: string
  responsibilities: string[]
  photo: string
}

export const teamIntro =
  'At BPAC Industrial Control Service, our team is our greatest strength. We are composed of skilled and dedicated professionals who work together with passion, integrity, and commitment to deliver quality solutions.'

export const certificationStatement =
  'BPAC Industrial Control Service is a duly registered business committed to delivering safe, reliable, and professional engineering solutions in compliance with Philippine laws and industry standards.'

export type Certification = { title: string; image: string; alt: string }

export type ServiceRequired =
  | 'Electrical Installation'
  | 'Industrial Automation'
  | 'Control Panel Fabrication'
  | 'PLC Programming'
  | 'Testing & Commissioning'
  | 'Electrical Maintenance'
  | 'Engineering Design'
  | 'Auxiliary Systems'
  | 'Other'

export const serviceOptions: ServiceRequired[] = [
  'Electrical Installation',
  'Industrial Automation',
  'Control Panel Fabrication',
  'PLC Programming',
  'Testing & Commissioning',
  'Electrical Maintenance',
  'Engineering Design',
  'Auxiliary Systems',
  'Other',
]

export const preferredContactMethods = ['Phone Call', 'Email', 'Either'] as const
