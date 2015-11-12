anychart.onDocumentReady(function () {
// Colors to use
  var title1FontColor = '#e65100';
  var title2FontColor = '#e65100';
  var markerColor = '#e65100';

  var infoFontColor = '#212121';
  var normalFontColor = '#7c868e';

  var chartColor = '#64b5f6';
  var chartBulletColor = '#1976d2';
  var borderColor = '#CECECE';
  var borderLightColor = '#EAEAEA';
  var range_colors = ['#E6E6E6', '#D6D6D6', '#B8B8B8'];

// Helpers functions
  function applyTitleCellSettings(cell, font_size) {
    if (!font_size) font_size = '14px';
    cell.fontSize(font_size);
    cell.fontColor(title2FontColor);
  }
  function formatDate(value) {
    var m = value.getMonth() + 1;
    if (m < 10) m = '0' + m;
    var d = value.getDate();
    if (d < 10) d = '0' + d;
    var y = value.getFullYear() - 2000;
    return m + '/' + d + '/' + y;
  }

  function hRect(path, size) {
    var x = Math.round(size / 2);
    var y = Math.round(size / 2);
    var width = size * 0.6;
    path.clear()
        .moveTo(x - width / 2, y - 2)
        .lineTo(x + width / 2, y - 2)
        .lineTo(x + width / 2, y + 1)
        .lineTo(x - width / 2, y + 1)
        .close();
  }

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

  var getLegend = function (items) {
    var legend = anychart.ui.legend();
    legend.fontSize('11px');
    legend.fontFamily("'Verdana', Helvetica, Arial, sans-serif");
    legend.itemsLayout('horizontal');
    legend.fontColor(normalFontColor);
    legend.iconTextSpacing(0);
    legend.align('right');
    legend.position('bottom');
    legend.padding(0);
    legend.margin(0, 0, 7, 0);
    legend.itemsSpacing(3);
    legend.title(false);
    legend.titleSeparator().enabled(false);
    legend.paginator().enabled(false);
    legend.background().enabled(false);
    legend.items(items);
    return legend
  };

  var getBulletChart = function (value, scale, ranges) {
    var bullet = anychart.bullet([{'value': value, 'type': 'bar', fill: chartBulletColor, 'gap': 0.7}]);
    bullet.scale(scale)
        .padding(0, 0, 0, 0)
        .margin(0);
    bullet.range(0)
        .from(ranges[0])
        .to(ranges[1])
        .fill(range_colors[0]);
    bullet.range(1)
        .from(ranges[1])
        .to(ranges[2])
        .fill(range_colors[1]);
    bullet.range(2)
        .from(ranges[2])
        .to(ranges[3])
        .fill(range_colors[2]);
    bullet.title(false);
    bullet.width('100%');
    bullet.height('100%');
    bullet.margin('30%', 0, '30%', 0);
    bullet.axis().enabled(false);
    bullet.background().enabled(false);
    return bullet
  };

  var getBulletLightChart = function(scale, value, rangeValue){
    var bullet = anychart.bullet([{'value': value, 'type': 'line', fill: chartBulletColor, 'gap': 0.4}]);
    bullet.scale(scale).padding(0).margin(0);
    bullet.range(0).from(rangeValue).to(100).fill(range_colors[1]);
    bullet.axis().enabled(false);
    bullet.width('100%');
    bullet.height('100%');
    bullet.margin('30%', 0, '30%', 0);
    bullet.background().enabled(true).stroke(range_colors[1]);
    return bullet
  };

  var getLineChart = function (data, ranges) {
    var sparkline = anychart.sparkline(data);
    sparkline.type('line');
    sparkline.stroke('1.5 ' + chartColor);
    sparkline.padding(0);
    if (ranges) sparkline.rangeMarker(0).from(ranges[0]).to(ranges[1]).fill(range_colors[1]);
    return sparkline;
  };

  var getBulletScale = function (min, max) {
    var bulletScale = anychart.scales.linear();
    bulletScale.minimum(min).maximum(max);
    return bulletScale
  };

  var getBulletAxis = function (min, max) {
    var axis = anychart.axes.linear();
    axis.orientation('bottom');
    axis.stroke(borderColor);
    axis.title(false);
    axis.ticks().stroke(borderColor);
    axis.minorTicks().enabled(false);
    axis.labels().fontSize('9px').padding(0);
    axis.scale(getBulletScale(min, max));
    return axis
  };

  var getNoticeMarkersFactory = function (size) {
    var markersFactory = anychart.ui.markersFactory();
    markersFactory.anchor('center')
        .position('center')
        .type('circle')
        .fill(markerColor)
        .stroke(null)
        .size(size);
    return markersFactory
  };

  function calcSum(view, fieldName) {
    var sum = 0;
    var count = 0;
    var iter = view.getIterator();
    while (iter.advance()) {
      count++;
      sum += iter.get(fieldName);
    }
    return sum;
  }

  function getLastFieldValue(view, fieldName) {
    var iterator = view.getIterator();
    if (iterator.select(iterator.getRowsCount() - 1))
      return iterator.get(fieldName);
    else
      return undefined;
  }

  function calcAvg(view, fieldName) {
    return calcSum(view, fieldName) / view.getIterator().getRowsCount();
  }

  function formatNumber(value, opt_decimalDigits) {
    return value.toFixed(opt_decimalDigits || 2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

// Drawing parts of dashboard
  var systemAvailabilityTable = function (rawData, acceptedAvailabilities) {
    var table = anychart.ui.table();
    table.cellBorder(null).fontColor(normalFontColor);
    var bulletLegend = getLegend([
      {'index': 0, 'text': 'Actual', 'iconType': vRect, 'iconStroke': 'none', 'iconFill': chartBulletColor},
      {'index': 1, 'text': 'Acceptable', 'iconType': vRect, 'iconStroke': 'none', 'iconFill': range_colors[1]}
    ]);
    var contents = [
      ['System Availability <span style="color: ' + infoFontColor + '; font-size: 11px;">(last 30 days)</span>', null, null, bulletLegend, null],
      ['Last 12 Month', null, 'System', 'Availability %', null]
    ];

    var rawView = anychart.data.set(rawData).mapAs({'System': [0], 'Availability': [2], 'x': [1], 'value': [2]});
    var bulletScale = getBulletScale(85, 100);

    for (var i = 0; i < acceptedAvailabilities.length; i++) {
      var system = acceptedAvailabilities[i][0];
      var availability = acceptedAvailabilities[i][1];
      var systemData = rawView.filter('System', filterBySystem(system));
      var avgAvailability = calcAvg(systemData, 'Availability');
      var line = getLineChart(systemData, false);
      var marker = null;
      if (avgAvailability < availability) marker = getNoticeMarkersFactory(5).add(null);
      var bullet = getBulletLightChart(bulletScale, avgAvailability, availability);
      contents.push([line, marker, system, bullet, avgAvailability.toFixed(1) + '%']);
    }
    contents.push([null, null, null, getBulletAxis(0, 100), null]);
    table.contents(contents).vAlign('middle').fontSize(11);

    var name_cell = table.getCell(0, 0);
    name_cell.colSpan(3).useHtml(true);
    applyTitleCellSettings(name_cell);

    var legend_cell = table.getCell(0, 3);
    legend_cell.colSpan(2);
    applyTitleCellSettings(legend_cell);

    table.getRow(0).height(30);
    table.getRow(1).height(20).fontColor(infoFontColor).cellBorder().bottom('2 ' + borderLightColor);
    table.getRow(9).height(20);
    table.getCol(1).width(15).hAlign('center');
    table.getCol(2).maxWidth(110);
    table.getCol(4).width(50).hAlign('right');
    table.getCell(1, 3).colSpan(2).hAlign('right');
    return table
  };

  var hardwareOfCapacityTable = function (CPUData, StorageData, NetworkData, CPURanges, StorageRanges, NetworkRanges) {
    var table = anychart.ui.table();
    table.cellBorder(null).fontColor(normalFontColor);
    var bulletLegend = getLegend([
      {'index': 0, 'text': 'Actual', 'iconType': hRect, 'iconFill': chartBulletColor},
      {'index': 1, 'text': 'Good', 'iconType': vRect, 'iconFill': range_colors[0]},
      {'index': 2, 'text': 'Excessive', 'iconType': vRect, 'iconFill': range_colors[1]},
      {'index': 3, 'text': 'Critical', 'iconType': vRect, 'iconFill': range_colors[2]}
    ]);
    var lines = [], bullets = [], averages = [];
    var bulletScale = getBulletScale(0, 100);
    bulletScale.ticks().count(3);
    bulletScale.minorTicks().count(3);

    for (var i = 0; i < 3; i++) {
      var data = anychart.data.set(arguments[i]).mapAs();
      var avg = calcAvg(data, 'value');
      var ranges = arguments[3 + i];
      lines.push(getLineChart(data, false));
      bullets.push(getBulletChart(avg, bulletScale, ranges));
      averages.push(avg.toFixed() + '%');
    }

    lines[0].xScale(anychart.scales.dateTime().minimumGap(0).maximumGap(0).ticks([]));
    var contents = [
      ['Hardware % of Capacity', null, null, bulletLegend, null, null],
      ['CPU', 'Today', lines[0], 'Overall', bullets[0], averages[0]],
      ['Storage', 'Last 12 Months', lines[1], 'Today', bullets[1], averages[1]],
      ['Network', 'Last 12 Months', lines[2], 'Today', bullets[2], averages[2]]
    ];

    contents.push([null, null, null, null, getBulletAxis(0, 100), null]);
    table.contents(contents).vAlign('middle').fontSize(11);
    table.getRow(0).cellBorder().bottom('2 ' + borderLightColor);

    var name_cell = table.getCell(0, 0);
    name_cell.colSpan(3);
    applyTitleCellSettings(name_cell);
    var legend_cell = table.getCell(0, 3);
    legend_cell.colSpan(3);
    applyTitleCellSettings(legend_cell);

    table.getRow(0).height(30).cellPadding(0);
    table.getRow(4).height(20);
    table.getCol(3).hAlign('center');
    table.getCol(0).maxWidth(60);
    table.getCol(1).maxWidth(100);
    table.getCol(3).maxWidth(65);
    table.getCol(5).width(40).hAlign('right');
    return table
  };

  var DailyOfNetworkTrafficTable = function (sixMonthsData, weekData, yesterdayData) {
    var chart = anychart.cartesian();
    chart.palette([range_colors[1], range_colors[2], chartColor]);
    chart.padding(0);
    chart.crosshair().enabled(true).yLabel().enabled(false);
    chart.crosshair().yStroke(null).xLabel().enabled(false);
    chart.tooltip().positionMode('point');
    chart.interactivity().hoverMode('byX');
    chart.tooltip().displayMode('union');
    var setupLine = function (data, name) {
      var line = chart.line(data);
      line.name(name);
      line.markers().enabled(false);
      line.hoverMarkers().enabled(false);
    };
    setupLine(sixMonthsData, 'Daily mean for last 6 month');
    setupLine(weekData, 'Daily mean for last 7 days');
    setupLine(yesterdayData, 'Yesterday');

    var xAxisScale = anychart.scales.dateTime();
    xAxisScale.minimum(Date.UTC(0, 0, 1, 0));
    xAxisScale.maximum(Date.UTC(0, 0, 2, 0));
    xAxisScale.ticks().interval(0, 0, 0, 6);
    xAxisScale.minorTicks().interval(0, 0, 0, 1);

    var bottomAxis = chart.xAxis(0);
    bottomAxis.scale(xAxisScale).staggerMode(false).overlapMode('allowOverlap');
    bottomAxis.title(false);
    bottomAxis.ticks(false);
    bottomAxis.minorTicks().enabled(false);
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
    topAxis.minorTicks().enabled(false);
    topAxis.title().enabled(false);
    topAxis.labels().enabled(false);
    topAxis.minorLabels().enabled(false);

    chart.yScale().maximumGap(0).minimumGap(0);
    var leftAxis = chart.yAxis();
    leftAxis.title().enabled(false);
    leftAxis.minorTicks().enabled(false);
    leftAxis.labels().fontSize(10).textFormatter(function (value) {
      return (value['tickValue'] / 1000).toFixed(0) + 'K';
    });
    chart.grid().scale(xAxisScale).layout('vertical');
    var legend = chart.legend();
    legend.enabled(true)
      .fontSize(10)
      .fontColor(normalFontColor)
      .tooltip(false)
      .align('right')
      .padding(0)
      .margin(3, 0, 5);
    legend.paginator().enabled(false);
    var contents = [
      ['Daily Network Traffic <span style="color: ' + infoFontColor + '; font-size: 11px;">(kilobytes)</span>'],
      [chart]
    ];
    var table = anychart.ui.table();
    table.cellBorder(null).fontColor(normalFontColor);
    table.contents(contents);
    var name_cell = table.getCell(0, 0);
    name_cell.useHtml(true);
    applyTitleCellSettings(name_cell);
    table.getRow(0).height(30).cellPadding(0);
    table.getRow(0).cellBorder().bottom('2 ' + borderLightColor);
    return table;
  };

  var keyNonSystemMetricTable = function () {
    var table = anychart.ui.table();
    table.cellBorder(null).fontColor(normalFontColor);
    var bulletLegend = getLegend([
      {'index': 0, 'text': 'Actual', 'iconType': hRect, 'iconFill': chartBulletColor},
      {'index': 1, 'text': 'Good', 'iconType': vRect, 'iconFill': range_colors[0]},
      {'index': 2, 'text': 'Excessive', 'iconType': vRect, 'iconFill': range_colors[1]},
      {'index': 3, 'text': 'Critical', 'iconType': vRect, 'iconFill': range_colors[2]}
    ]);
    var contents = [
      ['Key Non-System Metrics', null, null, bulletLegend, null],
      ['Year-to-Date', null, 'Metric', '% of Target', 'Actual']
    ];
    var views = [
      anychart.data.set(KNSMExpensesData).mapAs(),
      anychart.data.set(KNSMSatisfactionData).mapAs(),
      anychart.data.set(KNSMProblemsData).mapAs()
    ];
    var actualExpenses = calcSum(views[0], 'value');
    var actualSatisfaction = getLastFieldValue(views[1], 'value');
    var actualProblems = calcAvg(views[2], 'value');

    var actualValues = [
      actualExpenses / (KNSMBudgetTarget / KNSMExpensesData.length * 12) * 100,
      actualSatisfaction,
      actualProblems
    ];
    var actualTexts = [
      '$' + formatNumber(actualExpenses / 1000, 1) + 'K',
      actualSatisfaction + '/100',
      actualProblems.toFixed(0)
    ];
    var rangesForLines = [
      [0, KNSMBudgetTarget / 12],
      [KNSMSatisfactionRanges[0], KNSMSatisfactionRanges[1]],
      [KNSMProblemsRanges[0] / 100 * KNSMProblemsTarget, KNSMProblemsRanges[2] / 100 * KNSMProblemsTarget]
    ];
    var metrics = [
      'Expenses YTD',
      'Customer Satisfaction',
      'Level 1 Problems'
    ];
    var ranges_list = [KNSMExpensesRanges, KNSMSatisfactionRanges, KNSMProblemsRanges, KNSMBudgetTarget];
    for (var i = 0; i < 3; i++) {
      var ranges = ranges_list[i];
      var marker = null;
      if (actualValues[i] > Math.max(ranges[0], ranges[1]) || actualValues[i] < Math.min(ranges[0], ranges[1]))
        marker = getNoticeMarkersFactory(5).add(null);
      contents.push([
        getLineChart(views[i], rangesForLines[i]),
        marker,
        metrics[i],
        getBulletChart(actualValues[i], getBulletScale(0, 150), ranges),
        actualTexts[i]]);
    }
    contents.push([null, null, null, getBulletAxis(0, 150), null]);

    table.contents(contents).vAlign('middle').fontSize(11);

    var name_cell = table.getCell(0, 0);
    name_cell.colSpan(3);
    applyTitleCellSettings(name_cell);

    var legend_cell = table.getCell(0, 3);
    legend_cell.colSpan(2);
    table.getRow(1).fontColor(infoFontColor).cellBorder().bottom('2 ' + borderLightColor);
    table.getRow(5).height(20);
    table.getCol(0).cellPadding(['20%',0,'20%',0]);
    table.getRow(0).height(30).cellPadding(0);
    table.getRow(1).height(20).cellPadding(0);
    table.getCol(1).width(20).hAlign('center').cellPadding([0,0,0,5]);
    table.getCol(2).maxWidth(135);
    table.getCol(4).width(60).hAlign('right');

    return table
  };

  var majorProjectMileStonesTable = function () {
    var table = anychart.ui.table();
    table.cellBorder(null).fontColor(normalFontColor).fontSize(11);
    var contents = [
      ['Major Project Milestones <span style="color: ' + infoFontColor + '; font-size: 11px;">(by priority)</span>', null, null, null],
      [null, 'Project', 'Milestone', 'Days Until/Past Due', 'Due Date']
    ];
    var view = anychart.data.set(MPMData).mapAs({'Project': [0], 'Milestone': [1], 'Due': [2]});
    var iterator = view.getIterator();

    while (iterator.advance()) {
      var dueDate = new Date(iterator.get('Due'));
      var diff = getDiffInDays(Today, dueDate);
      var bullet = anychart.bullet([{
        'value': diff,
        'type': 'bar',
        'gap': 0.4,
        'fill': ((diff >= 0) ? range_colors[1] : chartBulletColor)
      }]);

      bullet.scale(getBulletScale(-20, 20)).padding(0).margin(0);
      bullet.title().enabled(false);
      bullet.axis().enabled(false);
      bullet.background().enabled(false);

      var marker;
      if (diff <= -10)
        marker = getNoticeMarkersFactory(5).add(null);
      else
        marker = null;
      contents.push([marker, iterator.get('Project'), iterator.get('Milestone'), bullet, formatDate(dueDate)]);
    }
    contents.push([null, null, null, getBulletAxis(-20, 20), null]);
    table.contents(contents);

    var name_cell = table.getCell(0, 0);
    name_cell.colSpan(5).hAlign('left').useHtml(true);
    applyTitleCellSettings(name_cell);

    table.getRow(0).height(30);
    table.getRow(1).height(20).fontColor(infoFontColor).cellBorder().bottom('2 ' + borderLightColor);
    table.getRow(8).height(20);

    table.getCol(0).width(20);
    table.getCol(2).maxWidth(140);
    table.getCol(3).maxWidth(130);
    table.getCol(4).width(70).hAlign('right');
    return table
  };

  var TopProjectInTheQueueTable = function () {
    var table = anychart.ui.table(7, 5);
    table.cellBorder(null).fontColor(normalFontColor).fontSize(11);
    var contents = [
      ['5 Top Projects in the Queue', null, null, null, null],
      [null, 'Project', 'Status', 'Approved', 'Sched.Start']
    ];
    var view = anychart.data.set(TPQData).mapAs({'Project': [0], 'Status': [1], 'Approved': [2], 'Start': [3]});
    var iterator = view.getIterator();
    for (var i = 0; iterator.advance(); i++) {
      contents.push([
        (i + 1).toString(),
        iterator.get('Project'),
        iterator.get('Status'),
        iterator.get('Approved') ? 'X' : null,
        formatDate(new Date(iterator.get('Start')))
      ]);
    }
    var name_cell = table.getCell(0, 0);
    name_cell.colSpan(5);
    applyTitleCellSettings(name_cell);
    table.getRow(1).height(20).fontColor(infoFontColor).cellBorder().bottom('2 ' + borderLightColor);
    table.getCol(0).width(20).hAlign('center').cellPadding(0);
    table.getCol(3).width(85).hAlign('center');
    table.getCol(4).width(100).hAlign('right');
    table.getRow(0).height(30).hAlign('left');
    table.contents(contents);
    return table;
  };


// Drawing dashboard
  var tableMain, leftDataTable, rightDataTable, wideContents, slimContents;

  // Creates left inside layout table
  var drawLeftDataTable = function(){
    var table = anychart.ui.table(3, 1);
    table.contents([
      [systemAvailabilityTable(SARawData, SAAcceptedAvailability)],
      [hardwareOfCapacityTable(HCCPUData, HCStorage, HCNetwork, HCCPURanges, HCNetworkRanges, HCStorageRanges)],
      [DailyOfNetworkTrafficTable(DNT6MonthAvgData, DNTWeekAvgData, DNTYesterdayData)]
    ]);
    table.cellBorder(null).fontColor(normalFontColor);
    table.getRow(0).height('45%');
    table.getRow(1).height('25%');
    table.getRow(2).height('30%');
    return table
  };

  // Creates right inside layout table
  var drawRightDataTable = function(){
    var table = anychart.ui.table(3, 1);
    table.contents([
      [keyNonSystemMetricTable()],
      [majorProjectMileStonesTable()],
      [TopProjectInTheQueueTable()]
    ]);
    table.cellBorder(null).fontColor(normalFontColor);
    table.getRow(0).height('30%');
    table.getRow(1).height('37%');
    table.getRow(2).height('33%');
    return table
  };

  // Draws general layout table in stage
  var drawMainTable = function () {
    stage = acgraph.create('container-dashboard');
    tableMain = anychart.ui.table();
    tableMain.cellBorder(null).fontColor(normalFontColor);
    tableMain.container(stage);
    tableMain.bounds(0, 0, '100%', '100%');


    tableMain.getCol(0).cellPadding(0, 20, 0, 0);
    tableMain.getCol(1).cellPadding(0, 0, 0, 20).hAlign('right').fontColor(infoFontColor);
    tableMain.getRow(0).height(20).vAlign('middle');
    tableMain.getRow(1).height(30).vAlign('middle').cellBorder().bottom('4 ' + borderLightColor);
    tableMain.getCell(1,0).fontColor(title1FontColor).fontSize(16);

    tableMain.container(stage).draw();
    return tableMain

  };

  // Creates general layout table with two inside layout tables
  var fillInMainTable = function(flag, leftTable, rightTable){
    if (flag == 'wide') {
      if (!wideContents) {
        wideContents = [
          ['This sample is based on the dashboard sample in "Information Dashboard Design: Displaying Data for At-a-Glance Monitoring" by Stephen Few', null],
          ['CIO Dashboard', '(As of ' + Today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) + ')'],
          [leftTable, rightTable]
        ]
      }
      tableMain.contents(wideContents);
      var copyright_cell = tableMain.getCell(0, 0);
      copyright_cell.colSpan(2);
    } else {
      if (!slimContents) {
        slimContents = [
          ['This sample is based on the dashboard sample in "Information Dashboard Design: Displaying Data for At-a-Glance Monitoring" by Stephen Few'],
        ['CIO Dashboard (As of ' + Today.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) + ')'],
        [leftTable],
        [rightTable]]
      }
      tableMain.contents(slimContents);
    }
  };

  // Creates general layout tables
  tableMain = drawMainTable();
  leftDataTable = drawLeftDataTable();
  rightDataTable = drawRightDataTable();
  if ($(window).width() > 768)
    fillInMainTable('wide', leftDataTable, rightDataTable);
  else {
    fillInMainTable('slim', leftDataTable, rightDataTable);
  }

  // On resize changing layout to mobile version or conversely
  $(window).resize(function() {
    if (tableMain.colsCount() == 1 && $(window).width() > 767) {
      fillInMainTable('wide', leftDataTable, rightDataTable);
    } else if (tableMain.colsCount() == 2 && $(window).width() <= 767) {
      fillInMainTable('slim', leftDataTable, rightDataTable);
    }
  });
});
