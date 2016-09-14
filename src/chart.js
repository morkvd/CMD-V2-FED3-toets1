const height = 800,
      width = 600,
      barPadding = 20,
      barWidth = 30,
      chartPadding = 40;

d3.json('weather.json', function(data) {
  const dayTemperature = data.map(d => d.dag);
  const nightTemperature = data.map(d => d.nacht);
  const alternatingTemperatures = []
  for (let i = 0; i < data.length; i++) {
    alternatingTemperatures.push(dayTemperature[i]);
    alternatingTemperatures.push(nightTemperature[i]);
  }

  const yScale = d3.scale.linear()
    .domain([0, d3.max(alternatingTemperatures)])
    .range([0, height]);

  const xScale = d3.scale.linear()
    .domain([0, alternatingTemperatures.length * barWidth ])
    .range([0, width]);

  const chart = d3.select('svg')
                .attr('height', height)
                .attr('width', width)

  const item = chart.selectAll('g')
              .data(alternatingTemperatures)
              .enter().append('rect')
                .attr('x', (d, i) => i * (barWidth + barPadding) + chartPadding)
                .attr('width', barWidth)
                .attr('height', d => yScale(d))
                .attr('y', d => height - yScale(d))
                .attr('fill', (d, i) => i % 2 === 0 ? 'blue' : 'black');
});
