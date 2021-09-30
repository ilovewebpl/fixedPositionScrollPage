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

