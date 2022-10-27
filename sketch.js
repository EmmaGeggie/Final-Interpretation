
let numBalls = 13;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
let balls = [];


let tsize
let colorPicker;
let colorPicker2;
let sel
var inp;


var textin = "Hey";

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  noStroke();
  fill(255, 204);
  
  tsize = createSlider(0, 40, 80);
  tsize .addClass('Slider1');
  tsize.position(10, 10);
  tsize.style('width', '100px');
  
  colorPicker = createColorPicker("#CBC3E3");
  colorPicker .addClass('Picker');
  colorPicker.position(10, 50);
  colorPicker.style("width", "100px");

  colorPicker2 = createColorPicker("#0D98BA");
  colorPicker2 .addClass('Picker2');
  colorPicker2.position(10, 90);
  colorPicker2.style("width", "100px");
  
  inp = createInput(textin);
  inp .addClass('type');
  inp.position(10, 180);
  inp.size(95);
  //inp.input(myInputEvent);
  
  
  sel = createSelect();
  sel .addClass('textSel');
  sel.position(10, 140);
  sel.option("Optima");
  sel.option("American Typewriter");
  sel.option("Bohem Vintage");
  sel.option("Apple Chancery");
  sel.option("Andale Mono");
  sel.option("Bradley Hand");
  sel.selected("Optima");
  sel.style("width", "100px");


  
}

function draw() {
background(colorPicker.color());
  
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}


class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }

  }

  display() {
    textFont(sel.value());
    textSize(tsize.value());
    text(inp.value(), this.x, this.y, this.diameter, this.diameter);
    fill(colorPicker2.color());
  }
   
}


function windowResized() {
  clear();
  resizeCanvas(windowWidth, windowHeight);
  
}

