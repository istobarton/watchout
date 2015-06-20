
var randoW = function(d){return Math.floor(Math.random()*700)}
var randoH = function(d){return Math.floor(Math.random()*450)}
var enemies = _.range(1,15);
var currentScore = 0;
var highScore = 0;
var collisions = 0;


var collision = function() {
  d3.selectAll(".enemy").each( function(d, i){
    var c1x = +d3.select(this).attr("cx");
    var c1y = +d3.select(this).attr("cy");
    var c1r = +d3.select(this).attr("r");

    var c2x = +d3.select(".hero").attr("cx")
    var c2y = +d3.select(".hero").attr("cy")
    var c2r = +d3.select(".hero").attr("r");

    var dx = c1x - c2x;
    var dy = c1y - c2y;
    var dist = c1r + c2r;

    if(((dx * dx) + (dy * dy))<= (dist * dist)){

     //turns hero red
     svgContainer
     .selectAll('.hero')
     .style('fill', 'red');

     //resets Current Score
     currentScore = 0;

     //Increases Collisions
     collisions++;


  }
})
}
// creates our frame
var svgContainer = d3
   .select('body')
   .append('svg')
   .attr('width', 700)
   .attr('height', 450);

// adds event listener for dragging
var drag = d3.behavior.drag()
 .on('dragstart', function () {hero.style('fill', 'lightblue');})
 .on('drag', function() {hero.attr('cx', d3.event.x)
                             .attr('cy', d3.event.y); })
 .on('dragend', function(){ hero.style('fill', 'blue'); });

var circles = svgContainer
    .selectAll("circle")
    .data(enemies)
    .enter()
    .append("circle")
    .attr('cx', randoW)
    .attr('cy', randoH)
    .attr('r', 10)
    .style('fill', 'white')
    .attr('class', 'enemy')

var hero = svgContainer
   .selectAll('.hero')
   .data([{ x: 350, y: 225, r: 15}])
   .enter()
   .append("circle")
   .attr('cx', function (d) {return d.x;})
   .attr('cy', function (d) {return d.y;})
   .attr('r', function (d) {return d.r;})
   .attr("class", "hero")
   .call(drag)
   .style('fill', 'blue');

//way to track current score
  //ever second increase a counter
  //set the counter to score
    // if a collision happens
      // set counter and score to 0
var scoreTimer = function () {
  currentScore++;

  d3.select('.current span').text(currentScore);
  d3.select('.collisions span').text(collisions);

  if (highScore <= currentScore) {
    highScore = currentScore;
    d3.select('.high span').text(highScore);
  }
}
//way to track High Score
  //if CurrentScore >= High Score
  //set High Score === Current Score

var enemyMove = function(){
  svgContainer
  .selectAll("circle")
  .data(enemies)
  .transition()
  .duration(2000)
  .style('fill', 'red')
  .attr('cx', randoW)
  .attr('cy', randoH)
  .style('fill', 'white')

}

setInterval(collision, 100);
setInterval(enemyMove, 2000);
setInterval(scoreTimer, 500);


