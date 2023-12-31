const ROWS_SELECTOR = 'tbody .ROW1, tbody .ROW2'

export function getCourses(htmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  const rows = doc.querySelectorAll(ROWS_SELECTOR)
  const isOfferedCourses = rows[Math.floor(rows.length / 2)].querySelectorAll('td').length === 7
  const courses = {}
  rows.forEach((row) => {
    const cells = row.querySelectorAll('td')
    let i = 0 //because if not attempted courses, then we skip 5th cell
    const code = cells[i++].textContent
    const name = cells[i++].textContent
    const classCode = cells[i++]?.textContent
    const type = cells[i++]?.textContent
    const hours = cells[i++]?.textContent
    if (!isOfferedCourses) i++ //to skip gender column
    const open = cells[i++]?.textContent
    const instructor = cells[i]?.querySelectorAll('input')[0]?.value
    const periodsString = cells[i]?.querySelectorAll('input')[1]?.value
    const exam = cells[i]?.querySelectorAll('input')[2]?.value
    const periods = generatePeriods(periodsString, type, instructor)
    if (hours === '') {
      // then it means that this period is a lab or a tutorial for the previous lecture, so..
      // we need to merge this period with the previous one
      const previousCourse = courses[code][courses[code].length - 1]
      if (thereIsAnotherPeriodWithSameType(previousCourse, type))
        return courses[code].push(createAnotherCourseWithThisPeriod(previousCourse, periods, type))
      previousCourse.periods = [...previousCourse.periods, ...periods]
      return
    }
    const course = {
      code,
      name,
      classCode,
      type,
      hours,
      open,
      instructor,
      periods,
      exam
    }

    if (!courses[course.code]) {
      courses[course.code] = []
    }
    courses[course.code].push(course)
  })
  return courses
}
export function generatePeriods(periodsString, type, instructorName) {
  if (!periodsString) return []
  const periods = []
  const numOfPeriods = [...periodsString.matchAll(/@t/g)].length //since @t is the delimiter between diffrent periods
  for (let i = 0; i < numOfPeriods; i++) {
    const periodString = periodsString.split('@n')[i]
    const days = periodString.split('@t')[0].trim().match(/\d/g)
    const time = periodString.match(/@t\s*(.*?)\s*@r/)[1]?.trim()
    const { startTime, endTime } = extractTime(time)
    const location = periodString.match(/@r\s*(.*)/)[1]?.trim()
    const classType = type
    const instructor = instructorName
    const period = {
      days,
      time,
      startTime,
      endTime,
      location,
      classType,
      instructor
    }
    periods.push(period)
  }
  return periods
}

function thereIsAnotherPeriodWithSameType(course, type) {
  return course.periods.some((period) => period.classType === type)
}
function createAnotherCourseWithThisPeriod(course, periods, type) {
  const newCourse = { ...course, periods: [] }
  // remove same type periods and add them to the new course
  newCourse.periods = course.periods.filter((period) => period.classType !== type)
  newCourse.periods = [...newCourse.periods, ...periods]
  return newCourse
}

export function extractTime(time) {
  time = time.trim()

  // Split the time string using " - " as the delimiter
  const timeParts = time.split(' - ')

  // Extract the start time and end time
  let startTime = convertTo24HourFormat(timeParts[0])
  let endTime = convertTo24HourFormat(timeParts[1])

  // Convert the times to Date objects
  startTime = timeToTimestamp(startTime)
  endTime = timeToTimestamp(endTime)

  return { startTime, endTime }
}
function convertTo24HourFormat(time) {
  // get ص or م
  const amOrPm = time.slice(-1)
  // remove ص or م
  time = time.slice(0, -1)
  // split time string into hours and minutes
  const timeParts = time.split(':')
  let hours = timeParts[0]
  let minutes = timeParts[1]
  // convert to 24-hour format
  if (amOrPm === 'ص') {
    if (hours === '12') hours = '00'
  } else {
    if (hours !== '12') hours = parseInt(hours) + 12
  }
  return (hours + ':' + minutes).trim()
}

function timeToTimestamp(time) {
  const date = new Date('1970-01-01 ' + time)
  return date.getTime()
}