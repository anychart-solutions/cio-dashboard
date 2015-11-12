
var SARawData = [
  ['Network', Date.UTC(2013, 10), 98.6],
  ['Network', Date.UTC(2013, 11), 98.5],
  ['Network', Date.UTC(2014, 0), 98.5],
  ['Network', Date.UTC(2014, 1), 99.0],
  ['Network', Date.UTC(2014, 2), 99.2],
  ['Network', Date.UTC(2014, 3), 99.0],
  ['Network', Date.UTC(2014, 4), 99.3],
  ['Network', Date.UTC(2014, 5), 99.1],
  ['Network', Date.UTC(2014, 6), 99.0],
  ['Network', Date.UTC(2014, 7), 99.3],
  ['Network', Date.UTC(2014, 8), 99.5],
  ['Network', Date.UTC(2014, 9), 99.7],
  ['ERP', Date.UTC(2013, 10), 98.6],
  ['ERP', Date.UTC(2013, 11), 98.9],
  ['ERP', Date.UTC(2014, 0), 98.8],
  ['ERP', Date.UTC(2014, 1), 98.3],
  ['ERP', Date.UTC(2014, 2), 98.6],
  ['ERP', Date.UTC(2014, 3), 98.7],
  ['ERP', Date.UTC(2014, 4), 98.9],
  ['ERP', Date.UTC(2014, 5), 98.3],
  ['ERP', Date.UTC(2014, 6), 98.1],
  ['ERP', Date.UTC(2014, 7), 99.0],
  ['ERP', Date.UTC(2014, 8), 98.9],
  ['ERP', Date.UTC(2014, 9), 99.3],
  ['Data Warehouse', Date.UTC(2013, 10), 95.3],
  ['Data Warehouse', Date.UTC(2013, 11), 95.9],
  ['Data Warehouse', Date.UTC(2014, 0), 96.7],
  ['Data Warehouse', Date.UTC(2014, 1), 95.6],
  ['Data Warehouse', Date.UTC(2014, 2), 96.8],
  ['Data Warehouse', Date.UTC(2014, 3), 95.8],
  ['Data Warehouse', Date.UTC(2014, 4), 96.3],
  ['Data Warehouse', Date.UTC(2014, 5), 95.6],
  ['Data Warehouse', Date.UTC(2014, 6), 95.4],
  ['Data Warehouse', Date.UTC(2014, 7), 95.5],
  ['Data Warehouse', Date.UTC(2014, 8), 96.7],
  ['Data Warehouse', Date.UTC(2014, 9), 96.9],
  ['Web Site', Date.UTC(2013, 10), 97.9],
  ['Web Site', Date.UTC(2013, 11), 98.4],
  ['Web Site', Date.UTC(2014, 0), 98.5],
  ['Web Site', Date.UTC(2014, 1), 98.8],
  ['Web Site', Date.UTC(2014, 2), 99.0],
  ['Web Site', Date.UTC(2014, 3), 99.3],
  ['Web Site', Date.UTC(2014, 4), 99.2],
  ['Web Site', Date.UTC(2014, 5), 99.4],
  ['Web Site', Date.UTC(2014, 6), 99.4],
  ['Web Site', Date.UTC(2014, 7), 99.5],
  ['Web Site', Date.UTC(2014, 8), 99.6],
  ['Web Site', Date.UTC(2014, 9), 99.7],
  ['Email', Date.UTC(2013, 10), 99.0],
  ['Email', Date.UTC(2013, 11), 98.4],
  ['Email', Date.UTC(2014, 0), 99.1],
  ['Email', Date.UTC(2014, 1), 98.2],
  ['Email', Date.UTC(2014, 2), 98.2],
  ['Email', Date.UTC(2014, 3), 97.9],
  ['Email', Date.UTC(2014, 4), 98.6],
  ['Email', Date.UTC(2014, 5), 99.1],
  ['Email', Date.UTC(2014, 6), 98.4],
  ['Email', Date.UTC(2014, 7), 99.2],
  ['Email', Date.UTC(2014, 8), 99.2],
  ['Email', Date.UTC(2014, 9), 99.3],
  ['HR', Date.UTC(2013, 10), 97.0],
  ['HR', Date.UTC(2013, 11), 97.9],
  ['HR', Date.UTC(2014, 0), 98.2],
  ['HR', Date.UTC(2014, 1), 98.9],
  ['HR', Date.UTC(2014, 2), 98.2],
  ['HR', Date.UTC(2014, 3), 98.7],
  ['HR', Date.UTC(2014, 4), 98.4],
  ['HR', Date.UTC(2014, 5), 98.5],
  ['HR', Date.UTC(2014, 6), 98.6],
  ['HR', Date.UTC(2014, 7), 98.5],
  ['HR', Date.UTC(2014, 8), 98.7],
  ['HR', Date.UTC(2014, 9), 98.8],
  ['Problem Tracking', Date.UTC(2013, 10), 96.1],
  ['Problem Tracking', Date.UTC(2013, 11), 96.1],
  ['Problem Tracking', Date.UTC(2014, 0), 96.0],
  ['Problem Tracking', Date.UTC(2014, 1), 95.9],
  ['Problem Tracking', Date.UTC(2014, 2), 95.7],
  ['Problem Tracking', Date.UTC(2014, 3), 95.5],
  ['Problem Tracking', Date.UTC(2014, 4), 95.0],
  ['Problem Tracking', Date.UTC(2014, 5), 94.9],
  ['Problem Tracking', Date.UTC(2014, 6), 94.8],
  ['Problem Tracking', Date.UTC(2014, 7), 95.0],
  ['Problem Tracking', Date.UTC(2014, 8), 94.8],
  ['Problem Tracking', Date.UTC(2014, 9), 94.4]
];

