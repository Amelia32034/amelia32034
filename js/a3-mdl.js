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

  return {
    button: createButton,
    layout: createLayout,
    chip: createChip,
    icon: createIcon,
    list: createList
  };
})();
