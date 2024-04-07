// @ts-ignore
import { DAYS, MAX_GENERATED_SCHEDULES } from './constants'
import cloneDeep from 'lodash/cloneDeep'
// @ts-ignore
import { getTimings, getTotalBreaks, getDaysOff, getID } from '@/utils/scheduleHelpers'
import { Course, Filters, Period, ISchedule, SchedulePeriod, Section } from './interfaces'
import { Days, OpenStatus } from './enums'

function initializeBlankSchedule(): ISchedule {
  let schedule: Partial<ISchedule> = {}
  for (const day of Object.values(Days)) {
    schedule[day] = []
  }
  return schedule as ISchedule
}

function isLocked(period: Course) {
  return period.open === OpenStatus.open
}

// Translate day number to string representation
function dayToString(dayNumber: number) {
  return DAYS[dayNumber - 1] as Days
}
// Check if two periods have a time conflict
function hasConflict(period1: Period, period2: SchedulePeriod) {
  return (
    period1.startTime < period2.endTime.getTime() && period1.endTime > period2.startTime.getTime()
  )
}
function periodConflictsWithDaySchedule(period: Period, daySchedule: SchedulePeriod[]) {
  return daySchedule.some((scheduledPeriod) => hasConflict(period, scheduledPeriod))
}

function canAddCourseOptionToSchedule(option: Course, schedule: ISchedule): boolean {
  return option.periods.every((period) => {
    if (!period.days) return true
    const days = period.days.map(dayToString)
    return days.every((day) => !periodConflictsWithDaySchedule(period, schedule[day]))
  })
}
export function addCourseOptionToSchedule(option: Course, schedule: ISchedule) {
  for (const period of option.periods) {
    for (const dayNumber of period.days) {
      const day = dayToString(dayNumber)

      const schedulePeriod: SchedulePeriod = {
        title: option.name,
        startTime: new Date(period.startTime),
        endTime: new Date(period.endTime),
        location: period.location,
        classType: period.classType,
        instructor: period.instructor,
        classCode: option.classCode,
        isOpen: option.open
      }
      schedule[day].push(schedulePeriod)
      schedule[day].sort((a, b) => a.startTime.getTime() - b.startTime.getTime()) // sort lecture by start time
    }
  }
  return schedule
}

function addMetaToSchedule(schedule: ISchedule): void {
  schedule.meta = {
    id: getID(schedule),
    timings: getTimings(schedule),
    totalbreaks: getTotalBreaks(schedule),
    daysOff: getDaysOff(schedule)
  }
}
export function updateScheduleMeta(schedule: ISchedule) {
  schedule.meta = {
    id: schedule?.meta?.id || getID(schedule),
    timings: getTimings(schedule),
    totalbreaks: getTotalBreaks(schedule),
    daysOff: getDaysOff(schedule)
  }
}

function scheduleApplyFilters(schedule: ISchedule, filters: Filters) {
  const meta = schedule.meta
  if (!meta) return false
  const totalBreaksInHours = meta.totalbreaks / 60
  return (
    totalBreaksInHours <= filters.breaksLimit &&
    meta.daysOff.length >= filters.daysOff &&
    filters.offInTheseDays.every((day) => meta.daysOff.includes(day))
  )
}

// Generate all possible schedules
function theAlgorithm(
  courses: Course[][],
  currentSchedule: ISchedule,
  currentIndex: number,
  filters: Filters
): ISchedule[] {
  if (currentIndex === courses.length) {
    // here is the final stage that each complete schedule go through
    // meta data will be added here
    addMetaToSchedule(currentSchedule)
    if (scheduleApplyFilters(currentSchedule, filters)) {
      return [currentSchedule]
    }
    return []
  }

  let possibleSchedules: ISchedule[] = []
  const currentCourse = courses[currentIndex]

  for (const section of currentCourse) {
    // Iterate through each section of the current course
    let tempSchedule: ISchedule = cloneDeep(currentSchedule)

    if (
      (filters.allowLocked || !isLocked(section)) &&
      canAddCourseOptionToSchedule(section, tempSchedule)
    ) {
      tempSchedule = addCourseOptionToSchedule(section, tempSchedule)
      possibleSchedules = possibleSchedules.concat(
        theAlgorithm(courses, tempSchedule, currentIndex + 1, filters)
      )
      if (possibleSchedules.length >= MAX_GENERATED_SCHEDULES) {
        break
      }
    }
  }
  return possibleSchedules
}
function minimizeSectionCourses(coursesArray: Course[][], section: Section[]): Course[][] {
  for (const i of coursesArray) {
    for (const j of section) {
      const [, num, name] = j.code.split(' - ').map((str) => str.trim())
      if (i[0].code == name) {
        coursesArray = coursesArray.map((course) => {
          if (course[0].code == name) {
            return course.filter((section) => section.classCode == num)
          } else {
            return course
          }
        })
      }
    }
  }
  return coursesArray
}
export function generateSchedules(
  courses: Record<string, Course[]>,
  sections: Section[] | null,
  filters: Filters
) {
  let coursesArray = Object.values(courses)
  if (sections) {
    coursesArray = minimizeSectionCourses(coursesArray, sections)
  }
  // sort courses by number of options
  coursesArray.sort((course1, course2) => course1.length - course2.length)
  return theAlgorithm(coursesArray, initializeBlankSchedule(), 0, filters)
}

enum TimePreference {
  Earliest = 'Earliest',
  Latest = 'Latest'
}
enum BreaksPreference {
  Less = 'Less',
  More = 'More'
}
enum DaysOffPreference {
  More = 'More',
  Less = 'Less'
}
function calculatePreferenceScore(schedule: ISchedule, preferences: Preferences): number {
  let score = 0
  if (!schedule.meta) return score
  const { timings, totalbreaks, daysOff } = schedule.meta

  const scheduleStartHour = timings.earliestHour
  const scheduleEndHour = timings.earliestHour + timings.timeDiff

  score +=
    preferences.startTimePreference === TimePreference.Earliest
      ? 24 - scheduleStartHour
      : scheduleStartHour

  score +=
    preferences.endTimePreference === TimePreference.Earliest
      ? 24 - scheduleEndHour
      : scheduleEndHour

  score += preferences.breaks === BreaksPreference.Less ? -totalbreaks / 100 : totalbreaks / 100

  const daysActive = 5 - daysOff.length
  score += preferences.daysOff === DaysOffPreference.More ? daysOff.length : -daysActive

  preferences.preferredDays.forEach((day) => {
    if (schedule[day].length > 0) {
      score += 1
    }
  })

  preferences.unpreferredDays.forEach((day) => {
    if (schedule[day].length > 0) {
      score -= 1
    }
  })

  return score
}

interface Preferences {
  time: TimePreference
  breaks: BreaksPreference
  daysOff: DaysOffPreference
  preferredDays: Days[]
  unpreferredDays: Days[]
  startTimePreference: TimePreference
  endTimePreference: TimePreference
}
// export const PREFERENCES = {
//   time: 'Earliest|Latest',
//   breaks: 'Less|More',
//   daysOff: 'More|Less',
//   preferredDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//   unpreferredDays: ['Sat', 'Sun'],
//   startTimePreference: 'Earliest|Latest',
//   endTimePreference: 'Earliest|Latest'
// }
