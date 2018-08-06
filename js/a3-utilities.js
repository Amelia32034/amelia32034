/* global a3 */
/* global jQuery */

a3.utilities = a3.utilities || {};

a3.utilities.spacer = "<span class='a3-spacer'></span>";

a3.utilities.findById = function (arr, id) {
  if (typeof arr.find === 'function') {
    return arr.find(function (item) {
      return item.id === id;
    });
  } else {
    return jQuery.grep(arr, function (item) {
      return item.id === id;
    })[0];
  }
};

a3.utilities.pluralize = function (strSingular, strPlural, count) {
  return count === 1 ? strSingular : strPlural;
};

a3.utilities.getEventTypeAttributes = function (event) {
  if (event.eventType === 'MusicEvent') {
    return {
      eventType: 'MusicEvent',
      label: 'Music',
      color: 'red',
      icon: '<i class="fas fa-music"></i>',
      symbol: 'M'
    };
  } else if (event.eventType === 'TheaterEvent') {
    return {
      eventType: 'TheaterEvent',
      label: 'Theatre',
      color: 'blue',
      icon: '<i class="fas fa-theater-masks"></i>',
      symbol: 'T'
    };
  } else {
    return {
      eventType: 'Event',
      label: 'Other',
      color: 'yellow',
      icon: '<i class="fas fa-calendar-alt"></i>',
      symbol: 'O'
    };
  }
};
