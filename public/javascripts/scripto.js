var canvas, context, angle = 0, time= 20, paused = false, timer  =0,color="red";
localStorage.x=20;
localStorage.y=20;
var a;
var b;
var dx=-5;
var dy=-5;
 var el = document.getElementById("play");

if (window.addEventListener) {
  window.addEventListener( 'load', initialise, false);
  window.el.addEventListener("click", togglePause, false);

}
    
function togglePause() {
  
  if (!paused){
    clearInterval(timer);
    paused = true;
    //recording the location of the ball from here
    a=localStorage.x;
    b=localStorage.y;
    console.log(a);
  } else {
    //setting the recorded value to the new position of the ball
    localStorage.x=a;
    localStorage.y=b;
    console.log("1 hap");
    timer = setInterval(draw, time);
    paused = false;
  }
}

function initialise() {
  canvas = document.getElementById('canvas'); 

  if (!canvas){ 
    alert('Error: I cannot find the canvas element!'); 
    return; 
  }

  if (!canvas.getContext){ 
    alert('Error: no canvas.getContext!'); 
    return; 
  }

  context = canvas.getContext('2d'); 
  if (!context){ 
    alert('Error: failed to getContext!'); 
    return; 
  }
  
//    localStorage.setItem("x", x);
//    localStorage.setItem("y", y);


  timer = setInterval(draw, time);
}

function draw()
{
  context.clearRect(0,0, 300,300);
  context.beginPath();
      if(localStorage.x===0 || localStorage.x==300)
      {
       color="red";
      }
  else if(localStorage.y===0 || localStorage.y==300){
       color="blue";
  }
 
  context.fillStyle=color;
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context.arc(localStorage.x,localStorage.y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  // Boundary Logic
    if( localStorage.x<0 || localStorage.x>300) dx=-dx; 
    if( localStorage.y<0 || localStorage.y>300) dy=-dy; 
    localStorage.x=Number(localStorage.x)+dx; 
    localStorage.y=Number(localStorage.y)+dy;
   }
    
