function formatDateTime(date: Date, format): string {
  return new Intl.DateTimeFormat('en-GB', format).format(date)
}
function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime())
}

export function formatDate(
  date: Date | string,
  format = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
  const dt = new Date(date)
  return isValidDate(dt) ? formatDateTime(dt, format) : ''
}
