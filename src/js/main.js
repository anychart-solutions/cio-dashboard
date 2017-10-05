(function () {

    function vRect(path, size) {
        path.clear();
        var x = Math.round(size / 2);
        var y = Math.round(size / 2);
        var height = size * 0.8;
        path.clear()
            .moveTo(x - 2, y - height / 2 - 1)
            .lineTo(x - 2, y + height / 2 - 1)
            .lineTo(x + 2, y + height / 2 - 1)
            .lineTo(x + 2, y - height / 2 - 1)
            .close();
    }

    function drawLegend(container_id, items) {
        var legend = anychart.standalones.legend();
        legend.fontSize('11px');
        legend.items(items);
        legend.iconTextSpacing(0);
        legend.align('right');
        legend.vAlign('bottom');
        legend.position('right-bottom');
        legend.itemsSpacing(2);
        legend.container(container_id);
        legend.draw();
    }

    function drawLineChart(container_id, data, ranges) {
        var sparkLine = anychart.sparkline(data);
        if (ranges) sparkLine.rangeMarker(0).from(ranges[0]).to(ranges[1]);
        sparkLine.padding(0);
        sparkLine.xScale('date-time');
        sparkLine.xScale().minimumGap(0).maximumGap(0).ticks([]).minorTicks([]);
        sparkLine.container(container_id);
        sparkLine.draw();
    }

    function drawBulletChart(container_id, value, scale, ranges) {
        var bullet = anychart.bullet([{'value': value, 'type': 'bar', 'gap': 0.7, stroke: null, fill: '#1976d2'}]);
        bullet.scale(scale);
        bullet.range(0).from(ranges[0]).to(ranges[1]).fill('#E6E6E6');
        bullet.range(1).from(ranges[1]).to(ranges[2]).fill('#D6D6D6');
        bullet.range(2).from(ranges[2]).to(ranges[3]).fill('#B8B8B8');
        bullet.container(container_id);
        bullet.draw();
    }

    function drawBulletLightChart(container_id, scale, value, rangeValue) {
        var bullet = anychart.bullet([{
            'value': value,
            'type': 'line',
            fill: '#1976d2',
            stroke: '#1976d2',
            'gap': 0.4
        }]);
        bullet.scale(scale).padding(0).margin(0);
        bullet.range(0).from(rangeValue).to(100).fill('#D6D6D6');
        bullet.axis().enabled(false);
        bullet.width('100%');
        bullet.height('100%');
        bullet.margin('30%', 0, '30%', 0);
        bullet.background().enabled(true).stroke('#D6D6D6');
        bullet.container(container_id);
        bullet.draw();
    }


    function fillSystemAvailabilityTable(rawData, mainData) {
        var rawView = anychart.data.set(rawData).mapAs({'System': 0, 'Availability': 2, 'x': 1, 'value': 2});
        var bulletScale = anychart.scales.linear().minimum(85).maximum(100);
        drawLegend('systemAvailabilityLegend', [
            {'index': 0, 'text': 'Actual', 'iconType': vRect, 'iconFill': '#1976d2'},
            {'index': 1, 'text': 'Acceptable', 'iconType': vRect, 'iconFill': '#D6D6D6'}
        ]);

        for (var i = 0; i < mainData.length; i++) {
            var system = mainData[i][0];
            var availability = mainData[i][1];
            var systemData = rawView.filter('System', filterBySystem(system));
            var avgAvailability = calcAvg(systemData, 'Availability');
            drawLineChart("systemAvailabilityLine" + i, systemData, false);
            drawBulletLightChart("systemAvailabilityBullet" + i, bulletScale, avgAvailability, availability);
        }
    }

    function fillHardwareOfCapacityTable(CPUData, StorageData, NetworkData, CPURanges, StorageRanges, NetworkRanges) {
        var bulletScale = anychart.scales.linear().minimum(0).maximum(100);
        bulletScale.ticks().count(3);
        bulletScale.minorTicks().count(3);

        drawLegend('hardwareOfCapacityLegend', [
            {'index': 0, 'text': 'Actual', 'iconType': vRect, 'iconFill': '#1976d2'},
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

    function fillDailyNetworkTrafficChart(container_id, sixMonthsData, weekData, yesterdayData) {
        var chart = anychart.cartesian();
        chart.palette(['#D6D6D6', '#B8B8B8', '#64b5f6']);
        chart.padding([5, 0, 0, 0]);
        chart.crosshair()
            .enabled(true)
            .yLabel(false)
            .yStroke(null)
            .xLabel(false);
        chart.interactivity().hoverMode('by-x');
        chart.tooltip().displayMode('union');

        var series_1 = chart.line(sixMonthsData).name('Daily mean for last 6 month');
        series_1.legendItem({'iconType': vRect});
        series_1.hovered().markers(false);
        var series_2 = chart.line(weekData).name('Daily mean for last 7 days');
        series_2.legendItem({'iconType': vRect});
        series_2.hovered().markers(false);
        var series_3 = chart.line(yesterdayData).name('Yesterday');
        series_3.legendItem({'iconType': vRect});
        series_3.hovered().markers(false);

        var xAxisScale = anychart.scales.dateTime();
        xAxisScale.minimum(Date.UTC(0, 0, 1, 0));
        xAxisScale.maximum(Date.UTC(0, 0, 2, 0));
        xAxisScale.ticks().interval(0, 0, 0, 6);
        xAxisScale.minorTicks().interval(0, 0, 0, 1);

        var bottomAxis = chart.xAxis(0);
        bottomAxis.scale(xAxisScale).staggerMode(false).overlapMode('allow-overlap');
        bottomAxis.minorLabels().enabled(true).fontSize(10).format(function (value) {
            var date = new Date(value['tickValue']);
            var h = date.getUTCHours() % 12;
            return h || 12;
        });
        bottomAxis.labels().enabled(true).fontSize(10).format(function (value) {
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
        leftAxis.labels().fontSize(10).format(function (value) {
            return (value['tickValue'] / 1000).toFixed(0) + 'K';
        });
        chart.xGrid().scale(xAxisScale);
        chart.legend().enabled(true).align('right').fontSize(11).itemsSpacing(2).iconTextSpacing(0);
        chart.container(container_id);
        chart.draw();
    }

    function fillKeyNonMetricsTable(expensesData, satisfactionData, problemsData, budgetTarget, satisfactionRanges, problemsRanges, expensesRanges, problemsTarget) {
        drawLegend('keyNonMetricsLegend', [
            {'index': 0, 'text': 'Actual', 'iconType': vRect, 'iconFill': '#1976d2'},
            {'index': 1, 'text': 'Good', 'iconType': vRect, 'iconFill': '#E6E6E6'},
            {'index': 2, 'text': 'Acceptable', 'iconType': vRect, 'iconFill': '#D6D6D6'},
            {'index': 3, 'text': 'Critical', 'iconType': vRect, 'iconFill': '#B8B8B8'}
        ]);
        var bulletScale = anychart.scales.linear().minimum(0).maximum(150);
        var views = [
            anychart.data.set(expensesData).mapAs(),
            anychart.data.set(satisfactionData).mapAs(),
            anychart.data.set(problemsData).mapAs()
        ];
        var actualExpenses = calcSum(views[0], 'value');
        var actualSatisfaction = getLastFieldValue(views[1], 'value');
        var actualProblems = calcAvg(views[2], 'value');
        var actualValues = [
            actualExpenses / (budgetTarget / expensesData.length * 12) * 100,
            actualSatisfaction,
            actualProblems
        ];
        var rangesForLines = [
            [0, budgetTarget / 12],
            [satisfactionRanges[0], satisfactionRanges[1]],
            [problemsRanges[0] / 100 * problemsTarget, problemsRanges[2] / 100 * problemsTarget]
        ];
        var ranges_list = [expensesRanges, satisfactionRanges, problemsRanges, budgetTarget];
        for (var i = 0; i < 3; i++) {
            var ranges = ranges_list[i];
            drawLineChart('keyNonMetricsLine' + i, views[i], rangesForLines[i]);
            drawBulletChart('keyNonMetricsBullet' + i, actualValues[i], bulletScale, ranges)
        }
    }

    function fillMajorProjectMilestonesTable(data) {
        var view = anychart.data.set(data).mapAs({'Project': [0], 'Milestone': [1], 'Due': [2]});
        var iterator = view.getIterator();
        var bulletScale = anychart.scales.linear().minimum(-20).maximum(20);

        var i = 0;
        while (iterator.advance()) {
            var dueDate = new Date(iterator.get('Due'));
            var diff = getDiffInDays(Today, dueDate);
            var bullet = anychart.bullet([{
                'value': diff,
                'type': 'bar',
                'gap': 0.2,
                'stroke': null,
                'fill': ((diff >= 0) ? '#D6D6D6' : '#1976d2')
            }]);
            bullet.scale(bulletScale).padding(0).margin(0);
            i++;
            bullet.container('majorProjectMilestonesBar' + i);
            bullet.draw();
        }
        var axis = anychart.standalones.axes.linear();
        axis.orientation('bottom');
        axis.labels().fontSize('9px').padding(0);
        axis.scale(bulletScale);
        axis.minorTicks(false);
        axis.padding([0, 5, 0, 5]);
        axis.container('majorProjectMilestonesScale');
        axis.draw()
    }

    anychart.theme({defaultTooltip: {allowLeaveStage: true}});
    fillSystemAvailabilityTable(SARawData, SAAcceptedAvailability);
    fillHardwareOfCapacityTable(HCCPUData, HCStorage, HCNetwork, HCCPURanges, HCNetworkRanges, HCStorageRanges);
    fillDailyNetworkTrafficChart('dailyNetworkTrafficChart', DNT6MonthAvgData, DNTWeekAvgData, DNTYesterdayData);
    fillKeyNonMetricsTable(KNSMExpensesData, KNSMSatisfactionData, KNSMProblemsData, KNSMBudgetTarget, KNSMSatisfactionRanges, KNSMProblemsRanges, KNSMExpensesRanges, KNSMProblemsTarget);
    fillMajorProjectMilestonesTable(MPMData);
})();

function hidePreloader() {
    $('#loader-wrapper').fadeOut('slow');
}

$(window).on('load', function () {
    hidePreloader();
});