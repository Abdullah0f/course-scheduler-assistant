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

// Generate all possible schedules
export function generateSchedules(
  courses,
  currentSchedule = initializeBlankSchedule(),
  currentIndex = 0
) {
  // if courses is not an array but an object (probably the first time), convert it to an array
  if (!Array.isArray(courses)) {
    courses = Object.values(courses)
  }
  if (currentIndex === courses.length) {
    return [currentSchedule]
  }

  let possibleSchedules = []
  const currentCourse = courses[currentIndex]
  console.log(courses, currentIndex)
  console.log(currentCourse)

  for (const option of currentCourse) {
    let hasConflict = false
    let tempSchedule = deepCopy(currentSchedule)
    for (const period of option.periods) {
      for (const dayNumber of period.days) { // Iterate over each day
        const day = dayToString(dayNumber)
  
        if (!tempSchedule[day]) {
          tempSchedule[day] = []
        }
        if (periodConflictsWithDaySchedule(period, tempSchedule[day])) {
          hasConflict = true
          break
        } else {
          const schedulePeriod = {
            title: option.name,
            startTime: period.startTime,
            endTime: period.endTime,
            location: period.location,
            classType: period.classType,
            instructor: period.instructor
          }
          tempSchedule[day].push(schedulePeriod)
        }
      }
      if (hasConflict) break; // If there's a conflict, break from the periods loop
    }
  
    if (!hasConflict) {
      possibleSchedules = possibleSchedules.concat(
        generateSchedules(courses, tempSchedule, currentIndex + 1)
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
