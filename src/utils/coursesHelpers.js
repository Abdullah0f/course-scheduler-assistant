export function filterCoursesWithNonEmptyPeriods(courses) {
    const filteredCourses = {}

    Object.keys(courses).forEach(courseCode => {
        const filteredSections = courses[courseCode].filter(section => section.periods.length > 0)

        if (filteredSections.length > 0) {
        filteredCourses[courseCode] = filteredSections
        }
    })
    return filteredCourses
}