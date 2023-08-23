export const ONE_DAY = 24 * 60 * 60 * 1000;
export const ONE_WEEK = 7 * ONE_DAY;

export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

export const formatDateString = (date: string | number) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return [year, month, day].map(formatNumber).join("-");
};

export const getDaysFromNow = (days = 0) => {
  return formatDateString(+new Date() + ONE_DAY * days);
};

export const getPlanStatus = (
  startDate: string,
  endDate: string
): IPlanStatus => {
  const nDate = +new Date(endDate);
  const sDate = +new Date(startDate);
  const now = +new Date();
  if (now < sDate) {
    return "await";
  }
  if (sDate < nDate) {
    return "process";
  }
  return "done";
};

export const cls = (...args: ClsParams): string => {
  const res: string[] = [];

  args.forEach((arg) => {
    const type = typeof arg;
    if (type === "number" || type === "string") {
      res.push(arg.toString());
    } else if (arg.constructor === Array) {
      res.push(cls(arg));
    } else if (type === "object" && type != null) {
      Object.keys(arg).forEach((key) => {
        const value = (arg as ClsObject)[key];
        if (value) {
          res.push(key);
        }
      });
    }
  });
  return res.join(" ");
};

export const getCover = (type: string) => {
  switch (type) {
    case "阅读":
      return "/asserts/image/read.jpg";
    case "运动":
      return "/asserts/image/run.jpg";
    case "其他":
      return "/asserts/image/run1.jpg";
    default:
      throw new Error("未知的计划类型");
  }
};

export const getDiffDays = (startTime: string, endTime: string) => {
  const sDate = new Date(startTime);
  const nDate = new Date(endTime);
  return (+nDate - +sDate) / ONE_DAY;
};

export const calcProgress = (
  intervel: string,
  startTime: string,
  endTime: string
) => {
  const sData = new Date(startTime);
  const nData = new Date(endTime);
  const now = new Date();

  if (+now >= +nData) {
    return 1;
  }

  switch (intervel) {
    case "每天":
      const diffDays = (+nData - +sData) / ONE_DAY;
      const passDays = (+now - +sData) / ONE_DAY;
      return passDays / diffDays;
    case "每周":
      const diffWeek = Math.ceil((+nData - +sData) / ONE_WEEK);
      const passWeek = Math.floor((+now - +sData) / ONE_WEEK);
      return passWeek / diffWeek;
    case "每月":
      const diffYear = nData.getFullYear() - sData.getFullYear();
      const diffMonth = nData.getMonth() - sData.getMonth();
      const diffM = diffYear * 12 + diffMonth;
      const passYear = now.getFullYear() - sData.getFullYear();
      const passMonth = now.getMonth() - now.getMonth();
      const passM = passYear * 12 - passMonth;
      return passM / diffM;
    case "工作日":
      let s = sData;
      let all = 0;
      let pass = 0;

      while (1) {
        if (+s >= +nData) break;
        if (+s < +now) {
          pass++;
        }
        if (s.getDay() > 0 && s.getDay() < 6) {
          all++;
        }
        s = new Date(+s + ONE_DAY);
      }

      return pass / all;
    default:
      console.warn(`未知的时间间隔:${intervel}`);
      return 1;
  }
};
