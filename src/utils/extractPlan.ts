import { Plan ,Term ,Courses} from './interfaces'


export function extractPlanData(document : Document) : Plan {
  const table = document.querySelector(
    '.section-content:nth-of-type(2) div[style="OVERFLOW: auto; WIDTH: 100%;"] table'
  )
  if (!table) {
    console.error('Table not found inside the specified div.')
  }
  const rows = table?.querySelectorAll('tr')
  const termsWithCourses: Term[] = [];

  const plan: Plan = {
    terms: termsWithCourses,
    meta: {
      totalTerms: 0,
      totalCourses: 0,
      finishedCourses: 0,
      finishedTerms: 0
    }
  }

  rows?.forEach((row, index) => {
    if (index === 0) return // Skip header row

    const cells = row.querySelectorAll('td')

    // const tremNumAra = cells[0].textContent.trim() // Extract term number in Arabic from the first <td>

    if (cells.length <= 1) {
      return
    }

    const courses : Array<Courses> = []
    const termCourses : Term = {
      termNumber: index,
      courses,
      meta: {
        totalCourses: 0,
        finishedCourses: 0,
      },
      status: 'Unknown'
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
        zeroCourse: false,
        optionalCourse: optionalCourse.includes(courseCode)
      })
      }
    addMetaToTerm(termCourses)
    termCourses.status = termCourses.meta.totalCourses === termCourses.meta.finishedCourses ? 'Finished' : 
    termCourses.meta.finishedCourses === 0 ? 'Not Started' : 'Not Finished'
    termsWithCourses.push(termCourses)
  })
  isItZeroCourse(plan)
  addMetaToPlan(plan)
  return plan
}
function addMetaToTerm(term : Term) {
  term.meta = {
    totalCourses: term.courses.length,
    finishedCourses: term.courses.filter((course) => course.status === 'Finished').length,
  }
}

function addMetaToPlan(plan : Plan) {
  plan.meta = {
    totalTerms: plan.terms.length,
    totalCourses: getTotalCourses(plan),
    finishedCourses: getTotalFinishedCourses(plan),
    finishedTerms: getFinishedTerms(plan.terms)
  }
}
function getTotalCourses(plan : Plan) {
  let totalCourses = 0
  plan.terms.forEach((term) => {
    totalCourses += term.meta.totalCourses
  })
  return totalCourses
}
function getTotalFinishedCourses(plan : Plan) {
  let totalFinishedCourses = 0
  plan.terms.forEach((term) => {
    totalFinishedCourses += term.meta.finishedCourses
  })
  return totalFinishedCourses
}

function getFinishedTerms(terms : Term[]) {
  console.log(terms.filter((term) => term.status === 'Finished').length)
  return terms.filter((term) => term.status === 'Finished').length
}

function isItZeroCourse(plan : Plan) {
  plan.terms.forEach((term) => {
    if (term.status !== 'Finished' && term.status !== 'Not Started') {
      term.courses.forEach((course) => {
        // if (course.status === 'Current Term') return;
        if (optionalCourse.includes(course.courseCode)) return;
        if (course.status === 'Not Started') course.zeroCourse = true;
      });
    }
  });
}
// Only for CS Department
const optionalCourse : string[]  = [
  '1010 هاب',
  '3101 عال',
  '3111 هاب',
  '4201 عال',
  '4211 عال',
  '4221 عال',
  '4411 عال',
  '4511 عال',
  '4531 عال',
  '4541 هاب',
  '4561 عال',
  '4601 عال',
  '4621 عال',
  '4641 عال',
  '4731 عال',
  '4740 هال',
  '4741 عال',
  '4760 هال',
  '4801 هال',
  '4811 عال',
  '4821 عال',
  '4831 عال',
  '4851 عال',
  '4861 عال',
  '4871 عال',
  '4881 عال',
  '4891 عال',
  '4931 عال',
  '4941 عال',
  '4951 عال',
  '4961 عال',
  '4991 عال',
];

// this one for IS
// const optionalCourse : string[]  = [
//   '1010 هاب',
//   '2011 نال',
//   '3101 عال',
//   '3111 هاب',
//   '4211 نال',
//   '4221 نال',
//   '4251 نال',
//   '4501 نال',
//   '4511 نال',
//   '4591 نال',
//   '4631 نال',
//   '4701 نال',
//   '4711 نال',
//   '4731 نال',
//   '4801 نال',
//   '4881 عال',
//   '4891 عال',
//   '4981 نال', 
// ]

// this one for SWE 
// const optionalCourse : string[]  = [
//   '1010 هاب',
//   '3001 عال',
//   '3101 عال',
//   '3211 هاب',
//   '3221 هاب',
//   '4011 هاب',
//   '4101 هاب',
//   '4112 هاب',
//   '4121 هاب',
//   '4222 هاب',
//   '4531 عال',
//   '4541 هاب',
//   '4552 عال',
//   '4561 هاب',
//   '4571 نال', 
//   '4571 هاب',
//   '4591 هاب',
//   '4631 هاب',
//   '4654 عال',
//   '4961 هاب',
//   '4971 هاب',
//   '4981 هاب',
// ]

