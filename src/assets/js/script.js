$(function() {
  // dropdownShow();
  countryDropdownShow();
  footerToTopAction();
  tabsLogic();

  tooltipInit();
  closingWidgets();
  refreshWidgets();

  mergeBlockShow();
  searchBlockShow();
  rerunBlockShow();
  deleteBlockShow();
  if ($('.datepicker').length > 0) datepickerShowing();

  paginationLogic();
  easyAutoCompletePhones();

  userMenuShow();
  notificationsShow();
  tabCheck();
  slider();

  $('.country-dropdown__list').niceScroll({
    cursorcolor: '#e1e1e1',
    cursorwidth: '10px',
    cursorminheight: 100
  });

  $('.widget-more').niceScroll({
    cursorcolor: '#e1e1e1',
    cursorwidth: '10px',
    cursorminheight: 100
  });

  $('.tabs p').niceScroll({
    cursorcolor: '#e1e1e1',
    cursorwidth: '10px',
    cursorminheight: 100
  });

  viewMorePanel();
  imageGallery();

  menuShow();
  moreMenuShow();
});

function tooltipInit() {
  $('[data-toggle="tooltip"]').tooltip();
}

function dropdownShow() {
  $(document).ready(function() {
    $('.dropdown').each(function() {
      var $dropdown = $(this);

      $('.dropdown__selected', $dropdown).click(function(e) {
        e.preventDefault();
        $div = $('.dropdown__list', $dropdown);
        $div.toggle();
        $('.dropdown__list')
          .not($div)
          .hide();
        $('.dropdown__item', $dropdown).click(function() {
          $('.dropdown__list')
            .not($div)
            .hide();
          $('.dropdown__input', $dropdown).val($(this).text());
        });
        return false;
      });
    });
    $('html').click(function() {
      $('.dropdown__list').hide();
    });
  });
}

function footerToTopAction() {
  $(document).ready(function() {
    $('.footer__to-top').click(function() {
      $('html, body').animate({ scrollTop: '0px' }, 300);
    });
  });
}

function tabsLogic() {
  $('.case__content')
    .eq(1)
    .hide();
}

function closingWidgets() {
  $(document).ready(function() {
    $('.buttons__hide').each(function() {
      $(this).click(function() {
        $(this).toggleClass('deg0 deg180');
        $(this)
          .parent()
          .parent()
          .parent()
          .toggleClass('widget__before-hide');
        $(this)
          .parent()
          .parent()
          .siblings('.widget__content')
          .toggle(300);
      });
    });
  });
}

function refreshWidgets() {
  $(document).ready(function() {
    $('.buttons__refresh').each(function() {
      $(this).click(function() {
        $(this).toggleClass('deg0 deg180');
      });
    });
  });
}

function mergeBlockShow() {
  $(document).ready(function() {
    $('button.buttons__merge, a.merge').click(function() {
      $('.open-case__merge').toggle();
      $('.targets__merge').toggle();
    });
  });
}

function rerunBlockShow() {
  $(document).ready(function() {
    $('button.buttons__rerun, a.rerun').click(function() {
      $('.open-case__rerun').toggle();
      $('.target-item__checkbox').toggle();
      $('.target-item__graphic').toggle();
    });
  });
}

function deleteBlockShow() {
  $(document).ready(function() {
    $('button.buttons__header-delete, a.delete').click(function() {
      $('.targets__delete').toggle();
      $('.target-item__checkbox').toggle();
    });
  });
}

function datepickerShowing() {
  $('#datepicker').click(function() {
    $('.datepicker__container').show();
  });

  $('.datepicker__container').click(function() {
    $('.datepicker__container').hide();
  });

  $('#datepicker').dateRangePicker({
    autoClose: false,
    format: 'DD.MM.YYYY',
    separator: ' - ',
    language: 'auto',
    startOfWeek: 'sunday',
    getValue: function() {
      return $(this).val();
    },
    setValue: function(s) {
      if (
        !$(this).attr('readonly') &&
        !$(this).is(':disabled') &&
        s != $(this).val()
      ) {
        $(this).val(s);
        $('.datepicker__container').hide();
      }
    },
    startDate: false,
    endDate: false,
    time: {
      enabled: false
    },
    minDays: 0,
    maxDays: 0,
    showShortcuts: false,
    shortcuts: {
      //'prev-days': [1,3,5,7],
      //'next-days': [3,5,7],
      //'prev' : ['week','month','year'],
      //'next' : ['week','month','year']
    },
    customShortcuts: [],
    inline: false,
    container: '.datepicker',
    alwaysOpen: false,
    singleDate: false,
    lookBehind: false,
    batchMode: false,
    duration: 200,
    stickyMonths: false,
    dayDivAttrs: [],
    dayTdAttrs: [],
    applyBtnClass: '',
    singleMonth: true,
    showTopbar: false,
    swapTime: false,
    selectForward: false,
    selectBackward: false,
    showWeekNumbers: false,
    getWeekNumber: function(
      date //date will be the first day of a week
    ) {
      return moment(date).format('w');
    },
    monthSelect: false,
    yearSelect: false,
    extraClass: 'datepicker__calendar'
  });
}

