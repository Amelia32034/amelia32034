/* global a3 */
/* global $ */
/* global _ */

a3.backendRestDb = (function () {
  var transform = function (data) {
    var result = _.map(data, function (item) {
      var dates = _.split(item.dates, '\n');
      _.remove(dates, function (entry) {
        return entry.trim() === '';
      });
      dates = dates.sort();
      var location = null;
      if (item.location[0]) {
        location = {
          name: item.location[0].name,
          address: item.location[0].address,
          googleMapsUrl: item.location[0].googleMapsUrl
        };
      }
      return {
        id: item._id,
        name: item.name,
        description: item.description,
        startDate: item.startDate.substring(0, 10),
        endDate: item.endDate.substring(0, 10),
        location: location,
        url: item.url,
        facebookUrl: item.facebookUrl,
        ticketsUrl: item.ticketsUrl,
        category: item.category,
        eventType: item.eventType,
        dates: dates
      };
    });
    return result;
  };

  var fetch = function (options) {
    var config = options.config;
    var success = options.success;
    var settings = {
      'async': true,
      'crossDomain': true,
      'url': config.restDbApiUrl + 'events?q={"endDate":{"$gte":{"$date":"$yesterday"}}}&sort=startDate',
      'method': 'GET',
      'headers': {
        'content-type': 'application/json',
        'x-apikey': config.restDbApiKey,
        'cache-control': 'no-cache'
      }
    };
    $.ajax(settings).done(function (response) {
      if (typeof success === 'function') {
        success(transform(response));
      }
    });
  };

  return {
    fetch: fetch
  };
})();
