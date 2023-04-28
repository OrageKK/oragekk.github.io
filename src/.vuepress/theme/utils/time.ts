export const show_runtime = (): void => {
  const startTime = new Date("10/31/2016 10:00:00").toString();
  window.setTimeout(show_runtime, 1000);
  const longtime = calculateTimePassed(startTime);
  const el = document.getElementById("runtime_span");
  el && (el.innerHTML = `小破站已萌萌哒运行: ${longtime}`);
};

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const calculateTimePassed = (startTime: string): string => {
  const start = new Date(startTime);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  // Adjust for days
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }

  // Adjust for leap years
  let leapDays = 0;
  for (let i = start.getFullYear(); i <= now.getFullYear(); i++) {
    if (isLeapYear(i)) {
      leapDays++;
    }
  }
  days += leapDays;

  // Adjust for months
  if (days < 0) {
    const previousMonth = now.getMonth() - 1 < 0 ? 11 : now.getMonth() - 1;
    const daysInPreviousMonth = new Date(
      now.getFullYear(),
      previousMonth + 1,
      0
    ).getDate();
    days += daysInPreviousMonth;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return `${years}年${months}个月${days}天${hours}时${minutes}分${seconds}秒`;
};
