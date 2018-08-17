/* global a3 */
/* global _ */
/* global React */

a3.mdl = (function () {
  var e = React.createElement;

  var createButton = function (props) {
    return e(
      'button', {
        className: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary'
      },
      props.text
    );
  };

  var createLayout = function (props) {
    return e(
      'div', {
        className: 'mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button' + ' ' + props.className
      },
      e(
        'header', {
          className: 'mdl-layout__header'
        },
        e(
          'div', {
            className: 'mdl-layout__header-row'
          },
          e(
            'span', {
              className: 'mdl-layout-title'
            },
            props.title)
        )),
      e(
        'main', {
          className: 'mdl-layout__content'
        },
        e(
          'div', {
            className: 'page-content'
          },
          props.content)));
  };

  var createChip = function (props) {
    return e(
      'span', {
        className: 'mdl-chip' + ' ' + props.className
      },
      e(
        'span', {
          className: 'mdl-chip__text'
        },
        props.text
      ));
  };

  var createIcon = function (props) {
    return e(
      'i', {
        className: 'material-icons'
      },
      props.name
    );
  };

  var createSimpleList = function (props) {
    var items = props.items;

    return e('ul', { className: 'mdl-list' }, _.map(items, function (item, index) {
      return e(
        'li', {
          className: 'mdl-list__item simple-list'
        }, e(
          'span', { className: 'mdl-list__item-primary-content' },
          e('i', { className: 'material-icons mdl-list__item-icon' }, item.icon),
          e('div', { className: 'simple-list-text' }, item.text)
        ));
    }));
  };

  var createList = function (props) {
    var items = props.items;
    var getIconInfo = props.getIconInfo;
    var getActive = props.getActive;
    var getLine1 = props.getLine1;
    var getLine2 = props.getLine2;
    var dividerClass = props.divider ? ' has-divider ' : '';
    var onItemClick = props.onItemClick;
    return e('ul', { className: 'mdl-list' }, _.map(items, function (item, index) {
      var iconInfo = getIconInfo(item);
      var active = getActive(item) ? ' active ' : '';
      return e('li', {
        className: 'mdl-list__item mdl-list__item--three-line' + dividerClass + ' cursor-pointer ' + active,
        onClick: function (e) {
          e.preventDefault();
          onItemClick(item);
        }
      },
      e('span', { className: 'mdl-list__item-primary-content' },
        e('i', { className: 'material-icons mdl-list__item-avatar bg-' + iconInfo.color }, iconInfo.icon),
        e('span', { className: 'a3-mdl-list__item-title' }, getLine1(item)),
        e('span', { className: 'mdl-list__item-text-body' }, getLine2(item))
      )
        // e('span', { className: 'mdl-list__item-secondary-content' },
        //   e('a', { className: 'mdl-list__item-secondary-action', href: '#' }, createIcon({ name: 'star' }))
        // ),
      );
    }));
  };

  var createDividerInset = function (props) {
    return e('hr', { className: 'divider-inset' });
  };

  // Sigh
  // https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746
  var nl2br = function (str) {
    return str.split('\n').map(function (item, key) {
      return e('span', { key: key }, item, e('br'));
    });
  };

  var createEventCard = function (props) {
    var event = props.event;
    var shadow = typeof props.shadow === 'boolean' ? props.shadow : true;
    var shadowClassName = shadow ? ' mdl-shadow--2dp ' : '';
    var fullWidth = typeof props.fullWidth === 'boolean' ? props.fullWidth : false;
    var fullWidthClassName = fullWidth ? ' full-width ' : '';
    var eventDetailsEventType = props.eventDetailsEventType;
    var eventDetailsEventDates = props.eventDetailsEventDates;
    var bottomItems = [];
    bottomItems.push({
      icon: 'access_time',
      text: e('p', { className: 'margin-bottom-none' }, eventDetailsEventDates)
    });
    var map = event.location.googleMapsUrl
      ? e('a', { className: 'smaller', href: event.location.googleMapsUrl, title: 'Map' }, 'Map')
      : null;
    bottomItems.push({
      icon: 'location_on',
      text: e(
        'p', {
          className: 'margin-bottom-none'
        },
        event.location.name,
        e('div', { className: 'color-grey smaller' }, event.location.address),
        map)
    });
    if (event.ticketsUrl) {
      bottomItems.push({
        icon: 'local_offer',
        text: e(
          'p',
          { className: 'margin-bottom-none' },
          e('a', { href: event.ticketsUrl, title: 'Tickets' }, 'Tickets')
        )
      });
    }
    bottomItems.push({
      icon: 'link',
      text: e(
        'p',
        null,
        !event.url ? null : e('a', { href: event.url, title: 'Website' }, 'Website'),
        !event.facebookUrl || !event.url ? null : e('span', null, ' · '),
        !event.facebookUrl ? null : e('a', { href: event.facebookUrl, title: 'Facebook Page' }, 'Facebook Page')
      )
    });
    return e(
      'div', {
        className: 'mdl-card' + shadowClassName + fullWidthClassName
      },
      e(
        'div', {
          className: 'mdl-card__title padding-bottom-none'
        }, e(
          'h2', {
            className: 'mdl-card__title-text'
          },
          event.name
        )
      ),
      e(
        'div', {
          className: 'mdl-card__supporting-text'
        },
        e('p', null, eventDetailsEventType),
        e(
          'p', {
            className: 'event-description margin-bottom-none'
          },
          nl2br(event.description.trim())
        )
      ),
      createDividerInset(),
      e('div', null, createSimpleList({ items: bottomItems }))
    );
  };

  return {
    button: createButton,
    layout: createLayout,
    chip: createChip,
    icon: createIcon,
    list: createList,
    eventCard: createEventCard
  };
})();
