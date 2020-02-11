import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import * as d3 from 'd3'
class BubbleChart extends Component {
componentDidUpdate(prevProps) {
    if(!equal(this.props.chartData, prevProps.chartData)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
        this.drawChart();
    }
    }    
drawChart = () =>{
    d3.selectAll(".bubble").remove()
    var dataset = {};
    dataset["children"] = this.props.chartData
    var diameter = 400;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#bubble")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
        .sum(function(d) { return d.count; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.data.event + ": " + d.data.count;
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .text(function(d) {
            return d.data.event.substring(0, d.r / 5);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/3;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.count;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/3;
        })
        .attr("fill", "white");

    d3.select(window.self.frameElement)
        .style("height", diameter + "px");
}
    render() {
        return (
            <div>
                <div id="bubble"></div>
            </div>
        )
    }
}

export default BubbleChart
