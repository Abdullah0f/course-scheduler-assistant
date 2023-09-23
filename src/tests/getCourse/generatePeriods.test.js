import { expect, it, describe } from 'vitest'
import { generatePeriods } from '@/utils/coursesFromHTML'

describe('generatePeriods', () => {
  it('should correctly generate periods from a string', () => {
    const periodsString1 =
      '1 3 5 @t 10:00 ص - 10:50 ص @r 54 01 1 A AF10 @n 1 3 5 @t 10:00 ص - 10:50 ص @r 54 01 1 A AF10'
    const result1 = generatePeriods(periodsString1, 'Lecture', 'John Doe')
    expect(result1.length).toBe(2)
    expect(result1[0].days).toEqual(['1', '3', '5'])
    expect(result1[0].time).toBe('10:00 ص - 10:50 ص')
    expect(result1[0].location).toBe('54 01 1 A AF10')
    expect(result1[0].classType).toBe('Lecture')
    expect(result1[0].instructor).toBe('John Doe')
    // You can add more assertions for the rest of the periods

    const periodsString2 =
      ' 5 @t 11:00 ص - 11:50 ص @r 54 01 1 C CF17 @n  2 @t 01:00 م - 02:50 م @r 54 01 1 C CF17'
    const result2 = generatePeriods(periodsString2, 'Lab', 'Jane Smith')
    expect(result2.length).toBe(2)
    expect(result2[0].days).toEqual(['5'])
    expect(result2[0].time).toBe('11:00 ص - 11:50 ص')
    expect(result2[0].location).toBe('54 01 1 C CF17')
    expect(result2[0].classType).toBe('Lab')
    expect(result2[1].days).toEqual(['2'])
    expect(result2[1].time).toBe('01:00 م - 02:50 م')
    expect(result2[1].location).toBe('54 01 1 C CF17')
    expect(result2[1].classType).toBe('Lab')
    // Similarly, add assertions for the rest of the periods and properties

    const periodsString3 =
      '1 @t 08:00 ص - 09:50 ص @r 54 01 2 a as32 @n 3 @t 10:00 ص - 10:50 ص @r 54 01 2 a as32 @n 5 @t 11:00 ص - 12:50 ص @r 54 01 2 a as32'
    const result3 = generatePeriods(periodsString3, 'Tutorial', 'Alice Johnson')
    expect(result3.length).toBe(3)
    expect(result3[2].days).toEqual(['5'])
    expect(result3[2].time).toBe('11:00 ص - 12:50 ص')
  })
  it('should return an empty array if the periods string is empty', () => {
    const periodsString = ''
    const result = generatePeriods(periodsString, 'Lecture', 'John Doe')
    expect(result.length).toBe(0)
  })
  it('should return an empty array if the periods string is undefined', () => {
    const periodsString = undefined
    const result = generatePeriods(periodsString, 'Lecture', 'John Doe')
    expect(result.length).toBe(0)
  })
})
