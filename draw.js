function draw(){
    //Calls all the functions to draw the game and menus
    context.clearRect(0,0,width,height);
    if (game_state === 1){
        //draw game being played
        context.drawImage(background,0,0)
        drawTree(tree);
		lumberjack.draw()
        drawWords();
        drawPoints();
    }
    
    else if (game_state === 0){
        mainMenuScreen();
    }
    else if (game_state === 2){
        gameOverScreen();
    }
	else if (game_state === 3){
		settings_draw();
	}
}

function drawPoints(){
    //Draws the points bar at the top of the screen and number of points below it. 
    context.beginPath();
    context.fillStyle = "red";
    context.fillRect(10,10,timer,40);
    context.closePath();
    
    context.beginPath();
    context.fillText(points,10,90);
    context.closePath();
}

function drawWords(){
    context.beginPath();
    context.fillStyle= "black";
    context.font = "34px silkscreen";
    context.textAlign = "left";
    context.fillText(current_word,313,height - 200 - treemod);
    for (var i = 1; i < 11; i += 1){
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
}

function drawTree(obj){
    //Moves the tree down at speed treemod when log of the trunk is removed
    if (treemod > 0){
        treemod -= 4
    }
    //Draws the logs in the trunk, textures depend on that logs 0th element, then draws branches on the right and left depending on elemnts 1 and 2 respectively. 
    for (var i = 1; i < 12; i += 1){
        context.beginPath();
        switch(tree[i][0]){
            case 1:
                trunk = trunk1;
                break;
            case 2:
                trunk = trunk2;
                break;
            case 3:
                trunk = trunk3;
                break;
            case 4:
                trunk = trunk4;
                break;
            case 5:
                trunk = trunk5;
                break;
            default:
                trunk = trunk1;
                break;
        }
        context.drawImage(trunk,310,height - 150 - (50*(i+1)) - treemod);
        if (tree[i][1] == 1){
            context.drawImage(trunk1,550,height - 150 - (50*(i+1)) - treemod);
        } 
        if (tree[i][2] == 1){
            context.drawImage(trunk1,70,height - 150 - (50*(i+1)) - treemod);
        } 
        context.closePath();
    }
}

function gameOverScreen(){
    context.fillStyle= "#555555";
    context.font = "40px silkscreen";
    context.textAlign = "center";
    context.fillText("Game Over --- Score:"+points,width/2,height/2 -20);
    context.fillText("Press Any Key To Return To Main Menu",width/2,height/2 +20);
}

function mainMenuScreen(){
    context.fillStyle= "#555555";
    context.font = "40px silkscreen";
    context.textAlign = "center";
    context.fillText("Hacking Lumber 3",width/2,height/2 -20);
    context.fillText("Press Any Key To Begin",width/2,height/2 +20);
}

function settings_draw(){
	context.textAlign = "center";
	context.strokeStyle =  "#4b6aa8";
	context.strokeRect(420,165 + (200*settings.pointer),400,50);
	context.fillStyle =  "#555555";
    context.fillText("Volume:"+settings.volume,(width/2),200);
    if(settings.difficulty == 0){
        context.fillText("Difficulty: EASY",(width/2),400);
    }
    if(settings.difficulty == 1){
        context.fillText("Difficulty: NORMAL",(width/2),400);
    }
    if(settings.difficulty == 2){
        context.fillText("Difficulty: HARD",(width/2),400);
    }
	
	
}

