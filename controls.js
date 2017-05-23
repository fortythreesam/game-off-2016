function controls(event){
    //Handles typing of letters and plays random key noises
    keycode = event.keyCode;
	
    if (game_state === 1){
	    //main game
	    if (keycode === 27){
		    game_state = 3;
		}
		else{
			letter = String.fromCharCode(keycode).toLowerCase();
			if (letter == current_word.substring(current_letter,current_letter+1)){
				lumberjack.animate = true;
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
						i = getRandomNumber(1,3);
						break;
					case 2:
						key2.play();
						i = getRandomNumber(1,3);
						break;
					case 3:
						key3.play();
						i = getRandomNumber(1,3);
						break;
				}
			}
			else if(timer > 10){
				timer -= 10;
				combo = 10;
			}
			if (keycode == 223){
				dev_tools_enabled = !dev_tools_enabled;
			}
			if (dev_tools_enabled){
				dev_tools_control(keycode);
			}
		}
    }
    else if (game_state === 0){
        //main menu
        gameSetup();
        game_state = 1;
    }
    else if (game_state === 2){
        //game over
        game_state = 0;
    }
	else if (game_state === 3){
	    //pause menu
		switch(keycode){
		    case(27):
			    //escape
				game_state = 1;
				break;
			case(37):
			    //left arrow
				change_setting(-1);
				break;
			case(39):
				//right arrow
				change_setting(1);
				break;
			case(38):
				//up arrow
				settings.pointer -= 1
				settings.pointer = Math.max(settings.pointer,0);
				break;
			case(40):
				//down arrow
				settings.pointer += 1
				settings.pointer = Math.min(settings.pointer,1);
				break;
		}
	}
}
