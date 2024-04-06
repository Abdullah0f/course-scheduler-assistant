import { Days, OpenStatus } from './enums'

export interface Period {
  days: number[]
  time: string
  startTime: number
  endTime: number
  location: string
  classType: string
  instructor: string
}

export interface Course {
  code: string
  name: string
  classCode: string | undefined
  type: string | undefined
  hours: string | undefined
  open: OpenStatus | undefined
  instructor: string | undefined
  periods: Period[]
  exam: string | undefined
}

export interface Filters {
  allowLocked: boolean
  breaksLimit: number
  daysOff: number
  offInTheseDays: Days[]
}

export interface Section {
  code: string
  label: string
}

export interface ScheduleMeta {
  id: number
  timings: {
    earliestTime: Date
    latestTime: Date
    earliestHour: number
    timeDiff: number
  }
  totalbreaks: number
  daysOff: Days[]
}

export interface SchedulePeriod {
  title: string
  startTime: Date
  endTime: Date
  location: string
  classType: string
  instructor: string
  classCode: string | undefined
  isOpen: OpenStatus | undefined
}

export type ScheduleBase = {
  [key in Days]: SchedulePeriod[]
}

export interface Schedule extends ScheduleBase {
  meta?: ScheduleMeta
}
