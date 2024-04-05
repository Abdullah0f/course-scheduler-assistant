import { expect, it, describe, test } from 'vitest'
import { extractTime } from '@/utils/coursesFromHTML'

describe('extractTime', () => {
  it('should correctly extract start and end times from the time string', () => {
    // Test case with morning time
    const time1 = '11:00 ص - 12:50 ص'
    const result1 = extractTime(time1)
    expect(result1.startTime.getHours()).toBe(11)
    expect(result1.startTime.getMinutes()).toBe(0)
    expect(result1.endTime.getHours()).toBe(0)
    expect(result1.endTime.getMinutes()).toBe(50)

    // Test case with afternoon time
    const time2 = '01:00 م - 02:50 م'
    const result2 = extractTime(time2)
    expect(result2.startTime.getHours()).toBe(13) // Converted to 24-hour format
    expect(result2.startTime.getMinutes()).toBe(0)
    expect(result2.endTime.getHours()).toBe(14)
    expect(result2.endTime.getMinutes()).toBe(50)

    // Another morning time
    const time3 = '08:15 ص - 09:00 ص'
    const result3 = extractTime(time3)
    expect(result3.startTime.getHours()).toBe(8)
    expect(result3.startTime.getMinutes()).toBe(15)
    expect(result3.endTime.getHours()).toBe(9)
    expect(result3.endTime.getMinutes()).toBe(0)

    // Another afternoon time
    const time4 = '03:30 م - 04:15 م'
    const result4 = extractTime(time4)
    expect(result4.startTime.getHours()).toBe(15)
    expect(result4.startTime.getMinutes()).toBe(30)
    expect(result4.endTime.getHours()).toBe(16)
    expect(result4.endTime.getMinutes()).toBe(15)

    // Time at 8 in the evening
    const time6 = '08:00 م - 09:00 م'
    const result6 = extractTime(time6)
    expect(result6.startTime.getHours()).toBe(20) // Converted to 24-hour format
    expect(result6.startTime.getMinutes()).toBe(0)
    expect(result6.endTime.getHours()).toBe(21)
    expect(result6.endTime.getMinutes()).toBe(0)

    // Time at 1 in the morning
    const time7 = '01:00 ص - 02:00 ص'
    const result7 = extractTime(time7)
    expect(result7.startTime.getHours()).toBe(1)
    expect(result7.startTime.getMinutes()).toBe(0)
    expect(result7.endTime.getHours()).toBe(2)
    expect(result7.endTime.getMinutes()).toBe(0)
  })
})
