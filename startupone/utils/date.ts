export function getMaxBirthDate(): Date {
    const now = new Date()
    let limit = new Date(now)

    limit.setFullYear(now.getFullYear() - 12)

    return limit
}