/* global a3 */

a3.utilities = a3.utilities || {};

a3.utilities.spacer = "<span class='a3-spacer'></span>";

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
      mdIcon: 'music_note',
      symbol: 'M'
    };
  } else if (event.eventType === 'TheaterEvent') {
    return {
      eventType: 'TheaterEvent',
      label: 'Theatre',
      color: 'blue',
      icon: '<i class="fas fa-theater-masks"></i>',
      mdIcon: 'local_play',
      symbol: 'T'
    };
  } else {
    return {
      eventType: 'Event',
      label: 'Other',
      color: 'yellow',
      icon: '<i class="fas fa-calendar-alt"></i>',
      mdIcon: 'event',
      symbol: 'O'
    };
  }
};
