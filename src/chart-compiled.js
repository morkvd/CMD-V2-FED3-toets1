'use strict';

d3.csv('android-app-data.csv', function (data) {
  var sortedData = data.map(function (_ref) {
    var AccessCount = _ref.AccessCount;
    var AppName = _ref.AppName;
    return {
      AppName: AppName,
      AccessCount: Number.parseInt(AccessCount, 10)
    };
  }).sort(function (a, b) {
    return b.AccessCount - a.AccessCount;
  });
  console.log(sortedData);
});
