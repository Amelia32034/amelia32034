/* global a3 */
/* global moment */
/* global $ */

a3.time = a3.time || {};

a3.time.isCurrentYear = function (date) {
  var m = moment(date, 'YYYY-MM-DD');
  var dateYear = m.format('YYYY');
  var thisYear = moment().format('YYYY');
  return dateYear === thisYear;
};

a3.time.getCalendarOptions = function (date) {
  return {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[last] dddd [at] LT',
    sameElse: a3.time.isCurrentYear(date) ? 'ddd, MMM D [at] LT' : 'll [at] LT'
  };
};

a3.time.getCalendarOptionsWithoutTime = function (date) {
  return {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[last] dddd',
    sameElse: a3.time.isCurrentYear(date) ? 'ddd, MMM D' : 'll'
  };
};

a3.time.formatCalendar = function (date) {
  return moment(date).calendar(null, a3.time.getCalendarOptions(date));
};

a3.time.calendarHighlights = [
  'Today', 'Tomorrow', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

a3.time.formatCalendarWithoutTime = function (date) {
  var result = moment(date).calendar(null, a3.time.getCalendarOptionsWithoutTime(date));
  if ($.inArray(result, a3.time.calendarHighlights) > -1) {
    result = '<span class="a3-today">' + result + '</span>';
  }
  return result;
};

a3.time.formatDate = function (date) {
  if (a3.time.isCurrentYear(date)) {
    return moment(date).format('MMM D');
  } else {
    return moment(date).format('ll');
  }
};

a3.time.formatDateRange = function (startDate, endDate) {
  if (startDate === endDate) {
    return a3.time.formatDate(startDate);
  } else {
    return a3.time.formatDate(startDate) + ' - ' + a3.time.formatDate(endDate);
  }
};

a3.time.getRemainingDates = function (dates) {
  var remainingDates = [];
  var now = moment();
  var startOfDay = now.startOf('day');
  for (var i = 0; i < dates.length; i++) {
    var value = dates[i];
    var date = moment(value);
    if (date >= startOfDay) {
      remainingDates.push({
        date: value,
        expiringSoon: date < now
      });
    }
  }
  return remainingDates;
  // var remainingDates = [];
  // var now = moment();
  // var startOfDay = moment().startOf('day');
  // jQuery.each(dates, function (index, value) {
  //     var date = moment(value);
  //     if (date >= startOfDay) {
  //         remainingDates.push({
  //             date: value,
  //             expiringSoon: date < now
  //         });
  //     }
  // });
  // return remainingDates;
};
