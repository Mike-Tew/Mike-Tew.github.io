const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const width = 1000;
const height = 430;
const padding = 75;
const colors = ["#E8FA5B", "#F7CB44", "#F9A242", "#EB8055", "#CC6A70"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + padding)
  .attr("height", height + 100 + padding);

// Legend
const legendScale = d3.scaleLinear().domain([6.4, 10.9]).range([0, 199]);
const legendAxis = d3
  .axisBottom()
  .scale(legendScale)
  .tickValues([7.3, 8.2, 9.2, 10]);

const legend = svg
  .append("g")
  .attr("id", "legend")
  .attr("transform", `translate(${400}, ${500})`);

legend
  .append("g")
  .selectAll("rect")
  .data(colors)
  .enter()
  .append("rect")
  .attr("height", 20)
  .attr("width", 40)
  .attr("x", (d, i) => i * 40)
  .attr("fill", (d, i) => colors[i])
  .attr("stroke", "black");

legend.append("g").attr("transform", "translate(0, 20)").call(legendAxis);

// Calling the data
const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  const xScale = d3
    .scaleLinear()
    .domain([1752, 2016])
    .range([0, width - padding]);
  const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("y"));
  const yScale = d3
    .scaleLinear()
    .domain([-0.5, 11.5])
    .range([0, height - padding]);
  const yAxis = d3.axisLeft(yScale).tickFormat((d) => months[d]);

  // X-Axis
  svg
    .append("g")
    .attr("transform", `translate(${padding}, ${height})`)
    .call(xAxis)
    .attr("id", "x-axis");

  // Y-Axis
  svg
    .append("g")
    .attr("transform", `translate(${padding}, ${padding})`)
    .call(yAxis)
    .attr("id", "y-axis");

  // Tooltip
  const tooltip = d3.select("body").append("div").attr("id", "tooltip");

  const handleMouseover = ({ year, variance, month }) => {
    const tempFormat = (temp1, temp2 = 8.66) =>
      `${(temp1 + temp2).toFixed(1)}&#8451`;
    tooltip
      .html(
        `${months[month - 1]} - ${year}<br/>${tempFormat(variance)}\
      <br/>${tempFormat(variance, 0)}`
      )
      .attr("data-year", year)
      .style("left", `${d3.event.pageX - 65}px`)
      .style("top", `${d3.event.pageY - 120}px`)
      .style("opacity", 0.8);

    d3.event.target.setAttribute("stroke", "black");
  };

  const handleMouseOut = () => {
    tooltip.style("opacity", 0);
    d3.event.target.setAttribute("stroke", "none");
  };

  svg
    .selectAll(".cell")
    .data(data.monthlyVariance)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("height", 30)
    .attr("width", 4)
    .attr("x", (d) => xScale(d.year) + padding)
    .attr("y", (d) => yScale(d.month) + padding - 47)
    .attr("fill", ({ variance }) => {
      if (variance <= -1.3) {
        return colors[0];
      }
      if (variance <= -0.5) {
        return colors[1];
      }
      if (variance <= 0) {
        return colors[2];
      }
      if (variance <= 0.5) {
        return colors[3];
      }
      return colors[4];
    })
    .attr("data-month", ({ month }) => month - 1)
    .attr("data-year", ({ year }) => year)
    .attr("data-temp", ({ variance }) => variance)
    .on("mouseover", handleMouseover)
    .on("mouseout", handleMouseOut);
};

getData();
