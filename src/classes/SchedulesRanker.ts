import { Days, DaysArabic } from '../utils/enums'
import {
  BreaksPreference,
  DaysOffPreference,
  Preferences,
  PreferencesImportance,
  ScheduleLengthPreference,
  ScheduleMeta,
  TimePreference,
  metaScore
} from '../utils/interfaces'
import Schedule from './Schedule'
export default class SchedulesRanker {
  static MAX_TOTAL_SCORE = 100
  analysisResult?: AnalysisResult
  private schedules: Schedule[]
  constructor(
    schedules: Schedule[] // private preferences: Preferences
  ) {
    this.schedules = [...schedules]
    this.analyzeSchedules()
  }

  private analyzeSchedules(): AnalysisResult {
    if (this.analysisResult) return this.analysisResult

    let totalStartTime = 0
    let totalEndTime = 0
    let totalBreaks = 0
    let totalDaysOff = 0
    let totalTimeDifference = 0
    let maxTotalBreaks = 0
    let minTotalBreaks = Infinity
    let maxDaysOff = 0
    let minDaysOff = Infinity
    let maxStartTime = 0
    let minStartTime = Infinity
    let maxEndTime = 0
    let minEndTime = Infinity
    let maxTimeDifference = 0
    let minTimeDifference = Infinity
    const noOfDaysOff = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    }
    const offDays = {
      [DaysArabic.sun]: 0,
      [DaysArabic.mon]: 0,
      [DaysArabic.tue]: 0,
      [DaysArabic.wed]: 0,
      [DaysArabic.thu]: 0,
    }
    const startTimeOccurences = {}
    const endTimeOccurences = {}
    const scheduleLength = {}
    const totalBreaksOccurences = {
        '0': 0, '1-100': 0, '101-200': 0, '201-300': 0, '301-400': 0,
        '401-500': 0, '501-600': 0, '601-700': 0, '701-800': 0,
        '801-900': 0, '901-1000': 0, '1000+': 0
    }
    this.schedules.forEach((schedule) => {
      const { meta } = schedule
      if (!meta) return
      totalStartTime += meta.timings.earliestHour
      totalEndTime += meta.timings.latestHour
      totalBreaks += meta.totalbreaks
      totalDaysOff += meta.daysOff.length
      totalTimeDifference += meta.timings.timeDiff
      noOfDaysOff[meta.daysOff.length]++
      meta.daysOff.forEach((day) => {
        offDays[DaysArabic[day]]++
      })
      if (!scheduleLength[meta.timings.timeDiff]) {
        scheduleLength[meta.timings.timeDiff] = 1
      } else {
        scheduleLength[meta.timings.timeDiff]++
      }
      const totalBreaksBin = this.getTotalBreaksBins(meta.totalbreaks)
        totalBreaksOccurences[totalBreaksBin]++
      

      if (!startTimeOccurences[meta.timings.earliestHour]) {
        startTimeOccurences[meta.timings.earliestHour] = 1
      } else {
        startTimeOccurences[meta.timings.earliestHour]++
      }

      if (!endTimeOccurences[meta.timings.latestHour]) {
        endTimeOccurences[meta.timings.latestHour] = 1
      } else {
        endTimeOccurences[meta.timings.latestHour]++
      }




      maxTotalBreaks = Math.max(maxTotalBreaks, meta.totalbreaks)
      minTotalBreaks = Math.min(minTotalBreaks, meta.totalbreaks)
      maxDaysOff = Math.max(maxDaysOff, meta.daysOff.length)
      minDaysOff = Math.min(minDaysOff, meta.daysOff.length)
      maxStartTime = Math.max(maxStartTime, meta.timings.earliestHour)
      minStartTime = Math.min(minStartTime, meta.timings.earliestHour)
      maxEndTime = Math.max(maxEndTime, meta.timings.latestHour)
      minEndTime = Math.min(minEndTime, meta.timings.latestHour)
      maxTimeDifference = Math.max(maxTimeDifference, meta.timings.timeDiff)
      minTimeDifference = Math.min(minTimeDifference, meta.timings.timeDiff)
    })
    // Filter out bins with zero occurrences
    Object.keys(totalBreaksOccurences).forEach(bin => {
      if (totalBreaksOccurences[bin] === 0) {
          delete totalBreaksOccurences[bin];
      }
    });
    const schedulesCount = this.schedules.length
    const analysisResult: AnalysisResult = {
      averageStartTime: schedulesCount > 0 ? totalStartTime / schedulesCount : 0,
      averageEndTime: schedulesCount > 0 ? totalEndTime / schedulesCount : 0,
      averageTotalBreaks: schedulesCount > 0 ? totalBreaks / schedulesCount : 0,
      averageDaysOff: schedulesCount > 0 ? totalDaysOff / schedulesCount : 0,
      averageTimeDifference: schedulesCount > 0 ? totalTimeDifference / schedulesCount : 0,
      maxTotalBreaks,
      minTotalBreaks,
      maxDaysOff,
      minDaysOff,
      maxStartTime,
      minStartTime,
      maxEndTime,
      minEndTime,
      minTimeDifference,
      maxTimeDifference,
      noOfDaysOff,
      offDays,
      scheduleLength,
      totalBreaksOccurences,
      startTimeOccurences,
      endTimeOccurences
    }

