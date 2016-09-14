'use strict';

var height = 800,
    width = 600,
    barPadding = 20,
    barWidth = 30,
    chartPadding = 40;

d3.json('weather.json', function (data) {
  var dayTemperature = data.map(function (d) {
    return d.dag;
  });
  var nightTemperature = data.map(function (d) {
    return d.nacht;
  });
  var alternatingTemperatures = [];
  for (var i = 0; i < data.length; i++) {
    alternatingTemperatures.push(dayTemperature[i]);
    alternatingTemperatures.push(nightTemperature[i]);
  }

  var yScale = d3.scale.linear().domain([0, d3.max(alternatingTemperatures)]).range([0, height]);

  var xScale = d3.scale.linear().domain([0, alternatingTemperatures.length * barWidth]).range([0, width]);

  var chart = d3.select('svg').attr('height', height).attr('width', width);

  var item = chart.selectAll('g').data(alternatingTemperatures).enter().append('rect').attr('x', function (d, i) {
    return i * (barWidth + barPadding) + chartPadding;
  }).attr('width', barWidth).attr('height', function (d) {
    return yScale(d);
  }).attr('y', function (d) {
    return height - yScale(d);
  }).attr('fill', function (d, i) {
    return i % 2 === 0 ? 'blue' : 'black';
  });
});