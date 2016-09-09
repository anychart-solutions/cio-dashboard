anychart.onDocumentReady(function () {

  function vRect(path, size) {
    path.clear();
    var x = Math.round(size / 2);
    var y = Math.round(size / 2);
    var height = size * 0.8;
    path.clear()
        .moveTo(x - 2, y - height / 2)
        .lineTo(x - 2, y + height / 2)
        .lineTo(x + 3, y + height / 2)
        .lineTo(x + 3, y - height / 2)
        .close();
  }

  var drawLegend = function (container_id, items) {
    var legend = anychart.ui.legend();
    legend.fontSize('11px');
    legend.items(items);
    legend.align('right');
    legend.position('rightCenter');
    legend.container(container_id);
    legend.draw();
  };


  var drawLineChart = function (container_id, data, ranges) {
    var sparkline = anychart.sparkline(data);
    if (ranges) sparkline.rangeMarker(0).from(ranges[0]).to(ranges[1]);
    sparkline.container(container_id);
    sparkline.draw();
  };

  var drawBulletChart = function(container_id, value, scale, ranges) {
    var bullet = anychart.bullet([{'value': value, 'type': 'bar', 'gap': 0.7}]);
    bullet.scale(scale);
    bullet.range(0).from(ranges[0]).to(ranges[1]).fill('#E6E6E6');
    bullet.range(1).from(ranges[1]).to(ranges[2]).fill('#D6D6D6');
    bullet.range(2).from(ranges[2]).to(ranges[3]).fill('#B8B8B8');
    bullet.container(container_id);
    bullet.draw();
  };


  var drawBulletLightChart = function(container_id, scale, value, rangeValue){
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


  function fillSystemAvailabilityTable(container_id, rawData, mainData){
    var rawView = anychart.data.set(rawData).mapAs({'System': [0], 'Availability': [2], 'x': [1], 'value': [2]});
    var bulletScale = anychart.scales.linear().minimum(85).maximum(100);
    drawLegend('systemAvailabilityLegend', [
      {'index': 0, 'text': 'Actual', 'iconType': vRect, 'iconFill': '#64b5f6'},
      {'index': 1, 'text': 'Acceptable', 'iconType': vRect, 'iconFill': '#D6D6D6'}
    ]);

    for (var i = 0; i < mainData.length; i++) {
      var system = mainData[i][0];
      var availability = mainData[i][1];
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

      drawLineChart("line_" + container_id + i, systemData, false);
      drawBulletLightChart("bullet_" + container_id + i, bulletScale, avgAvailability, availability);
    }
  }

  function fillHardwareOfCapacityTable(CPUData, StorageData, NetworkData, CPURanges, StorageRanges, NetworkRanges){
    var bulletScale = anychart.scales.linear().minimum(0).maximum(100);
    bulletScale.ticks().count(3);
    bulletScale.minorTicks().count(3);

    drawLegend('hardwareOfCapacityLegend', [
      {'index': 0, 'text': 'Actual', 'iconType': vRect, 'iconFill': '#64b5f6'},
      {'index': 1, 'text': 'Good', 'iconType': vRect, 'iconFill': '#E6E6E6'},
      {'index': 2, 'text': 'Acceptable', 'iconType': vRect, 'iconFill': '#D6D6D6'},
      {'index': 3, 'text': 'Critical', 'iconType': vRect, 'iconFill': '#B8B8B8'}

    ]);
    for (var i = 0; i < 3; i++) {
      var data = anychart.data.set(arguments[i]).mapAs();
      var avg = calcAvg(data, 'value');
      var ranges = arguments[3 + i];
      drawLineChart('hardwareOfCapacityTableLine' + i, data, false);
      drawBulletChart('hardwareOfCapacityTableBullet' + i, avg, bulletScale, ranges);
      $('#hardwareOfCapacityTableAverage' + i).html(avg.toFixed() + '%');
    }
  }

  function fillDailyNetworkTrafficChart(container_id, sixMonthsData, weekData, yesterdayData){
    var chart = anychart.cartesian();
    chart.palette(['#D6D6D6', '#B8B8B8', '#64b5f6']);
    chart.padding([5,0,0,0]);
    chart.crosshair().enabled(true).yLabel().enabled(false);
    chart.crosshair().yStroke(null).xLabel().enabled(false);
    chart.tooltip().positionMode('point');
    chart.interactivity().hoverMode('byX');
    chart.tooltip().displayMode('union');
    
    chart.line(sixMonthsData).name('Daily mean for last 6 month');
    chart.line(weekData).name('Daily mean for last 7 days');
    chart.line(yesterdayData).name('Yesterday');

    var xAxisScale = anychart.scales.dateTime();
    xAxisScale.minimum(Date.UTC(0, 0, 1, 0));
    xAxisScale.maximum(Date.UTC(0, 0, 2, 0));
    xAxisScale.ticks().interval(0, 0, 0, 6);
    xAxisScale.minorTicks().interval(0, 0, 0, 1);

    var bottomAxis = chart.xAxis(0);
    bottomAxis.scale(xAxisScale).staggerMode(false).overlapMode('allowOverlap');
    bottomAxis.minorLabels().enabled(true).fontSize(10).textFormatter(function (value) {
      var date = new Date(value['tickValue']);
      var h = date.getUTCHours() % 12;
      return h || 12;
    });
    bottomAxis.labels().enabled(true).fontSize(10).textFormatter(function (value) {
      var date = new Date(value['tickValue']);
      var hour = date.getUTCHours();
      var h = (hour % 12) || 12;
      if (hour == 0 && date.getUTCDay() == 1) return h + '\nAM';
      else if (hour == 12) return h + '\nPM';
      else return h;
    });

    var topAxis = chart.xAxis(1);
    topAxis.orientation('top');
    topAxis.ticks().enabled(false);
    topAxis.labels().enabled(false);

    chart.yScale().maximumGap(0).minimumGap(0);
    var leftAxis = chart.yAxis();
    leftAxis.labels().fontSize(10).textFormatter(function (value) {
      return (value['tickValue'] / 1000).toFixed(0) + 'K';
    });
    chart.grid().scale(xAxisScale).layout('vertical');

    //var legend = chart.legend();
    //legend.enabled(true)
    //  .fontSize(10)
    //  .fontColor(normalFontColor)
    //  .tooltip(false)
    //  .align('right')
    //  .padding(0)
    //  .margin(3, 0, 5);
    //legend.paginator().enabled(false);
    chart.container(container_id);
    chart.draw();
  }


  fillSystemAvailabilityTable('systemAvailabilityTable', SARawData, SAAcceptedAvailability);
  fillHardwareOfCapacityTable(HCCPUData, HCStorage, HCNetwork, HCCPURanges, HCNetworkRanges, HCStorageRanges);
  fillDailyNetworkTrafficChart('dailyNetworkTrafficChart', DNT6MonthAvgData, DNTWeekAvgData, DNTYesterdayData);

});