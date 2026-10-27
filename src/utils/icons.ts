import {
  PanelsTopLeft,
  Cpu,
  Cable,
  Workflow,
  ClipboardCheck,
  Wrench,
  ShieldCheck,
  Users,
  BadgeCheck,
  Clock,
  Lightbulb,
  HeartHandshake,
  Gem,
  Scale,
  type LucideIcon,
} from 'lucide-react'

export const serviceIcons: Record<string, LucideIcon> = {
  'control-panel-fabrication': PanelsTopLeft,
  'plc-programming': Cpu,
  'electrical-installation': Cable,
  'industrial-automation': Workflow,
  'testing-commissioning': ClipboardCheck,
  'electrical-maintenance': Wrench,
  'auxiliary-systems': ShieldCheck,
}

export const whyUsIcons: LucideIcon[] = [Users, BadgeCheck, ShieldCheck, Clock, Lightbulb, HeartHandshake]

export const coreValueIcons: LucideIcon[] = [Gem, Scale, ShieldCheck, Lightbulb, HeartHandshake, Users]
