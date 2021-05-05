let mic;
var volhistory = [];
var maxVerteces=360;//Infinity;

var canvas_size=1200;

var initial_angle=0.0;
var sign=1;

let wavey_sliders=[];

function touchStarted() 
{ 
    getAudioContext().resume(); 
} 

function setup() {
    createCanvas(canvas_size, canvas_size);
    
    mic = new p5.AudioIn();
    mic.start();
    wavey_sliders[0] = createSlider(0, 0.1,0.05, 0.0001);
    wavey_sliders[1] = createSlider(0, 0.1,0.05, 0.0001);
    wavey_sliders[2] = createSlider(0, 0.1,0.05, 0.0001);
    wavey_sliders[3] = createSlider(0, 4,0, 0.001);
    
}

function draw_circleish(){
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
}
function draw_wavey2 () {
    var vol = mic.getLevel();
    if (vol!=0)
    {
        vol*=sign;
        sign*=-1;
        volhistory.push(vol);
    }
    const voiceAmp=800;
    
    const phase=millis() * 0.0005;
    const linesAmount = 12;
    const sinAmp=40;
    const vertexAmount=360;
    var dTheta=0.017;
    
    if (volhistory.length > maxVerteces)
    {
        volhistory.shift();
        initial_angle = initial_angle + dTheta;
    }
    
    for(var line = 0; line < linesAmount; line++) {
        stroke(255, 255, 255, (line / (linesAmount - 1) * 255));
        
        beginShape();
        const offset =initial_angle + line*0.2;
        
        for (var i = 0; i < volhistory.length; i+=1) {
            let value = canvas_size * 0.3;
            value += sin(i * wavey_sliders[0].value() - phase + offset) * sinAmp;
            value += sin(i * wavey_sliders[1].value() - phase + offset) * sinAmp;
            const offsetNoise = noise(phase*0.1 +(i / volhistory.length) * 48)*0.8;
            value += sin(i * wavey_sliders[2].value() - phase + offset + offsetNoise) * sinAmp;
            value += volhistory[i] * voiceAmp;

            var angle=i/volhistory.length*PI*2 * 0.95;
            var pure_x=cos(angle)*value+canvas_size/2;
            var pure_y=sin(angle)*value+canvas_size/2;
            var noise_value=noise(pure_x*0.001+wavey_sliders[3].value())
            var x = pure_x + (2*noise_value-1)*800;
            var y = value + (2*noise_value-1)*400;
            vertex(canvas_size-i/volhistory.length*canvas_size, canvas_size/3+y);
        }
        endShape();
    }
}

function draw() {
    background(0);
    
    stroke(255);
    noFill();
    push();

    draw_wavey2();
    
    pop();
    
    
}