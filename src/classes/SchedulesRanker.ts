import { Days } from '../utils/enums'
import {
  BreaksPreference,
  DaysOffPreference,
  Preferences,
  ScheduleLengthPreference,
  ScheduleMeta,
  TimePreference,
  metaScore
} from '../utils/interfaces'
import Schedule from './Schedule'
export default class SchedulesRanker {
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

    this.schedules.forEach((schedule) => {
      const { meta } = schedule
      if (!meta) return
      totalStartTime += meta.timings.earliestHour
      totalEndTime += meta.timings.latestHour
      totalBreaks += meta.totalbreaks
      totalDaysOff += meta.daysOff.length
      totalTimeDifference += meta.timings.timeDiff

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
      maxTimeDifference
    }

    this.analysisResult = analysisResult

    return analysisResult
  }

  calculateScore(schedule: Schedule, preferences: Preferences): metaScore {
    const analysis = this.analysisResult

    if (!schedule.meta || !analysis) throw new Error('Schedule meta or analysis result is missing')

    const meta = schedule.meta

    const daysOffScore = this.calculateDaysOffScore(meta, preferences, analysis)
    const breaksScore = this.calculateBreaksScore(meta, preferences, analysis)
    const startTimeScore = this.calculateStartTimeScore(meta, preferences, analysis)
    const endTimeScore = this.calculateEndTimeScore(meta, preferences, analysis)
    const scheduleLengthScore = this.calculateScheduleLengthScore(meta, preferences, analysis)

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

  rankSchedules(preferences: Preferences): Schedule[] {
    // const preferences: Preferences = {
    //   breaks: BreaksPreference.Less,
    //   daysOff: DaysOffPreference.None,
    //   startTimePreference: TimePreference.Latest,
    //   endTimePreference: TimePreference.None,
    //   scheduleLength: ScheduleLengthPreference.Shorter
    // }
    // embed the score in the schedule object
    this.schedules.forEach((schedule) => {
      if (!schedule.meta) return
      schedule.meta.score = this.calculateScore(schedule, preferences)
    })

    // sort the schedules based on the score
    this.schedules.sort((a, b) => {
      if (!a.meta || !b.meta || !a.meta.score || !b.meta.score) return 0
      return b.meta.score.totalScore - a.meta.score.totalScore
    })

    return this.schedules
  }

  private calculateDaysOffScore(
    meta: ScheduleMeta,
    preferences: Preferences,
    analysis: AnalysisResult
  ): number {
    if (!preferences.daysOff || preferences.daysOff === DaysOffPreference.None) return 0

    const maxDaysOffScore = 30
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
    analysis: AnalysisResult
  ): number {
    if (!preferences.breaks || preferences.breaks === BreaksPreference.None) return 0

    const maxBreaksScore = 10
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
    analysis: AnalysisResult
  ): number {
    if (!preferences.startTimePreference || preferences.startTimePreference === TimePreference.None)
      return 0

    const maxStartTimeScore = 10
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
    analysis: AnalysisResult
  ): number {
    if (!preferences.endTimePreference || preferences.endTimePreference === TimePreference.None)
      return 0

    const maxEndTimeScore = 10
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
    analysis: AnalysisResult
  ): number {
    if (!preferences.scheduleLength || preferences.scheduleLength === ScheduleLengthPreference.None)
      return 0

    const maxScheduleLengthScore = 10
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
}
