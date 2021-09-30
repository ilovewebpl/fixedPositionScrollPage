import './jquery.mousewheel';
import './tilt.jquery';
import './jquery.touch';
import './jquery.swipe';

(function ($) {
  // on about page fixed header only when scroll up

  const env = {
    homeAsPresentation: false,
    customScroll: true,
    modalVisible: false,   // inform page aboud modal state.
    imageSrc: './images/',
    debbugMode: false,
  };

  document.addEventListener("DOMContentLoaded", ready);

  function replaceLogo(color) {
    if (!$('.header-logo')) {
      return;
    }
    const logo = $('.header-logo');
    logo.attr('src', '');
    if (!color) {
      logo.attr('src', env.imageSrc + 'logo-esphere.png');
    } else {
      logo.attr('src', env.imageSrc + 'logo-esphere-g.png');
      $('.header').addClass('colored');
    }
  }

  function replaceOnlyLogo(color) {
    if (!$('.header-logo')) {
      return;
    }
    const logo = $('.header-logo');
    logo.attr('src', '');
    if (!color) {
      logo.attr('src', env.imageSrc + 'logo-esphere.png');
    } else {
      logo.attr('src', env.imageSrc + 'logo-esphere-g.png');
    }
  }

  function initPage() {
    addClassMobile();
    if ($('body.offer').length > 0) {
      replaceLogo(true);
      initRingCarousel(); // uruchomic ring dla podstrony
    }
    if ($('body.project-details').length > 0) {
      let buttons = $('p').find('.btn');
      buttons.parent().addClass('text-center');
    }
  }

  initPage();

  function initHeader() {
    if (!$('.header')) {
      return;
    }
    const header = $('.header');
    if (header.hasClass('colored')) {
      replaceLogo();
    }
  }

  initHeader();

  function initializeTrimmingsAboutCarousel(noVisibleItems) {
    if (!$("body").hasClass("about")) {
      return;
    }
    const carouselContainer = $('.section-trimmings');
    const props = {
      'stepValue': 0,
      'noVisibleItems': noVisibleItems | 99,
      'carouselArrows': carouselContainer.prev('.trimmings-navigation'),
      'sectionTrimmingsList': carouselContainer.find('ul'),
      'sectionTrimmingsItem': carouselContainer.find('.section-trimmings-item'),
      'noElements': carouselContainer.find('.section-trimmings-item').length,
      'carouselItemWidth': (carouselContainer.find('.section-trimmings-item').eq(0).innerWidth() + parseInt(carouselContainer.find('.section-trimmings-item').eq(1).css('marginRight').replace(/[^-\d\.]/g, ''))),
      'maxCarouselWidth': carouselContainer.find('.section-trimmings-item').length * (carouselContainer.find('.section-trimmings-item').eq(0).innerWidth() + parseInt(carouselContainer.find('.section-trimmings-item').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
    }
    props.sectionTrimmingsList.css('width', props.maxCarouselWidth + 10 + 'px');
    props.carouselArrows.find('.orbit-link').on('click', function (e) {
      e.preventDefault();
      if ($(this).hasClass('scroll-left')) {
        if (props.stepValue <= 0) {
          return;
        }
        props.stepValue -= props.maxCarouselWidth / props.noElements;
        scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
      } else {
        if (props.stepValue > props.maxCarouselWidth - carouselContainer.width()) {
          return;
        }
        props.stepValue += props.maxCarouselWidth / props.noElements;
        scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
      }
    });

    props.sectionTrimmingsItem.swipe(
      function (direction) {
        // your handler code
        if (direction === 'right') {
          if (props.stepValue <= 0) {
            return;
          }
          props.stepValue -= props.maxCarouselWidth / props.noElements;
          scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        } else if (direction === 'left') {
          if (props.stepValue > props.maxCarouselWidth - carouselContainer.width()) {
            return;
          }
          props.stepValue += props.maxCarouselWidth / props.noElements;
          scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });

  }
  initializeTrimmingsAboutCarousel();

  function initTrimmingsCarousel(noVisibleItems) {
    if (!$("body").hasClass("home")) {
      return;
    }
    const carouselContainer = $('.section-trimmings');
    const carouselContainerDescription = carouselContainer.find('.section-trimmings-description');
    const props = {
      'stepValue': 0,
      'noVisibleItems': noVisibleItems | 99,
      'carouselArrows': carouselContainer.prev('.arrows'),
      'sectionTrimmingsList': carouselContainer.find('.section-trimmings-list-container'),
      'sectionTrimmingsItem': carouselContainer.find('.section-trimmings-item'),
      'noElements': carouselContainer.find('.section-trimmings-item').length,
      'carouselItemWidth': (carouselContainer.find('.section-trimmings-item').eq(0).innerWidth() + parseInt(carouselContainer.find('.section-trimmings-item').eq(1).css('marginRight').replace(/[^-\d\.]/g, ''))),
      'maxCarouselWidth': carouselContainer.find('.section-trimmings-item').length * (carouselContainer.find('.section-trimmings-item').eq(0).innerWidth() + parseInt(carouselContainer.find('.section-trimmings-item').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
    }

    props.sectionTrimmingsItem.each(function (index) {
      let tempNo = index % 8 + 1;
      $(this).addClass('style-' + tempNo);
    });

    props.sectionTrimmingsList.css('width', props.maxCarouselWidth + 'px');
    props.carouselArrows.find('.orbit-link').on('click', function (e) {
      e.preventDefault();
      if ($(this).hasClass('scroll-left')) {
        if (props.stepValue <= 0) {
          return;
        }
        props.stepValue -= props.maxCarouselWidth / props.noElements;
        scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);

        if (props.stepValue <= 0) {
          carouselContainerDescription.removeClass('smooth-hide');
        }

      } else {
        if (props.stepValue > props.maxCarouselWidth - carouselContainer.width()) {
          return;
        }
        props.stepValue += props.maxCarouselWidth / props.noElements;
        scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        carouselContainerDescription.addClass('smooth-hide');
      }
    });

    props.sectionTrimmingsItem.swipe(
      function (direction) {
        // your handler code
        if (direction === 'right') {
          if (props.stepValue <= 0) {
            return;
          }
          props.stepValue -= props.maxCarouselWidth / props.noElements;
          scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        } else if (direction === 'left') {
          if (props.stepValue > props.maxCarouselWidth - carouselContainer.width()) {
            return;
          }
          props.stepValue += props.maxCarouselWidth / props.noElements;
          scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });

  }

  initTrimmingsCarousel();


  function initTeamCarousel(noVisibleItems) {
    if (!$("body").hasClass("about") && !$("body").hasClass("is-mobile")) {
      console.log('not about mobile');
      return;
    }
    const carouselContainer = $('.section-team-grid');

    const props = {
      'stepValue': 0,
      'noVisibleItems': noVisibleItems | 99,
      'sectionTrimmingsList': carouselContainer.find('.section-trimmings-list-container'),
      'sectionTrimmingsItem': carouselContainer.find('.grid-item'),
      'noElements': carouselContainer.find('.section-trimmings-item').length,
      // 'carouselItemWidth': (carouselContainer.find('.section-trimmings-item').eq(0).innerWidth() + parseInt(carouselContainer.find('.section-trimmings-item').eq(1).css('marginRight').replace(/[^-\d\.]/g, ''))),
      //'maxCarouselWidth': carouselContainer.find('.section-trimmings-item').length * (carouselContainer.find('.section-trimmings-item').eq(0).innerWidth() + parseInt(carouselContainer.find('.section-trimmings-item').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
    }

    props.sectionTrimmingsItem.each(function (index) {
      let tempNo = index % 8 + 1;
      $(this).addClass('style-' + tempNo);
    });

    props.sectionTrimmingsList.css('width', props.maxCarouselWidth + 'px');

    props.sectionTrimmingsItem.swipe(
      function (direction) {
        // your handler code
        if (direction === 'right') {
          if (props.stepValue <= 0) {
            return;
          }
          props.stepValue -= props.maxCarouselWidth / props.noElements;
          scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        } else if (direction === 'left') {
          if (props.stepValue > props.maxCarouselWidth - carouselContainer.width()) {
            return;
          }
          props.stepValue += props.maxCarouselWidth / props.noElements;
          scrollElement(props.sectionTrimmingsList, -(props.stepValue), 0);
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });

  }

  initTeamCarousel();

  function initLatestPostCarousel(noVisibleItems) {

    if (!$("body").hasClass("home")) {
      return;
    }

    const latestPostsContainer = $('.latest-posts');
    const props = {
      'latestPostsCarouselItems': latestPostsContainer.find('.latest-posts-carousel'),
      'latestPostCarouselItem': latestPostsContainer.find('.latest-posts-carousel li'),
      'carouselArrows': latestPostsContainer.find('.arrows'),
      'arrowPosition': latestPostsContainer.find('.latest-posts-carousel').height() / 2 - latestPostsContainer.find('.arrows').find('.orbit-link').height() / 2,
      'noElements': latestPostsContainer.find('.latest-posts-carousel li').length,
      'carouselItemWidth': (latestPostsContainer.find('.latest-posts-carousel li').width() + parseInt(latestPostsContainer.find('.latest-posts-carousel li').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
      'maxCarouselWidth': latestPostsContainer.find('.latest-posts-carousel li').length * (latestPostsContainer.find('.latest-posts-carousel li').width() + parseInt(latestPostsContainer.find('.latest-posts-carousel li').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
      'stepValue': 0,
      'noVisibleItems': noVisibleItems | 3
    }

    props.carouselArrows.css('top', props.arrowPosition + 'px');
    const carouselInner = '<div class="latest-post-carousel-inner"></div>';
    latestPostsContainer.prepend(carouselInner);

    $('.latest-post-carousel-inner').append(props.latestPostsCarouselItems);
    props.carouselArrows.find('.orbit-link').on('click', function (e) {
      e.preventDefault();
      if ($(this).hasClass('scroll-left')) {
        if (props.stepValue <= 0) {
          return;
        }
        props.stepValue -= props.maxCarouselWidth / props.noElements;
        scrollElement(props.latestPostsCarouselItems, -(props.stepValue), 0);
      } else {
        if (props.stepValue >= props.noVisibleItems * props.carouselItemWidth) {
          return;
        }
        props.stepValue += props.maxCarouselWidth / props.noElements;
        scrollElement(props.latestPostsCarouselItems, -(props.stepValue), 0);
      }
    });

    props.latestPostCarouselItem.swipe(
      function (direction) {
        // your handler code
        if (direction === 'right') {
          if (props.stepValue <= 0) {
            return;
          }
          props.stepValue -= props.maxCarouselWidth / props.noElements;
          scrollElement(props.latestPostsCarouselItems, -(props.stepValue), 0);
        } else if (direction === 'left') {
          if (props.stepValue >= props.noVisibleItems * props.carouselItemWidth) {
            return;
          }
          props.stepValue += props.maxCarouselWidth / props.noElements;
          scrollElement(props.latestPostsCarouselItems, -(props.stepValue), 0);
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });

  }

  function initProjectsCarousel(noVisibleItems) {

    if (!$("body").hasClass("home")) {
      return;
    }

    const projectsContainer = $('.projects .section-carousel');
    projectsContainer.find('.section-carousel-projects li').eq(1).addClass('active');
    const props = {
      'projectsCarouselItems': projectsContainer.find('.section-carousel-projects'),
      'projectsCarouselItem': projectsContainer.find('.section-carousel-projects li'),
      'arrowLeft': projectsContainer.find('.arrow-left > a'),
      'arrowRight': projectsContainer.find('.arrow-right > a'),
      'stepValue': 0,
      'noElements': projectsContainer.find('.section-carousel-projects li').length,
      'carouselItemWidth': (projectsContainer.find('.section-carousel-projects li').width() + parseInt(projectsContainer.find('.section-carousel-projects li').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
      'maxCarouselWidth': projectsContainer.find('.section-carousel-projects li').length * (projectsContainer.find('.section-carousel-projects li').width() + parseInt(projectsContainer.find('.section-carousel-projects li').eq(0).css('marginRight').replace(/[^-\d\.]/g, ''))),
      'noVisibleItems': noVisibleItems | 3,
      'activeSlideId': 1,
      'carouselHeight': 0,
    }

    props.carouselHeight = props.projectsCarouselItem.height();
    props.projectsCarouselItems.css('min-height', 45.5 + 'rem');
    props.arrowLeft.on('click', function (e) {
      e.preventDefault();
      if (props.stepValue <= 0) {
        return;
      }
      props.activeSlideId--;
      props.projectsCarouselItem.removeClass('active');
      props.projectsCarouselItem.eq(props.activeSlideId).addClass('active');
      props.stepValue -= props.maxCarouselWidth / props.noElements;
      scrollElement(props.projectsCarouselItems, -(props.stepValue), 0);
    });
    props.arrowRight.on('click', function (e) {
      e.preventDefault();
      if (props.stepValue >= props.noVisibleItems * props.carouselItemWidth) {
        return;
      }
      props.activeSlideId++;
      props.projectsCarouselItem.removeClass('active');
      props.projectsCarouselItem.eq(props.activeSlideId).addClass('active');
      props.stepValue += props.maxCarouselWidth / props.noElements;
      scrollElement(props.projectsCarouselItems, -(props.stepValue), 0);
    });

    props.projectsCarouselItem.swipe(
      function (direction) {
        // your handler code
        if (direction === 'left') {
          if (props.stepValue >= props.noVisibleItems * props.carouselItemWidth) {
            return;
          }
          props.activeSlideId++;
          props.projectsCarouselItem.removeClass('active');
          props.projectsCarouselItem.eq(props.activeSlideId).addClass('active');
          props.stepValue += props.maxCarouselWidth / props.noElements;
          scrollElement(props.projectsCarouselItems, -(props.stepValue), 0);
        } else if (direction === 'right') {
          if (props.stepValue <= 0) {
            return;
          }
          props.activeSlideId--;
          props.projectsCarouselItem.removeClass('active');
          props.projectsCarouselItem.eq(props.activeSlideId).addClass('active');
          props.stepValue -= props.maxCarouselWidth / props.noElements;
          scrollElement(props.projectsCarouselItems, -(props.stepValue), 0);
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });

  }

  initProjectsCarousel();

  function initializeHomePresentation() {
    // initialize home sections as presentations
    if (env.homeAsPresentation) {
      $('body.home').addClass('custom-scroll-on');
    } else if (env.customScroll) {
      $('body.home').addClass('custom-scroll');
    }
    else {
      $('.home').addClass('simply-look');
    }
  }

  initializeHomePresentation();

  function stopNavigationAnimation(item) {
    if (!item) {
      $('.orbit-link').addClass('stop');
    } else if (item) {
      return;
    }
  }

  function initializeParalaxEffects() {
    $('.latest-posts-list li, .latest-posts-carousel li, .section-trimmings-item, .section-team-grid .grid-item').tilt({
      scale: 1.005,
      speed: 400,
      glare: true,
      maxGlare: 0.25,
      perspective: 1000
    });
  }

  function hoverEffect(x, y, e) {
    var eWidth = e.width();
    var eHeight = e.height();

    const xPos = (x - (eWidth / 2)) / 30;
    const yPos = (y - (eHeight / 2)) / 30;

    var rotateX = Math.round(- (yPos * 0.5));
    var rotateY = Math.round(+ (xPos * 0.9));

    e.css({
      'transition': 'all 0s linear',
      'transform': 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)',
      'z-index': '99',
      'box-shadow': - Math.round((x - eWidth / 2) / 18) + 'px ' + Math.round(- (y - eHeight / 2) / 18) + 'px 10px -5px rgba(0,0,0,0.4)'
    });

    e.find('.light').css({
      'transition': 'all 0s linear, opacity 0.2s ease-in-out',
      'opacity': '1',
      'top': Math.round(y - 5) + 'px',
      'left': Math.round(x - 5) + 'px'
    });
  }

  function initializeCircleParalaxEffect() {
    $(".section-circles .section-circles-item").append('<div class="light"></div>');
    $(".section-circles-item").on('mousemove', function (event) {
      event.preventDefault();
      var relX = event.pageX - $(this).offset().left;
      var relY = event.pageY - $(this).offset().top;
      hoverEffect(relX, relY, $(this));
    });

    $(".section-circles-item").on('mouseleave', function () {
      $(this).css({
        'transition': 'all 0.6s ease-in-out',
        'transform': 'rotate(0deg)',
        'z-index': '0',
        'box-shadow': '0px 0px 0px -5px rgba(0,0,0,0.8)'
      });
      $(this).find('.light').css({
        'transition': 'all 0.6s ease-in-out',
        'top': '50%',
        'left': '50%',
        'opacity': '0.2'
      });
    });
  }

  $('#nav-toggle').on('click', function () {
    $(this).toggleClass('active');
    if ($('#main-nav').hasClass('open')) {
      $('#main-nav').removeClass('open');
      replaceOnlyLogo();
    } else {
      $('#main-nav').addClass('open');
      replaceOnlyLogo(true);
    }

    //$('.header-logo').toggleClass('hidden');
  });

  $('body:not(.home) .section-navigation-link').on('click', function (e) {
    e.preventDefault();
    var position = $($(this).attr("href")).offset().top;
    $("body, html").animate({
      scrollTop: position
    } /* speed */);
  });

  function elipsesParalax() {
    const elipsesArea = document.querySelector('.section-circles');
    const bg = document.querySelector('.section-elipses');
    const windowWidth = window.innerWidth / 3;
    const windowHeight = window.innerHeight / 3;
    if (!elipsesArea) {
      return;
    }
    elipsesArea.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;
      bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    });
  }

  // reference slider 
  function cloneSliderList(slider) {
    slider.find('ul').clone().appendTo(slider);
  }

  const referenceSlider = $('.reference-slider');
  cloneSliderList(referenceSlider);
  const aboutSlider = $('.about-slider');
  cloneSliderList(aboutSlider);


  function ready() {
    setTimeout(() => {
      initLatestPostCarousel();
      stopNavigationAnimation();
      initializeParalaxEffects();
      initializeCircleParalaxEffect();
      elipsesParalax(); // 3 d effect for elipses
    }, 700);
  }

  // open skin modal
  const skinModal = $('#skinModal');

  $('.modal-link').on("click", function (event) {
    event.preventDefault();
    modalComponent(skinModal, true);
  });

  $('.modal-close').on('click', function () {
    modalComponent(skinModal, false);
  });
  $(window).on('click', function (event) {
    if (event.target.id == 'skinModal') {
      modalComponent(skinModal, false);
    }
  });

  function modalComponent(modalEl, state) {
    if (typeof state === 'undefined') {
      return;
    }
    if (state) {
      modalEl.addClass('show');
      env.modalVisible = state;
    } else {
      modalEl.removeClass('show');
      env.modalVisible = state;
    }
  }

  const introSecTouch = $('.custom-scroll .intro-sections');
  const contentSecTouch = $('.custom-scroll .content-sections');
  const contentSecElTouch = $('.custom-scroll .content-sections > section');
  const secondContentSecTouch = $('.custom-scroll .second-content-sections');

  const introSec = document.querySelector('.custom-scroll .intro-sections');
  const contentSec = document.querySelector('.custom-scroll .content-sections');
  const contentSecEl = document.querySelectorAll('.custom-scroll .content-sections > section');
  const secondContentSec = document.querySelector('.custom-scroll .second-content-sections');
  // const footerSec = document.getElementsByClassName();

  const secProps = {
    introSecHeight: 0, // height intro
    introSecWidth: 0, // width intro
    contentSecHeight: 0, //content height
    contentSecWidth: 0, //content width
    contentSecWidthTotal: 0,
    contentOffsetX: 0, // offset x
    secondContentSecTopOffset: 0,
    secReady: false,
  }

  function initializeParams() {
    secProps.introSecHeight = introSec.clientHeight;
    secProps.introSecWidth = introSec.clientWidth;
    secProps.contentSecHeight = contentSec.clientHeight;
    secProps.contentSecWidth = contentSec.clientWidth;
    secProps.contentSecWidthTotal = contentSecEl.length * contentSec.clientWidth;
    secProps.secReady = true;
    secProps.secondContentSecTopOffset = secondContentSec.offsetTop;
    console.log(secProps);
  }

  initializeParams();

  function initializeScrollWork() {
    // initialization for intro 

    introSec.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      if (evt.deltaY > 0) {
        window.scroll(0, secProps.introSecHeight);
        secProps.secReady = false;
      } else if (evt.delta < 0) {
        // contentSec.scrollRight -= secProps.contentSecWidth;
        console.log('scroll-up', secProps.introSecHeight);
      }
    });

    contentSec.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      if (!secProps.secReady) {
        return;
      } else {
        if (evt.deltaY > 0) {
          // console.log('delta greather than 0 :', evt.deltaY, secProps.contentOffsetX, secProps.contentSecWidth);
          console.log((secProps.contentOffsetX + contentSec.clientWidth) < secProps.contentSecWidthTotal)
          if (secProps.contentOffsetX >= 0 && (secProps.contentOffsetX + contentSec.clientWidth) < secProps.contentSecWidthTotal) {
            // window.scroll(0, secProps.introSecHeight);
            secProps.contentOffsetX += secProps.contentSecWidth;
            contentSec.scrollTo({
              top: 0,
              left: secProps.contentOffsetX,
              behavior: 'smooth'
            });
          } else {
            window.scroll(0, 2 * secProps.introSecHeight);
          }
          secProps.secReady = false;
        } else if (evt.deltaY < 0) {
          // console.log('delta less than 0 :', evt.deltaY);
          if (secProps.contentOffsetX > 0) {
            secProps.contentOffsetX -= secProps.contentSecWidth;
          } else if (secProps.contentOffsetX === 0) {
            window.scroll(0, -secProps.introSecHeight);
          }
          else {
            secProps.contentOffsetX = 0;
          }
          secProps.secReady = false;
          // contentSec.scrollLeft = secProps.contentOffsetX;
          contentSec.scrollTo({
            top: 0,
            left: secProps.contentOffsetX,
            behavior: 'smooth'
          });
        } else {
          console.log('not specified scroll');
        }
      }
    });

    secondContentSec.addEventListener("wheel", (evt) => {
      if (!secProps.secReady) {
        return;
      } else {
        if (evt.deltaY > 0) {
          console.log('delta greather than 0 :', evt.deltaY, secProps.contentOffsetX, secProps.contentSecWidth);
        } else if (evt.deltaY < 0) {
          let actualOffsetTop = secProps.secondContentSecTopOffset - $(window).scrollTop();
          if (actualOffsetTop >= 0) {
            window.scroll(0, secProps.introSecHeight);
            return;
          }
        }
      }
    });
  }

  initializeScrollWork();

  $('.intro-sections').touchInit({
    preventDefault: false,
    mouse: true,
    pen: true,
    maxtouch: 1,
    prefix: ""
  });

  $('.intro-sections').swipe(
    function (direction) {
      console.log(direction);
      if (direction === 'up') {
        window.scroll(0, secProps.introSecHeight);
        return;
      } else {
        return;
      }
    },
    {
      preventDefault: false,
      mouse: true,
      pen: true,
      distance: 50
    });


  $('.content-sections').swipe(
    function (direction) {
      console.log(direction);
      if (direction === 'left') {
        if (secProps.contentOffsetX >= 0 && (secProps.contentOffsetX + contentSec.clientWidth) < secProps.contentSecWidthTotal) {
          // window.scroll(0, secProps.introSecHeight);
          secProps.contentOffsetX += secProps.contentSecWidth;
          contentSec.scrollTo({
            top: 0,
            left: secProps.contentOffsetX,
            behavior: 'smooth'
          });
        } else {
          window.scroll(0, 2 * secProps.introSecHeight);
        }
        return;
      }
      else if (direction === 'right') {
        if (secProps.contentOffsetX > 0) {
          secProps.contentOffsetX -= secProps.contentSecWidth;
        } else if (secProps.contentOffsetX === 0) {
          window.scroll(0, -secProps.introSecHeight);
        }
        else {
          secProps.contentOffsetX = 0;
        }
        secProps.secReady = false;
        // contentSec.scrollLeft = secProps.contentOffsetX;
        contentSec.scrollTo({
          top: 0,
          left: secProps.contentOffsetX,
          behavior: 'smooth'
        });
      } else {
        return;
      }
    },
    {
      preventDefault: false,
      mouse: true,
      pen: true,
      distance: 50
    });


  function createWheelStopListener(element, callback, timeout) {
    var handle = null;
    var onScroll = function () {
      if (handle) {
        clearTimeout(handle);
      }
      handle = setTimeout(callback, timeout || 200); // default 200 ms
    };
    element.addEventListener('wheel', onScroll);
    return function () {
      element.removeEventListener('wheel', onScroll);
    };
  }

  createWheelStopListener(window, function () {
    sectionsConfiguration.sectionsReady = true;
    secProps.secReady = true;
  });

  const introSection = $('.custom-scroll-on .intro-sections');
  const contentSections = $('.custom-scroll-on .content-sections');
  const secondContentSections = $('.custom-scroll-on .second-content-sections');
  const footerSection = $('.custom-scroll-on .footer');

  const sectionsConfiguration = {
    'sectionHeight': 0,
    'contentSectionsWidth': 0,
    'contentVerticalHeight': 0,
    'lastSectionHeight': 0,
    'maxOffset': 0,
    'sectionsReady': true,
    'topOffset': 0,
    'leftOffset': 0,
    'positiveScrollSensitivity': 0,
    'negativeScrollSensitivity': 0,
    'lastSection': false,
    'maxSensitivity': 200,
    'minSensitivity': -200,
    'verticalContentPosition': 0,
    'footerSectionActive': false,
    'touchStart': {
      'deltaY': 0
    },
    'touchEnd': {
      'deltaY': 0
    },
  }

  function updateSectionConfiguration() {
    sectionsConfiguration.sectionHeight = contentSections.height();
    sectionsConfiguration.contentSectionsWidth = contentSections.width();
    sectionsConfiguration.contentVerticalHeight = secondContentSections.height() + $('.intro-9').height();
    sectionsConfiguration.lastSectionHeight = $('.intro-9').height();
    sectionsConfiguration.maxOffset = contentSections.width() - contentSections.width() / 5;
    sectionsConfiguration.sectionsReady = true;
    sectionsConfiguration.topOffset = 0;
    sectionsConfiguration.leftOffset = 0;
    sectionsConfiguration.lastSection = false;
    sectionsConfiguration.verticalContentPosition = 0,
      sectionsConfiguration.footerSectionActive = false;
    sectionsConfiguration.touchStart.deltaY = 0;
    sectionsConfiguration.touchEnd.deltaY = 0;
    introSection.children().addClass('section-block');
    contentSections.children().addClass('section-block');
    secondContentSections.children().addClass('section-block');
    footerSection.children().addClass('section-block');
    introSection.removeAttr('style');
    contentSections.removeAttr('style');
    secondContentSections.removeAttr('style');
    footerSection.removeAttr('style');
  };

  updateSectionConfiguration();

  function scrollElement(el, dimx, dimy) {
    // scroll to specified element 
    if ((typeof dimx === 'undefined') || (typeof dimy === 'undefined') || !el) {
      return;
    }
    el.css({
      'transform': 'translate3d(' + dimx + 'px, ' + dimy + 'px, 0)',
    });
  }

  function setSectionReady(state) {
    if (typeof state === 'undefined') {
      return;
    }
    sectionsConfiguration.sectionsReady = state;
  }

  function setSectionTopOffset(offset) {
    if (typeof offset === 'undefined') {
      return;
    }
    sectionsConfiguration.topOffset = offset;
  }

  function setSectionLeftOffset(value) {
    if (typeof value === 'undefined') {
      return;
    }
    sectionsConfiguration.leftOffset = value;
  }

  function setSpecifiedSectionDetails() {
    console.log(sectionsConfiguration.topOffset, 2 * sectionsConfiguration.sectionHeight, sectionsConfiguration.leftOffset, 4 * contentSections.width() / 5);
    if ((sectionsConfiguration.topOffset === sectionsConfiguration.sectionHeight) && sectionsConfiguration.leftOffset === 0) {
      replaceOnlyLogo(true);
    } else if ((sectionsConfiguration.topOffset === sectionsConfiguration.sectionHeight) && (sectionsConfiguration.leftOffset === contentSections.width() / 5)) {
      replaceLogo();
    } else if ((sectionsConfiguration.topOffset === sectionsConfiguration.sectionHeight) && (sectionsConfiguration.leftOffset === 2 * contentSections.width() / 5)) {
      replaceLogo(true);
    } else if ((sectionsConfiguration.topOffset === sectionsConfiguration.sectionHeight) && (sectionsConfiguration.leftOffset === 3 * contentSections.width() / 5)) {
      replaceLogo(true);
    }
    else if ((sectionsConfiguration.topOffset >= 2 * sectionsConfiguration.sectionHeight) && (sectionsConfiguration.leftOffset === 4 * contentSections.width() / 5)) {
      replaceLogo(true);
    }
    else {
      replaceLogo();
    }
  }

  introSection.on('mousewheel', function (evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    if (!$(this).hasClass('active-section')) {
      $(this).addClass('active-section');
    }
    if (sectionsConfiguration.sectionsReady) {
      if (evt.deltaY * 10 < sectionsConfiguration.negativeScrollSensitivity) {
        setSectionReady(false);
        scrollElement($(this), 0, -sectionsConfiguration.sectionHeight);
        scrollElement(contentSections, 0, -sectionsConfiguration.sectionHeight);
        setSectionTopOffset(sectionsConfiguration.sectionHeight);
        setSectionLeftOffset(0);
      }
    } else {
      return;
    }
    setSpecifiedSectionDetails();
  });

  // introSection.swipe(
  //   function (direction) {
  //     if (direction === 'up') {
  //       scrollElement(introSection, 0, -sectionsConfiguration.sectionHeight);
  //       scrollElement(contentSections, 0, -sectionsConfiguration.sectionHeight);
  //       setSectionTopOffset(sectionsConfiguration.sectionHeight);
  //       setSectionLeftOffset(0);
  //       setSpecifiedSectionDetails();
  //     } else {
  //       return;
  //     }
  //   },
  //   {
  //     preventDefault: false,
  //     mouse: true,
  //     pen: true,
  //     distance: 50
  //   });

  contentSections.mousewheel(function (evt) {
    if (!sectionsConfiguration.sectionsReady) {
      return;
    }
    evt.preventDefault();

    if (!$(this).hasClass('current')) {
      $(this).addClass('current');
    }

    if (env.modalVisible) {
      modalComponent($('#skinModal'), false);
    }

    if (!sectionsConfiguration.sectionsReady) {
      return;
    } else {
      if ((evt.deltaY > sectionsConfiguration.positiveScrollSensitivity && evt.deltaY < sectionsConfiguration.maxSensitivity) && contentSections.position().left === 0) {
        // case when delta is UP section is FIRST |x| | | | |
        setSectionReady(false);
        scrollElement(introSection, 0, 0);
        scrollElement($(this), 0, 0);
        setSectionTopOffset(0);
        setSpecifiedSectionDetails();

        return;
      }
      else if ((evt.deltaY < sectionsConfiguration.negativeScrollSensitivity && evt.deltaY > sectionsConfiguration.minSensitivity) && !sectionsConfiguration.lastSection) {
        // case when delta is DOWN section is in the middle and we going right | |x|x|x| |
        setSectionReady(false);
        let newLeftOffset = sectionsConfiguration.leftOffset + sectionsConfiguration.contentSectionsWidth / 5;
        if (newLeftOffset === sectionsConfiguration.maxOffset) {
          sectionsConfiguration.lastSection = true;
        }
        scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
        setSectionLeftOffset(newLeftOffset);
        setSpecifiedSectionDetails();

        return;
      }
      else if ((evt.deltaY > sectionsConfiguration.positiveScrollSensitivity && evt.deltaY < sectionsConfiguration.maxSensitivity) && $(this).position().left !== 0 && (sectionsConfiguration.leftOffset !== sectionsConfiguration.maxOffset)) {
        // case when delta is UP section is in the middle and we going left(back) | |x|x|x| |
        setSectionReady(false);
        newLeftOffset = sectionsConfiguration.leftOffset;
        if (newLeftOffset === 0) {
          return;
        }
        let newLeftOffset = sectionsConfiguration.leftOffset - sectionsConfiguration.contentSectionsWidth / 5;
        setSectionLeftOffset(newLeftOffset);
        scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
        setSectionLeftOffset(newLeftOffset);
        setSpecifiedSectionDetails();

        return;
      }
      else if ((evt.deltaY < sectionsConfiguration.negativeScrollSensitivity && evt.deltaY > sectionsConfiguration.minSensitivity) && sectionsConfiguration.lastSection) {
        setSectionReady(false);
        scrollElement(contentSections, -sectionsConfiguration.maxOffset, -2 * sectionsConfiguration.sectionHeight);
        scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, -2 * sectionsConfiguration.sectionHeight);
        setSectionTopOffset(sectionsConfiguration.sectionHeight);
        sectionsConfiguration.verticalContentPosition = 2 * sectionsConfiguration.sectionHeight;
        setSpecifiedSectionDetails();

        return;
      }
      else if ((evt.deltaY > sectionsConfiguration.negativeScrollSensitivity && evt.deltaY > sectionsConfiguration.minSensitivity) && sectionsConfiguration.lastSection) {
        setSectionReady(false);
        let newLeftOffset = sectionsConfiguration.leftOffset - sectionsConfiguration.contentSectionsWidth / 5;
        scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
        setSectionLeftOffset(newLeftOffset);
        setSectionTopOffset(sectionsConfiguration.sectionHeight);
        sectionsConfiguration.lastSection = false;
        setSpecifiedSectionDetails();
        $('.header').hide();

        return;
      }
      else {
        console.error('content Sections wheel faild');
        setSectionReady(false);

      }
    }
  });

  // contentSections.swipe(
  //   function (direction) {
  //     if (direction === 'down' && contentSections.position().left === 0) {
  //       scrollElement(introSection, 0, 0);
  //       scrollElement(contentSections, 0, 0);
  //       setSectionTopOffset(0);
  //     }
  //     else if (direction === 'up' && sectionsConfiguration.lastSection) {
  //       scrollElement(contentSections, -sectionsConfiguration.maxOffset, -2 * sectionsConfiguration.sectionHeight);
  //       scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, -2 * sectionsConfiguration.sectionHeight);
  //       setSectionTopOffset(sectionsConfiguration.sectionHeight);
  //       sectionsConfiguration.verticalContentPosition = 2 * sectionsConfiguration.sectionHeight;
  //     }
  //     else if (direction === 'right') {
  //       newLeftOffset = sectionsConfiguration.leftOffset;
  //       if (newLeftOffset === 0) {
  //         return;
  //       }
  //       if (newLeftOffset < sectionsConfiguration.maxOffset) {
  //         sectionsConfiguration.lastSection = false;
  //       }
  //       let newLeftOffset = sectionsConfiguration.leftOffset - sectionsConfiguration.contentSectionsWidth / 5;
  //       setSectionLeftOffset(newLeftOffset);
  //       scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
  //       setSectionLeftOffset(newLeftOffset);

  //     }
  //     else if (direction === 'left' && !sectionsConfiguration.lastSection) {
  //       let newLeftOffset = sectionsConfiguration.leftOffset + sectionsConfiguration.contentSectionsWidth / 5;
  //       scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
  //       setSectionLeftOffset(newLeftOffset);
  //       if (newLeftOffset === sectionsConfiguration.maxOffset) {
  //         sectionsConfiguration.lastSection = true;
  //       }
  //     }
  //     else {
  //       return;
  //     }
  //   },
  //   {
  //     preventDefault: false,
  //     mouse: true,
  //     pen: true,
  //     distance: 50
  //   });

  secondContentSections.mousewheel(function (evt) {
    evt.preventDefault();
    if (!$(this).hasClass('current')) {
      $(this).addClass('current');
    }

    if (!sectionsConfiguration.sectionsReady) {
      return;
    }

    else if ((evt.deltaY > sectionsConfiguration.negativeScrollSensitivity && evt.deltaY > sectionsConfiguration.minSensitivity) && sectionsConfiguration.verticalContentPosition === (2 * sectionsConfiguration.sectionHeight)) {
      setSectionReady(false);
      scrollElement(contentSections, -sectionsConfiguration.maxOffset, -sectionsConfiguration.sectionHeight);
      scrollElement($(this), -sectionsConfiguration.maxOffset, -sectionsConfiguration.sectionHeight);
      $('.header').show().removeClass('header-bg');
      setSpecifiedSectionDetails();

      return;
    }
    else if (evt.deltaY < 1) {

      sectionsConfiguration.verticalContentPosition += -(evt.deltaY * evt.deltaFactor);
      if (sectionsConfiguration.verticalContentPosition > sectionsConfiguration.contentVerticalHeight) {
        setSectionReady(false);
        setTimeout(function () {
          scrollToFooter(secondContentSections, footerSection, -sectionsConfiguration.maxOffset, (-sectionsConfiguration.verticalContentPosition - sectionsConfiguration.lastSectionHeight), 0, -sectionsConfiguration.sectionHeight);

        }, 1000);
        return;
      }
      scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, (-sectionsConfiguration.verticalContentPosition));
      setSectionTopOffset(sectionsConfiguration.verticalContentPosition);
      $('.header').hide();

    }
    else if (evt.deltaY > 1) {

      sectionsConfiguration.verticalContentPosition -= (evt.deltaY * evt.deltaFactor);
      if (sectionsConfiguration.verticalContentPosition < (2 * sectionsConfiguration.sectionHeight)) {
        setSectionReady(false);
        scrollElement(contentSections, -sectionsConfiguration.maxOffset, -sectionsConfiguration.sectionHeight);
        scrollElement($(this), -sectionsConfiguration.maxOffset, -sectionsConfiguration.sectionHeight);
        setSectionTopOffset(sectionsConfiguration.sectionHeight);

        return;
      }
      scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, (-sectionsConfiguration.verticalContentPosition));
      setSectionTopOffset(sectionsConfiguration.verticalContentPosition);
      $('.header').show().addClass('header-bg');
      setSpecifiedSectionDetails();

    }
  });

  // introSection.touchInit({
  //   preventDefault: false,
  //   mouse: true,
  //   pen: true,
  //   maxtouch: 1,
  //   prefix: ""
  // });

  // secondContentSections.touchInit({
  //   preventDefault: false,
  //   mouse: true,
  //   pen: true,
  //   maxtouch: 10,
  //   prefix: ""
  // });

  // secondContentSections.on("touch_start", function (event) {
  //   sectionsConfiguration.touchStart.deltaY = event.pageY;
  // });

  // secondContentSections.on("touch_end", function (event) {
  //   sectionsConfiguration.touchStart.deltaY = event.pageY;
  // });

  // setSpecifiedSectionDetails();

  // function resetTouches() {
  //   sectionsConfiguration.touchStart.deltaY = 0;
  //   sectionsConfiguration.touchEnd.deltaY = 0;
  // }

  secondContentSections.swipe(
    function (direction) {

      if (direction === 'down' && sectionsConfiguration.verticalContentPosition === (2 * sectionsConfiguration.sectionHeight)) {
        scrollElement(contentSections, -sectionsConfiguration.maxOffset, -sectionsConfiguration.sectionHeight);
        scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, -sectionsConfiguration.sectionHeight);
      } else if (direction === 'down') {
        clearTimeout(resizeTimer);
        sectionsConfiguration.verticalContentPosition -= sectionsConfiguration.touchEnd.deltaY * 1.5 - sectionsConfiguration.touchStart.deltaY;
        resizeTimer = setTimeout(function () {
          resizeTimer = false;
          resetTouches();
          scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, (-sectionsConfiguration.verticalContentPosition));
        }, 5);
      }
      else if (direction === 'up') {
        sectionsConfiguration.verticalContentPosition -= sectionsConfiguration.touchEnd.deltaY * 1.5 - sectionsConfiguration.touchStart.deltaY;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          resizeTimer = false;
          resetTouches();
          if (sectionsConfiguration.verticalContentPosition > sectionsConfiguration.contentVerticalHeight) {
            scrollToFooter(secondContentSections, footerSection, -sectionsConfiguration.maxOffset, (-sectionsConfiguration.verticalContentPosition - sectionsConfiguration.lastSectionHeight), 0, -sectionsConfiguration.sectionHeight);
            return;
          }
          scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, (-sectionsConfiguration.verticalContentPosition));
        }, 5);
      }
      else {
        return;
      }
    },
    {
      preventDefault: false,
      mouse: true,
      pen: true,
      distance: 50
    });

  function scrollToFooter(prev, next, dimxPrev, dimyPrev, dimxNext, dimyNext) {
    scrollElement(next, dimxNext, dimyNext);
    scrollElement(prev, dimxPrev, dimyPrev);
    sectionsConfiguration.footerSectionActive = true;
    return;
  }

  footerSection.mousewheel(function (evt) {
    evt.preventDefault();
    if (!sectionsConfiguration.sectionsReady && sectionsConfiguration.footerSectionActive) {
      return;
    } else {
      if ((evt.deltaY > sectionsConfiguration.positiveScrollSensitivity && evt.deltaY < sectionsConfiguration.maxSensitivity)) {
        // when up on content section 
        setSectionReady(false);
        scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, -sectionsConfiguration.verticalContentPosition);
        scrollElement($(this), 0, 0);
        setTimeout(function () {

          sectionsConfiguration.footerSectionActive = false;
        }, 500);
        return;
      }
    }
  });

  footerSection.swipe(
    function (direction) {
      console.log(direction);
      if (direction === 'down') {
        scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, -sectionsConfiguration.verticalContentPosition);
        scrollElement(footerSection, 0, 0);
      }
    },
    {
      preventDefault: false,
      mouse: true,
      pen: true,
      distance: 50
    });


  // $('.intro-3').touchInit({
  //   preventDefault: true,
  //   mouse: true,
  //   pen: true,
  //   maxtouch: -1,
  //   prefix: ""
  // });

  // $('.intro-4').touchInit({
  //   preventDefault: false,
  //   mouse: true,
  //   pen: true,
  //   maxtouch: -1,
  //   prefix: ""
  // });

  // $('.intro-3').on("touch_start", function (event) {
  //   introsPositions.touchStart.deltaY = event.pageY;
  // });

  // $('.intro-4').on("touch_start", function (event) {
  //   introsPositions.touchStart.deltaY = event.pageY;
  // });

  // $('.intro-3').on("touch_end", function (event) {
  //   introsPositions.touchEnd.deltaY = event.pageY;
  // });

  // $('.intro-4').on("touch_end", function (event) {
  //   introsPositions.touchEnd.deltaY = event.pageY;
  // });

  // setSpecifiedSectionDetails();

  // function resetTouches() {
  //   introsPositions.touchStart.deltaY = 0;
  //   introsPositions.touchEnd.deltaY = 0;
  // }

  // const introsPositions = {
  //   intro3offsetTop: 0,
  //   intro4offsetTop: 0,
  //   intro3height: $('.intro-3').innerHeight(),
  //   intro4height: $('.intro-4').height(),
  //   viewPortHeight: $(window).height(),
  //   touchStart: {
  //     deltaY: 0
  //   },
  //   touchEnd: {
  //     deltaY: 0
  //   },
  // }

  // $('.intro-3').swipe(
  //   function (direction) {
  //     if (direction === 'down' && introsPositions.intro3offsetTop < 0) {
  //       introsPositions.intro3offsetTop += introsPositions.touchEnd.deltaY - introsPositions.touchStart.deltaY;
  //       scrollElement($('.intro-3'), 0, -introsPositions.intro3offsetTop);
  //     } else if (direction === 'up') {
  //       if (introsPositions.intro3offsetTop < introsPositions.intro3height + introsPositions.viewPortHeight) {
  //         introsPositions.intro3offsetTop += -(introsPositions.touchEnd.deltaY - introsPositions.touchStart.deltaY);
  //       } else {
  //         introsPositions.intro3offsetTop += -(introsPositions.intro3height + introsPositions.viewPortHeight - 200);
  //       }
  //       scrollElement($('.intro-3'), 0, -introsPositions.intro3offsetTop);
  //     } else {
  //       resetTouches();
  //       introsPositions.intro3offsetTop = 0;
  //       scrollElement($('.intro-3'), 0, -introsPositions.intro3offsetTop);
  //     }
  //   },
  //   {
  //     preventDefault: false,
  //     mouse: true,
  //     pen: true,
  //     distance: 1
  //   });


  // $('.intro-4').swipe(
  //   function (direction) {
  //     console.log(direction);
  //     if (direction === 'down' && introsPositions.intro4offsetTop < 0) {
  //       // introsPositions.intro4offsetTop += introsPositions.touchEnd.deltaY - introsPositions.touchStart.deltaY;
  //       if (introsPositions.intro4offsetTop < introsPositions.intro4height + introsPositions.viewPortHeight) {
  //         introsPositions.intro4offsetTop += -(introsPositions.touchEnd.deltaY - introsPositions.touchStart.deltaY);
  //       } else {
  //         introsPositions.intro4offsetTop += -(introsPositions.intro4height + introsPositions.viewPortHeight - 200);
  //       }
  //       scrollElement($('.intro-4'), 0, -introsPositions.intro4offsetTop);
  //     } else if (direction === 'up' && introsPositions.intro4offsetTop < introsPositions.intro4height + 200) {
  //       introsPositions.intro4offsetTop += -(introsPositions.touchEnd.deltaY - introsPositions.touchStart.deltaY);
  //       scrollElement($('.intro-4'), 0, -introsPositions.intro4offsetTop);
  //     } else {
  //       resetTouches();
  //       introsPositions.intro4offsetTop = 0;
  //       scrollElement($('.intro-4'), 0, -introsPositions.intro4offsetTop);
  //     }
  //   },
  //   {
  //     preventDefault: false,
  //     mouse: true,
  //     pen: true,
  //     distance: 1
  //   });



  function initializePageNavLinks() {
    if (!$('body').hasClass('home')) {
      return;
    }
    $('.section-navigation .orbit-link').attr('href', '');

    introSection.find('.section-navigation-link').on('click', function (e) {
      e.preventDefault();
      const dataDirection = $(this).data('nav-direction');
      if (dataDirection === "down") {
        scrollElement(introSection, 0, -sectionsConfiguration.sectionHeight);
        scrollElement(contentSections, 0, -sectionsConfiguration.sectionHeight);
        setSectionTopOffset(sectionsConfiguration.sectionHeight);
        setSectionLeftOffset(0);
      }
    });

    introSecTouch.find('.section-navigation-link').on('click', function (e) {
      e.preventDefault();
      console.log('clicked');
      const dataDirection = $(this).data('nav-direction');
      if (dataDirection === "down") {
        window.scroll(0, secProps.introSecHeight);
        // secProps.secReady = false;
      }
    });

    contentSections.find('.orbit-link, .section-navigation-link').on('click', function (e) {
      e.preventDefault();
      const dataDirection = $(this).data('direction') ? $(this).data('direction') : $(this).data('nav-direction');
      if (dataDirection === "up") {
        scrollElement(introSection, 0, 0);
        scrollElement(contentSections, 0, 0);
        setSectionTopOffset(0);
      } else if (dataDirection === "down") {
        scrollElement(contentSections, -sectionsConfiguration.maxOffset, -2 * sectionsConfiguration.sectionHeight);
        scrollElement(secondContentSections, -sectionsConfiguration.maxOffset, -2 * sectionsConfiguration.sectionHeight);
        setSectionTopOffset(sectionsConfiguration.sectionHeight);
        sectionsConfiguration.verticalContentPosition = 2 * sectionsConfiguration.sectionHeight;
      } else if (dataDirection === "left") {
        newLeftOffset = sectionsConfiguration.leftOffset;
        let newLeftOffset = sectionsConfiguration.leftOffset - sectionsConfiguration.contentSectionsWidth / 5;
        setSectionLeftOffset(newLeftOffset);
        scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
        setSectionLeftOffset(newLeftOffset);
      } else if (dataDirection === "right" && !sectionsConfiguration.lastSection) {
        let newLeftOffset = sectionsConfiguration.leftOffset + sectionsConfiguration.contentSectionsWidth / 5;
        if (newLeftOffset === sectionsConfiguration.maxOffset) {
          sectionsConfiguration.lastSection = true;
        }
        scrollElement(contentSections, -newLeftOffset, -sectionsConfiguration.topOffset);
        setSectionLeftOffset(newLeftOffset);
      }
      else {
        return;
      }
    });
  }

  initializePageNavLinks(); //only home initialize

  function setlineToRing(el) {
    const lineElement = ('<span class="line-element"></span>');
    el.append(lineElement);
    el.find('.line-element').css('width', $('.section-circle-ring-item-body').offset().left - (el.offset().left + el.innerWidth()) - 80 + 'px').addClass('animated');
  }
  function unsetLineToRing() {
    if ($('.line-element')) {
      $('.line-element').remove();
    }
  }

  function initRingCarousel() {

    if (!$("body").hasClass("home")) {
      return;
    }

    if ($('.section-circle-list')) {
      setTimeout(function () {
        $('.section-circle-list a').eq(0).trigger('click');
      }, 500);
    }

    const ringHeight = $('.section-circle-ring-item').height();

    $('.section-circle-list a').on('click', function (e) {
      e.preventDefault();
      const dataTarget = $(this).data('target-id');
      let ringContentHeight = $('.section-circle-ring-item-body-inner.active').height();

      if (dataTarget !== -1) {
        let linkPosition = $(this).position().top - $('.section-circle-list').position().top;
        $('.section-circle-ring-item-body-inner').removeClass('active');

        if (linkPosition + ringContentHeight + 50 > ringHeight) {
          linkPosition = ringHeight - linkPosition;
          $('*[data-source-id="' + dataTarget + '"]').addClass('active').css('bottom', linkPosition + 'px').addClass('inverted');
        } else {
          $('*[data-source-id="' + dataTarget + '"]').addClass('active').css('top', linkPosition + 'px');
        }

        //$('*[data-source-id="' + dataTarget + '"]').addClass('active').css('marginTop', linkPosition + 'px');

        $('.section-circle-list-items a').removeClass('active');
        $(this).addClass('active');
        unsetLineToRing();
        setlineToRing($(this));
      } else if (dataTarget === -1) {
        $('.section-circle-list a').removeClass('active');
        $(this).addClass('active');
        $('.section-circle-list-items a').removeClass('active');
        $(this).siblings('.section-circle-list-items').find('a').first().trigger("click").addClass('active');
      } else {
        $('.section-circle-list a').removeClass('active');
        $(this).addClass('active');
      }
    });
  }

  initRingCarousel();

  function initAboutCollapse() {
    if (!$("body").hasClass("about")) {
      return;
    }
    // about slider
    setTimeout(function () {
      $('.about .collapse-list a').eq(0).trigger('click');
    }, 1000);

    $('.about .collapse-list a').on('click', function (e) {
      e.preventDefault();
      const dataTarget = $(this).data('target-id');
      if (dataTarget !== -1) {
        $('.collapse-list-items-item').removeClass('active');
        $('.collapse-list-items-item[data-source-id="' + dataTarget + '"]').addClass('active');
        $('.about .collapse-list a').removeClass('active');
        $(this).addClass('active');
      } else {
        return;
      }
    });
  }
  initAboutCollapse();

  function initSlideshowCarousel(noVisibleItems) {

    if (!$("body").hasClass("home")) {
      return;
    }
    console.log('initialize slideshow');

    const slideshowContainer = $('.slideshow-container');

    //projectsContainer.find('.section-carousel-projects li').eq(1).addClass('active');
    const props = {
      'sliedshowCarouselItems': slideshowContainer.find('.slide-wrapper'),
      'sliedshowCarouselItem': slideshowContainer.find('.slide'),
      'arrowLeft': slideshowContainer.find('.slide-prev'),
      'arrowRight': slideshowContainer.find('.slide-next'),
      'stepValue': 0,
      'noElements': slideshowContainer.find('.slide').length,
      'carouselItemWidth': slideshowContainer.find('.slide').innerWidth(),
      'maxCarouselWidth': slideshowContainer.find('.slide').length * slideshowContainer.find('.slide').width(),
      'activeSlideId': 0,
      'carouselHeight': 0,
    }

    props.sliedshowCarouselItems.css('width', props.maxCarouselWidth + 'px');
    props.sliedshowCarouselItem.eq(props.activeSlideId).addClass('active');
    props.arrowLeft.on('click', function (e) {
      e.preventDefault();
      if (props.stepValue <= 0) {
        props.stepValue = props.maxCarouselWidth - props.carouselItemWidth;
      } else {
        props.stepValue -= props.sliedshowCarouselItem.width();
      }
      scrollElement(props.sliedshowCarouselItems, -(props.stepValue), 0);
    });
    props.arrowRight.on('click', function (e) {
      e.preventDefault();
      if (props.stepValue < props.maxCarouselWidth - props.carouselItemWidth) {
        props.stepValue += props.sliedshowCarouselItem.width();
      } else {
        props.stepValue = 0;
      }
      scrollElement(props.sliedshowCarouselItems, -(props.stepValue), 0);
    });

    props.sliedshowCarouselItem.swipe(
      function (direction) {
        // your handler code
        if (direction === 'right') {
          if (props.stepValue <= 0) {
            props.stepValue = props.maxCarouselWidth - props.carouselItemWidth;
          } else {
            props.stepValue -= props.sliedshowCarouselItem.width();
          }
          scrollElement(props.sliedshowCarouselItems, -(props.stepValue), 0);
        } else if (direction === 'left') {
          if (props.stepValue < props.maxCarouselWidth - props.carouselItemWidth) {
            props.stepValue += props.sliedshowCarouselItem.width();
          } else {
            props.stepValue = 0;
          }
          scrollElement(props.sliedshowCarouselItems, -(props.stepValue), 0);
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });

  }
  initSlideshowCarousel();

  const context = new window.AudioContext();
  function playFile(filepath) {
    // see https://jakearchibald.com/2016/sounds-fun/
    // Fetch the file
    fetch(filepath)
      // Read it into memory as an arrayBuffer
      .then(response => response.arrayBuffer())
      // Turn it from mp3/aac/whatever into raw audio data
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        // Now we're ready to play!
        const soundSource = context.createBufferSource();
        soundSource.buffer = audioBuffer;
        soundSource.connect(context.destination);
        soundSource.start();
      });
  }

  function initAudioButtons() {
    let playButton = $('.audio-buttons-play');
    playButton.on('click', function (e) {
      e.preventDefault();
      let soundUrl = $(this).data('play-file');
      if (!soundUrl) {
        return;
      } else {
        playFile(soundUrl);
      }
    });
  }
  initAudioButtons();

  function initCarousel() {
    const carouselContainer = $('.carousel');
    if (!carouselContainer) {
      return;
    }

    const carouselItems = carouselContainer.find('.carousel-items li');
    carouselItems.eq(0).addClass('active');
    let activeElement = carouselContainer.find('.carousel-items li.active');
    const carouselPagination = $('.carousel-pagination');
    const leftNav = carouselPagination.find('.prev');
    const rightNav = carouselPagination.find('.next');
    const paginationDots = carouselPagination.find('a:not("next"), a:not("prev")');
    let activeIndex = activeElement.index();
    rightNav.on('click', function (e) {
      e.preventDefault();
      carouselItems.removeClass('active');
      if (activeIndex < carouselItems.length - 1) {
        activeIndex++
      } else {
        activeIndex = 0;
      }
      carouselItems.eq(activeIndex).addClass('active');
    });
    leftNav.on('click', function (e) {
      e.preventDefault();
      carouselItems.removeClass('active');
      if (activeIndex > 0) {
        activeIndex--
      } else {
        activeIndex = carouselItems.length - 1;
      }
      carouselItems.eq(activeIndex).addClass('active');
    });

    carouselItems.swipe(
      function (direction) {
        // your handler code
        if (direction === 'left') {
          carouselItems.removeClass('active');
          if (activeIndex < carouselItems.length - 1) {
            activeIndex++
          } else {
            activeIndex = 0;
          }
          carouselItems.eq(activeIndex).addClass('active');
        } else if (direction === 'right') {
          carouselItems.removeClass('active');
          if (activeIndex > 0) {
            activeIndex--
          } else {
            activeIndex = carouselItems.length - 1;
          }
          carouselItems.eq(activeIndex).addClass('active');
        }
        else {
          return;
        }
      },
      {
        preventDefault: false,
        mouse: false,
        pen: true,
        distance: 50
      });
  }

  initCarousel();

  function initFooter() {
    const footerContainer = $('.footer');
    if (!footerContainer) {
      return;
    }
  }
  initFooter();

  function addClassMobile() {
    if ($(window).width() < 768) {
      $('body').addClass('is-mobile');
    }
  }

  var resizeTimer = false;

  $(window).on('resize', function (e) {

    if (!resizeTimer) {
      $(window).trigger('resizestart');
    }

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeTimer = false;
      $(window).trigger('resizeend');
    }, 250);

  }).on('resizestart', function () {
  }).on('resizeend', function () {
    updateSectionConfiguration();
    addClassMobile();
  });

})(jQuery); // Fully reference jQuery after this point.
