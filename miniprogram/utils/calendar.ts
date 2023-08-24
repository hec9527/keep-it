import { addDay, formatDateString } from "./util";

const getCalendarCellDate = (date: Date): ICalendarCell => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
    dateStr: formatDateString(date),
  };
};

export const getCalendarMonthData = (
  year: string | number,
  month: string | number
) => {
  const date = new Date(`${year}/${month}/1`);
  const monthDays: ICalendarCell[][] = [];
  const lastDayOfMonth = addDay(new Date(`${year}/${+month + 1}/1`), -1); // 当前月的最后一天， 根据最后一天是星期几，确定后面需要补几天
  const lastDay = addDay(lastDayOfMonth, 7 - lastDayOfMonth.getDay()); // 日历最后一天
  let thisday = addDay(date, -date.getDay() + 1); // 日历第一天(从星期一开始算) ，可能是上个月的月末

  while (thisday.getTime() <= lastDay.getTime()) {
    if (thisday.getDay() === 1 || monthDays.length === 0) {
      const arr = [getCalendarCellDate(thisday)];
      monthDays.push(arr);
    } else {
      monthDays[monthDays.length - 1].push(getCalendarCellDate(thisday));
    }
    thisday = addDay(thisday, 1);
  }

  console.log(monthDays);

  return monthDays;
};
