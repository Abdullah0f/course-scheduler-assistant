import { DAYS } from './constants'

const allCoursesData = {
  '4801 هال': [
    {
      code: '4801 هال',
      name: 'الرابوتية والأتمتة',
      classCode: '3222',
      type: 'محاضرة',
      periodsString: ' 2 @t 08:00 ص - 09:50 ص @r 54 01 1 C CF3',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'ياسين صالح . بوترعه',
      periods: [
        {
          days: ['2'],
          time: '08:00 ص - 09:50 ص',
          startTime: new Date('1970-01-01T05:00:00.000Z'),
          endTime: new Date('1970-01-01T06:50:00.000Z'),
          location: '54 01 1 C CF3',
          classType: 'محاضرة',
          instructor: 'ياسين صالح . بوترعه'
        },
        {
          days: ['4'],
          time: '10:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 1 C CF3',
          classType: 'عملي',
          instructor: 'ياسين صالح . بوترعه'
        }
      ],
      exam: '7'
    },
    {
      code: '4801 هال',
      name: 'الرابوتية والأتمتة',
      classCode: '3222',
      type: 'محاضرة',
      periodsString: ' 2 @t 08:00 ص - 09:50 ص @r 54 01 1 C CF3',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'ياسين صالح . بوترعه',
      periods: [
        {
          days: ['2'],
          time: '08:00 ص - 09:50 ص',
          startTime: new Date('1970-01-01T05:00:00.000Z'),
          endTime: new Date('1970-01-01T06:50:00.000Z'),
          location: '54 01 1 C CF3',
          classType: 'محاضرة',
          instructor: 'ياسين صالح . بوترعه'
        },
        {
          days: ['5'],
          time: '08:00 ص - 9:50 ص',
          startTime: new Date('1970-01-01T05:00:00.000Z'),
          endTime: new Date('1970-01-01T06:50:00.000Z'),
          location: '54 01 1 C AF7',
          classType: 'عملي',
          instructor: 'ياسين صالح . بوترعه'
        }
      ],
      exam: '7'
    }
  ],
  '4811 عال': [
    {
      code: '4811 عال',
      name: 'الجريمة الإلكترونية',
      classCode: '2849',
      type: 'محاضرة',
      periodsString: ' 1 @t 01:00 م - 02:50 م @r  @n  4 @t 02:00 م - 02:50 م @r ',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'عدي محمد سليمان الحضيف',
      periods: [
        {
          days: ['1'],
          time: '01:00 م - 02:50 م',
          startTime: new Date('1970-01-01T10:00:00.000Z'),
          endTime: new Date('1970-01-01T11:50:00.000Z'),
          location: '',
          classType: 'محاضرة',
          instructor: 'عدي محمد سليمان الحضيف'
        },
        {
          days: ['4'],
          time: '02:00 م - 02:50 م',
          startTime: new Date('1970-01-01T11:00:00.000Z'),
          endTime: new Date('1970-01-01T11:50:00.000Z'),
          location: '',
          classType: 'محاضرة',
          instructor: 'عدي محمد سليمان الحضيف'
        }
      ],
      exam: ''
    }
  ],
  '4311 عال': [
    {
      code: '4311 عال',
      name: 'البرمجة المتقدمة',
      classCode: '2866',
      type: 'محاضرة',
      periodsString: ' 2 @t 10:00 ص - 11:50 ص @r 54 01 1 A AF3',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'محمد عثمان علي حجازي',
      periods: [
        {
          days: ['2'],
          time: '10:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 1 A AF3',
          classType: 'محاضرة',
          instructor: 'محمد عثمان علي حجازي'
        },
        {
          days: ['4'],
          time: '10:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 1 A AF3',
          classType: 'تمارين',
          instructor: 'محمد عثمان علي حجازي'
        }
      ],
      exam: '25'
    },
    {
      code: '4311 عال',
      name: 'البرمجة المتقدمة',
      classCode: '3969',
      type: 'محاضرة',
      periodsString: ' 1 @t 03:00 م - 04:50 م @r ',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'محمد عثمان علي حجازي',
      periods: [
        {
          days: ['1'],
          time: '03:00 م - 04:50 م',
          startTime: new Date('1970-01-01T12:00:00.000Z'),
          endTime: new Date('1970-01-01T13:50:00.000Z'),
          location: '',
          classType: 'محاضرة',
          instructor: 'محمد عثمان علي حجازي'
        },
        {
          days: ['3'],
          time: '03:00 م - 04:50 م',
          startTime: new Date('1970-01-01T12:00:00.000Z'),
          endTime: new Date('1970-01-01T13:50:00.000Z'),
          location: '',
          classType: 'تمارين',
          instructor: 'محمد عثمان علي حجازي'
        }
      ],
      exam: ''
    }
  ],
  '4321 عال': [
    {
      code: '4321 عال',
      name: 'لغات البرمجة والمترجمات',
      classCode: '2871',
      type: 'محاضرة',
      periodsString:
        ' 1 @t 08:00 ص - 09:50 ص @r 54 01 2 a as32 @n  3 @t 10:00 ص - 10:50 ص @r 54 01 2 a as32',
      hours: '4',
      open: 'مفتوحة',
      instructor: 'خالد محمد الصادق بسيس',
      periods: [
        {
          days: ['1'],
          time: '08:00 ص - 09:50 ص',
          startTime: new Date('1970-01-01T05:00:00.000Z'),
          endTime: new Date('1970-01-01T06:50:00.000Z'),
          location: '54 01 2 a as32',
          classType: 'محاضرة',
          instructor: 'خالد محمد الصادق بسيس'
        },
        {
          days: ['3'],
          time: '10:00 ص - 10:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T07:50:00.000Z'),
          location: '54 01 2 a as32',
          classType: 'محاضرة',
          instructor: 'خالد محمد الصادق بسيس'
        },
        {
          days: ['4'],
          time: '01:00 م - 01:50 م',
          startTime: new Date('1970-01-01T10:00:00.000Z'),
          endTime: new Date('1970-01-01T10:50:00.000Z'),
          location: '54 01 1 A AF16',
          classType: 'تمارين',
          instructor: 'سلمان عبدالله علي السلمان'
        }
      ],
      exam: '10'
    }
  ],
  '3001 عال': [
    {
      code: '3001 عال',
      name: 'أخلاقيات الحوسبة وطرق البحث',
      classCode: '2834',
      type: 'محاضرة',
      periodsString:
        ' 5 @t 11:00 ص - 11:50 ص @r 54 01 1 C CF17 @n  2 @t 01:00 م - 02:50 م @r 54 01 1 C CF17',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'عبده حسن عبده جماعي',
      periods: [
        {
          days: ['5'],
          time: '11:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T08:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 1 C CF17',
          classType: 'محاضرة',
          instructor: 'عبده حسن عبده جماعي'
        },
        {
          days: ['2'],
          time: '01:00 م - 02:50 م',
          startTime: new Date('1970-01-01T10:00:00.000Z'),
          endTime: new Date('1970-01-01T11:50:00.000Z'),
          location: '54 01 1 C CF17',
          classType: 'محاضرة',
          instructor: 'عبده حسن عبده جماعي'
        }
      ],
      exam: '29'
    }
  ],
  '4901 عال': [
    {
      code: '4901 عال',
      name: 'تدريب ميداني',
      classCode: '3158',
      type: 'تدريب',
      periodsString: '',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'بندر صالح محمد المصلوخ',
      periods: [],
      exam: '49'
    }
  ],
  '4912 عال': [
    {
      code: '4912 عال',
      name: 'مشروع تخرج 1',
      classCode: '3161',
      type: 'محاضرة',
      periodsString: '',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'عابد ضحوي عبدالله العنزى',
      periods: [],
      exam: '49'
    }
  ],
  '4931 عال': [
    {
      code: '4931 عال',
      name: 'موضوعات مختارة في علوم الحاسب',
      classCode: '2873',
      type: 'محاضرة',
      periodsString: ' 1 4 @t 10:00 ص - 11:50 ص @r 54 01 2 a as32',
      hours: '4',
      open: 'مفتوحة',
      instructor: 'عابد ضحوي عبدالله العنزى',
      periods: [
        {
          days: ['1', '4'],
          time: '10:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 2 a as32',
          classType: 'محاضرة',
          instructor: 'عابد ضحوي عبدالله العنزى'
        }
      ],
      exam: ''
    }
  ],
  '4654 عال': [
    {
      code: '4654 عال',
      name: 'معالجة الصورة الرقمية',
      classCode: '2841',
      type: 'محاضرة',
      periodsString: ' 1 @t 10:00 ص - 11:50 ص @r 54 01 1 C CF17',
      hours: '3',
      open: 'مغلقة',
      instructor: 'بلحسن عبدالمجيد خالد العكروت',
      periods: [
        {
          days: ['1'],
          time: '10:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 1 C CF17',
          classType: 'محاضرة',
          instructor: 'بلحسن عبدالمجيد خالد العكروت'
        },
        {
          days: ['3'],
          time: '01:00 م - 02:50 م',
          startTime: new Date('1970-01-01T10:00:00.000Z'),
          endTime: new Date('1970-01-01T11:50:00.000Z'),
          location: '54 01 1 B BF10',
          classType: 'عملي',
          instructor: 'بلحسن عبدالمجيد خالد العكروت'
        }
      ],
      exam: '16'
    }
  ],
  '4740 هال': [
    {
      code: '4740 هال',
      name: 'الحوسبة السحابية',
      classCode: '2875',
      type: 'محاضرة',
      periodsString:
        ' 2 @t 10:00 ص - 11:50 ص @r 54 01 2 B BS1 @n  3 @t 03:00 م - 03:50 م @r 54 01 2 B BS1',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'عبدالاله الوابل',
      periods: [
        {
          days: ['2'],
          time: '10:00 ص - 11:50 ص',
          startTime: new Date('1970-01-01T07:00:00.000Z'),
          endTime: new Date('1970-01-01T08:50:00.000Z'),
          location: '54 01 2 B BS1',
          classType: 'محاضرة',
          instructor: 'عبدالاله الوابل'
        },
        {
          days: ['3'],
          time: '03:00 م - 03:50 م',
          startTime: new Date('1970-01-01T12:00:00.000Z'),
          endTime: new Date('1970-01-01T12:50:00.000Z'),
          location: '54 01 2 B BS1',
          classType: 'محاضرة',
          instructor: 'عبدالاله الوابل'
        }
      ],
      exam: '26'
    }
  ],
  '4760 هال': [
    {
      code: '4760 هال',
      name: 'الشبكات اللاسلكية والمتنقلة',
      classCode: '3151',
      type: 'محاضرة',
      periodsString: ' 1 3 5 @t 08:00 ص - 08:50 ص @r 54 01 2 B BS32',
      hours: '3',
      open: 'مفتوحة',
      instructor: 'وليد مثيب حمد الدوسري',
      periods: [
        {
          days: ['1', '3', '5'],
          time: '08:00 ص - 08:50 ص',
          startTime: new Date('1970-01-01T05:00:00.000Z'),
          endTime: new Date('1970-01-01T05:50:00.000Z'),
          location: '54 01 2 B BS32',
          classType: 'محاضرة',
          instructor: 'وليد مثيب حمد الدوسري'
        }
      ],
      exam: ''
    }
  ]
}
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
      const day = dayToString(period.days[0])

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

    if (!hasConflict) {
      possibleSchedules = possibleSchedules.concat(
        generateSchedules(courses, tempSchedule, currentIndex + 1)
      )
    }
  }

  return possibleSchedules
}

function filterRelevantCourses(courseTitles) {
  return courseTitles.map((title) => allCoursesData[title])
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

// Example usage:
const relevantCourses = filterRelevantCourses(['4811 عال', '4801 هال', '4321 عال'])
export const possibleSchedules = generateSchedules(relevantCourses)
