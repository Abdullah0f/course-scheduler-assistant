// @ts-ignore
import { DAYS, MAX_GENERATED_SCHEDULES } from './constants'
import cloneDeep from 'lodash/cloneDeep'
import { Course, Filters, Period, ISchedule, SchedulePeriod, Section } from './interfaces'
import { Days, OpenStatus } from './enums'
import Schedule from '../classes/Schedule'

function isLocked(period: Course) {
  return period.open === OpenStatus.open
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
    currentSchedule.addOrUpdateMeta()
    if (currentSchedule.doesApplyFilters(filters)) {
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
      tempSchedule.canAddCourseOptionToSchedule(section)
    ) {
      tempSchedule = tempSchedule.addCourseOptionToSchedule(section)
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
  filters: Filters = { allowLocked: false, breaksLimit: 0, daysOff: 0, offInTheseDays: [] }
) {
  let coursesArray = Object.values(courses)
  if (sections) {
    coursesArray = minimizeSectionCourses(coursesArray, sections)
  }
  // sort courses by number of options
  coursesArray.sort((course1, course2) => course1.length - course2.length)
  return theAlgorithm(coursesArray, new Schedule(), 0, filters)
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
