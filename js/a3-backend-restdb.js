/* global a3 */
/* global jQuery */
/* global _ */

a3.backendRestDb = (function () {
  var transform = function (data) {
    var result = data.map(function (item) {
      var dates = _.split(item.dates, '\n');
      _.remove(dates, function (entry) {
        return entry.trim() === '';
      });
      return {
        id: item._id,
        name: item.name,
        description: item.description,
        startDate: item.startDate.substring(0, 10),
        endDate: item.endDate.substring(0, 10),
        location: item.location[0].name,
        url: item.url,
        facebookUrl: item.facebookUrl,
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
      'url': config.restDbApiUrl + 'events?q={"endDate":{"$gt":{"$date":"$tomorrow"}}}&sort=startDate',
      'method': 'GET',
      'headers': {
        'content-type': 'application/json',
        'x-apikey': config.restDbApiKey,
        'cache-control': 'no-cache'
      }
    };
    jQuery.ajax(settings).done(function (response) {
      if (typeof success === 'function') {
        success(transform(response));
      }
    });
  };

  return {
    fetch: fetch
  };
})();