export function timifySchedule(schedule) {
  for (const day of Object.keys(schedule)) {
    if (day === 'meta') {
      schedule[day].timings.earliestTime = new Date(schedule[day].timings.earliestTime)
      schedule[day].timings.latestTime = new Date(schedule[day].timings.latestTime)
      continue
    }
    for (const period of schedule[day]) {
      period.startTime = new Date(period.startTime)
      period.endTime = new Date(period.endTime)
    }
  }
  return schedule
}
