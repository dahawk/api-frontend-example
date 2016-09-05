jQuery(function($) {
  var $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer');


  // ==========================================================================
  // Toggle Sidedrawer
  // ==========================================================================
  function showSidedrawer() {
    // show overlay
    var options = {
      onclose: function() {
        $sidedrawerEl
          .removeClass('active')
          .appendTo(document.body);
      }
    };

    var $overlayEl = $(mui.overlay('on', options));

    // show element
    $sidedrawerEl.appendTo($overlayEl);
    setTimeout(function() {
      $sidedrawerEl.addClass('active');
    }, 20);
  }


  function hideSidedrawer() {
    $bodyEl.toggleClass('hide-sidedrawer');
  }


  $('.js-show-sidedrawer').on('click', showSidedrawer);
  $('.js-hide-sidedrawer').on('click', hideSidedrawer);


  // ==========================================================================
  // Animate menu
  // ==========================================================================
  var $titleEls = $('strong', $sidedrawerEl);

  $titleEls
    .next()
    .hide();

  $titleEls.on('click', function() {
    $(this).next().slideToggle(200);
  });


  drawCharts();
});

function drawCharts(){
  webshellcnt = [$('.cwebshell.bubble0').length,
                  $('.cwebshell.bubble1').length,
                  $('.cwebshell.bubble2').length];
  malwarecnt = [$('.cmalware.bubble0').length,
                $('.cmalware.bubble1').length,
                $('.cmalware.bubble2').length];
  tlscnt = [$('.ctls.bubble0').length,
                $('.ctls.bubble1').length,
                $('.ctls.bubble2').length];
  textcnt = [$('.ctext.bubble0').length,
                  $('.ctext.bubble1').length,
                  $('.ctext.bubble2').length];
  applicationcnt = [$('.capplication.bubble0').length,
                $('.capplication.bubble1').length,
                $('.capplication.bubble2').length];
  configurationcnt = [$('.cconfiguration.bubble0').length,
                $('.cconfiguration.bubble1').length,
                $('.cconfiguration.bubble2').length];
  reputationcnt = [$('.creputation.bubble0').length,
                $('.creputation.bubble1').length,
                $('.creputation.bubble2').length];

  $('.webshellcnt.bubble0').html(webshellcnt[0]);
  $('.webshellcnt.bubble1').html(webshellcnt[1]);
  $('.webshellcnt.bubble2').html(webshellcnt[2]);
  $('.malwarecnt.bubble0').html(malwarecnt[0]);
  $('.malwarecnt.bubble1').html(malwarecnt[1]);
  $('.malwarecnt.bubble2').html(malwarecnt[2]);
  $('.textcnt.bubble0').html(textcnt[0]);
  $('.textcnt.bubble1').html(textcnt[1]);
  $('.textcnt.bubble2').html(textcnt[2]);
  $('.applicationcnt.bubble0').html(applicationcnt[0]);
  $('.applicationcnt.bubble1').html(applicationcnt[1]);
  $('.applicationcnt.bubble2').html(applicationcnt[2]);
  $('.tlscnt.bubble0').html(tlscnt[0]);
  $('.tlscnt.bubble1').html(tlscnt[1]);
  $('.tlscnt.bubble2').html(tlscnt[2]);
  $('.reputationcnt.bubble0').html(reputationcnt[0]);
  $('.reputationcnt.bubble1').html(reputationcnt[1]);
  $('.reputationcnt.bubble2').html(reputationcnt[2]);
  $('.configurationcnt.bubble0').html(configurationcnt[0]);
  $('.configurationcnt.bubble1').html(configurationcnt[1]);
  $('.configurationcnt.bubble2').html(configurationcnt[2]);


  var options = {
    responsive: false,
    legend: {
      display: false
    }
  };
  var bgColor = [
    "#73bd2c",
    "#ffde66",
    "#ff744c"
  ]
  var labels = [
    "OK",
    "Medium",
    "Critical"
  ]


  var webshelldata = {
    labels: labels,
    datasets: [
      {
        data: webshellcnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var webshellchart = new Chart($('#webshellchart'), {
      type: 'doughnut',
      data: webshelldata,
      options: options
  });

  var malwaredata = {
    labels: labels,
    datasets: [
      {
        data: malwarecnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var malwarechart = new Chart($('#malwarechart'), {
      type: 'doughnut',
      data: malwaredata,
      options: options
  });

  var tlsdata = {
    labels: labels,
    datasets: [
      {
        data: tlscnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var tlschart = new Chart($('#tlschart'), {
      type: 'doughnut',
      data: tlsdata,
      options: options
  });

  var applicationdata = {
    labels: labels,
    datasets: [
      {
        data: applicationcnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var applicationchart = new Chart($('#applicationchart'), {
      type: 'doughnut',
      data: applicationdata,
      options: options
  });

  var textdata = {
    labels: labels,
    datasets: [
      {
        data: textcnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var textchart = new Chart($('#textchart'), {
      type: 'doughnut',
      data: textdata,
      options: options
  });

  var reputationdata = {
    labels: labels,
    datasets: [
      {
        data: reputationcnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var reputationchart = new Chart($('#reputationchart'), {
      type: 'doughnut',
      data: reputationdata,
      options: options
  });

  var configurationdata = {
    labels: labels,
    datasets: [
      {
        data: configurationcnt,
        backgroundColor: bgColor,
        hoverBackgroundColor: bgColor
      }]
  };
  var configurationchart = new Chart($('#configurationchart'), {
      type: 'doughnut',
      data: configurationdata,
      options: options
  });
}
