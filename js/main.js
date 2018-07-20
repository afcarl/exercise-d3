var margin = { left:40, right:20, top:10, bottom:30 }
var ab_width = 600
var ab_height = 400
var width = ab_width - margin.left - margin.right,
    height = ab_height - margin.top - margin.bottom;

var g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.json('/data/buildings.json').then(function(data) {

  data.forEach(d => {
    d.height = +d.height // turn the string into number
  })

  var x = d3.scaleBand()
    .domain(data.map(function(d){
      return d.name
    }))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3)

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d){
      return d.height
    })])
    .range([0, height])

  var rect = g.selectAll('rect').data(data)

  rect.enter()
    .append('rect')
    .attr('x', function(d, i) {
      return x(d.name)
    })
    .attr('y', 0)
    .attr('height', function(d, i){
      return y (d.height)
    })
    .attr('width', x.bandwidth)
    .attr('fill', 'grey')
}).catch(function(error){
  console.log(error)
})
