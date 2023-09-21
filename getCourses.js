import fs from 'fs'

const SELECTORS = {
  courseRow: '.ROW1, .ROW2'
}

const extractCourseInfo = (courseElement) => {
  const cells = courseElement.querySelectorAll('td')
  const courseCode = cells[0].textContent.trim()
  const courseTitle = cells[1].textContent.trim()
  const classCode = cells[2].textContent.trim()
  const courseHours = cells[4].textContent.trim()
  const open = cells[5].querySelector('span')?.textContent.trim() === 'مفتوحة'
  const instructor = cells[6].querySelector('a > input:nth-child(1)').value.trim()
  const examInput = cells[6].querySelector('a > input:nth-child(3)')
  const exam = examInput ? examInput.value.trim() : null
  const daytimes = cells[7].querySelector('a > input:nth-child(2)').value.trim()
  const classType = cells[3].textContent.trim()
  const isFollower = courseHours === '' ? true : false

  const dayTimeParts = daytimes.split('@n')
  const periods = dayTimeParts.map((part) => {
    const [day, time] = part.split('@t').map((item) => item.trim())
    const location = part.split('@r').pop().trim()
    const [start, end] = time.split('-').map((item) => item.trim())

    return {
      day: [day],
      time: time,
      timee: {
        startHour: start.split(':')[0],
        startMin: start.split(':')[1],
        endHour: end.split(':')[0],
        endMin: end.split(':')[1]
      },
      location: location,
      classType: classType
    }
  })

  return {
    courseCode,
    courseTitle,
    classCode,
    courseHours,
    open,
    instructor,
    exam,
    periods
  }
}

const getCourses = () => {
  const html = fs.readFileSync('database.html', 'utf8')
  const courseElements = Array.from(document.querySelectorAll(SELECTORS.courseRow))

  const courses = {}
  const mainCourseMap = {} // Map course codes to their main courses

  courseElements.forEach((courseElement) => {
    const courseInfo = extractCourseInfo(courseElement)
    const { courseCode, classCode, isFollower } = courseInfo

    // Check if this course is a follower
    if (isFollower) {
      const mainCourse = mainCourseMap[courseCode]

      if (mainCourse) {
        // add the periods into the main course's periods
        mainCourse.periods.push(...courseInfo.periods)
      }
    } else {
      if (!courses[courseCode]) {
        courses[courseCode] = []
      }

      // Update the main course mapping
      mainCourseMap[courseCode] = courseInfo

      courses[courseCode].push(courseInfo)
    }
  })

  return courses
}
