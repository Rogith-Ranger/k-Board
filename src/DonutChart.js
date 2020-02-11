import React, { Component } from 'react'
import equal from 'fast-deep-equal'
import * as d3 from 'd3'
class DonutChart extends Component {

componentDidUpdate(prevProps) {
    if(!equal(this.props.chartData, prevProps.chartData)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.drawChart();
    }
  } 
  
drawChart = () =>{
    d3.selectAll(".donut").remove()
    var width = 560;
    var height = 560;

    var svg = d3.select('#donutchart')
        .append('svg')
        .attr('class','donut')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');



		//Create a color scale
		var colorScale = d3.scaleLinear()
		   .domain([1,3.5,6])
		   .range(["#2c7bb6", "#ffffbf", "#d7191c"])
		   .interpolate(d3.interpolateHcl);

		//Create an arc function   
		var arc = d3.arc()
			.innerRadius(width*0.75/2) 
			.outerRadius(width*0.75/2 + 30);

		//Turn the pie chart 90 degrees counter clockwise, so it starts at the left	
		var pie = d3.pie()
			.startAngle(-90 * Math.PI/180)
			.endAngle(-90 * Math.PI/180 + 2*Math.PI)
			.value(function(d) { return d.count *5; })
			.padAngle(.01)
			.sort(null);
		
		svg.selectAll(".donutArcs")
			.data(pie(this.props.chartData))
		  .enter().append("path")
			.attr("class", "donutArcs")
			.attr("d", arc)
			.style("fill", function(d,i) {
				if(i === 7) return "#CCCCCC"; //Other
				else return colorScale(i); 
			})
		.each(function(d,i) {
			//Search pattern for everything between the start and the first capital L
			var firstArcSection = /(^.+?)L/; 	

			//Grab everything up to the first Line statement
			var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
			//Replace all the comma's so that IE can handle it
			newArc = newArc.replace(/,/g , " ");
			
			//If the end angle lies beyond a quarter of a circle (90 degrees or pi/2) 
			//flip the end and start position
			if (d.endAngle > 90 * Math.PI/180) {
				var startLoc 	= /M(.*?)A/,		//Everything between the first capital M and first capital A
					middleLoc 	= /A(.*?)0 0 1/,	//Everything between the first capital A and 0 0 1
					endLoc 		= /0 0 1 (.*?)$/;	//Everything between the first 0 0 1 and the end of the string (denoted by $)
				//Flip the direction of the arc by switching the start en end point (and sweep flag)
				//of those elements that are below the horizontal line
				var newStart = endLoc.exec( newArc )[1];
				var newEnd = startLoc.exec( newArc )[1];
				var middleSec = middleLoc.exec( newArc )[1];
				
				//Build up the new arc notation, set the sweep-flag to 0
				newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
			}//if
			
			//Create a new invisible arc that the text can flow along
			svg.append("path")
				.attr("class", "hiddenDonutArcs")
				.attr("id", "donutArc"+i)
				.attr("d", newArc)
				.style("fill", "none");
        });
        var donutTip = d3.select("#donuttip")
        svg.selectAll('path')
		.on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85');
            donutTip.transition()
                .duration(50)
                .style("opacity", 1);
            let num = "<b>Event:</b> "+d.data.event+"<br/><b>Count:</b> "+d.data.count
            donutTip.html(num)
                .style("left", "26%")
                .style("top", "46%");
        })
		//Append the label names on the outside
		svg.selectAll(".donutText")
			.data(pie(this.props.chartData))
		   .enter().append("text")
			.attr("class", "donutText")
			//Move the labels below the arcs for those slices with an end angle greater than 90 degrees
			.attr("dy", function(d,i) { return (d.endAngle > 90 * Math.PI/180 ? 18 : -11); })
		    .append("textPath")
			.attr("startOffset","50%")
			.style("text-anchor","middle")
			.attr("xlink:href",function(d,i){return "#donutArc"+i;})
			.text(function(d){return d.data.event;});
}

    render() {
        return (
            <div>
                <div id="donutchart"><div id="donuttip" className="donut-tip"></div></div>
            </div>
        )
    }
}

export default DonutChart