function paginationLogic() {
  $('.pagination__page').each(function() {
    $(this).click(function() {
      $('.pagination__page').removeClass('active');
      $(this).addClass('active');
    });
  });

  $('.pagination__next').click(function() {
    var current = 0;
    $('.pagination__page').each(function(e) {
      if ($(this).hasClass('active')) {
        current = e;
      }
    });

    if (current !== $('.pagination__page').length - 1) {
      $('.pagination__page').removeClass('active');
      $('.pagination__page')
        .eq(current + 1)
        .addClass('active');
    } else $('.pagination__next').attr('disabled');
  });

  $('.pagination__prev').click(function() {
    var current = 0;
    $('.pagination__page').each(function(e) {
      if ($(this).hasClass('active')) {
        current = e;
      }
    });

    if (current !== 0) {
      $('.pagination__page').removeClass('active');
      $('.pagination__page')
        .eq(current - 1)
        .addClass('active');
    } else $('.pagination__prev').attr('disabled');
  });
}

function easyAutoCompletePhones() {
  var options = {
    url: 'resources/phones.json',
    getValue: 'phone',
    list: {
      match: {
        enabled: true
      }
    },
    cssClasses: 'phones-autocomplete'
  };

  $('#phones-list').easyAutocomplete(options);
}

function userMenuShow() {
  $(document).ready(function() {
    $('.header__user-menu > a').each(function() {
      $(this).click(function() {
        $('.user-menu').toggle();
        $('.notifications').hide();
      });
    });
    $('.container').click(function() {
      $('.user-menu').hide();
    });
  });
}

function notificationsShow() {
  $(document).ready(function() {
    $('button.bell').each(function() {
      $(this).click(function() {
        $('.notifications').toggle();
        $('.user-menu').hide();
      });
    });
    $('.container').click(function() {
      $('.notifications').hide();
    });
  });
}

function tabCheck() {
  $('[data-full-details-tab]').each(function() {
    $(this).click(function(e) {
      e.preventDefault();

      $('.open-target-full-details__tab')
        .removeClass('button__active')
        .addClass('button__inactive');
      $(this)
        .removeClass('button__inactive')
        .addClass('button__active');

      var id = $(this).attr('data-full-details-tab');
      $('.open-target-tab').hide();
      $('.slick-slider').slick('refresh');
      $('#' + id).fadeIn(500);
    });
  });
}

function slider() {
  const unslick = {
    breakpoint: 999999,
    settings: 'unslick'
  };

  $(document).ready(function() {
    $(window).resize(function() {
      if (window.innerWidth <= 1280) {
        $('.search-result-slider').slick('init');
        $('.full-details-tabs-slider').slick('init');
        $('.photos-slider').slick('init');
        $('.friends-slider').slick('init');
        $('.preferences-slider').slick('init');
        $('.history-photo-slider').slick('init');
        $('.widget-user-slider').slick('init');
      }
    });

    $('.search-result-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      rows: 1,
      dots: true,
      arrows: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            rows: 1,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 980,
          settings: {
            rows: 1,
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 680,
          settings: {
            rows: 2,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 420,
          settings: {
            rows: 2,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.full-details-tabs-slider').slick({
      responsive: [
        unslick,
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
            arrows: false,
            infinite: false
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
            infinite: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false,
            infinite: false
          }
        }
      ]
    });

    $('.photos-slider').slick({
      responsive: [
        unslick,
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            rows: 3,
            dots: true,
            arrows: false,
            infinite: false,
            variableWidth: true
          }
        }
      ]
    });

    $('.friends-slider').slick({
      responsive: [
        unslick,
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            rows: 3,
            dots: true,
            arrows: false,
            infinite: false,
            variableWidth: true
          }
        }
      ]
    });

    $('.preferences-slider').slick({
      responsive: [
        unslick,
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            rows: 1,
            dots: true,
            arrows: false,
            infinite: false,
            variableWidth: true
          }
        }
      ]
    });

    $('.history-photo-slider').slick({
      responsive: [
        unslick,
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            rows: 1,
            dots: true,
            arrows: false,
            infinite: false,
            variableWidth: true
          }
        }
      ]
    });

    $('.widget-user-slider').slick({
      responsive: [
        unslick,
        {
          breakpoint: 1281,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            rows: 5,
            dots: true,
            arrows: false,
            infinite: false
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: 5,
            dots: true,
            arrows: false,
            infinite: false
          }
        }
      ]
    });
  });
}

