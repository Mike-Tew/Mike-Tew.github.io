const countyUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
const educationUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

const countyPromise = axios.get(countyUrl);
const eduPromise = axios.get(educationUrl);

// Creating the canvas
const height = 600;
const width = 1000;
const svg = d3
  .select('body')
  .append('svg')
  .attr('height', height)
  .attr('width', width);

// Create the tooltip
const tooltip = d3.select('body').append('div').attr('id', 'tooltip');

// Creating the color scale
const colorScale = d3
  .scaleThreshold()
  .domain(d3.range(2, 90, 7))
  .range(d3.schemeBlues[9]);

// Create the legend
const legendScale = d3.scaleLinear().domain([2, 70]).range([0, 200]);
const legendAxis = d3
  .axisLeft()
  .tickSize(20)
  .scale(legendScale)
  .tickValues(colorScale.domain())
  .tickFormat((d) => `${d}%`);

const legend = svg
  .append('g')
  .attr('id', 'legend')
  .attr('transform', `translate(${950}, ${250})`);

legend
  .append('g')
  .selectAll('rect')
  .data(d3.range(2, 70, 7))
  .enter()
  .append('rect')
  .attr('height', 70)
  .attr('width', 20)
  .attr('y', (d, i) => i * 20)
  .attr('x', -20)
  .attr('fill', (d) => colorScale(d));

legend.append('g').call(legendAxis).select('.domain').remove();

Promise.all([countyPromise, eduPromise]).then((values) => {
  const countyData = values[0].data;
  const eduData = values[1].data;

  const findData = (data) =>
    eduData.filter((edu) => (data.id == edu.fips ? edu : 0))[0];

  svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter()
    .append('path')
    .attr('d', d3.geoPath())
    .attr('class', 'county')
    .attr('data-education', (d) => findData(d).bachelorsOrHigher)
    .attr('data-fips', (d) => findData(d).fips)
    .attr('fill', (d) => colorScale(findData(d).bachelorsOrHigher))
    .on('mouseover', (d) => {
      const { area_name, bachelorsOrHigher, state } = findData(d);
      tooltip
        .attr('data-education', bachelorsOrHigher)
        .style('opacity', 0.9)
        .style('left', `${d3.event.pageX + 10}px`)
        .style('top', `${d3.event.pageY - 60}px`)
        .html(`${area_name}, ${state}: ${bachelorsOrHigher}%`);
    })
    .on('mouseout', () => tooltip.style('opacity', 0));
});
