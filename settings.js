var settings = {
    volume:100,
	difficulty:0,
	pointer:0,
}

function change_setting(direction){
    if (settings.pointer == 0){
		settings.volume += 5*direction
		if (settings.volume > 100) {
			settings.volume = 100;
		}
		else if (settings.volume < 0) {
			settings.volume = 0;
		}
		for(i = 0; i < sounds.length; i++){
            sounds[i].volume = settings.volume/100
        }
	}
	else if (settings.pointer == 1){
	    settings.difficulty += 1*direction
		if (settings.difficulty > 2) {
			settings.difficulty = 2;
		}
		else if (settings.difficulty < 0) {
			settings.difficulty = 0;
		}
	}
}

