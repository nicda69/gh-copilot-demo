import * as d3 from 'd3';

// Interface for sales data
interface SalesData {
  month: number; // 1-12
  sold: number;
}

/**
 * Loads sales data from a JSON file and generates a line chart SVG.
 * @param jsonPath - Path to the JSON file containing sales data.
 * @param width - Width of the chart (default: 800).
 * @param height - Height of the chart (default: 400).
 * @returns A promise that resolves to the SVG string of the chart.
 */
export async function generateLineChart(jsonPath: string, width: number = 800, height: number = 400): Promise<string> {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.statusText}`);
    }
    const data: SalesData[] = await response.json();

    // Sort data by month to ensure correct line chart
    data.sort((a, b) => a.month - b.month);

    // create the svg
    const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

    // create the scales for the x and y axis
    // x-axis are the month series and y-axis show the numbers of album sold
    const xScale = d3.scaleLinear()
      .domain([1, 12]) // Months 1-12
      .range([50, width - 50]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sold) || 0])
      .range([height - 50, 50]);

    // create axes for the x and y axis
    const xAxis = d3.axisBottom(xScale).tickFormat(d => `Month ${d}`);
    const yAxis = d3.axisLeft(yScale);

    // generate a line chart based on the albums sales data
    const line = d3.line<SalesData>()
      .x(d => xScale(d.month))
      .y(d => yScale(d.sold));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add circles for data points
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.month))
      .attr('cy', d => yScale(d.sold))
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // Append axes
    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis);

    // Labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Albums Sales by Month');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .text('Month');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .text('Number of Albums Sold');

    return new XMLSerializer().serializeToString(svg.node()!);
  } catch (error) {
    console.error('Error generating line chart:', error);
    throw error;
  }
}