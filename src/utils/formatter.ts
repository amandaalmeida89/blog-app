export const parsedNumber = (number: number, targetLength: number, padString: string) => {
  return number.toString().padStart(targetLength, padString);
};

export const parsedData = (date: string) => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear();

  const parsedData = (value: number) => {
    return parsedNumber(value || 1, 2, '0')
  }

  return {
    day: parsedData(day),
    month: parsedData(month),
    year
  }
};

export const formattedDate = (date: string) => {
  const formatted = parsedData(date)
  const { day, month, year } = formatted || {}
  return `${month}.${day}.${year}`
}