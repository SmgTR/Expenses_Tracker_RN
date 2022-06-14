export function getFormattedDate(date: Date) {
  const monthBefore = date.getMonth() < 10 ? '0' : '';
  const dayBefore = date.getDate() < 10 ? '0' : '';
  return `${date.getFullYear()}-${monthBefore}${date.getMonth() + 1}-${dayBefore}${date.getDate()}`;
}
