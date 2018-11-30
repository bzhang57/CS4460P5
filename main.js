window.onload = compareDemographics;

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

function compareDemographics() {
  var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
  var margin = {top: 20, right: 20, bottom: 70, left: 80},
    // width = (.49 * size.width) - margin.left - margin.right,
    //width = (.7 * size.width) - margin.left - margin.right,
    width1 = 450 - margin.left - margin.right,
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    radius = 180,
    color = d3.scale.category20(),
    legendRectSize = 18, // defines the size of the colored squares in legend
    legendSpacing = 4; // defines spacing between squares;

  var pieChart = document.getElementById('pieChart');
  var select = document.getElementById('selectCollege');

  d3.csv("colleges.csv", function(data) {
    data.demo = [{'race' : '% White', 'value' : +data['% White']}, 
                {'race' : '% Black', 'value' : +data['% Black']},
                {'race' : '% Hispanic', 'value' : +data['% Hispanic']},
                {'race' : '% Asian', 'value' : +data['% Asian']},
                {'race' : '% American Indian', 'value' : +data['% American Indian']},
                {'race' : '% Pacific Islander', 'value' : +data['% Pacific Islander']},
                {'race' : '% Biracial', 'value' : +data['% Biracial']}];
    return data;
  }, function(error, data) {

    if (error) {
      throw error;
    }

    var pieData1 = d3.nest()
                      .key(function(d) { return d.Name; })
                      .entries(data);

    var colleges = [];
    for (i = 0; i < pieData1.length; i++) {
      var d = pieData1[i];
      colleges.push(d.key);
    }

    var dropdown1 = d3.select(select)
                      .append('p')
                      .append('text')
                        .text('College 1: ')
                      .append('select')
                        .attr('id', 'selection1')

    var dropdown2 = d3.select(select)
                      .append('p')
                      .append('text')
                        .text('College 2: ')
                      .append('select')
                        .attr('id', 'selection2')

    for (i=0; i < pieData1.length; i++) {
      dropdown1.append('option')
              .attr('value', pieData1[i].values.Name)
              .text(pieData1[i].key)
      dropdown2.append('option')
              .attr('value', pieData1[i].values.Name)
              .text(pieData1[i].key)
    }

    d3.select(select)
      .append('p')
      .append('button')
      .text('View Demographics')
      .on('click', function() {
        d3.selectAll('#pieChart svg').remove();
        var selectedCollege1 = $("#selection1").val();
        var selectedCollege2 = $("#selection2").val();
        console.log(selectedCollege1)
        console.log(selectedCollege2)
        for (i = 0; i < pieData1.length; i++) {
          if (pieData1[i].key == selectedCollege1) {
            console.log("found college: ", pieData1[i].key)
            var d1 = pieData1[i];
          }
          if (pieData1[i].key == selectedCollege2) {
            console.log("found college: ", pieData1[i].key)
            var d2 = pieData1[i];
          }
        }

        console.log(selectedCollege1)
        var pieChart1 = d3.select(pieChart)
                      .append('svg')
                      .data([d1.values[0]['demo']])
                        .attr('width', width1 + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('id', 'pieChart1')
                      .append('g')
                        .attr('transform', 'translate(' + radius + ', ' + radius + ')')

        var pieChart2 = d3.select(pieChart)
                      .append('svg')
                      .data([d2.values[0]['demo']])
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .attr('id', 'pieChart2')
                      .append('g')
                        .attr('transform', 'translate(' + radius + ', ' + radius + ')');
                      
        d3.select('#pieChart1')
                    .append('text')
                    .attr('x', 100)
                    .attr('y', 400)
                    .text(selectedCollege1);

        d3.select('#pieChart2')
                    .append('text')
                    .attr('x', 100)
                    .attr('y', 400)
                    .text(selectedCollege2);

        //create <path> elements using arc data
        var arc = d3.svg.arc()
                  .outerRadius(radius);

        //create arc data given list of values
        var pie1 = d3.layout.pie()
                    .value(function(d1) {
                      return d1.value;
                    })

        var pie2 = d3.layout.pie()
                    .value(function(d2) {
                      return d2.value;
                    })

        //var arcs = pie(pieData1);


        var arcs1 = pieChart1.selectAll('g.slice')
                            .data(pie1)
                            .enter()
                              .append('g')
                                .attr('class', 'slice');

        arcs1.append('path')
              .attr('fill', function(d1, i) { 
                //console.log(color(d.data.race))
                return color(d1.data.race); 
              })
              .attr('d', arc);

        var arcs2 = pieChart2.selectAll('g.slice')
                            .data(pie2)
                            .enter()
                              .append('g')
                                .attr('class', 'slice');

        arcs2.append('path')
              .attr('fill', function(d2, i) { 
                //console.log(color(d.data.race))
                return color(d2.data.race); 
              })
              .attr('d', arc);

        //tooltip
        var tooltip = d3.select(pieChart)
                        .append('div')
                        .attr('class', 'pie_tooltip');

            tooltip.append('div')
                    .attr('class', 'race');

            tooltip.append('div')
                    .attr('class', 'value');

        arcs1.on('mouseover', function(d1) {
          var percent = parseFloat(100 * d1.value).toFixed(2);
          tooltip.select('.race').html(d1.data.race); // set current race           
          tooltip.select('.value').html(percent + '%'); // set current count d.data.count                    
          tooltip.style('display', 'block');
        });

        arcs2.on('mouseover', function(d2) {
          var percent = parseFloat(100 * d2.value).toFixed(2);
          tooltip.select('.race').html(d2.data.race); // set current race           
          tooltip.select('.value').html(percent + '%'); // set current count d.data.count                    
          tooltip.style('display', 'block');
        });

        arcs1.on('mouseout', function() { // when mouse leaves div                        
          tooltip.style('display', 'none'); // hide tooltip for that element
        });

        arcs2.on('mouseout', function() { // when mouse leaves div                        
          tooltip.style('display', 'none'); // hide tooltip for that element
        });

        arcs1.on('mousemove', function(d) { // when mouse moves                  
          tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
                 .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
        });

        arcs2.on('mousemove', function(d) { // when mouse moves                  
          tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
                 .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
        });

        var legend2 = pieChart2.selectAll('.legend')
                        .data(color.domain())
                        .enter()
                        .append('g')
                        .attr('class', 'legend')
                        .attr('transform', function(d2, i) {
                          var legendHeight = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacin
                          var offset =  legendHeight * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements
                          var horz = 14 * legendRectSize; // the legend is shifted to the left to make room for the text
                          var vert = i * legendHeight - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
                          return 'translate(' + horz + ',' + vert + ')'; //return translation 
                        });

        // adding colored squares to legend
        legend2.append('rect')                                 
          .attr('width', legendRectSize)                       
          .attr('height', legendRectSize)                     
          .style('fill', color)
          .style('stroke', color);

        // adding text to legend
        legend2.append('text')                                    
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d2) { return d2; }); // return label

      });

  });

}