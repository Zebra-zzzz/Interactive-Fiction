var fade;
var fadeAmount = 1;
var stopfade = false;
var phase2 = false;
let yoff = 0.0; // 2nd dimension of perlin noise
var section = [];
var section01;
var currentTime;
var periodTime = 0;
var crackSound;
let letters = [];

function preload() {
    soundFormats('mp3', 'ogg');
    crackSound = loadSound('crack.mp3');
}
function setup() {
    createCanvas(700, 700);
    textFont("Roboto", 14);
    textAlign(LEFT, TOP); //change text alignment to bottom
    //textStyle(BOLD); // change text style
    fill(255, 204, 0);
    fade = 0;
        
    section.push(new Collide(
        [["A poem for Gus, who always said that wedding was a ", color('#fff')], ["bad", color('#26ABE4')], [" idea.", color('#fff')]],
        0,
        3
    ));
    section.push(new Collide(
        [["Our father never hit us kids, at least not very hard,", color('#fff')]],
        1,
        0
    ));
    section.push(new Collide(
        [["before the day my brother said with teenage disregard", color('#fff')]],
        2,
        0
    ));
    section.push(new Collide(
        [["that he'd be dead before he'd see a wedding in our yard.", color('#fff')]],
        3,
        0
    ));
    section.push(new Collide(
        [["My father made him ", color('#fff')], ["come", color('#26ABE4')], [" of course, but Gus stood far apart.", color('#fff')]],
        4,
        4
    ));
    section.push(new Collide(
        [["Just flew his kite and bottled up the storm in his heart.", color('#fff')]],
        5,
        0
    ));
    section.push(new Collide(
        [["I tried to talk him about of it, but though he'd never met her.", color('#fff')]],
        6,
        0
    ));
    section.push(new Collide(
        [["\"We don't need a stepmom,\" write the words that I remember.", color('#fff')]],
        7,
        0
    ));
    section.push(new Collide(
        [["When the time for photos came, Dad ordered him to \"Came here!\"", color('#fff')]],
        8,
        0
    ));
    section.push(new Collide(
        [["But Gus ", color('#fff')], ["declined", color('#26ABE4')], [" immediately and as a sign held up his middle finger.", color('#fff')]],
        9,
        5
    ));
    section.push(new Collide(
        [["The wind ", color('#fff')], ["picked up", color('#26ABE4')], [" and panicked geese appeared and quickly went.", color('#fff')]],
        10,
        1
    ));
    section.push(new Collide(
        [["But all the humans did that day was go inside the tent.", color('#fff')]],
        11,
        0
    ));
    section.push(new Collide(
        [["The rain came down in buckets then but no one seemed afraid.", color('#fff')]],
        12,
        0 
    ));
    section.push(new Collide(
        [["That nature might destroy the tent our dad had ", color('#fff')], ["crudely", color('#26ABE4')], [" made.", color('#fff')]],
        13,
        2
    ));
    section.push(new Collide(
        [["The thunder sounded much too close and full of angry power.", color('#fff')]],
        14,
        0
    ));
    section.push(new Collide(
        [["But my father said to this was “make the music louder!”", color('#fff')]],
        15,
        0 
    ));
    section.push(new Collide(
        [["I wish that I could truly say I thought about you on that day.", color('#fff')]],
        16,
        0
    ));
    section.push(new Collide(
        [["Out there on the beach alone, just you the wind the sea and foam.", color('#fff')]],
        17,
        0 
    ));
    section01 = new Collide(
        [],
        10,
        0 
    );
    // lastline = new Draggable("But I didn’t. Until we found you.", section1.rows + section2.rows + section3.rows + section4.rows);
    lastline = new Drag("But I didn’t. Until we found you.", 18);
}
function draw() {
    background(40);
    for(var i = 0; i < section.length; i++) {
        section[i].show();
        section[i].colliding();
    }
    // section1.show();
    // section2.show();
    // section3.show();
    // section4.show();
    // section5.show();
    // section6.show();
    // section7.show();
    // section8.show();
    section01.show();
    lastline.over();
    lastline.update();
    lastline.show();
    // section1.colliding();
    // section2.colliding();
    // section3.colliding();
    // section4.colliding();
    // section5.colliding();
    // section6.colliding();
    // section7.colliding();
    // section8.colliding();
    section01.colliding();

    for (let i = 0; i < letters.length; i++) {
        fill(color('#fff'));
        text(letters[i].letter, letters[i].xPos, letters[i].yPos);
        letters[i].xPos += letters[i].xDir;
        letters[i].yPos += letters[i].yDir;
      }
}

function mousePressed() {
    lastline.pressed();
}

function mouseReleased() {
    lastline.released();
}

function explodeText(oldText, y) {
    textSize(14);
    let text = oldText;
    let currentPos = random(width / 2);
    
    for (let i = 0; i < text.length; i++) {
      let letterObj = {
        letter: text.charAt(i),
        yPos: y,
        xPos: currentPos,
        xDir: random(-1, 1),
        yDir: random(-0.5, 2)
      };
      letters.push(letterObj);
      currentPos += textWidth(text.charAt(i));
    }
  }

