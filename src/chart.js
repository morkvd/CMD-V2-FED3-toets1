const options = {
  chart: {
    width:  1000,
    height: 700,
    paddingX: 20,
    paddingY: 150,
    labelRoom: 150,
  },
  bar: {
    height:  30,
    padding: 15,
  },
  labelNudge: 23,
  axisPosY: 100,
};

d3.csv('android-app-data.csv', data => {

  const sortedData = data.map(obj => Object.assign(obj, {
                       AccessCount: Number.parseInt(obj.AccessCount, 10),
                     })) // return new obj's where AccessCount are Numbers insead of strings
                     .sort((a, b) => b.AccessCount - a.AccessCount) // sort on AccessCount (descending)
                     .slice(0, 19); // select 18 highest values

  console.log(sortedData);

  const yScale = d3.scale.linear()
    .domain([ 0, sortedData.map(d => d.AccessCount).length * options.bar.height ])
    .range([ 0, options.chart.height ]);

  const xScale = d3.scale.linear()
    .domain([ 0, d3.max(sortedData.map(d => d.AccessCount)) ])
    .range([ 0, options.chart.width ]);

  const xAxis = d3.svg.axis()
                  .scale(xScale).orient("top").ticks(20);

  const chart = d3.select('svg')
                  .attr('height', options.chart.height)
                  .attr('width', options.chart.width)
                  .attr('background', 'white');

  chart.selectAll('g')
    .data(sortedData)
    .enter().append('rect')
      .attr('y', (d, i) => {
        return i * (options.bar.height + options.bar.padding) + options.chart.paddingY;
      })
      .attr('height', options.bar.height)
      .attr('width', d => xScale(d.AccessCount))
      .attr('x', options.chart.labelRoom);

  chart.selectAll('g')
    .data(sortedData)
    .enter().append('text')
      .text(d => d.AppName)
      .attr('y', (d, i) => {
        return i * (options.bar.height + options.bar.padding) + options.chart.paddingY + options.labelNudge;
      })
      .attr('x', options.chart.labelRoom - options.chart.paddingX)
      .attr('font-family', 'Arial')
      .attr('font-size', 20)
      .attr('text-anchor', 'end');

    chart.selectAll('g')
      .data(sortedData)
      .enter().append('text')
        .text(d => d.AccessCount)
        .attr('y', (d, i) => {
          return i * (options.bar.height + options.bar.padding) + options.chart.paddingY + options.labelNudge;
        })
        .attr('x', options.chart.labelRoom + 10)
        .attr('font-family', 'Arial')
        .attr('font-size', 14)
        .attr('fill', 'white');

  chart.append("g").attr("class", "axis")
    .attr("transform", `translate(${options.chart.labelRoom}, ${options.axisPosY})`)
    .call(xAxis);

  chart.selectAll('.axis')
    .append('text')
    .text('aantal keer geopend')
    .attr('x', -options.chart.paddingX)
    .attr('font-family', 'Arial')
    .attr('font-size', 12)
    .attr('text-anchor', 'end');
});
