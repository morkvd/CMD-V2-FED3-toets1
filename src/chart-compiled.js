'use strict';

var options = {
  chart: {
    width: 1000,
    height: 700,
    paddingX: 20,
    paddingY: 150,
    labelRoom: 150
  },
  bar: {
    height: 30,
    padding: 15
  },
  labelNudge: 23,
  axisPosY: 100
};

d3.csv('android-app-data.csv', function (data) {

  var sortedData = data.map(function (obj) {
    return Object.assign(obj, {
      AccessCount: Number.parseInt(obj.AccessCount, 10)
    });
  }) // return new obj's where AccessCount are Numbers insead of strings
  .sort(function (a, b) {
    return b.AccessCount - a.AccessCount;
  }) // sort on AccessCount (descending)
  .slice(0, 19); // select 18 highest values

  console.log(sortedData);

  var yScale = d3.scale.linear().domain([0, sortedData.map(function (d) {
    return d.AccessCount;
  }).length * options.bar.height]).range([0, options.chart.height]);

  var xScale = d3.scale.linear().domain([0, d3.max(sortedData.map(function (d) {
    return d.AccessCount;
  }))]).range([0, options.chart.width]);

  var xAxis = d3.svg.axis().scale(xScale).orient("top").ticks(20);

  var chart = d3.select('svg').attr('height', options.chart.height).attr('width', options.chart.width).attr('background', 'white');

  chart.selectAll('g').data(sortedData).enter().append('rect').attr('y', function (d, i) {
    return i * (options.bar.height + options.bar.padding) + options.chart.paddingY;
  }).attr('height', options.bar.height).attr('width', function (d) {
    return xScale(d.AccessCount);
  }).attr('x', options.chart.labelRoom);

  chart.selectAll('g').data(sortedData).enter().append('text').text(function (d) {
    return d.AppName;
  }).attr('y', function (d, i) {
    return i * (options.bar.height + options.bar.padding) + options.chart.paddingY + options.labelNudge;
  }).attr('x', options.chart.labelRoom - options.chart.paddingX).attr('font-family', 'Arial').attr('font-size', 20).attr('text-anchor', 'end');

  // chart.selectAll('rect')
  //   .data(sortedData)
  //   .append('text')
  //     .text(d => d.AccessCount)
  //     .attr('x', 0)
  //     .attr('y', 0)
  //     .attr('color', 'white')
  //     .attr('font-family', 'Arial')
  //     .attr('font-size', 20);

  chart.append("g").attr("class", "axis").attr("transform", 'translate(' + options.chart.labelRoom + ', ' + options.axisPosY + ')').call(xAxis);

  chart.selectAll('.axis').append('text').text('aantal keer geopend').attr('x', -options.chart.paddingX).attr('font-family', 'Arial').attr('font-size', 12).attr('text-anchor', 'end');;
});
