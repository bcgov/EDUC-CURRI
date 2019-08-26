jQuery(document).ready(function() {
  // Very quick and very dirty video resize for the Flowplayer module. 
  // It still uses Flash (!!!) and should probably be replaced. 
  if (window.innerWidth < 950) {
    jQuery("div[id^=flowplayer], div[id^=flowplayer] object").removeAttr('style').css('min-height', '270px');
    console.log('Video resized from its original dimensions in order to fit on small screen.');
  }
});
