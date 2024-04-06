import { DAYS, MAX_GENERATED_SCHEDULES } from './constants'
import cloneDeep from 'lodash/cloneDeep'
import { getTimings, getTotalBreaks, getDaysOff, getID } from '@/utils/scheduleHelpers'

export function initializeBlankSchedule() {
  let schedule = {}
  for (const day of DAYS) {
    schedule[day] = []
  }
  return schedule
}

function isLocked(section) {
  return section.open == 'مغلقة'
}

// Translate day number to string representation
function dayToString(dayNumber) {
  return DAYS[dayNumber - 1]
}
// Check if two periods have a time conflict
function hasConflict(period1, period2) {
  return period1.startTime < period2.endTime && period1.endTime > period2.startTime
}
function periodConflictsWithDaySchedule(period, daySchedule) {
  return daySchedule.some((scheduledPeriod) => hasConflict(period, scheduledPeriod))
}

export function canAddCourseOptionToSchedule(option, schedule) {
  return option.periods.every((period) => {
    const days = period.days.map(dayToString)
    return days.every((day) => !periodConflictsWithDaySchedule(period, schedule[day]))
  })
}
export function addCourseOptionToSchedule(option, schedule) {
  for (const period of option.periods) {
    for (const dayNumber of period.days) {
      const day = dayToString(dayNumber)

      const schedulePeriod = {
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
      schedule[day].sort((a, b) => a.startTime - b.startTime) // sort lecture by start time
    }
  }
  return schedule
}

export function addMetaToSchedule(schedule) {
  schedule.meta = {
    id: getID(schedule),
    timings: getTimings(schedule),
    totalbreaks: getTotalBreaks(schedule),
    daysOff: getDaysOff(schedule)
  }
}
export function updateScheduleMeta(schedule) {
  schedule.meta = {
    timings: getTimings(schedule),
    totalbreaks: getTotalBreaks(schedule),
    daysOff: getDaysOff(schedule)
  }
}

function scheduleApplyFilters(schedule, filters) {
  const totalBreaksInHours = schedule.meta.totalbreaks / 60
  return (
    totalBreaksInHours <= filters.breaksLimit &&
    schedule.meta.daysOff.length >= filters.daysOff &&
    filters.offInTheseDays.every((day) => schedule.meta.daysOff.includes(day))
  )
}

// Generate all possible schedules
export function theAlgorithm(courses, currentSchedule, currentIndex, filters) {
  if (currentIndex === courses.length) {
    // here is the final stage that each complete schedule go through
    // meta data will be added here
    addMetaToSchedule(currentSchedule)
    if (scheduleApplyFilters(currentSchedule, filters)) {
      return [currentSchedule]
    }
    return []
  }

  let possibleSchedules = []
  const currentCourse = courses[currentIndex]

  for (const section of currentCourse) {
    // Iterate through each section of the current course
    let tempSchedule = cloneDeep(currentSchedule)

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
function minimizeSectionCourses(coursesArray, section) {
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
export function generateSchedules(courses, section, filters) {
  let coursesArray = Object.values(courses)
  if (section) {
    coursesArray = minimizeSectionCourses(coursesArray, section)
  }

  // sort courses by number of options
  coursesArray.sort((course1, course2) => course1.length - course2.length)
  return theAlgorithm(coursesArray, initializeBlankSchedule(), 0, filters)
}

// function calculatePreferenceScore(schedule, preferences) {
//   let score = 0

//   const scheduleStartHour = schedule.meta.timings.earliestHour
//   const scheduleEndHour = schedule.meta.timings.earliestHour + schedule.meta.timings.timeDiff
//   if (preferences.startTimePreference === 'Earliest') {
//     score += 24 - scheduleStartHour // Earlier start times score higher
//   } else {
//     score += scheduleStartHour // Later start times score higher
//   }

//   if (preferences.endTimePreference === 'Earliest') {
//     score += 24 - scheduleEndHour // Earlier end times score higher
//   } else {
//     score += scheduleEndHour // Later end times score higher
//   }

//   // Breaks preferences
//   const breaksScore =
//     preferences.breaks === 'Less' ? -schedule.meta.totalbreaks : schedule.meta.totalbreaks
//   score += breaksScore / 100 // Normalize break score to prevent it from overpowering

//   // Days off preferences
//   const daysActive = 5 - schedule.meta.daysOff.length // Assuming a 5-day workweek for simplicity
//   score += preferences.daysOff === 'More' ? schedule.meta.daysOff.length : -daysActive

//   // Preferred/Unpreferred Days
//   preferences.preferredDays.forEach((day) => {
//     if (schedule[day.toLowerCase()].length > 0) {
//       score += 1 // Increase score for each preferred day used
//     }
//   })
//   preferences.unpreferredDays.forEach((day) => {
//     if (schedule[day.toLowerCase()].length > 0) {
//       score -= 1 // Decrease score for each unpreferred day used
//     }
//   })

//   return score
// }

// list of prefernces that will be used not to filter the schedules..
// but to rank them based on the user prefernces
export const PREFERENCES = {
  time: 'Earliest|Latest',
  breaks: 'Less|More',
  daysOff: 'More|Less',
  preferredDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  unpreferredDays: ['Sat', 'Sun'],
  startTimePreference: 'Earliest|Latest',
  endTimePreference: 'Earliest|Latest'
}
