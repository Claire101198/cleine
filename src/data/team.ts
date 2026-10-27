import type { TeamMember } from './company'
import jamesPhoto from '../assets/team/james-mark-almazan.jpg'
import amateroPhoto from '../assets/team/amatero-pete-ricablanca.jpg'
import elyPhoto from '../assets/team/ely-biabado.jpg'
import marvinPhoto from '../assets/team/marvin-del-rosario.jpg'

export const team: TeamMember[] = [
  {
    id: 'james-mark-almazan',
    name: 'James Mark Almazan',
    role: 'Founder & Managing Director',
    responsibilities: [
      'Leads the company\u2019s overall strategy, operations, and business development.',
      'Ensures the delivery of reliable and innovative solutions that meet client expectations.',
    ],
    photo: jamesPhoto,
  },
  {
    id: 'amatero-pete-ricablanca',
    name: 'Amatero Pete Ricablanca',
    role: 'PEE / Automation Engineer',
    responsibilities: [
      'Responsible for system design, calculations, drawings, and technical documentation.',
      'Specialized in PLC and HMI programming and industrial automation solutions.',
    ],
    photo: amateroPhoto,
  },
  {
    id: 'ely-biabado',
    name: 'Ely Biabado',
    role: 'Team Lead / Senior Electrician',
    responsibilities: [
      'Leads field execution and supervises installation activities.',
      '21 years of experience in electrical works.',
      'Welding and industrial electrical works.',
    ],
    photo: elyPhoto,
  },
  {
    id: 'marvin-del-rosario',
    name: 'Marvin Del Rosario',
    role: 'Control Technician',
    responsibilities: [
      'PLC control wiring and installation.',
      'Field wiring and cable termination.',
      'Instrument installation.',
      'Electrical troubleshooting.',
      'Testing and commissioning support.',
    ],
    photo: marvinPhoto,
  },
]