// System Availability accepted values. Columns are: ['System', 'Accepted Availability']
var SAAcceptedAvailability = [
  ['Network', 99],
  ['ERP', 98],
  ['Data Warehouse', 98],
  ['Web Site', 98],
  ['Email', 98],
  ['HR', 96],
  ['Problem Tracking', 93]
];

// CPU Capacity % for today. Columns are: ['DateTime', 'Capacity']
var HCCPUData = [
  [Date.UTC(2014, 9, 15, 0), 94.4],
  [Date.UTC(2014, 9, 15, 1), 92.0],
  [Date.UTC(2014, 9, 15, 2), 89.6],
  [Date.UTC(2014, 9, 15, 3), 87.7],
  [Date.UTC(2014, 9, 15, 4), 89.6],
  [Date.UTC(2014, 9, 15, 5), 87.0],
  [Date.UTC(2014, 9, 15, 6), 84.0],
  [Date.UTC(2014, 9, 15, 7), 73.4],
  [Date.UTC(2014, 9, 15, 8), 73.2],
  [Date.UTC(2014, 9, 15, 9), 72.5],
  [Date.UTC(2014, 9, 15, 10), 74.2],
  [Date.UTC(2014, 9, 15, 11), 70.8],
  [Date.UTC(2014, 9, 15, 12), 71.4],
  [Date.UTC(2014, 9, 15, 13), 74.9],
  [Date.UTC(2014, 9, 15, 14), 74.5],
  [Date.UTC(2014, 9, 15, 15), 70.6],
  [Date.UTC(2014, 9, 15, 16), 68.4],
  [Date.UTC(2014, 9, 15, 17), 70.3],
  [Date.UTC(2014, 9, 15, 18), 74.0],
  [Date.UTC(2014, 9, 15, 19), 75.5],
  [Date.UTC(2014, 9, 15, 20), 74.7],
  [Date.UTC(2014, 9, 15, 21), 78.1],
  [Date.UTC(2014, 9, 15, 22), 78.8],
  [Date.UTC(2014, 9, 15, 23), 81.6]
];

// Storage Capacity % for last 12 month. Columns are: ['Month', 'Capacity']
var HCStorage = [
  [Date.UTC(2013, 10), 61.2],
  [Date.UTC(2013, 11), 64.1],
  [Date.UTC(2014, 0), 65.8],
  [Date.UTC(2014, 1), 67.5],
  [Date.UTC(2014, 2), 69.0],
  [Date.UTC(2014, 3), 70.3],
  [Date.UTC(2014, 4), 71.6],
  [Date.UTC(2014, 5), 71.4],
  [Date.UTC(2014, 6), 73.0],
  [Date.UTC(2014, 7), 73.2],
  [Date.UTC(2014, 8), 73.8],
  [Date.UTC(2014, 9), 74.6]
];

