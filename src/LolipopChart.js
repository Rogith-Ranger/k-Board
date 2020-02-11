import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import * as d3 from 'd3'
class LolipopChart extends Component {
componentDidUpdate(prevProps) {
    if(!equal(this.props.chartData, prevProps.chartData)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
        this.drawChart();
    }
    }     
drawChart = () =>{
    d3.selectAll(".loli").remove()    
var margin = {top: 50, right: 30, bottom: 20, left: 40},
width = 460 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#lolipop")
.append("svg")
.attr("class","loli")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
let data = this.props.chartData
// X axis
var x = d3.scaleBand()
.range([ 0, width ])
.domain(data.map(function(d) { return d.college; }))
.padding(1);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x).tickSize(0))
.selectAll("text")
.style("font-weight","bold")
.attr("transform", "translate(0,-300)rotate(-90)")
.style("text-anchor", "end")

// Add Y axis
var y = d3.scaleLinear()
.domain([0, d3.max(data.map(function(d){return d.count}))])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Lines
svg.selectAll("myline")
.data(data)
.enter()
.append("line")
.attr("x1", function(d) { return x(d.college); })
.attr("x2", function(d) { return x(d.college); })
.attr("y1", function(d) { return y(d.count); })
.attr("y2", y(0))
.attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
.data(data)
.enter()
.append("circle")
.attr("cx", function(d) { return x(d.college); })
.attr("cy", function(d) { return y(d.count); })
.attr("r", "4")
.style("fill", "#69b3a2")
.attr("stroke", "black")


}
    
    render() {
        return (
            <div>
                <div id="lolipop"></div>
            </div>
        )
    }
}

export default LolipopChart
