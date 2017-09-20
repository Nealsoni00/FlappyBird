running = true;
score = 0;
function bird() {
  this.y = 10;
  this.x = 10;
  this.h = 25;
  this.w = 25;
  this.up = false;
  this.test = 0
  this.vy = 0
  this.ay = .3
  var point = new Audio('sfx_point.ogg');
  var dead = new Audio('sfx_hit.ogg');
  var img = document.getElementById("bird");
  var scoring = false

  this.dead = function() {
    dead.play()
    running = false;
    window.alert("GAME OVER! Final Score = " + score)
    restart();
  }

  this.draw = function(brush) {
    var img = document.getElementById("bird");
    brush.drawImage(img, this.x, this.y);
    var width = img.clientWidth;
  }

  this.move = function() {
    this.vy += this.ay
    this.y += this.vy

    if (this.up == true) {
      this.vy = -7;
      this.up = false;
    }
  }

  this.checkCollisions = function() {
    if (this.x+40 > p.x && this.x < p.x + 20) {
      if (this.y+10 > p.y + p.h && this.y+40-10 < p.y2+p.h2) {
        if (!scoring) {
          score += 1;
          scoring = true;
          point.play();
        }
      } else {
        this.dead();
      }
    } else if (this.x+40 > p.x2 && this.x < p.x2 + 20) {
      if (this.y+10 > p.y + p.h3 && this.y+30 < p.y2+p.h4) {
        if (!scoring) {
          score += 1;
          scoring = true;
          point.play();
        }
      } else {
        this.dead();
      }
    } else {
      scoring = false;
    }
  }
}

function pipe() {
  this.x = 300;
  this.x2 = 550
  this.y = 0;
  this.y2 = 700
  this.h = Math.floor((Math.random() * 450) + 1);
  this.h2 = this.h - 525
  this.h3 = Math.floor((Math.random() * 450) + 1);
  this.h4 = this.h3 - 525

  this.draw = function(brush) {
    var tubedown = document.getElementById("tubedown");
    var tubeup = document.getElementById("tubeup");
    //top first
    brush.drawImage(tubedown, this.x, this.y,25,this.h);
    //bottom first
    brush.drawImage(tubeup, this.x, this.y2,25,this.h2);
    //top second
    brush.drawImage(tubedown, this.x2, this.y,25,this.h3);
    //bottom second
    brush.drawImage(tubeup, this.x2, this.y2,25,this.h4);
  }

  this.move = function(){
    this.x -= 2.5;
    this.x2 -= 2.5;
  }

  this.generatePipes = function() {
    if (this.x2 == -25) {
      this.x2 = 475
      this.h3 = Math.floor((Math.random() * 450) + 1);
      this.h4 = this.h3 - 525
    }
    if (this.x == -25) {
      this.x = 475
      this.h = Math.floor((Math.random() * 450) + 1);
      this.h2 = this.h - 525
    }
  }
}

var audio = new Audio('sfx_wing.ogg');
window.addEventListener('keydown', function(event) {
  if (event.keyCode == 32) {
    b.up = true;
    b.test = b.y - 150;
    audio.play();
  }
});

function update() {
  if (running == true) {
    b.move();
    p.move();
    p.generatePipes();
    b.checkCollisions();
  }
}

function draw() {
  var canvas = document.getElementsByTagName('canvas')[0];
  var brush = canvas.getContext('2d');

  brush.clearRect(0, 0, 1300, 700);

  b.draw(brush);
  p.draw(brush);

  update();

  window.requestAnimationFrame(draw);

  var scoreElement = document.getElementById("score");
  scoreElement.innerHTML = score;
}

var b = new bird();
var p = new pipe();

function restart (){
  location.reload();
}

draw();
