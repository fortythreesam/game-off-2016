(function (){

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
    var treemod = 0;
    
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
        for (i = 0; i < 12; i++){
            textureNum = getRandomNumber(1,5);
            tree.push[textureNum]
            console.log(textureNum)
        }
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
		}
		draw()
	}
	
	function draw(){
		context.clearRect(0,0,width,height);
		if (game_state === 1){
			//game
			context.drawImage(background,0,0)
			//points counter
			context.beginPath();
			context.fillText(points,10,90);
			context.closePath();
            //tree
            drawTree(tree);
			//words
			context.beginPath();
			context.fillStyle= "#555555";
			context.font = "34px silkscreen";
			context.textAlign = "left";
			context.fillText(current_word,313,height - 200 - treemod);
			for (var i = 1; i < 10; i += 1){
                context.beginPath();
				context.fillText(upcoming_words[i],313,height - 150 - (50*(i+1)) - treemod);
                context.closePath;
			}
			context.closePath();
            //brighter text over typed word
			context.beginPath();
			context.fillStyle = "#ffffff";
			context.fillText(typed_word,313,height - 200 - treemod);
			context.closePath();
            
			//points bar
			context.beginPath();
			context.fillStyle = "red";
			context.fillRect(10,10,timer,40);
			context.closePath();
            
        }
		else if (game_state === 0){
			//main menu
			context.fillStyle= "#555555";
			context.font = "40px silkscreen";
			context.textAlign = "center";
			context.fillText("Hacking Lumber 3",width/2,height/2 -20);
			context.fillText("Press Any Key To Begin",width/2,height/2 +20);
		}
		else if (game_state === 2){
			//game over
			context.fillStyle= "#555555";
			context.font = "40px silkscreen";
			context.textAlign = "center";
			context.fillText("Game Over --- Score:"+points,width/2,height/2 -20);
			context.fillText("Press Any Key To Return To Main Menu",width/2,height/2 +20);
		}
	}
	
	function drawTree(obj){
        if (treemod > 0){
            treemod -= 2
        }
        for (var i = 1; i < 12; i += 1){
            context.beginPath();
                switch(tree[i]){
                    case 1:
                        context.drawImage(trunk1,310,height - 150 - (50*(i+1)) - treemod);
						break;
					case 2:
						context.drawImage(trunk2,310,height - 150 - (50*(i+1)) - treemod);
						break;
					case 3:
						context.drawImage(trunk3,310,height - 150 - (50*(i+1)) - treemod);
						break;
                    case 4:
						context.drawImage(trunk4,310,height - 150 - (50*(i+1)) - treemod);
						break;
                    case 5:
						context.drawImage(trunk5,310,height - 150 - (50*(i+1)) - treemod);
						break;
                    default:
						context.drawImage(trunk1,310,height - 150 - (50*(i+1)) - treemod);
						break;
                }
                context.closePath();
            }
    }
	function controls(event){
		keycode = event.keyCode;
		if (game_state === 1){
			//game
			letter = String.fromCharCode(keycode).toLowerCase();
			if (letter == current_word.substring(current_letter,current_letter+1)){
				current_letter += 1;
				typed_word += letter;
				combo += 1;
				points += Math.floor(combo/10);
				if (timer < 980){
					timer += 20;
				}
				else {
					timer == 1000
				}
				switch(i){
					//alternates key noises
					case 1:
						key1.play();
						i = 2;
						break;
					case 2:
						key2.play();
						i = 3;
						break;
					case 3:
						key3.play();
						i = 1;
						break;
				}
			}
			else if(timer > 20){
				timer -= 20;
				combo = 10;
			}
		}
		else if (game_state === 0){
			//main menu
			gameSetup()
			game_state = 1
		}
		else if (game_state === 2){
			//game over
			game_state = 0
		}
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
		for (var i = 0; i < 10; i += 1){
			upcoming_words.push(words2[getRandomNumber(0,157)].toLowerCase());
		}
		for (var i = 0; i < 13; i += 1){
            tree.push(getRandomNumber(1,5));
		}
		current_word = upcoming_words[0];
		
	}
	
	function nextWord(){
		//moving onto the next word to type
        tree.push(getRandomNumber(1,5));
        tree.splice(0,1);
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
	
    function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min+1)) + min;
    }
	

})(); 
