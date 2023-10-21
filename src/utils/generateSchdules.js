import { DAYS } from './constants'
import cloneDeep from 'lodash/cloneDeep'

function initializeBlankSchedule() {
  let schedule = {}
  for (const day of DAYS) {
    schedule[day] = []
  }
  return schedule
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

function canAddCourseOptionToSchedule(option, schedule) {
  for (const period of option.periods) {
    for (const dayNumber of period.days) {
      const day = dayToString(dayNumber)

      if (!schedule[day]) {
        schedule[day] = []
      }

      if (periodConflictsWithDaySchedule(period, schedule[day])) {
        return false
      }
    }
  }
  return true
}
function addCourseOptionToSchedule(option, schedule) {
  for (const period of option.periods) {
    for (const dayNumber of period.days) {
      const day = dayToString(dayNumber)

      const schedulePeriod = {
        title: option.name,
        startTime: new Date(period.startTime),
        endTime: new Date(period.endTime),
        location: period.location,
        classType: period.classType,
        instructor: period.instructor
      }

      schedule[day].push(schedulePeriod)
    }
  }
  return schedule
}
// Generate all possible schedules
export function generateSchedules(
  courses,
  currentSchedule = initializeBlankSchedule(),
  currentIndex = 0
) {
  // if courses is not an array but an object (probably the first time), convert it to an array
  const coursesArray = Array.isArray(courses) ? courses : Object.values(courses)
  if (currentIndex === coursesArray.length) {
    return [currentSchedule]
  }

  let possibleSchedules = []
  const currentCourse = coursesArray[currentIndex]

  for (const option of currentCourse) {
    let tempSchedule = cloneDeep(currentSchedule)
    if (canAddCourseOptionToSchedule(option, tempSchedule)) {
      tempSchedule = addCourseOptionToSchedule(option, tempSchedule)
      possibleSchedules = possibleSchedules.concat(
        generateSchedules(coursesArray, tempSchedule, currentIndex + 1)
      )
    }
  }

  return possibleSchedules
}
