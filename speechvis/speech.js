let mic;
var volhistory = [];

var canvas_size=1200;

var initial_angle=0.0;
var sign=1;

function touchStarted() 
{ 
    getAudioContext().resume(); 
} 

function setup() {
    createCanvas(canvas_size, canvas_size);
    
    mic = new p5.AudioIn();
    mic.start();
}

function draw() {
    background(0);
    
    stroke(255);
    noFill();
    push();

    var vol = mic.getLevel();
    if (vol!=0)
    {
        vol*=sign;
        sign*=-1;
        volhistory.push(vol);
    }
       
    
    
    var amplitude=800
    var radius=400;//-350;
    
    var dRadius=0;//0.1;
    var dTheta=0.017;
    
    var maxVerteces=360;//Infinity;
    
    var lineNumber=5;
    var colors=['#fffff','#bbbbbb','#999999','#777777','#555555'];
    var lineDeltaTheta=0.01
    var lineAmpVar=1.2 //multiplicative
    var lineDeltaRadius=30
    
    if (volhistory.length > maxVerteces)
    {
        volhistory.shift();
        initial_angle = initial_angle + dTheta;
    }
    
   
    for (var line=0; line <lineNumber; line++)
        {
            beginShape();
            stroke(colors[line]);
            
            for (var i = 0; i < volhistory.length; i++) {
                stroke(colors[line]);

                var angle=initial_angle + i * dTheta - line*lineDeltaTheta;
                angle = angle + 0.5 * (2*noise(angle*0.1)-1)
                var localDeltaRadius= lineDeltaRadius * line * (8 * noise(angle*0.5)-3.5);
                var localRadius= radius+dRadius + localDeltaRadius;

                var value = localRadius + volhistory[i] * amplitude * pow(lineAmpVar,line);
                var value = value + 300*(1.5*pow(noise(angle*0.3),2)-0.5);

                var x=canvas_size/2 + sin(angle)*value;
                var y=canvas_size/2 + cos(angle)*value;


                vertex(x, y);
            }
            
            endShape(CLOSE);
            
        }
    pop();
    
    
}