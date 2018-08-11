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

  return {
    button: createButton,
    layout: createLayout,
    chip: createChip
  };
})();