    this.analysisResult = analysisResult

    return analysisResult
  }

  calculateScore(
    schedule: Schedule,
    preferences: Preferences,
    maxValues: { [key in keyof PreferencesImportance]: number }
  ): metaScore {
    const analysis = this.analysisResult

    if (!schedule.meta || !analysis) throw new Error('Schedule meta or analysis result is missing')

    const meta = schedule.meta

    const daysOffScore = this.calculateDaysOffScore(meta, preferences, analysis, maxValues.daysOff)
    const breaksScore = this.calculateBreaksScore(meta, preferences, analysis, maxValues.breaks)
    const startTimeScore = this.calculateStartTimeScore(
      meta,
      preferences,
      analysis,
      maxValues.startTimePreference
    )
    const endTimeScore = this.calculateEndTimeScore(
      meta,
      preferences,
      analysis,
      maxValues.endTimePreference
    )
    const scheduleLengthScore = this.calculateScheduleLengthScore(
      meta,
      preferences,
      analysis,
      maxValues.scheduleLength
    )

    const totalScore =
      daysOffScore + breaksScore + startTimeScore + endTimeScore + scheduleLengthScore

    return {
      totalScore,
      daysOffScore,
      breaksScore,
      startTimeScore,
      endTimeScore,
      scheduleLengthScore
    }
  }

  rankSchedules(
    preferences: Preferences,
    preferencesImportance: PreferencesImportance,
    suggestionsCount?: number
  ): Schedule[] {
    const maxValues = this.calculateMaxValues(preferences, preferencesImportance)
    this.schedules.forEach((schedule) => {
      if (!schedule.meta) return
      schedule.meta.score = this.calculateScore(schedule, preferences, maxValues)
    })

    // sort the schedules based on the score
    this.schedules.sort((a, b) => {
      if (!a.meta || !b.meta || !a.meta.score || !b.meta.score) return 0
      return b.meta.score.totalScore - a.meta.score.totalScore
    })

    if (suggestionsCount) {
      return this.schedules.slice(0, suggestionsCount)
    }

    return this.schedules
  }
  /**
   * Calculates the maximum score values for scheduling preferences based on their importance.
   *
   * This function dynamically adjusts the maximum scores for each preference criterion
   * so that the sum of all maximum scores equals the predefined maximum total score
   * (SchedulesRanker.MAX_TOTAL_SCORE). It achieves this by first determining the total
   * importance of all active preferences (excluding those set to None) and then scaling
   * each preference's score proportionally.
   *
   * @param preferences - The actual preferences selected by the user, used to exclude
   *                      any preferences set to None from the scoring.
   * @param preferencesImportance - An object containing the importance levels for each preference.
   *                                The importance level is typically a numerical value indicating
   *                                how much a specific preference should be weighted.
   * @returns An object with the same keys as the input preferencesImportance, where each value
   *          has been scaled to ensure the sum of all values equals the maximum total score,
   *          excluding preferences marked as None.
   */
  private calculateMaxValues(
    preferences: Preferences,
    preferencesImportance: PreferencesImportance
  ) {
    const totalImportance = Object.keys(preferencesImportance).reduce((total, key) => {
      const preferenceKey = key as keyof Preferences
      if (preferences[preferenceKey] !== 'None') {
        return total + preferencesImportance[preferenceKey]
      }
      return total
    }, 0)

    const scalingFactor = SchedulesRanker.MAX_TOTAL_SCORE / totalImportance
    // Now calculate the maxScores scaled to sum up to SchedulesRanker.MAX_TOTAL_SCORE
    const scaledMaxValues = Object.keys(preferencesImportance).reduce(
      (acc, key) => {
        const preferenceKey = key as keyof Preferences
        if (preferences[preferenceKey] !== 'None') {
          const importance = preferencesImportance[preferenceKey]
          acc[preferenceKey] = importance * scalingFactor
        } else {
          // Set to 0 or another appropriate value for preferences set to None
          acc[preferenceKey] = 0
        }
        return acc
      },
      {} as { [key in keyof PreferencesImportance]: number }
    )
    return scaledMaxValues
  }
  private calculateDaysOffScore(
    meta: ScheduleMeta,
    preferences: Preferences,
    analysis: AnalysisResult,
    maxScore: number
  ): number {
    if (!preferences.daysOff || preferences.daysOff === DaysOffPreference.None) return 0

    const maxDaysOffScore = maxScore
    const daysOffScore = this.getNormalizedScore({
      value: meta.daysOff.length,
      min: analysis.minDaysOff,
      max: analysis.maxDaysOff,
      normalizeTo: maxDaysOffScore
    })

    return preferences.daysOff === DaysOffPreference.More
      ? daysOffScore
      : maxDaysOffScore - daysOffScore
  }
  private calculateBreaksScore(
    meta: ScheduleMeta,
    preferences: Preferences,
    analysis: AnalysisResult,
    maxScore: number
  ): number {
    if (!preferences.breaks || preferences.breaks === BreaksPreference.None) return 0

    const maxBreaksScore = maxScore
    const breaksScore = this.getNormalizedScore({
      value: meta.totalbreaks,
      min: analysis.minTotalBreaks,
      max: analysis.maxTotalBreaks,
      normalizeTo: maxBreaksScore
    })

    return preferences.breaks === BreaksPreference.More ? breaksScore : maxBreaksScore - breaksScore
  }

  private calculateStartTimeScore(
    meta: ScheduleMeta,
    preferences: Preferences,
    analysis: AnalysisResult,
    maxScore: number
  ): number {
    if (!preferences.startTimePreference || preferences.startTimePreference === TimePreference.None)
      return 0

    const maxStartTimeScore = maxScore
    const startTimeScore = this.getNormalizedScore({
      value: meta.timings.earliestHour,
      min: analysis.minStartTime,
      max: analysis.maxStartTime,
      normalizeTo: maxStartTimeScore
    })

    return preferences.startTimePreference === TimePreference.Latest
      ? startTimeScore
      : maxStartTimeScore - startTimeScore
  }

  private calculateEndTimeScore(
    meta: ScheduleMeta,
    preferences: Preferences,
    analysis: AnalysisResult,
    maxScore: number
  ): number {
    if (!preferences.endTimePreference || preferences.endTimePreference === TimePreference.None)
      return 0

    const maxEndTimeScore = maxScore
    const endTimeScore = this.getNormalizedScore({
      value: meta.timings.latestHour,
      min: analysis.minEndTime,
      max: analysis.maxEndTime,
      normalizeTo: maxEndTimeScore
    })

    return preferences.endTimePreference === TimePreference.Latest
      ? endTimeScore
      : maxEndTimeScore - endTimeScore
  }

  private calculateScheduleLengthScore(
    meta: ScheduleMeta,
    preferences: Preferences,
    analysis: AnalysisResult,
    maxScore: number
  ): number {
    if (!preferences.scheduleLength || preferences.scheduleLength === ScheduleLengthPreference.None)
      return 0

    const maxScheduleLengthScore = maxScore
    const scheduleLengthScore = this.getNormalizedScore({
      value: meta.timings.timeDiff,
      min: analysis.minTimeDifference,
      max: analysis.maxTimeDifference,
      normalizeTo: maxScheduleLengthScore
    })

    return preferences.scheduleLength === ScheduleLengthPreference.Longer
      ? scheduleLengthScore
      : maxScheduleLengthScore - scheduleLengthScore
  }

  private getNormalizedScore({
    min,
    max,
    value,
    normalizeTo = 100
  }: {
    min: number
    max: number
    value: number
    normalizeTo?: number
  }): number {
    return ((value - min) / (max - min)) * normalizeTo
  }

  private getTotalBreaksBins(totalBreaks: number) {
    switch (true) {
      case totalBreaks === 0:
        return '0'
      case totalBreaks <= 100:
        return '1-100'
      case totalBreaks <= 200:
        return '101-200'
      case totalBreaks <= 300:
        return '201-300'
      case totalBreaks <= 400:
        return '301-400'
      case totalBreaks <= 500:
        return '401-500'
      case totalBreaks <= 600:
        return '501-600'
      case totalBreaks <= 700:
        return '601-700'
      case totalBreaks <= 800:
        return '701-800'
      case totalBreaks <= 900:
        return '801-900'
      case totalBreaks <= 1000:
        return '901-1000'
      default:
        return '1000+'
    }
  }
}
export interface AnalysisResult {
  averageStartTime: number
  averageEndTime: number
  averageTotalBreaks: number
  averageDaysOff: number
  averageTimeDifference: number
  maxTotalBreaks: number
  minTotalBreaks: number
  maxDaysOff: number
  minDaysOff: number
  maxStartTime: number
  minStartTime: number
  maxEndTime: number
  minEndTime: number
  minTimeDifference: number
  maxTimeDifference: number
  noOfDaysOff: {
    0: number
    1: number
    2: number
    3: number
    4: number
  }
  offDays: {
    [DaysArabic.sun]: number
    [DaysArabic.mon]: number
    [DaysArabic.tue]: number
    [DaysArabic.wed]: number
    [DaysArabic.thu]: number
  }
  scheduleLength: {
    [key: string]: number
  }
  totalBreaksOccurences: {
    [key: string]: number
  }
  startTimeOccurences: {
    [key: string]: number
  }
  endTimeOccurences: {
    [key: string]: number
  }
}
