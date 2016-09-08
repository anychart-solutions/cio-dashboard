anychart.onDocumentReady(function () {

  var getLineChart = function (container_id, data, ranges) {
      var sparkline = anychart.sparkline(data);
      if (ranges) sparkline.rangeMarker(0).from(ranges[0]).to(ranges[1]);
      sparkline.container(container_id);
      sparkline.draw();
  };

  var getBulletLightChart = function(container_id, scale, value, rangeValue){
    var bullet = anychart.bullet([{'value': value, 'type': 'line', 'gap': 0.4}]);
    bullet.scale(scale).padding(0).margin(0);
    bullet.range(0).from(rangeValue).to(100).fill('#D6D6D6');
    bullet.axis().enabled(false);
    bullet.width('100%');
    bullet.height('100%');
    bullet.margin('30%', 0, '30%', 0);
    bullet.background().enabled(true).stroke('#D6D6D6');
    bullet.container(container_id);
    bullet.draw();
  };


  function fillSystemAvailabilityTable(container_id, rawData, data){
    var rawView = anychart.data.set(rawData).mapAs({'System': [0], 'Availability': [2], 'x': [1], 'value': [2]});
    var bulletScale = anychart.scales.linear().minimum(85).maximum(100);


    for (var i = 0; i < data.length; i++) {
      var system = data[i][0];
      var availability = data[i][1];
      var systemData = rawView.filter('System', filterBySystem(system));
      var avgAvailability = calcAvg(systemData, 'Availability');

      var $marker = '';
      if (avgAvailability < availability) $marker = '<i class="fa fa-circle"></i>';

      $('#' + container_id).append('<tr>' +
        '<td> <div class="narrow_container" id="line_' + container_id + i + '"></div></td>' +
        '<td>' + $marker + '</td>' +
        '<td>' + system + '</td>' +
        '<td> <div class="narrow_container" id="bullet_' + container_id + i + '"></div></td>' +
        '<td>' + availability.toFixed(1) + '%</td>' +
      '</tr>');

      getLineChart("line_" + container_id + i, systemData, false);
      getBulletLightChart("bullet_" + container_id + i, bulletScale, avgAvailability, availability);
    }
  }


  fillSystemAvailabilityTable('systemAvailabilityTable', SARawData, SAAcceptedAvailability)

});