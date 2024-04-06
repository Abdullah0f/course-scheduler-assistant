export function extractPlanData(document) {
  const table = document.querySelector(
    '.section-content:nth-of-type(2) div[style="OVERFLOW: auto; WIDTH: 100%;"] table'
  )
  if (!table) {
    console.error('Table not found inside the specified div.')
    return []
  }

  const rows = table.querySelectorAll('tr')
  const plan = {
    terms: [],
    meta: {}
  }
  const termsWithCourses = []

  rows.forEach((row, index) => {
    if (index === 0) return // Skip header row

    const cells = row.querySelectorAll('td')

    // const tremNumAra = cells[0].textContent.trim() // Extract term number in Arabic from the first <td>

    if (cells.length <= 1) {
      return
    }

    const termCourses = {
      termNumber: index,
      courses: [],
      meta: {
        totalCourses: 0,
        finishedCourses: 0
      }
    }

    for (let i = 1; i < cells.length; i++) {
      const cellHtml = cells[i].innerHTML.trim()
      const [courseCodeHtml, courseName] = cellHtml.split('<br>').map((part) => part.trim())
      const courseCode = courseCodeHtml.replace(/&nbsp;/g, '').trim()
      const bgColor = cells[i].getAttribute('bgcolor')
      let status = 'Unknown' // Default status
      if (bgColor === '#736C68') status = 'Finished'
      else if (bgColor === 'LIGHTGRAY') status = 'Not Started'
      else if (bgColor === '#E0B149') status = 'Current Term'

      termCourses.courses.push({
        courseCode,
        courseName,
        status,
        zeroCourse: false
      })
    }
    termCourses.meta.totalCourses = termCourses.courses.length
    termCourses.courses.forEach((course) =>
      course.status === 'Finished' ? termCourses.meta.finishedCourses++ : ''
    )
    plan.terms.push({
      termNumber: index,
      courses: termCourses.courses,
      status:
        termCourses.meta.finishedCourses === termCourses.meta.totalCourses
          ? 'Finished'
          : termCourses.meta.finishedCourses === 0
          ? 'Not Started'
          : 'Not Finished',
      meta: termCourses.meta
    })
    termsWithCourses.push(termCourses)
  })
  isItZeroCourse(plan)
  addMetaToPlan(plan)
  return plan
}

function addMetaToPlan(plan) {
  plan.meta = {
    totalTerms: plan.terms.length,
    totalCourses: getTotalCourses(plan),
    totalFinishedCourses: getTotalFinishedCourses(plan),
    finishedTerms: getFinishedTerms(plan.terms)
  }
}
function getTotalCourses(plan) {
  let totalCourses = 0
  plan.terms.forEach((term) => {
    totalCourses += term.meta.totalCourses
  })
  return totalCourses
}
function getTotalFinishedCourses(plan) {
  let totalFinishedCourses = 0
  plan.terms.forEach((term) => {
    totalFinishedCourses += term.meta.finishedCourses
  })
  return totalFinishedCourses
}

function getFinishedTerms(terms) {
  return terms.filter((term) => term.status === 'Finished').length
}

function isItZeroCourse(plan) {
  plan.terms.forEach((term) => {
    if (term.status !== 'Finished' && term.status !== 'Not Started') {
      term.courses.forEach((course) => {
        // if (course.status === 'Current Term') return;
        if (course.status === 'Not Started') course.zeroCourse = true;
      });
    }
  });
}
