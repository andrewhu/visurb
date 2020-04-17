// Vanilla JS ftw!

"use strict";

var names, starsigns;
var active;

fetch("/data/names.json")
    .then(res => res.json())
    .then(data => {
        names = data;
        plotData(names);
        active = 'names';
    });

fetch("/data/starsigns.json")
    .then(res => res.json())
    .then(data => {
        starsigns = data;
    });

document.getElementById('names').addEventListener('click', function() {
    if(active == 'names') return;

    // Clear graphs
    d3.selectAll('svg > *').remove();

    document.getElementById('starsigns').classList.remove('active');
    document.getElementById('names').classList.remove('active');
    document.getElementById('names').classList.add('active');

    plotData(names);

    active = 'names';
})
document.getElementById('starsigns').addEventListener('click', function() {
    if(active == 'starsigns') return;

    // Clear graphs
    d3.selectAll('svg > *').remove();

    document.getElementById('names').classList.remove('active');
    document.getElementById('starsigns').classList.remove('active');
    document.getElementById('starsigns').classList.add('active');

    plotData(starsigns);

    active = 'starsigns';
})

function plotData(data) {

    var width = window.innerWidth;
    var height = window.innerHeight;

    // dimensions and margins
    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)

    // create scale objects
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.x - 1), d3.max(data, d => d.x + 1)])
        .range([0, width]);
    var yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.y - 1), d3.max(data, d => d.y + 1)])
        .range([height, 0]);

    // Pan and zoom
    var zoom = d3.zoom()
        .scaleExtent([.5, 20])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed)

    svg.call(zoom)

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("id", "canvas");
    // .style("cursor", "grab");

    // Draw Datapoints
    var points_g = svg.append("g")

    var points = points_g
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.term)
        .style('fill', '#595445')
        .attr('x', d => xScale(d.x))
        .attr('y', d => yScale(d.y))
        .attr('r', 5)
        .attr('class', d => ('clickable'))
        .attr("data-term", d => d.term)
        .on("click", function (d) {
            var definition = '';
            definition += "<b><a target='_blank' href='https://www.urbandictionary.com/define.php?term=" + d.term + "'>" + d.term + "</a></b>"
            definition += ": " + d.definition
            document.querySelector("#definition").innerHTML = definition
        })
        .on("mouseover", function (d) {
            d3.select(this).style("fill", "#b2afa9")
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "#595445")
        })
        .style("pointer-events", "all")

    function zoomed() {
        // create new scale ojects based on event
        var new_xScale = d3.event.transform.rescaleX(xScale);
        var new_yScale = d3.event.transform.rescaleY(yScale);
        points.data(data)
            .attr('x', d => new_xScale(d.x))
            .attr('y', d => new_yScale(d.y));
    }
}
