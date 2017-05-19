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

function settings_draw(){
	context.textAlign = "center";
	context.strokeStyle =  "#4b6aa8";
	context.strokeRect(450,165 + (200*settings.pointer),340,50);
	context.fillStyle =  "#555555";
    context.fillText("Volume:"+settings.volume,(width/2),200);
	context.fillText("Difficulty:"+settings.difficulty,(width/2),400);
	
}