import moment from "moment-timezone";
const queryString = require('query-string');
export const appendScript = (scriptToAppend) => {
  const script = document.createElement("script");
  script.src = scriptToAppend;
  script.async = true;
  document.body.appendChild(script);
};
export const removeScript = (scriptToremove) => {
  let allsuspects = document.getElementsByTagName("script");
  for (let i = allsuspects.length; i >= 0; i--) {
    if (
      allsuspects[i] &&
      allsuspects[i].getAttribute("src") !== null &&
      allsuspects[i].getAttribute("src").indexOf(`${scriptToremove}`) !== -1
    ) {
      allsuspects[i].parentNode.removeChild(allsuspects[i]);
    }
  }
};
export const convertToSlug = (Text) => {
    return Text
        .toLowerCase()
        .replace(/ /g,'_')
        .replace(/[^\w-]+/g,'')
        ;
};
export const queryStringParse = (Text) => {
  return queryString.parse(Text);
};
export const dynamicSort = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}
export const disableAllLog = () => {
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.info = function () {};
}
// STORE THEME
export const setTheme = (theme) => {
  localStorage.setItem('theme', JSON.stringify(theme))
}
// GET THEME
export const getTheme = () => {
  return JSON.parse(localStorage.getItem('theme'));
}

// GET DURATION
export const getDateDurationTextOld = (startTime,endTime) => {
  // let years = endTime.diff(moment(startTime), 'years');
  // let months = endTime.diff(moment(startTime), 'months');
  // let days = endTime.diff(moment(startTime), 'days');
  // let f = `${years}y ${months}m ${days}d`;

  let currentYear = endTime.format('YYYY');
  let currentMonth = endTime.format('M');
  let currentDay = endTime.format('D');

  let startYear = moment(startTime).format('YYYY');
  let startMonth = moment(startTime).format('M');
  let startDay = moment(startTime).format('D');

  let finalYear = diff(currentYear, startYear) ;
  let finalMonth = diff(currentMonth, startMonth) ;
  let finalDay = diff(currentDay, startDay) ;

  // let yearText = finalYear > 1 ? "years" : "year";
  // let monthText = finalMonth > 1 ? "months" : "month";
  // let dayText = finalDay > 1 ? "days" : "day";

  let f = `N/A`;
  if(isNaN(finalYear) || isNaN(finalMonth) || isNaN(finalDay) ) {
    f = `N/A`;
  }
  else {
    f = `${finalYear}${'y'} ${finalMonth}${'m'} ${finalDay}${'d'}`;    
  }
  return f;
}

export const getDateDurationText = (startTime,endTime) => {
  let countdays = endTime.diff(moment(startTime), 'days');
  let f = `N/A`;
  if(isNaN(countdays)) {
    f = `N/A`;
  }
  else {
    let numberOfDays = countdays + 1;
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor(numberOfDays % 365 / 30);
    var days = Math.floor(numberOfDays % 365 % 30);

    var yearsDisplay = years > 0 ? years + (years == 1 ? "year" : "years") : "";
    var monthsDisplay = months > 0 ? months + (months == 1 ? "month" : "months") : "";
    var daysDisplay = days > 0 ? days + (days == 1 ? "day" : "days") : "";

    f = `${years}y ${months}m ${days}d`;
  }
  return f;
}

const diff = (a, b) => {
  return Math.abs(a - b);
}