class Drag {
    constructor(sent, aboverows) {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?

        this.sen = sent;
        this.aboverows = aboverows;
        //this.row = 1;
        this.x = 100;
        this.y = 60 + 30 * this.aboverows;
        //   if (part == 1) {

        //   } else {
        //     this.y = 100 + 20 * shape2.row;
        //   }

        // Dimensions
        this.w = textWidth(this.sen);
        this.h = 30;
        this.hoverColor = color(100);
        this.nonHoverColor = color(175, 200);
    }

    over() {
        // Is mouse over object
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }

    update() {
        // Adjust location if being dragged
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    show() {
        stroke(0);
        translate(0, 0);
        // Different fill based on state
        if (this.dragging) {
            fill(color('#cbcb41'));
        } else if (this.rollover) {
            fill(this.hoverColor);
        } else {
            fill(this.nonHoverColor);
        }
        text(this.sen, this.x, this.y);
    }

    pressed() {
        // Did I click on the rectangle?
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released() {
        // Quit dragging
        this.dragging = false;
        this.x = 100;
        this.y = 60 + 30 * this.aboverows;
        this.hoverColor = color(100);
        this.nonHoverColor = color(175, 200);
    }
}

class Collide {
    constructor(sents, aboverows, erasable) {
        this.highlighted = erasable;
        this.collided = false;
        this.collidTime = 0;
        this.aboverows = aboverows;
        this.swing = false;
        this.strongCollided = false;
        this.collidedTimes = 0; // how many times it has been collided
        //this.elastic = elastic;

        //this.sen = sents;
        //this.rows = sents.length;
        this.x = 100;
        this.y = 100 + 30 * this.aboverows;
        //   if (part == 1) {

        //   } else {
        //     this.y = 100 + 20 * shape2.row;
        //   }

        // Dimensions
        this.w = 0;
        this.h = 30;
        this.sents = sents;
    }

    // over() {
    //     // Is mouse over object
    //     if (
    //         mouseX > this.x &&
    //         mouseX < this.x + this.w &&
    //         mouseY > this.y &&
    //         mouseY < this.y + this.h
    //     ) {
    //         this.rollover = true;
    //     } else {
    //         this.rollover = false;
    //     }
    // }

    show() {    
        var pos_x = 0;
        this.y = 60 + 30 * this.aboverows;
        if (this.swing) {
            this.swingrange += 0.05;
            push();
            translate(random(-1 * this.swingrange, this.swingrange), random(-1 * this.swingrange, this.swingrange));
            //pop();
        }
        for (var i = 0; i < this.sents.length; i++)  {
            var part = this.sents[i];
            var txt = part[0];
            var color = part[1];
            fill(color);
            text(txt, this.x + pos_x, this.y);
            var wid = textWidth(txt);
            pos_x += wid;
            //print(this.sents.length);
        }
        if (this.swing) {
            pop();
        }
      this.w = pos_x;
    }

    colliding() {
        if (lastline.x > this.x && lastline.x < this.x + this.w && lastline.y > this.y - this.h && lastline.y < this.y + this.h) {
            if (!this.highlighted) {
                this.sents[0][1] = color('#fa2a44');
                this.collided = true;
                lastline.x = this.x + this.w;
                lastline.y = this.y;
                lastline.dragging = false;
                lastline.hoverColor = color('#cbcb41'); 
                lastline.nonHoverColor = color('#cbcb41'); 
            } else if (this.highlighted == 3 || this.highlighted == 5) {
                if (!this.collided) {
                    this.transparency = 255;
                    currentTime = millis();
                    this.collided = true;
                    this.swingrange = 1;
                    this.swing = true;
                } else if ((millis() - currentTime)  > 3000) {
                    this.collided = false;
                    this.swing = false;
                    this.sents[0][1] = color('#fff');
                    if (this.highlighted == 3) {
                        this.sents = [["A poem for Gus, who always said that wedding was a good idea.", color('#fff')]];
                        section[1].sents[0][0] = "Our father never be that kind to us kids, at least after mom's death,";
                        section[2].sents[0][0] = "before the day my brother said with excitement.";
                        section[3].sents[0][0] = "that he was so happy our father finally found the one he loved.";                   
                        section[4].sents = [["Of course we both came to see the wedding in our yard.", color('#fff')]];
                        // section[4].sents[1][0] = "";
                        // section[4].sents[2][0] = "";
                        section[4].highlighted = 0;
                        section[5].sents[0][0] = "Gus was flying his kite at first.";
                        section[6].sents[0][0] = "But he stopped playing it when we saw our new mother came.";
                        section[7].sents[0][0] = "Gosh we had new mother!! write the words that I remember.";
                        section[8].sents[0][0] = "When the time for photos came, Dad told us \"Came here!\"";                        
                        section[9].sents = [["We took a new family portrait.", color('#fff')]];
                        // section[9].sents[1][0] = "";
                        // section[9].sents[2][0] = "";
                        section[9].highlighted = 0;
                        section[16].sents[0][0] = "I wish that I could ask dad to make the tent more rigid.";
                        section[17].sents[0][0] = "Out there on the beach alone, just the wind the sea and foam.";
                        lastline.sen = "But I didn’t. The wind suddenly blew the tent away.";                    
                    } else if (this.highlighted == 5) {
                        this.sents = [["Gus kept silent for a while, but eventually came with us.", color('#fff')]];                        
                        section[16].sents[0][0] = "I wish that I could ask dad to make the tent more rigid.";
                        section[17].sents[0][0] = "Out there on the beach alone, just the wind the sea and foam.";
                        lastline.sen = "But I didn’t. The wind suddenly blew the tent away.";                    
                    }
                    
                    this.highlighted = 0;
                    this.collided = false;
                    currentTime = 0;
                    //lastline.dragging = false;

                } else {
                    if (this.transparency > 1) {
                        this.transparency -= 1;
                    }                    
                    this.sents[0][1] = color(255, 255, 255, this.transparency);
                    this.sents[1][1] = color(38, 171, 228, this.transparency);
                    this.sents[2][1] = color(255, 255, 255, this.transparency);
                }
                
                // translate(random(-5, 5), random(-5, 5));
                //this.collided = true;
                // lastline.x = this.x + this.w;
                // lastline.y = this.y;
                // lastline.dragging = false;
            } else {
                // this.sents[1][1] = color('#cbcb41');
                if (this.highlighted == 2) {
                    this.sents = [["That was because the tent our dad carefully made was very rigid.", color('#fff')]];
                    if (section[0].highlighted) {
                        lastline.sen = "But I didn’t. I was so sorry that you got sick that day.";
                    } else {
                        section[16].sents[0][0] = "I was worried that if the thunder was out of control.";
                        //section[17].sents[0][0] = "I cannot imagine if the thunder was out of control."
                        lastline.sen = "Fortunately, the wind suddenly disappeared.";
                    }
                    
                    this.highlighted = 0;
                } else if (this.highlighted == 4) {
                    this.sents = [["My father finally didn;t make him come of course.", color('#fff')]];
                    section[5].sents[0][0] = "He locked himself in his own room.";
                    section[6].sents[0][0] = "I tried to persuade him, but it didn't work as well.";
                    section[16].sents[0][0] = "I wish that I could ask dad to make the tent more rigid.";
                    section[17].sents[0][0] = "Out there on the beach alone, just the wind the sea and foam.";
                    lastline.sen = "But I didn’t. The wind suddenly blew the tent away.";                       
                    
                    this.highlighted = 0;
                } else if (this.highlighted == 1) {
                    if (!this.strongCollided) {
                        this.strongCollided = true;
                        this.collidedTimes += 1;
                        crackSound.play();
                        if (this.collidedTimes >= 3) {
                            if (this.highlighted == 1) {
                                this.sents = [["The wind disappeared for a while.", color('#fff')]];
                                section01.sents = [["But suddenly the thunder became much too close and full of angry power.", color('#fff')]];                                
                                section01.aboverows += 1;
                                // section[1].aboverows += 1;
                                for (var i = 11; i < section.length; i++) {
                                    section[i].aboverows += 1;
                                }
                                lastline.aboverows += 1;
                                lastline.sen = "The thunder suddenly blew all of us away.";    
                                explodeText("Out there on the beach alone, just you the wind the sea and foam.", this.y);                            
                            }
                            this.highlighted = 0;
                            

                        }
                    } //else if (this.collidedTimes < 3) {
                    //     this.collidedTimes += 1;
                    // }
                    // //this.swing = true;
                    // this.sents = [["The wind disappeared for a while.", color('#fff')]];
                    // section01.sents = [["But suddenly the thunder became much too close and full of angry power.", color('#fff')]];
                    // section01.aboverows += 1;
                    // // section[1].aboverows += 1;
                    // for (var i = 1; i < section.length; i++) {
                    //     section[i].aboverows += 1;
                    // }
                    // lastline.aboverows += 1;
                    // lastline.sen = "the thunder suddenly blew all of us away.";
                    // this.highlighted = 0;
                } 
            }
        } else if (this.collided == true && this.collidTime == 0) {
            this.collidTime = 1;
            //this.sents[0][1] = color('#fff');
        } else if (this.collided == true && this.collidTime == 1) {
            this.collidTime = 2;
            //this.sents[0][1] = color('#fff');
        } else if (this.collided == true && this.collidTime == 2) {
            this.collidTime = 3;
            //this.sents[0][1] = color('#fff');
        } else if (this.collided == true && this.collidTime == 3) {
            this.collidTime = 4;
            //this.sents[0][1] = color('#fff');
        } else if (this.collided == true && this.collidTime == 4) {
            this.collidTime = 5;
            //this.sents[0][1] = color('#fff');
        } else if (this.collided == true && this.collidTime == 5) {
            this.collidTime = 6;
            //this.sents[0][1] = color('#fff');
        }else if (this.collided == true && this.collidTime == 6) {
            this.collidTime = 0;
            this.collided = false;
            this.sents[0][1] = color('#fff');
        }else if (this.strongCollided == true && this.collidedTimes < 3) {
            this.strongCollided = false;
        }
    }
}