// Network Capacity % for last 12 month. Columns are: ['Month', 'Capacity']
var HCNetwork = [
  [Date.UTC(2013, 10), 68.8],
  [Date.UTC(2013, 11), 72.5],
  [Date.UTC(2014, 0), 74.1],
  [Date.UTC(2014, 1), 77.7],
  [Date.UTC(2014, 2), 85.1],
  [Date.UTC(2014, 3), 83.0],
  [Date.UTC(2014, 4), 83.9],
  [Date.UTC(2014, 5), 79.3],
  [Date.UTC(2014, 6), 81.7],
  [Date.UTC(2014, 7), 75.9],
  [Date.UTC(2014, 8), 79.8],
  [Date.UTC(2014, 9), 82.8]
];

var HCCPURanges = [0, 80, 90, 100];
var HCStorageRanges = [0, 60, 80, 100];
var HCNetworkRanges = [0, 60, 80, 100];

// Daily Network Traffic for different periods of time. Columns are ['Hour', 'Average Traffic'].
// These data are supposed to be pre-calculated by a server or something else.
// DNT for last six month.
var DNT6MonthAvgData = [
  [0, 171320],
  [1, 140377],
  [2, 119245],
  [3, 58867],
  [4, 46037],
  [5, 15094],
  [6, 25660],
  [7, 135094],
  [8, 188679],
  [9, 186415],
  [10, 166037],
  [11, 160754],
  [12, 135849],
  [13, 166792],
  [14, 175849],
  [15, 175094],
  [16, 144905],
  [17, 166037],
  [18, 129056],
  [19, 66415],
  [20, 54339],
  [21, 35471],
  [22, 39245],
  [23, 160754]
];
var DNTWeekAvgData = [
  [0, 179622],
  [1, 147924],
  [2, 125283],
  [3, 65660],
  [4, 39245],
  [5, 3773],
  [6, 12075],
  [7, 142641],
  [8, 193962],
  [9, 193962],
  [10, 176603],
  [11, 156226],
  [12, 140377],
  [13, 179622],
  [14, 169056],
  [15, 169811],
  [16, 149433],
  [17, 178867],
  [18, 121509],
  [19, 58113],
  [20, 44528],
  [21, 40754],
  [22, 45283],
  [23, 170566]
];
var DNTYesterdayData = [
  [0, 193207],
  [1, 156226],
  [2, 132075],
  [3, 42264],
  [4, 23396],
  [5, 9056],
  [6, 15849],
  [7, 151698],
  [8, 189433],
  [9, 190188],
  [10, 182641],
  [11, 159245],
  [12, 152452],
  [13, 174339],
  [14, 174339],
  [15, 180377],
  [16, 153962],
  [17, 172830],
  [18, 107924],
  [19, 63396],
  [20, 57358],
  [21, 66415],
  [22, 81509],
  [23, 181886]
];

// Key Non-System Metrics report data:
// Summary expenses YTD. Columns are ['Month', 'Value'].
var KNSMExpensesData = [
  [Date.UTC(2014, 0), 100000],
  [Date.UTC(2014, 1), 97000],
  [Date.UTC(2014, 2), 98000],
  [Date.UTC(2014, 3), 98000],
  [Date.UTC(2014, 4), 99000],
  [Date.UTC(2014, 5), 100000],
  [Date.UTC(2014, 6), 99000],
  [Date.UTC(2014, 7), 98000],
  [Date.UTC(2014, 8), 98000],
  [Date.UTC(2014, 9), 97000]
];

// Customers satisfaction level YTD. Columns are ['Month', 'Satisfaction level'].
var KNSMSatisfactionData = [
  [Date.UTC(2014, 0), 90],
  [Date.UTC(2014, 1), 97],
  [Date.UTC(2014, 2), 98],
  [Date.UTC(2014, 3), 98],
  [Date.UTC(2014, 4), 99],
  [Date.UTC(2014, 5), 100],
  [Date.UTC(2014, 6), 99],
  [Date.UTC(2014, 7), 98],
  [Date.UTC(2014, 8), 98],
  [Date.UTC(2014, 9), 97]
];

