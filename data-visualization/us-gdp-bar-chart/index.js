const canvas = d3.select('#canvas');
const tooltip = d3.select('#tooltip');
const height = 450;
const width = 850;
const scalePadding = 50;
const barWidth = width / 275;
const gdp = [];
const date = [];

// Calling the GDP data
async function callData() {
  const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
  const data = await response.json();
  data.data.forEach((d) => gdp.push(d[1]));
  data.data.forEach((d) => date.push(d[0]));

  // Creating scaling
  const scale = d3.scaleLinear().domain([0, d3.max(gdp)]).range([0, height]);
  const xScale = d3.scaleLinear().domain([1947, 2016]).range([0, width]);
  const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format('d'));
  const yScale = d3.scaleLinear().domain([d3.max(gdp), 0]).range([0, height]);
  const yAxis = d3.axisLeft().scale(yScale);

  canvas.attr('height', height + scalePadding)
    .attr('width', width + scalePadding + 30)
    .style('background-color', 'white');

  canvas.append('g')
    .attr('transform', `translate(${scalePadding + 2}, ${height})`)
    .call(xAxis)
    .attr('id', 'x-axis');

  canvas.append('g')
    .attr('transform', `translate(${scalePadding}, 0)`)
    .call(yAxis)
    .attr('id', 'y-axis');

  canvas.selectAll('rect')
    .data(data.data)
    .enter()
    .append('rect')
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .attr('x', (d, i) => i * barWidth + scalePadding)
    .attr('y', (d) => height - (scale(d[1])))
    .attr('height', (d) => scale(d[1]))
    .attr('width', barWidth)
    .attr('class', 'bar')
    .on('mouseover', (d, i) => {
      const month = d[0].substr(5, 2);
      let quarter = '';
      if (month === '01') {
        quarter = 'Q1';
      } else if (month === '04') {
        quarter = 'Q2';
      } else if (month === '07') {
        quarter = 'Q3';
      } else {
        quarter = 'Q4';
      }
      tooltip.html(`${d[0]
        .substr(0, 4)} ${quarter}<br>$${d[1]
        .toFixed(1)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} Billion`)
        .attr('data-date', d[0])
        .style('display', 'block')
        .style('opacity', 0.8)
        .style('left', `${i * barWidth - 20}px`)
        .style('top', `${height}px`);
    })
    .on('mouseout', () => {
      tooltip.style('display', 'none');
    });
}

callData();
