// eslint-disable-next-line max-len
const url =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

const height = 700;
const width = 1800;

const colors = {
  Action: 'rgb(76, 146, 195)',
  Drama: 'rgb(255, 153, 62)',
  Adventure: 'rgb(173, 229, 161)',
  Family: 'rgb(190, 210, 237)',
  Animation: 'rgb(255, 201, 147)',
  Comedy: 'rgb(255, 173, 171)',
  Biography: 'rgb(169, 133, 202)',
};

// Creating canvas
const svg = d3
  .select('#tree-map')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Creating legend
const legend = d3
  .selectAll('#legend')
  .append('svg')
  .attr('height', 20)
  .attr('width', width)
  .style('transform', 'translate(350px, 20px)');

const legendItems = legend
  .selectAll('.legend-item')
  .data(Object.keys(colors))
  .enter()
  .append('g');

legendItems
  .append('rect')
  .attr('class', 'legend-item')
  .attr('x', (d, i) => i * 150)
  .attr('fill', (d) => colors[d])
  .attr('height', 20)
  .attr('width', 20);

legendItems
  .append('text')
  .attr('y', 15)
  .attr('x', (d, i) => i * 150 + 25)
  .text((d) => d);

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const root = d3.hierarchy(data).sum((d) => d.value);
  d3.treemap().size([width, height]).padding(2)(root);

  svg
    .selectAll('.tile')
    .data(root.leaves())
    .enter()
    .append('rect')
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => d.data.value)
    .attr('class', 'tile')
    .attr('height', (d) => d.y1 - d.y0)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('fill', (d) => colors[d.data.category])
    .attr('y', (d) => d.y0)
    .attr('x', (d) => d.x0)
    .on('mousemove', (d) => {
      d3
        .select('#tooltip')
        .attr('data-value', d.value)
        .style('opacity', 0.9)
        .style('left', `${d3.event.pageX + 25}px`)
        .style('top', `${d3.event.pageY - 40}px`).html(`
          Name: ${d.data.name}<br/>
          Category: ${d.data.category}<br/>
          Gross: $${d.data.value.slice(0, -6)}.${d.data.value.slice(-6, -5)}M`);
    })
    .on('mouseout', () => d3.select('#tooltip').style('opacity', 0));

  svg
    .selectAll('text')
    .data(root.leaves())
    .enter()
    .append('text')
    .attr('font-size', '15px')
    .attr('x', (d) => d.x0 + 5)
    .attr('y', (d) => d.y0 + 20)
    .text((d) => d.data.name.substring(0, 10));
};

getData();
