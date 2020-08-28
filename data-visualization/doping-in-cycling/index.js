const height = 600;
const width = 900;
const padding = 75;

const svg = d3.select('body').append('svg')
  .attr('width', width + padding)
  .attr('height', height + padding);

// SVG title
svg.append('text')
  .attr('id', 'title')
  .attr('x', (width / 2))
  .attr('y', 100)
  .attr('font-size', '2rem')
  .attr('text-anchor', 'middle')
  .text('Doping in Professional Bike Racing');

// Calling the data
const callData = async () => {
  const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
  const data = await response.json();
  const yearRange = d3.extent(data, (d) => d.Year);
  data.forEach((d) => {
    d.Time = new Date(d.Seconds * 1000);
  });

  const xScale = d3.scaleLinear().domain([yearRange[0] - 1, yearRange[1] + 1]).range([0, width - padding]);
  const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format('d'));
  const yScale = d3.scaleTime().domain(d3.extent(data, (d) => d.Time)).range([padding * 2, height - padding / 2]);
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

  // X-Axis
  svg.append('g')
    .attr('transform', `translate(${padding}, ${height - 37})`)
    .call(xAxis)
    .attr('id', 'x-axis');

  // Y-Axis
  svg.append('g')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis)
    .attr('id', 'y-axis');

  // Tooltip
  const tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    .style('background', 'lightsteelblue')
    .style('border-radius', '5px')
    .style('text-align', 'center')
    .style('display', 'block')
    .style('height', '55px')
    .style('width', '200px')
    .style('position', 'fixed')
    .style('pointer-events', 'none')
    .style('margin', 0);

  const handleMouseover = (d, i) => {
    tooltip.html(`${d.Name}<br/>Year: ${d.Year}<br/>Time:\
    ${d.Time.getMinutes()}:${d.Time.getSeconds()}`)
      .attr('data-year', d.Year)
      .style('opacity', 1)
      .style('left', `${d3.event.pageX + 15}px`)
      .style('top', `${d3.event.pageY - 25}px`);
  };

  const handleMouseOut = (d, i) => {
    tooltip.style('opacity', 0);
  };

  // Creating the dot elements
  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', 9)
    .attr('stroke', 'black')
    .attr('cx', (d, i) => xScale(d.Year) + padding)
    .attr('cy', (d, i) => yScale(d.Time))
    .attr('fill', 'lightblue')
    .attr('data-xvalue', (d) => d.Year)
    .attr('data-yvalue', (d) => d.Time)
    .on('mouseover', handleMouseover)
    .on('mouseout', handleMouseOut);

  // Legend
  const legend = svg.append('g')
    .attr('id', 'legend')
    .attr('display', 'none')
    .attr('transform', 'translate(700, 200)');

  legend.append('text')
    .text('Legend');
};

callData();
