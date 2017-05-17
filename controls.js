function controls(event){
    //Handles typing of letters and plays random key noises
    keycode = event.keyCode;
    if (game_state === 1){
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
        else if(timer > 10){
            timer -= 10;
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
