<template>
  <div>
    <div class='chart'></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
// import * as $ from 'jquery';

export default {
  props: ['customers'],
  data() {
    return {
      reactiveCustomers: this.customers,
    };
  },
  mounted() {
    const data = [30, 86, 168, 281, 303, 365];

    d3.select('.chart')
      .selectAll('div')
      .data(data)
        .enter()
        .append('div')
        .style('width', d => `${d}px`)
        .text(d => d);
  },
};
</script>

<style>
.chart div {
  font: 10px sans-serif;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
}
</style>