'use strict';
/* global a3 */
/* global moment */
/* global $ */
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

  function Chip (props) {
    var text = props.text || '';
    var color = props.color || '';
    var className = props.className || '';
    return a3.mdl.chip({
      text: text,
      className: className + (color ? (' bg-' + color + ' border-' + color) : '')
    });
  }

  // resetChipCollection & toggleChipCollection are a
  // bad alternative to using a React Component, but
  // because the code here cannot be transpiled, has
  // to be vanilla JS, and therefore cannot use the
  // keyword class, this is the option we use for now.

  function resetChipCollection () {
    $('.chip-collapsible').addClass('chip-collapsed');
    $('.chip-collection-collapse').addClass('chip-collapsed');
    $('.chip-collection-expand').removeClass('chip-collapsed');
  }

  function toggleChipCollection () {
    $('.chip-collapsible').toggleClass('chip-collapsed');
    $('.chip-collection-collapse').toggleClass('chip-collapsed');
    $('.chip-collection-expand').toggleClass('chip-collapsed');
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
            className: 'chip-collection-collapse chip-collapsed bg-clear border-grey',
            iconClassName: 'fas fa-chevron-left',
            text: 'show less'
          }), e(
          Chip, {
            className: 'chip-collection-expand bg-clear border-grey',
            text: '+ ' + hiddenCount + ' more'
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

  function getEventDatesForList (event) {
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
          e(
            'span', {
              className: 'nowrap'
            },
            calDisplay,
            leftCount > 1 ? ' + ' + (leftCount - 1) + ' more' : ''
          )
        );
      } else {
        dates = calDisplay;
      }
    }
    return dates;
  }

  function EventList (props) {
    var events = props.events;
    var eventId = props.eventId;
    return e(
      'div', {
        className: 'a3-event-list'
      },
      a3.mdl.list({
        items: events,
        divider: true,
        getActive: function (event) {
          return eventId === event.id;
        },
        getIconInfo: function (event) {
          var eventTypeAttributes = a3.utilities.getEventTypeAttributes(event);
          return {
            icon: eventTypeAttributes.mdIcon,
            color: eventTypeAttributes.color
          };
        },
        getLine1: function (event) {
          return event.name;
        },
        getLine2: function (event) {
          return e('span', null, event.location.name, e('br'), getEventDatesForList(event));
        },
        onItemClick: function (event) {
          navigateToEvent(event.id);
        }
      })
    );
  }

  function EventDetails (props) {
    return e(
      'div', {
        className: 'a3-event-details'
      },
      e(
        'div', {
          className: 'a3-event-details-content'
        },
        a3.mdl.eventCard({
          event: props.event,
          shadow: false,
          fullWidth: true,
          eventDetailsEventDates: e(EventDetailsEventDates, { event: props.event }),
          eventDetailsEventType: e(EventDetailsEventType, { event: props.event })
        })
      )
    );
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
      eventTypeAttributes.label === event.category ? null : e(
        Chip, {
          text: event.category,
          color: 'clear'
        }));
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
          'div', {
            className: 'remaining-dates-title'
          },
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
                  className: 'bg-clear border-grey date-chip'
                  // className: item.expiringSoon ? 'bg-clear border-red' : 'bg-clear border-grey'
                };
              }
            })));
    }
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

  function getHeaderTitle (props) {
    var homeTitle = e(
      'span',
      null,
      e(
        'span', {
          className: 'a3-logo cursor-pointer',
          onClick: function (e) {
            e.preventDefault();
            navigateToEvents();
          }
        },
        'Amelia 32034'));
    return !props.eventId // Type is a UID, so no risk of have a zero value
      ? homeTitle
      : e(
        'span',
        null,
        e('span', { className: 'md-and-up' }, homeTitle),
        e(
          'span', {
            className: 'sm-and-down cursor-pointer',
            onClick: function (e) {
              e.preventDefault();
              navigateToEvents();
            }
          },
          a3.mdl.icon({ name: 'arrow_back' })
        ));
  }

  function App (props) {
    var events = removeExpiredEvents(props.events);
    var eventId = props.eventId;
    // Not sure where/when to update the title... So this should do for now.
    if (eventId) {
      var event = _.find(events, function (event) {
        return eventId === event.id;
      });
      if (event) {
        document.title = event.name + a3.config.documentTitleSuffix;
      }
    }
    return e(
      'div', {
        className: 'a3-app'
      },
      a3.mdl.layout({
        title: getHeaderTitle(props),
        className: 'a3-main-layout',
        content: e(
          EventSplitView, {
            events: events,
            eventId: eventId
          })
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
                eventId: id.trim() // parseInt(id.trim())
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
      $(window).trigger('hashchange');
    }
    $(window).on('hashchange', handleRouteChange).trigger('hashchange');
    backend.fetch({
      config: a3.config,
      success: function (data) {
        eventsData = data;
        window.localStorage.setItem('eventsData', JSON.stringify(eventsData));
        $(window).trigger('hashchange');
      }
    });
  }

  return {
    run: run
  };
})();
