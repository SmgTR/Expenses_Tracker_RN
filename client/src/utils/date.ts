export function getFormattedDate(timestamp: string | Date) {
  const date = new Date(timestamp);
  const monthBefore = date.getMonth() < 10 ? '0' : '';
  const dayBefore = date.getDate() < 10 ? '0' : '';
  return `${date.getFullYear()}-${monthBefore}${date.getMonth() + 1}-${dayBefore}${date.getDate()}`;
}

export function getDateMinusDays(timestamp: string | Date, days: number) {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
