<template>
  <div>
    <div class='chart'></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  props: ['customers'],
  mounted() {
    console.log(this.customers);
    const width = 960;
    const height = 480;
    const margin = 40;
    const data = [];
    for (let i = 0; i < this.customers.length; i += 1) {
      console.log(this.customers[i].currentBill);
      data.push({
        x: this.customers[i].currentBill,
        y: this.customers[i].relationship,
        c: this.customers[i].relationship,
        size: this.customers[i].currentBill,
      });
    }
    const svg = d3.select('.chart')
      .append('svg')
      .attr('class', 'chart')
      .attr('width', width + margin + margin)
      .attr('height', height + margin + margin)
      .append('g')
      .attr('transform', `translate(${margin},${margin})`);
    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
      .range([0, width]);
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
      .range([height, 0]);
    const scale = d3.scaleSqrt()
      .domain([d3.min(data, d => d.size), d3.max(data, d => d.size)])
      .range([1, 20]);
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
      .ease(d3.easeLinear);
  },
};
</script>

<style>
  
</style>