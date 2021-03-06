jQuery(function($) {
  drawCharts();
});

function drawCharts(){
  webshellcnt = [$('.cwebshell.is-success').length,
                  $('.cwebshell.is-warning').length,
                  $('.cwebshell.is-danger').length];
  malwarecnt = [$('.cmalware.is-success').length,
                $('.cmalware.is-warning').length,
                $('.cmalware.is-danger').length];
  tlscnt = [$('.ctls.is-success').length,
                $('.ctls.is-warning').length,
                $('.ctls.is-danger').length];
  textcnt = [$('.ctext.is-success').length,
                  $('.ctext.is-warning').length,
                  $('.ctext.is-danger').length];
  applicationcnt = [$('.capplication.is-success').length,
                $('.capplication.is-warning').length,
                $('.capplication.is-danger').length];
  configurationcnt = [$('.cconfiguration.is-success').length,
                $('.cconfiguration.is-warning').length,
                $('.cconfiguration.is-danger').length];
  reputationcnt = [$('.creputation.is-success').length,
                $('.creputation.is-warning').length,
                $('.creputation.is-danger').length];

  $('.webshellcnt.is-success').html(webshellcnt[0]);
  $('.webshellcnt.is-warning').html(webshellcnt[1]);
  $('.webshellcnt.is-danger').html(webshellcnt[2]);
  $('.malwarecnt.is-success').html(malwarecnt[0]);
  $('.malwarecnt.is-warning').html(malwarecnt[1]);
  $('.malwarecnt.is-danger').html(malwarecnt[2]);
  $('.textcnt.is-success').html(textcnt[0]);
  $('.textcnt.is-warning').html(textcnt[1]);
  $('.textcnt.is-danger').html(textcnt[2]);
  $('.applicationcnt.is-success').html(applicationcnt[0]);
  $('.applicationcnt.is-warning').html(applicationcnt[1]);
  $('.applicationcnt.is-danger').html(applicationcnt[2]);
  $('.tlscnt.is-success').html(tlscnt[0]);
  $('.tlscnt.is-warning').html(tlscnt[1]);
  $('.tlscnt.is-danger').html(tlscnt[2]);
  $('.reputationcnt.is-success').html(reputationcnt[0]);
  $('.reputationcnt.is-warning').html(reputationcnt[1]);
  $('.reputationcnt.is-danger').html(reputationcnt[2]);
  $('.configurationcnt.is-success').html(configurationcnt[0]);
  $('.configurationcnt.is-warning').html(configurationcnt[1]);
  $('.configurationcnt.is-danger').html(configurationcnt[2]);


  var options = {
    responsive: false,
    legend: {
      display: false
    }
  };
  var bgColor = [
    "#23d160",
    "#ffdd57",
    "#ff3860"
  ]
  var labels = [
    "OK",
    "Suspicious",
    "Danger"
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
