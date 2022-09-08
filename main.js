
statuss="";
objects=[];
function preload(){
    var alarm = loadSound("music.mp3");
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
   video=createCapture(VIDEO);
   video.size(380,380);
   video.hide();
}

function start(){
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model is loaded");
    statuss=true;
  
}

function gotResult(error,results){
    if(error){
        console.error(error);
     
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,380,380);
    

  if(statuss != ""){
      r=random(255);
      g=random(255);
      b=random(255);
      objectDetector.detect(video,gotResult);
      for(i=0; i<objects.length; i++){
       document.getElementById("status").innerHTML="Status: Objects Dectected";
       document.getElementById("objectdetected").innerHTML="Number of objects detected are: "+objects.length;
      fill(r,g,b);
      percent=floor(objects[i].confidence*100);
      text(objects[i].label + " "+ percent + "%",objects[i].x+15,objects[i].y+15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      

      if(objects[i].label == person){
      getElementById("babyfound").innerHTML="Baby found";
      alarm.stop()
      }
      else{
        getElementById("babyfound").innerHTML="Baby not found";
        alarm.play()
      }
      }
  }
}