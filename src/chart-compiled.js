'use strict';

d3.csv('android-app-data.csv', function (data) {
  var sortedData = data.map(function (obj) {
    return Object.assign(obj, { AccessCount: Number.parseInt(obj.AccessCount, 10) });
  }).sort(function (a, b) {
    return b.AccessCount - a.AccessCount;
  });
  console.log(sortedData);
});
