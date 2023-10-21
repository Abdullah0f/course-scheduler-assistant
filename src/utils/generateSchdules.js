import { DAYS } from './constants'

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
        startTime: period.startTime,
        endTime: period.endTime,
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
    let tempSchedule = deepCopy(currentSchedule)
    if (canAddCourseOptionToSchedule(option, tempSchedule)) {
      tempSchedule = addCourseOptionToSchedule(option, tempSchedule)
      possibleSchedules = possibleSchedules.concat(
        generateSchedules(coursesArray, tempSchedule, currentIndex + 1)
      )
    }
  }

  return possibleSchedules
}

function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (Array.isArray(obj)) {
    const arrCopy = []
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = deepCopy(obj[i])
    }
    return arrCopy
  }

  if (obj instanceof Object) {
    const objCopy = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        objCopy[key] = deepCopy(obj[key])
      }
    }
    return objCopy
  }

  throw new Error('Unable to copy obj. Type not supported.')
}
