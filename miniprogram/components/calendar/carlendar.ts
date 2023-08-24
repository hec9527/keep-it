import { getCalendarMonthData } from "../../utils/calendar";
import { formatDateString } from "../../utils/util";

type NewCalendarCell = ICalendarCell & { text?: string; checked: boolean };

function mapper(
  monthDay: ICalendarCell[] | ICalendarCell,
  startData: string,
  endDate: string,
  selectDays: string[]
): NewCalendarCell | NewCalendarCell[] {
  if (Array.isArray(monthDay)) {
    return monthDay.map((item) =>
      mapper(item, startData, endDate, selectDays)
    ) as NewCalendarCell[];
  }
  const date = { ...monthDay } as NewCalendarCell;
  if (selectDays.includes(date.dateStr)) {
    date.checked = true;
  }

  const now = formatDateString(Date.now());
  if (date.dateStr === now) {
    date.text = "今日";
  }
  if (date.dateStr === startData) {
    date.text = "开始";
  } else if (date.dateStr === endDate) {
    date.text = "结束";
  }

  return date;
}

Component({
  properties: {
    year: String,
    month: String,
    selectDays: Array,
    startDate: String,
    endDate: String,
  },

  data: {
    monthDay: [] as NewCalendarCell[][],
    today: formatDateString(Date.now()),
  },

  observers: {
    selectDays() {
      // console.log(this.properties.selectDays, this.data.year, this.data.month);
      if (
        !this.properties.year ||
        !this.properties.month ||
        !this.properties.startDate ||
        !this.properties.endDate
      ) {
        return;
      }
      const monthDay = getCalendarMonthData(
        this.properties.year,
        this.properties.month
      ).map(
        (data) =>
          mapper(
            data,
            this.properties.startDate,
            this.properties.endDate,
            this.properties.selectDays
          ) as NewCalendarCell[]
      );

      this.setData({ monthDay });
    },
  },
});
