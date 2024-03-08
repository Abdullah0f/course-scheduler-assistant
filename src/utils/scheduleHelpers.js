export function getTimings(schedule) {
  let earliestTime = new Date('1970-01-01T23:59:59')
  let latestTime = new Date('1970-01-01T00:00:00')
  for (const day in schedule) {
    if (day === 'meta') continue // skip meta key (if it exists) useful in updateScheduleMeta
    schedule[day].forEach((item) => {
      earliestTime = item.startTime < earliestTime ? item.startTime : earliestTime
      latestTime = item.endTime > latestTime ? item.endTime : latestTime
    })
  }

  return {
    earliestTime,
    latestTime,
    earliestHour: earliestTime.getHours(),
    timeDiff: getTimeDiff(earliestTime, latestTime)
  }
}

export function getTotalBreaks(schedule) {
  let totalBreaks = 0;
  for (const day in schedule) {
    if (day === 'meta') continue // skip meta key (if it exists) useful in updateScheduleMeta
    const items = schedule[day];
    if (items.length <= 1) {
      continue; // skip days with only one lecture or no lectures
    }
    for (let i = 1; i < items.length; i++) {
      const prevItem = items[i-1];
      const currItem = items[i];

      totalBreaks += currItem.startTime - prevItem.endTime;
    }
  }
  return totalBreaks/ (1000 * 60); // return total breaks in minutes
}
export function getDaysOff(schedule) {
  let daysOff = [];
  for (const day in schedule) {
    if (day === 'meta') continue // skip meta key (if it exists) useful in updateScheduleMeta
    const items = schedule[day];
    if (items.length == 0) {
      daysOff.push(day);
    }
  }
  return daysOff;
  
}
export function getID(schedule) {
  let totalClassCodeSumAndtime = 0;
  ['sun', 'mon', 'tue', 'wed', 'thu'].forEach(day => {
    if (schedule[day].length>0) {
        // Iterate through each class
        schedule[day].forEach(course => {
            // Convert classCode to integer and add to the total sum
            totalClassCodeSumAndtime += parseInt(course.classCode+course.startTime, 10);
            // add startTime and endTime to total sum to make id more unique
            totalClassCodeSumAndtime += course.startTime.getTime()+course.endTime.getTime();

        });
    }
});
  return totalClassCodeSumAndtime;
}

export function sortSchedules(schedules, sort) {
  if (!schedules || !sort) return schedules
  const sortType = sort.split('-')[0]
  const sortDirection = sort.split('-')[1]

  const compareSchedules = (a, b) => {
    let comparisonValue = 0

    switch (sortType) {
      case 'timeDiff':
        comparisonValue = a.meta.timings.timeDiff - b.meta.timings.timeDiff
        break
      case 'daysOff':
        comparisonValue = a.meta.daysOff.length - b.meta.daysOff.length
        break
      case 'breaks':
        comparisonValue = a.meta.totalbreaks - b.meta.totalbreaks
        break
      default:
        throw new Error(`Invalid sortType: ${sortType}`)
    }

    return sortDirection === 'desc' ? -comparisonValue : comparisonValue
  }

  return [...schedules].sort(compareSchedules)
}


function getTimeDiff(earliestTime, latestTime) {
  // find diff between hours and if there is a remainder, add 1
  return latestTime.getHours() - earliestTime.getHours() + (latestTime.getMinutes() > 0 ? 1 : 0)
}

export function deleteSectionFromSchedule(classCode, schedule) {
  Object.keys(schedule).forEach(day => {
    if (Array.isArray(schedule[day])) {
      schedule[day] = schedule[day].filter(section => section.classCode !== classCode)
    }
  })
  return schedule
}

