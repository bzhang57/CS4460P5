function compareAttributes() {
    var graph = document.getElementById('graph');
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild);
    }
    var x1 = document.getElementById("xValue1").value;
    var y1 = document.getElementById("yValue1").value;
    var x2 = document.getElementById("xValue2").value;
    var y2 = document.getElementById("yValue2").value;
    plotGraphs(x1, y1, x2, y2);
}

function plotGraphs(x1, y1, x2, y2) {
    //get width and height of page


    var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
    var margin = {top: 20, right: 20, bottom: 70, left: 80},
    width = (.49 * size.width) - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    var graph = document.getElementById('graph');

    // var g = barChart.append("g")
    //            .attr("transform", "translate(" + 100 + "," + 100 + ")");
    d3.csv("colleges.csv", function(error, data) {
        if (error) {
            throw error;
        }

        var dataByAttr1 = d3.nest()
                            .key(function(d) { return d[y1]; })
                            .entries(data);
        var arr1 = [];

        for (var i = 0; i < dataByAttr1.length; i++) {
            var d = dataByAttr1[i];
            var mean = d3.mean(d.values, function(d) {return parseFloat(d[x1]);});
            var dict = {};
            dict["key"] = d.key;
            dict["mean"] = mean;
            arr1.push(dict);
        }

        var sortedKeys1 = arr1.slice(0);
        sortedKeys1.sort(function(a, b) {
            return b.mean - a.mean;
        });

        var dataByAttr2 = d3.nest()
                            .key(function(d) { return d[y2]; })
                            .entries(data);

        var arr2 = [];
        for (var i = 0; i < dataByAttr2.length; i++) {
            var d = dataByAttr2[i];
            var mean = d3.mean(d.values, function(d) {return parseFloat(d[x2]);});
            var dict = {};
            dict["key"] = d.key;
            dict["mean"] = mean;
            arr2.push(dict);
        }
        var sortedKeys2 = arr2.slice(0);
        sortedKeys2.sort(function(a, b) {
            return b.mean - a.mean;
        });


        var xScale1 = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return parseFloat(d[x1]); })])
            .range([0, width]);
        var yScale1 = d3.scale.ordinal()
            .domain(sortedKeys1.map(function(d) { return d.key; }))
            .rangeRoundBands([0, height], 0.3);
        var xAxis1 = d3.svg.axis().scale(xScale1).orient('bottom');
        var yAxis1 = d3.svg.axis().scale(yScale1).orient('left');
        // g.append("g")
        // .attr("transform", "translate(0," + height + ")")
        // .call(xAxis);
        var barChart1 = d3.select(graph)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        barChart1.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis1);

        barChart1.append("g")
          .attr("class", "y axis")
          .call(yAxis1)
          .append("text")
             // .attr("transform", "rotate(-90)")
              .attr("transform", "translate(35, 0)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text(y1);
        // pie chart on right side
        var xScale2 = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return parseFloat(d[x2]); })])
            .range([0, width]);
        var yScale2 = d3.scale.ordinal()
            .domain(sortedKeys2.map(function(d) { return d.key; }))
            .rangeRoundBands([0, height], 0.3);
        var xAxis2 = d3.svg.axis().scale(xScale2).orient('bottom');
        var yAxis2 = d3.svg.axis().scale(yScale2).orient('left');
        // g.append("g")
        // .attr("transform", "translate(0," + height + ")")
        // .call(xAxis);
        var barChart2 = d3.select(graph)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        barChart2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis2);

        barChart2.append("g")
          .attr("class", "y axis")
          .call(yAxis2)
          .append("text")
             // .attr("transform", "rotate(-90)")
              .attr("transform", "translate(35, 0)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text(y2);



     console.log(dataByAttr1);
      var bars1 = barChart1.selectAll(".bar")
                  .data(dataByAttr1)
                  .enter()
                  .append("g")

        bars1.append("rect")
            .attr("class", "bar")
               .attr("y", function(d) {
                   return yScale1(d.key);
               })
               .attr("height", yScale1.rangeBand())
               .attr("x", 0)
               .attr("width", function(d) {
                   return xScale1(d3.mean(d.values, function(d) {return parseFloat(d[x1])}));
               });
       var dataByAttr2 = d3.nest()
                           .key(function(d) { return d[y2]; })
                           .entries(data);
       var bars2 = barChart2.selectAll(".bar")
                   .data(dataByAttr2)
                   .enter()
                   .append("g")

         bars2.append("rect")
             .attr("class", "bar")
                .attr("y", function(d) {
                    return yScale2(d.key);
                })
                .attr("height", yScale2.rangeBand())
                .attr("x", 0)
                .attr("width", function(d) {
                    return xScale2(d3.mean(d.values, function(d) {return parseFloat(d[x2])}));
                });
// barChart1.selectAll('.bar')
        //     .data(data)
        //     .enter()
        //     .append('rect')
        //     .attr("id", function(d, i) { return i; })
        //     .attr('class', 'bar')
        //     .attr('x')
        //     .attr('y', function(d) {
        //         return yScale1(d[y1]);
        //     })
        //     .attr('wdith', function(d) {
        //         return xScale1(d[x1]);
        //     })
        //     .attr('height', function(d) {
        //         return yScale1.rangeBand();
        //     });
    })
}
