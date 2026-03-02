(function ($) {
  'use strict';

  $.fn.tabbedNav = function (userOptions) {

    let defaults = {
      activeClass : 'is-active',
      speed       : 320,
      defaultTab  : 0
    };

    let opts = $.extend({}, defaults, userOptions);

    return this.each(function () {

      let $widget  = $(this);
      let $buttons = $widget.find('[role="tab"]');
      let $panels  = $widget.find('[role="tabpanel"]');

      function activateTab(index, pushHash) {
        if (index < 0)                index = $buttons.length - 1;
        if (index >= $buttons.length) index = 0;

        $buttons
          .removeClass(opts.activeClass)
          .attr({ 'aria-selected': 'false', tabindex: '-1' });

        let $activeBtn = $buttons.eq(index)
          .addClass(opts.activeClass)
          .attr({ 'aria-selected': 'true', tabindex: '0' });

        $panels.stop(true, true).hide();
        let target = $activeBtn.data('target');
        $(target).fadeIn(opts.speed);

        if (pushHash !== false) {
          let hashId = $(target).attr('id').replace(/^tab-/, '');
          history.replaceState(null, '', '#' + hashId);
        }

        $activeBtn.focus();
      }

      function indexFromHash(hash) {
        let found = -1;
        $buttons.each(function (i) {
          let buttonHash = '#' + $(this).data('target').replace('#tab-', '');
          if (buttonHash === hash) {
            found = i;
            return false;
          }
        });
        return found;
      }

      $buttons.on('click', function () {
        activateTab($buttons.index(this));
      });

      $buttons.on('keydown', function (e) {
        let current = $buttons.index(this);

        let keyActions = {
          ArrowRight : current + 1,
          ArrowLeft  : current - 1,
          Home       : 0,
          End        : $buttons.length - 1
        };

        if (e.key in keyActions) {
          e.preventDefault();
          activateTab(keyActions[e.key]);
        }
      });

      function applyHash() {
        let hash  = window.location.hash;
        let index = hash ? indexFromHash(hash) : -1;
        activateTab(index >= 0 ? index : opts.defaultTab, false);
      }

      $(window).on('hashchange', applyHash);

      $buttons.attr('tabindex', '-1');
      applyHash();

    });

  };

}(jQuery));

$(function () {
  $('#demo-tabs').tabbedNav({
    activeClass : 'is-active',
    speed       : 320,
    defaultTab  : 0
  });
});
