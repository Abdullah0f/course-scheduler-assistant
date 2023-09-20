export function getTimings(schedule) {
  let earliestTime = new Date('1970-01-01T23:59:59')
  let latestTime = new Date('1970-01-01T00:00:00')

  for (const day in schedule) {
    schedule[day].forEach((item) => {
      earliestTime = item.starttime < earliestTime ? item.starttime : earliestTime
      latestTime = item.endtime > latestTime ? item.endtime : latestTime
    })
  }

  return {
    earliestTime,
    latestTime: latestTime,
    timeDiff: getTimeDiff(earliestTime, latestTime)
  }
}
function getTimeDiff(earliestTime, latestTime) {
  // find diff between hours and if there is a remainder, add 1
  return (
    latestTime.getHours() -
    earliestTime.getHours() +
    (latestTime.getMinutes() - earliestTime.getMinutes() > 0 ? 1 : 0)
  )
}
