import { DAYS, MAX_GENERATED_SCHEDULES } from './constants'
import cloneDeep from 'lodash/cloneDeep'
import { getTimings, getTotalBreaks, getDaysOff } from '@/utils/scheduleHelpers'

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
  return option.periods.every((period) => {
    const days = period.days.map(dayToString)
    return days.every((day) => !periodConflictsWithDaySchedule(period, schedule[day]))
  })
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
      schedule[day].sort((a, b) => a.startTime - b.startTime) // sort lecture by start time
    }
  }
  return schedule
}

function addMetaToSchedule(schedule) {
  schedule.meta = {
    timings: getTimings(schedule),
    totalbreaks: getTotalBreaks(schedule),
    daysOff: getDaysOff(schedule)
  }
}

function scheduleApplyFilters( schedule, filters ) {
  const totalBreaksInHours = schedule.meta.totalbreaks / 60 
  return totalBreaksInHours <= filters.breaksLimit && schedule.meta.daysOff.length >= filters.daysOff
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

  for (const option of currentCourse) {
    let tempSchedule = cloneDeep(currentSchedule)
    if (canAddCourseOptionToSchedule(option, tempSchedule)) {
      tempSchedule = addCourseOptionToSchedule(option, tempSchedule)
      possibleSchedules = possibleSchedules.concat(
        theAlgorithm(courses, tempSchedule, currentIndex + 1,filters)
      )
      if (possibleSchedules.length >= MAX_GENERATED_SCHEDULES) {
        break
      }
    }
  }

  return possibleSchedules
}

export function generateSchedules(courses, filters) {
  const coursesArray = Object.values(courses)

  // sort courses by number of options
  coursesArray.sort((course1, course2) => course1.length - course2.length)
  return theAlgorithm(coursesArray, initializeBlankSchedule(), 0, filters)
}
