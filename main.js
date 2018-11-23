window.onload = start;
function start() {
    //get width and height of page
    var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
    var margin = {top: 20, right: 20, bottom: 70, left: 120},
    width = (size.width / 2) - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    var graph = document.getElementById('graph');
    //bar chart on left side





    // var g = barChart.append("g")
    //            .attr("transform", "translate(" + 100 + "," + 100 + ")");
    d3.csv("colleges.csv", function(error, data) {
        if (error) {
            throw error;
        }
        var yScale = d3.scale.ordinal()
            .domain(data.map(function(d) { return d.Region }))
            .rangePoints([0, width]);
        var xScale = d3.scale.linear()
            .domain([10, d3.max(data, function(d) { return d["SAT Average"]; })])
            .range([0, height - margin.top - margin.bottom]);
        console.log(xScale.domain);

        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');
        // g.append("g")
        // .attr("transform", "translate(0," + height + ")")
        // .call(xAxis);
        var barChart = d3.select(graph)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        barChart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (600 - margin.top - margin.bottom) + ")")
            .call(xAxis);
        barChart.append("g")
          .attr("class", "y axis")
          .call(yAxis);
        // pie chart on right side
        var pieChart = d3.select(graph)
            .append('svg')
            .attr('width', width / 2 - 10)
            .attr('height', height - 100);

    })
}
