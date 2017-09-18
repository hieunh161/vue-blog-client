<template>
  <div>
    <div class='bubble-chart'></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['customers'],
  data() {
    return {
      reactiveCustomers: this.customers,
    };
  },
  mounted() {
    const width = 960;
    const height = 480;
    const margin = 40;
    const data = [];
    for (let i = 0; i < this.reactiveCustomers.length; i += 1) {
      console.log(this.reactiveCustomers[i].currentBill);
      data.push({
        title: this.reactiveCustomers[i].name,
        x: this.reactiveCustomers[i].currentBill,
        y: this.reactiveCustomers[i].relationship,
        c: this.reactiveCustomers[i].relationship,
        size: this.reactiveCustomers[i].currentBill,
      });
    }
    const svg = d3.select('.bubble-chart')
      .append('svg')
      .attr('width', width + (margin * 2))
      .attr('height', height + (margin * 2))
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x) * 1.2])
      .range([0, width]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) * 1.2])
      .range([height, 0]);
    const scale = d3.scaleSqrt()
      .domain([d3.min(data, d => d.size), d3.max(data, d => d.size)])
      .range([10, 50]);
    const opacity = d3.scaleSqrt()
      .domain([d3.min(data, d => d.size), d3.max(data, d => d.size)])
      .range([1, 0.5]);
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', 20)
        .attr('y', -margin)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Y');
    // x axis and label
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
        .attr('x', width + 20)
        .attr('y', margin - 10)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('X');
    svg.selectAll('circle')
      .data(data)
      .enter()
      .insert('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('opacity', d => opacity(d.size))
      .attr('r', d => scale(d.size))
      .style('fill', d => color(d.c))
      .on('mouseover', (d) => {
        svg.selectAll('circle')
          .filter(v => v.c !== d.c)
          .transition()
          .style('opacity', 0.1);
      })
      .on('mouseout', () => {
        svg.selectAll('circle')
          .transition()
          .style('opacity', v => opacity(v.size));
      })
      .transition()
      .delay(d => x(d.x) - y(d.y))
      .duration(500)
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .ease(d3.easeLinear)
      .append('text')
      .text(d => d.title)
      .attr('dx', d => x(d.x))
      .attr('dy', d => y(d.y));
  },
};
</script>

<style>
div.tooltip {
  position: absolute;
  text-align: center;
  width: 60px;
  height: 28px;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
</style>