/*
Press ` to activate dev tools

Controls:
-- 1 : timer is deactivates
-- 2 : auto completes words
-- 3 : finishes current word
-- 4 : adds 100 points
*/



var no_timer = false;
var autocomplete_words = false;
var finish_word = false;
var add_points = false;

function dev_tools(){
  if (no_timer){
    timer = 1000;
  }
  if (autocomplete_words){
    current_letter += 1;
    typed_word += current_word.substring(current_letter-1,current_letter);;
  }
  if (finish_word){
    current_letter = current_word.length;
	finish_word = false;
  }
  if (add_points) {
    points += 100;
	add_points = false;
  }
}

function dev_tools_control(key){
  switch(key){
    case 49:
	  no_timer = !no_timer;
	  break
	case 50:
	  autocomplete_words = !autocomplete_words;
	  break
	case 51:
	  finish_word = !finish_word;
	  break
	case 52:
	  add_points = !add_points;
	  break
  }
}