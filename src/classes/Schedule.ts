import {
  ISchedule,
  SchedulePeriod,
  ScheduleMeta,
  Period,
  Course,
  Filters
} from 'src/utils/interfaces'
import { Days } from '../utils/enums'
import { DAYS } from './../utils/constants'
// @ts-ignore
import { getTimings, getTotalBreaks, getDaysOff } from '@/utils/scheduleHelpers'

export default class Schedule implements ISchedule {
  [Days.Monday]: SchedulePeriod[];
  [Days.Tuesday]: SchedulePeriod[];
  [Days.Wednesday]: SchedulePeriod[];
  [Days.Thursday]: SchedulePeriod[];
  [Days.Sunday]: SchedulePeriod[]
  meta?: ScheduleMeta

  constructor() {
    this[Days.Monday] = []
    this[Days.Tuesday] = []
    this[Days.Wednesday] = []
    this[Days.Thursday] = []
    this[Days.Sunday] = []
  }

  private hasConflict(period1: Period, period2: SchedulePeriod): boolean {
    return (
      period1.startTime < period2.endTime.getTime() && period1.endTime > period2.startTime.getTime()
    )
  }
  private periodConflictsWithDaySchedule(period: Period, daySchedule: SchedulePeriod[]): boolean {
    return daySchedule.some((scheduledPeriod) => this.hasConflict(period, scheduledPeriod))
  }
  private dayToString(dayNumber: number): Days {
    return DAYS[dayNumber - 1] as Days
  }
  canAddCourseOptionToSchedule(option: Course): boolean {
    return option.periods.every((period) => {
      if (!period.days) return true
      const days = period.days.map(this.dayToString)
      return days.every((day) => !this.periodConflictsWithDaySchedule(period, this[day]))
    })
  }
  addCourseOptionToSchedule(option: Course) {
    for (const period of option.periods) {
      for (const dayNumber of period.days) {
        const day = this.dayToString(dayNumber)

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
        this[day].push(schedulePeriod)
        this[day].sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      }
    }
    return this
  }
  addOrUpdateMeta(): void {
    this.meta = {
      id: this?.meta?.id || this.generateID(),
      timings: getTimings(this),
      totalbreaks: getTotalBreaks(this),
      daysOff: getDaysOff(this)
    }
  }
  doesApplyFilters(filters: Filters) {
    const meta = this.meta
    if (!meta) return false
    const totalBreaksInHours = meta.totalbreaks / 60
    return (
      totalBreaksInHours <= filters.breaksLimit &&
      meta.daysOff.length >= filters.daysOff &&
      filters.offInTheseDays.every((day) => meta.daysOff.includes(day))
    )
  }
  deleteSection(classCode: string) {
    Object.values(Days).forEach((day) => {
      this[day] = this[day].filter((section: SchedulePeriod) => section.classCode !== classCode)
    })
  }
  // function deleteSectionFromSchedule(classCode, schedule) {
  //   Object.keys(schedule).forEach((day) => {
  //     if (Array.isArray(schedule[day])) {
  //       schedule[day] = schedule[day].filter((section) => section.classCode !== classCode)
  //     }
  //   })
  //   return schedule
  // }
  private generateID(): number {
    let totalClassCodeSumAndtime = 0
    Object.values(Days).forEach((day) => {
      if (this[day].length > 0) {
        this[day].forEach((course) => {
          totalClassCodeSumAndtime += parseInt((course.classCode || '') + course.startTime, 10)
          totalClassCodeSumAndtime += course.startTime.getTime() + course.endTime.getTime()
        })
      }
    })
    return totalClassCodeSumAndtime
  }
}
