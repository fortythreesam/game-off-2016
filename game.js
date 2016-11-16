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
    //variables for key noises
    var key1 = new Audio('key1.mp3')
    var key2 = new Audio('key2.mp3')
    var key3 = new Audio('key3.mp3')
    var i = 1
	document.addEventListener('DOMContentLoaded', init, false);
  
    function init(){
		canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
		if (window.innerWidth-18< 1200){
			canvas.width = 1200;
		}
		else if (window.innerWidth-18 > 2200){
			canvas.width = 2200
		}
		else{
			canvas.width = window.innerWidth - 18;
		}
		if (window.innerHeight-18< 800){
			canvas.height = 800;
		}
		else if (window.innerHeight-18 > 1200){
			canvas.height = 1200
		}
		else{
			canvas.height = window.innerHeight - 18;
		}
        width = canvas.width;
        height = canvas.height;
		game_state = 0;
		window.setInterval(main,33);
		window.addEventListener("keydown",controls,false);
    }
	
	function main(){
		if (game_state === 1){
			//game
			if (current_letter === current_word.length){
				nextWord()
			}
			if (timer > 0){
				timer--;
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
			//points counter
			context.beginPath();
			context.fillText(points,10,90);
			context.closePath();
			//points bar
			context.beginPath();
			context.fillStyle = "red";
			context.fillRect(10,10,timer,40);
			context.closePath();
			//words
			context.beginPath();
			context.fillStyle= "#555555";
			context.font = "40px Arial";
			context.textAlign = "left";
			context.fillText(current_word,50,height - 70);
			for (var i = 1; i < 10; i += 1){
				context.fillText(upcoming_words[i],50,height - 20 - (50*(i+1)));
			}
			context.closePath();
			
			context.beginPath();
			context.fillStyle = "#ffffff";
			context.fillText(typed_word,50,height - 70);
			context.closePath();
        }
		else if (game_state === 0){
			//main menu
			context.fillStyle= "#555555";
			context.font = "40px Arial";
			context.textAlign = "center";
			context.fillText("Hacking Lumber 3",width/2,height/2 -20);
			context.fillText("Press Any Key To Begin",width/2,height/2 +20);
		}
		else if (game_state === 2){
			//game over
			context.fillStyle= "#555555";
			context.font = "40px Arial";
			context.textAlign = "center";
			context.fillText("Game Over --- Score:"+points,width/2,height/2 -20);
			context.fillText("Press Any Key To Return To Main Menu",width/2,height/2 +20);
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
		for (var i = 0; i < 10; i += 1){
			upcoming_words.push(words[getRandomNumber(0,67724)].toLowerCase());
		}
		current_word = upcoming_words[0];
		
	}
	
	function nextWord(){
		//moving onto the next word to type
		upcoming_words.splice(0,1)
		upcoming_words.push(words[getRandomNumber(0,67724)].toLowerCase())
		current_word = upcoming_words[0]
		current_letter = 0
		typed_word = ""
	}
	
    function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min+1)) + min;
    }
	

})(); 
