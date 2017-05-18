var canvas;
var context;
var game_state;
//variables for words
var upcoming_words;
var current_word ;
var current_letter;
var typed_word ;
//variables for points and timer
var timer
var combo
var points
//difficulty == length of word
var difficulty
//variables for key noises
var key1 = new Audio('sound/key1.mp3')
var key2 = new Audio('sound/key2.mp3')
var key3 = new Audio('sound/key3.mp3')
var i = 1
//images
var lumberjack_img = new Image()
lumberjack_img.src = "images/lumberjack.png"
var background = new Image()
background.src = "images/background.png"
var trunk1 = new Image()
trunk1.src = "images/trunk1.png"
var trunk2 = new Image()
trunk2.src = "images/trunk2.png"
var trunk3 = new Image()
trunk3.src = "images/trunk3.png"
var trunk4 = new Image()
trunk4.src = "images/trunk4.png"
var trunk5 = new Image()
trunk5.src = "images/trunk5.png"
var tree = [];
var lumberjack = {
	sprite: lumberjack_img,
	frame: 0,
	direction: 0.75,
	width: 340,
	height: 320,
	animate: false,
	draw: function(){
	  context.drawImage(lumberjack.sprite,lumberjack.width*Math.floor(lumberjack.frame),0,lumberjack.width,lumberjack.height,450,350,lumberjack.width,lumberjack.height);
	  if (lumberjack.animate || lumberjack.frame > 0){
	    lumberjack.frame += lumberjack.direction;
		if (lumberjack.frame >= 10 || lumberjack.frame <= 0){
		  lumberjack.direction *= -1;
		  lumberjack.animate = false;
		}
	  }
	}
};
var treemod = 0;
//dev
dev_tools_enabled = false;

document.addEventListener('DOMContentLoaded', init, false);

function init(){
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    canvas.height = 740
    canvas.width = 1240
    width = canvas.width;
    height = canvas.height;
    game_state = 0;
    window.setInterval(main,10);
    window.addEventListener("keydown",controls,false);
}

function main(){
    if (game_state === 1){
        //game
        if (current_letter === current_word.length){
            nextWord()
        }
        if (timer > 0){
            timer-=.5;
        }
        else {
            game_state = 2
        }
		if (dev_tools_enabled){
		  dev_tools();
		}
    }
    draw()
}


function nextWord(){
    //moving onto the next word to type
    UpdateTree(tree);
    upcoming_words.splice(0,1);
    treemod += 52
    //difficulty increases every 300 points
    difficulty = Math.floor(points/300) + 3
    if (difficulty < 9){
        switch(difficulty){
            case 2:
                upcoming_words.push(words2[getRandomNumber(0,157)].toLowerCase());
                break;
            case 3:
                upcoming_words.push(words3[getRandomNumber(0,1082)].toLowerCase());
                break;
            case 4:
                upcoming_words.push(words4[getRandomNumber(0,3189)].toLowerCase());
                break;
            case 5:
                upcoming_words.push(words5[getRandomNumber(0,5343)].toLowerCase());
                break;
            case 6:
                upcoming_words.push(words6[getRandomNumber(0,7881)].toLowerCase());
                break;
            case 7:
                upcoming_words.push(words7[getRandomNumber(0,9181)].toLowerCase());
                break;
            case 8:
                upcoming_words.push(words8[getRandomNumber(0,9487)].toLowerCase());
                break;
        }
    }
    else{
        upcoming_words.push(words9[getRandomNumber(0,9038)].toLowerCase());
    }
    current_word = upcoming_words[0]
    current_letter = 0
    typed_word = ""
}

function gameSetup(){
    //for initialising variables when the game starts
    upcoming_words = [];
    current_letter = 0;
    typed_word = "";
    timer = 1000;
    combo = 10;
    points = 0;
    difficulty = 3;
    for (var i = 0; i < 11; i += 1){
        upcoming_words.push(words2[getRandomNumber(0,157)].toLowerCase());
    }
    current_word = upcoming_words[0];
    for (i = 0; i < 12; i++){
        branchoddsright = getRandomNumber(0,15);
        branchoddsleft = getRandomNumber(0,15);
        textureNum = getRandomNumber(1,5);
        tree.push([textureNum, branchoddsright, branchoddsleft])
    }
}

function UpdateTree(){
    //Removes bottom log in tree and appends new log to the top
    branchoddsright = getRandomNumber(0,15);
    branchoddsleft = getRandomNumber(0,15);
    textureNum = getRandomNumber(1,5);
    tree.push([textureNum, branchoddsright, branchoddsleft])
    tree.splice(0,1);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min+1)) + min;
}