// Level 1 Problems numbers YTD. Columns are ['Month', 'Number of Problems'].
var KNSMProblemsData = [
  [Date.UTC(2014, 0), 45],
  [Date.UTC(2014, 1), 97],
  [Date.UTC(2014, 2), 95],
  [Date.UTC(2014, 3), 87],
  [Date.UTC(2014, 4), 99],
  [Date.UTC(2014, 5), 78],
  [Date.UTC(2014, 6), 99],
  [Date.UTC(2014, 7), 86],
  [Date.UTC(2014, 8), 98],
  [Date.UTC(2014, 9), 97]
];
var KNSMBudgetTarget = 1175000;
var KNSMProblemsTarget = 100;
var KNSMExpensesRanges = [0, 90, 110, 150];
var KNSMSatisfactionRanges = [150, 100, 80, 0];
var KNSMProblemsRanges = [0, 90, 110, 150];

// Some Major Project Milestones for MPM report. Columns are ['Project', 'Milestone', 'Due date']
var MPMData = [
  ['ERP Upgrade', 'Full system test', Date.UTC(2014, 9, 24)],
  ['Add services data to DW', 'ETL coding', Date.UTC(2014, 9, 10)],
  ['Upgrade mainframe OS', 'Prepare plan', Date.UTC(2014, 9, 17)],
  ['Disaster recovery site', 'Install hardware', Date.UTC(2014, 9, 20)],
  ['Budgeting system', 'Hire team', Date.UTC(2014, 9, 2)],
  ['Web site face-lift', 'Move into production', Date.UTC(2014, 9, 22)]
];

// Some Projects for TPQ report. Columns are ['Project', 'Status', 'Funding approved', 'Schedule start']
var TPQData = [
  ['Professional service module', 'Pending available staff', true, Date.UTC(2014, 9, 22)],
  ['Upgrade MS Office', 'Cost-benefit analysis', false, Date.UTC(2014, 11, 1)],
  ['Failover for ERP', 'Preparing proposal', false, Date.UTC(2015, 0, 30)],
  ['Upgrade data warehouse HW', 'Evaluating options', true, Date.UTC(2015, 1, 13)],
  ['Executive dashboard', 'Vendor assessment', false, Date.UTC(2015, 4, 2)]
];



// Utility functions for data ->
var Today = new Date(Date.UTC(2014, 9, 15));

var getDiffInDays = function (date1, date2) {
  function isLeapYear(year) {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  }

  function getNumberOfDaysInMonth(year, month) {
    switch (month) {
      case 1:
        return isLeapYear(year) ? 29 : 28;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
    }
    return 31;
  }

  function getNumberOfDaysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  }

  var sign = 1;
  if (date1.getTime() > date2.getTime()) {
    var tmp = date1;
    date1 = date2;
    date2 = tmp;
    sign = -1;
  }
  var y1 = date1.getUTCFullYear();
  var y2 = date2.getUTCFullYear();
  var m1 = date1.getUTCMonth();
  var m2 = date2.getUTCMonth();
  var d1 = date1.getUTCDate();
  var d2 = date2.getUTCDate();
  var result = 0, i;
  if (y1 < y2) {
    for (i = y1 + 1; i < y2; i++) result += getNumberOfDaysInYear(i);
    for (i = m1 + 1; i < 12; i++) result += getNumberOfDaysInMonth(y1, i);
    for (i = 0; i < m2; i++) result += getNumberOfDaysInMonth(y2, i);
    result += getNumberOfDaysInMonth(y1, m1) - d1;
    result += d2;
  } else if (m1 < m2) {
    for (i = m1 + 1; i < m2; i++) result += getNumberOfDaysInMonth(y1, i);
    result += getNumberOfDaysInMonth(y1, m1) - d1;
    result += d2;
  } else {
    result += d2 - d1;
  }
  return result * sign;
};

function filterBySystem(fieldValue) {
  return function (value) {
    return fieldValue == value;
  }
}
// Utility functions for data ->