'use strict';
/* global a3 */
/* global moment */
/* global jQuery */
/* global React */
/* global ReactDOM */
/* global _ */

var Amelia32034 = (function () { // eslint-disable-line no-unused-vars
  var eventsData = [];

  var navigateToEvents = function () {
    window.location.hash = 'events/';
  };

  var navigateToEvent = function (eventId) {
    window.location.hash = 'events/' + eventId;
  };

  var e = React.createElement;

  var KeyGen = (function () {
    var key = 0;
    return {
      getKey: function () {
        return 'a3e-' + key++;
      }
    };
  })();

  function Spacer () {
    return e('span',
      {
        className: 'a3-spacer'
      }
    );
  }

  function Chip (props) {
    var iconClassName = props.iconClassName || '';
    var text = props.text || '';
    var color = props.color || '';
    var className = props.className || '';
    var onClick = props.onClick || null;

    function handleClick (e) {
      e.preventDefault();
      if (typeof onClick === 'function') {
        onClick();
      }
    }

    return e(
      'span', {
        className: 'a3-badge ' + color + ' ' + className,
        onClick: handleClick
      },
      iconClassName ? e('i', { className: iconClassName }) : null,
      text
    );
  }

  // resetChipCollection & toggleChipCollection are a
  // bad alternative to using a React Component, but
  // because the code here cannot be transpiled, has
  // to be vanilla JS, and therefore cannot use the
  // keyword class, this is the option we use for now.

  function resetChipCollection () {
    jQuery('.chip-collapsible').addClass('chip-collapsed');
    jQuery('.chip-collection-collapse').addClass('chip-collapsed');
    jQuery('.chip-collection-expand').removeClass('chip-collapsed');
  }

  function toggleChipCollection () {
    jQuery('.chip-collapsible').toggleClass('chip-collapsed');
    jQuery('.chip-collection-collapse').toggleClass('chip-collapsed');
    jQuery('.chip-collection-expand').toggleClass('chip-collapsed');
  }

  function ChipCollection (props) {
    function toggleExpand (e) {
      e.preventDefault();
      toggleChipCollection();
    }

    var maxVisible = props.maxVisible || 3;
    var items = props.items;
    var hiddenCount = props.items.length - maxVisible;

    var toggle = null;
    if (hiddenCount > 0) {
      toggle = e(
        'span',
        null,
        e(
          Chip, {
            className: 'chip-collection-collapse chip-collapsed',
            iconClassName: 'fas fa-chevron-left',
            text: ' Collapse'
          }), e(
          Chip, {
            className: 'chip-collection-expand',
            text: '+' + hiddenCount + ' more'
          }));
    }

    return e('div', null,
      _.map(items, function (item, index) {
        return e(
          'span', {
            className: index >= maxVisible ? 'chip-collapsible chip-collapsed fade-in' : ''
          },
          e(Chip, props.getChipProps(item, index)),
          e('span', null, ' '));
      }),
      e(
        'span', {
          className: 'cursor-pointer',
          onClick: toggleExpand
        },
        toggle));
  }

  function EventListItem (props) {
    props = props || {};
    var event = props.event || {};
    var active = props.active || false;
    // Not sure where/when to update the title... So this should do for now.
    if (active) {
      document.title = event.name + a3.config.documentTitleSuffix;
    }
    var eventTypeAttributes = a3.utilities.getEventTypeAttributes(event);
    var dates = null;
    if (event.dates.length <= 0) {
      dates = e('span', null, a3.time.formatDateRange(event.startDate, event.endDate));
    } else {
      var startOfDay = moment().startOf('day');
      var allCount = event.dates.length;
      var leftCount = 0;
      var calDisplay = null;
      for (var i = 0, len = event.dates.length; i < len; i++) {
        var value = event.dates[i];
        var date = moment(value);
        if (date >= startOfDay) {
          if (leftCount === 0) { // first iteration
            calDisplay = e(
              'span', {
                dangerouslySetInnerHTML: {
                  __html: a3.time.formatCalendarWithoutTime(value)
                }
              });
          }
          leftCount++;
        }
      }
      if (allCount > 1) {
        dates = e('span', null,
          a3.time.formatDateRange(event.startDate, event.endDate),
          ' · ',
          e(
            'span', {
              className: 'nowrap'
            },
            calDisplay,
            leftCount > 1 ? ' +' + (leftCount - 1) : ''
          ));
      } else {
        dates = calDisplay;
      }
    }
    return e(
      'li', {
        className: 'li-Event ripple li-eventtype-' + event.eventType + (active ? ' active ' : ''),
        id: 'event-' + event.id,
        onClick: function (e) {
          e.preventDefault();
          navigateToEvent(event.id);
        }
      },
      e(
        'div', {
          className: 'li-event-icon',
          dangerouslySetInnerHTML: {
            __html: eventTypeAttributes.icon
          }
        }),
      e(
        'div', {
          className: 'li-event-name'
        },
        event.name),
      e(
        'div', {
          className: 'li-event-location'
        },
        event.location),
      e(
        'div', {
          className: 'li-event-startDate'
        },
        dates)
    );
  }

  function EventList (props) {
    var events = props.events;
    var eventId = props.eventId;
    return e(
      'div', {
        className: 'a3-event-list'
      },
      e(
        'ul', {
          className: 'events-list'
        },
        _.map(events, function (event) {
          return e(
            EventListItem, {
              event: event,
              active: eventId === event.id
            })
          ;
        })));
  }

  function EventDetails (props) {
    return e(
      'div', {
        className: 'a3-event-details'
      },
      e(
        'div', {
          className: 'a3-modal-toolbar-top',
          onClick: function (e) {
            e.preventDefault();
            navigateToEvents();
          }
        },
        e(
          'i', {
            className: 'fas fa-arrow-left'
          }),
        e(Spacer),
        'All events'
      ),
      e('h2', null, props.event.name),
      e('hr'),
      e(EventDetailsEventType, { event: props.event }),
      e('div', null, props.event.location),
      e(EventDetailsEventDates, { event: props.event }),
      e('hr'),
      e('div', { dangerouslySetInnerHTML: { __html: props.event.description } }),
      e(EventDetailsEventUrls, { event: props.event }));
  }

  function EventDetailsEventType (props) {
    var event = props.event;
    var eventTypeAttributes = a3.utilities.getEventTypeAttributes(event);
    return e(
      'div', {
        className: 'a3-event-details-event-type'
      },
      e(
        Chip, {
          text: eventTypeAttributes.label,
          color: eventTypeAttributes.color
        }),
      e(Spacer),
      event.category);
  }

  function EventDetailsEventDates (props) {
    var event = props.event;

    var key = KeyGen.getKey();

    if (event.dates.length <= 0) {
      return e(
        'div', {
          className: 'a3-event-details-event-dates'
        },
        a3.time.formatDateRange(event.startDate, event.endDate));
    } else {
      var remainingDates = a3.time.getRemainingDates(event.dates);
      var leftCount = remainingDates.length;
      var allCount = event.dates.length;

      var dates = null;
      if (allCount > 1) {
        var left = (allCount === leftCount) ? '' : ' left';
        dates = e(
          'div',
          null,
          a3.time.formatDateRange(event.startDate, event.endDate) + ' · ' +
          leftCount + ' ' + a3.utilities.pluralize('date', 'dates', leftCount) + left);
      }

      return e(
        'div', {
          className: 'a3-event-details-event-dates'
        },
        dates,
        e(
          'div', {
            className: 'remaining-dates' + ' ' + key
          },
          e(
            ChipCollection, {
              items: remainingDates,
              getChipProps: function (item, index) {
                return {
                  text: a3.time.formatCalendar(item.date),
                  color: item.expiringSoon ? 'red' : ''
                };
              }
            })));
    }
  }

  function UrlIcon (props) {
    var url = props.url;
    var title = props.title;
    var color = props.color;
    var icon = props.icon;
    return e(
      'div', {
        className: 'a3-event-details-event-url'
      },
      e(
        'a', {
          href: url,
          title: title
        },
        e(
          'i', {
            className: 'a3-event-details-event-url-icon color-' + color + ' ' + icon + ' fa-2x'
          }),
        e(
          'span', {
            className: 'a3-event-details-event-url-title'
          },
          title)));
  }

  function EventDetailsEventUrls (props) {
    var event = props.event;
    if (!event.url && !event.facebookUrl) {
      return null;
    }
    var urls = [];
    if (event.url) {
      urls.push(UrlIcon({
        url: event.url,
        title: 'Tickets and more information',
        color: 'yellow',
        icon: 'fas fa-ticket-alt'
      }));
    }
    if (event.facebookUrl) {
      urls.push(UrlIcon({
        url: event.facebookUrl,
        title: 'Facebook Page',
        color: 'blue',
        icon: 'fab fa-facebook-square'
      }));
    }
    return e(
      'div', {
        className: 'a3-event-details-event-urls'
      },
      e('hr'),
      e(
        'div', {
          className: 'event-urls'
        },
        urls));
  }

  function EventSplitView (props) {
    var events = props.events;
    var eventId = props.eventId;
    var event = _.find(events, function (item) {
      return item.id === eventId;
    });
    var eventDetails = null;
    if (event) {
      eventDetails = e(
        EventDetails, {
          event: event
        });
    }
    return e(
      'div', {
        className: 'a3-event-split-view'
      },
      e(
        EventList, {
          events: events,
          eventId: eventId
        }),
      e(
        'div', {
          id: 'a3-event-details-container'
        },
        eventDetails));
  }

  function App (props) {
    var events = removeExpiredEvents(props.events);
    return e(
      'div', {
        className: 'a3-app'
      },
      e(
        EventSplitView, {
          events: events,
          eventId: props.eventId
        }));
  }

  /**
     * Remove expired events.
     * Useful when looking at cached data or a static json file.
     */
  function removeExpiredEvents (events) {
    var startOfDay = moment().startOf('day');
    return _.filter(events, function (event) {
      var endDate = moment(event.endDate);
      return endDate >= startOfDay;
    });
  }

  function resetComponents () {
    resetChipCollection();
  }

  function handleRouteChange () {
    var data = eventsData;
    var url = decodeURI(window.location.hash);
    // See: https://tutorialzine.com/2015/02/single-page-app-without-a-framework
    var keyword = url.split('/')[0];
    var map = {
      '': function () {
        ReactDOM.render(
          e(
            App, {
              events: data
            }),
          document.getElementById('root'));
      },
      '#events': function () {
        var id = url.split('#events/')[1];
        if (typeof id !== 'undefined') {
          resetComponents();
          ReactDOM.render(
            e(
              App, {
                events: data,
                // eventId: parseInt(id.trim())
                eventId: id.trim()
              }),
            document.getElementById('root'));
        } else {
          ReactDOM.render(
            e(
              App, {
                events: data
              }),
            document.getElementById('root'));
        }
      }
    };
    if (map[keyword]) {
      map[keyword]();
    }
  }

  function run (options) {
    var backend = options.backend;
    eventsData = JSON.parse(window.localStorage.getItem('eventsData'));
    if (eventsData !== null) {
      jQuery(window).trigger('hashchange');
    }
    jQuery(window).on('hashchange', handleRouteChange).trigger('hashchange');
    backend.fetch({
      config: a3.config,
      success: function (data) {
        eventsData = data;
        window.localStorage.setItem('eventsData', JSON.stringify(eventsData));
        jQuery(window).trigger('hashchange');
      }
    });

    // jQuery.getJSON(a3.config.apiUrl, function (data) {
    //   eventsData = data;
    //   jQuery(window).trigger('hashchange');
    // });
  }

  return {
    run: run
  };
})();