function viewMorePanel() {
  $(document).ready(function() {
    $('.open-more-tab').each(function(e) {
      $(this).click(function() {
        let content = $('.widget-more')
          .eq(e)
          .siblings('.need-shortened')
          .children()
          .clone();
        $('.widget-more')
          .eq(e)
          .children('.widget-more__content')
          .empty()
          .append(content);
        $('.widget-more')
          .eq(e)
          .slideDown(300);
        imageGallery();
      });
    });
    $('.hide-more-tab').each(function(e) {
      $(this).click(function() {
        $('.widget-more')
          .eq(e)
          .slideUp(300);
      });
    });
  });
}

function imageGallery() {
  $(document).ready(function() {
    $('.gallery').each(function() {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true
        },
        closeMarkup: '<button title="Close" class="mfp-close"></button>',
        tPrev: 'Previous',
        tNext: 'Next',
        callbacks: {
          buildControls: function() {
            this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
          },
          close: function() {
            rotate_degrees = 0;
          }
        },
        image: {
          markup:
            '<div class="mfp-figure">' +
            '<div class="mfp-close"></div>' +
            '<div class="mfp-img"></div>' +
            '<div class="mfp-bottom-bar">' +
            '<button class="mfp-transform" onclick="rotateImg()"></button>' +
            '<div class="mfp-counter"></div>' +
            '</div>' +
            '</div>'
        }
      });
    });
  });
}

let rotate_degrees = 0;

function rotateImg() {
  rotate_degrees += 90;
  $('.mfp-img').css({
    transform: 'rotate(' + rotate_degrees + 'deg)',
    transition: 'all .3s ease'
  });
}

function countryDropdownShow() {
  $(document).ready(function() {
    $('.country-dropdown').each(function() {
      var $dropdown = $(this);

      $('.country-dropdown__selected', $dropdown).click(function(e) {
        e.preventDefault();
        $div = $('.country-dropdown__list', $dropdown);
        $div.width($('.country-dropdown').width() - 3);
        $div.toggle();
        $('.country-dropdown__list')
          .not($div)
          .hide();
        $('.country-dropdown__item', $dropdown).click(function() {
          $('.country-dropdown__list')
            .not($div)
            .hide();
          $('.country-dropdown__selected > img', $dropdown).attr(
            'src',
            $(this)
              .children('img')
              .attr('src')
          );
          $('.country-dropdown__input', $dropdown).val(
            $(this)
              .children('span')
              .text()
          );
        });
        return false;
      });
    });
    $('html').click(function() {
      $('.country-dropdown__list').hide();
    });
  });
}

function menuShow() {
  $('.buttons__menu, .mobile-menu__container').click(function() {
    $('.mobile-menu__content').addClass('open');
    $('.mobile-menu__container').show();
    $('.user-menu').show();
  });

  $('.mobile-menu__container').click(function() {
    $('.mobile-menu__content').removeClass('open');
    $('.mobile-menu__container').hide();
    $('.user-menu').hide();
  });
}

function moreMenuShow() {
  $(document).ready(function() {
    $('button.buttons__more-menu').each(function() {
      $(this).click(function() {
        $('.more-menu').toggle();
        $('.more-menu__container').toggle();
      });
    });
    $('.more-menu__container, .more-menu__item').click(function() {
      $('.more-menu').hide();
      $('.more-menu__container').hide();
    });
  });
}

function searchBlockShow() {
  $(document).ready(function() {
    $('button.buttons__search').click(function() {
      $('.targets__search').toggle();
      $('.case__search').toggle();
      $('.audit-trail__search').toggle();
      $('.target-alerts__search').toggle();
      $('.open-case__search').toggle();
    });
  });
}
