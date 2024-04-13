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

export type metaScore = {
  totalScore: number
  daysOffScore: number
  breaksScore: number
  startTimeScore: number
  endTimeScore: number
  scheduleLengthScore: number
}
export interface ScheduleMeta {
  id: number
  timings: {
    earliestTime: Date
    latestTime: Date
    earliestHour: number
    latestHour: number
    timeDiff: number
  }
  totalbreaks: number
  daysOff: Days[]
  score?: metaScore
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
  courseCode: string
}

export type ScheduleBase = {
  [key in Days]: SchedulePeriod[]
}

export interface ISchedule extends ScheduleBase {
  meta?: ScheduleMeta
  canAddCourseOptionToSchedule: (option: Course) => boolean
  addCourseOptionToSchedule: (option: Course) => ISchedule
  addOrUpdateMeta: () => void
  doesApplyFilters: (filters: Filters) => boolean
}

enum basePreference {
  None = 'None'
}
export enum TimePreference {
  None = basePreference.None,
  Earliest = 'Earliest',
  Latest = 'Latest'
}
export enum BreaksPreference {
  None = basePreference.None,
  Less = 'Less',
  More = 'More'
}
export enum DaysOffPreference {
  None = basePreference.None,
  More = 'More',
  Less = 'Less'
}
export enum ScheduleLengthPreference {
  None = basePreference.None,
  Shorter = 'Shorter',
  Longer = 'Longer'
}
export interface Preferences {
  breaks: BreaksPreference
  daysOff: DaysOffPreference
  startTimePreference: TimePreference
  endTimePreference: TimePreference
  scheduleLength: ScheduleLengthPreference
}

export type PreferencesImportanceValue = 1 | 2 | 3
export interface PreferencesImportance {
  breaks: PreferencesImportanceValue
  daysOff: PreferencesImportanceValue
  startTimePreference: PreferencesImportanceValue
  endTimePreference: PreferencesImportanceValue
  scheduleLength: PreferencesImportanceValue
}
