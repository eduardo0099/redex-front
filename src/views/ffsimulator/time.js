class Time {
  static SECONDS = 'SECONDS';
  static MINUTES = 'MINUTES';
  static HOURS = "HOURS";
}

const buildTime = (value, type) => {
  switch (type) {
    case Time.SECONDS:
      return value * 1000;
    case Time.MINUTES:
      return value * 60 * 1000;
    case Time.HOURS:
      return value * 60 * 60 * 1000;
  }
}

const PRINT_TIME_OPTIONS = { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

const printTime = (time) => {
  if (typeof time === Date) {
    return time.toLocaleDateString('es-MX', PRINT_TIME_OPTIONS);
  } else {
    return new Date(time).toLocaleDateString('es-MX', PRINT_TIME_OPTIONS);
  }
}

function msToTime(s) {
  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;

  return  mins + 'm ' + secs + 's ' + ms +'ms';
}

export {
  Time, buildTime, printTime, msToTime
}