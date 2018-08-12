/* global a3 */
/* global $ */
/* global _ */
/* global React */
/* global ReactDOM */

a3.mdl = (function () {
  var e = React.createElement;

  var createButton = function (props) {
    // e('!-- Accent-colored raised button with ripple --' },
    return e(
      'button', {
        className: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary'
      },
      props.text
    );
  };

  var createLayout = function (props) {
    // e('!-- Always shows a header, even in smaller screens. --' },
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
          // e('div', { className: 'mdl-layout-spacer' }),
          // e('nav', { className: 'mdl-navigation mdl-layout--large-screen-only' })
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
    // < !--Basic Chip-- >
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

  var createList = function (props) {
    var items = props.items;
    var getIconInfo = props.getIconInfo;
    var getLine1 = props.getLine1;
    var getLine2 = props.getLine2;
    var dividerClass = props.divider ? ' border-bottom ' : '';
    var onItemClick = props.onItemClick;
    return e('ul', { className: 'mdl-list' }, _.map(items, function (item, index) {
      var iconInfo = getIconInfo(item);
      return e('li', {
        className: 'mdl-list__item mdl-list__item--three-line' + dividerClass + ' cursor-pointer ',
        onClick: function (e) {
          e.preventDefault();
          onItemClick(item);
        }
      },
      e('span', { className: 'mdl-list__item-primary-content' },
        e('i', { className: 'material-icons mdl-list__item-avatar bg-' + iconInfo.color }, iconInfo.icon),
        e('span', { className: 'a3-mdl-list__item-title' }, getLine1(item)),
        e('span', { className: 'mdl-list__item-text-body' }, getLine2(item))
        // e('span', { className: 'mdl-list__item-text-body' }, getLine2(item), e('br'), getLine2(item))
      )
        // e('span', { className: 'mdl-list__item-secondary-content' },
        //   e('a', { className: 'mdl-list__item-secondary-action', href: '#' }, createIcon({ name: 'star' }))
        // ),
      );
    }));
  };

  return {
    button: createButton,
    layout: createLayout,
    chip: createChip,
    icon: createIcon,
    list: createList
  };
})();
