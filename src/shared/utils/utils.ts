export const generateUnixTimeStamp = (date: Date) => {
    return date.getTime()
}

export const calculateExpiration = (date: number, currentDate: number) => {
    return date < currentDate
}

export const addDaysToTimeStamp = (days: number, currentTimeStamp: number) => {
    const daysInTimeStamp = days * 24 * 60 * 60 * 1000
    return currentTimeStamp + daysInTimeStamp
}
