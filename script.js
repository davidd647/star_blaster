
//To do:
// - Acceleration instead of simple speed 									:)
// - On death, fade screen to blue, offer to restart game 					:)
// - Add transparency to the sprites   										:)
// - Make the game harder as time goes on (more and more asteroids)  		:)		
// - Track points/score 													:)
// - Make the speed of missiles the speed of the ship plus 10 or something	:)
// - Add a starry background 												:)
// - Make the darkblue background fade when user clicks begin 				:)
		// - Add graphics to the start screen  								:)
		// - Add special font to the start screen 							:)
		// - Add a cool techy font to the page 								:)
		// - Add a background colour to the page 							:)
		// - Add a drop-shadow to the canvas 								:)
	//CORRECT COLLISION-DETECTION 											:)
		// - Fix collision detection!!! 									:)
		// - Add parallax to the background 								:)
	// - Allow multiple key inputs (more than two at a time) 				:)
		// - Take away the flickering from the asteroids 					:)
// - Make the game multiplayer 												:)
	// - Add different modes to the start screen  							:)

//MOST IMPORTANT THINGS:
	//MAKE IT PRESENTABLE (IT'S A PORTFOLIO PIECE!)
		// - Add explosion to the missiles when they collide with the asteroids

// - Make the begin button unclickable after start
// - Add SFX
// - Add a parallax background to the page - and have it slow to a stop, 
	//and zoom in when user clicks "begin"
// - Add music (muzak?)
// - Change the start screen (proper instructions)



var pressedKeys = []; 

$(document.body).keydown(function(evt){
	pressedKeys[evt.keyCode] = true;
	var key = pressedKeys[evt.keyCode];
	// console.log("Up: "+evt.keyCode);
	// console.log(pressedKeys);
});
$(document.body).keyup(function(evt){
	pressedKeys[evt.keyCode] = false;
	var key = pressedKeys[evt.keyCode];
	// console.log("Down: "+evt.keyCode);
	// console.log(pressedKeys);
});

var Context = {
	canvas : null,
	context : null,
	create : function(canvas_tag_id){
		this.canvas = document.getElementById(canvas_tag_id);
		this.context = this.canvas.getContext('2d');
		return this.context;
	}
}

//constructor object for sprites! :D
var Sprite = function(filename, is_pattern){
	//Construction begins here
	this.image = null;
	this.pattern = null;
	this.TO_RADIANS = Math.PI/180;

	if (filename != undefined && filename != "" && filename != null){
		this.image = new Image(); //a built-in JS object
		this.image.src = filename; //this will load the picture!

		if (is_pattern){
			this.pattern = Context.context.createPattern(this.image, 'repeat');
		}
	} else {
		console.log("Unable to locate sprite");
	}
	this.draw = function(x,y,w,h){
		// Pattern?
		if (this.pattern != null){
			Context.context.fillstyle = this.pattern;
			Context.context.fillRect(x, y, w, h);
		} else {
			// Image
			if (w != undefined || h != undefined){
				// drawImage is a built-in function!
				Context.context.drawImage(this.image, x, y,
					this.image.width,
					this.image.height); //once you load an image,
										//it auto has its dimensions
			} else {
				//Stretched
				Context.context.drawImage(this.image,x,y,w,h);

			}
		}
	};
	this.rotate = function(x,y,angle){
		//this saves the state of canvas @ this time,
		//because we actually rotate the entire canvas, not the image
		Context.context.save(); 
		Context.context.translate(x,y);
		Context.context.rotate(angle * this.TO_RADIANS);
		Context.context.drawImage(this.image, 
			-(this.image.width/2),
			-(this.image.height/2));
		//now we restore the canvas rotation
		Context.context.restore();
	};
};

var img = new Sprite("http://www.unsplash.it/100/100", false);

$(document).ready(function(){
	//Initialize Canvas
	Context.create("canvas");

});

$('.play_again').on('click',function(){
	location.reload();
});

var backColour = 94;

//When the user selects "BEGIN", start the game
$('#start_game').on('click',function(){
	// $('#start_game').css('display','none');
	// $('#start_game').animate({paddingTop: '480px'}, 2000);
	$('.game_start_screen').animate({opacity: '0', top: '-300px'}, 1000);
	var timerId = setInterval(function(){
		$('body').css('background','hsl(182,100%,'+backColour+'%');
		// hsl(182, 100%, 94%)
		backColour--;
		if (backColour <=5){
			clearInterval(timerId);
		}
	},25);
	//create the images
		var BACKGROUND = "img/background_alpha.png";
		var FAR_BG = "img/background_alpha2.png";

		var SHIP1 = "img/ship1.png";
		var SHIP2 = "img/ship2.png";
		var SHIP3 = "img/ship3.png";

		var ASTEROID_L = "img/asteroid_l.png";
		var ASTEROID_S = "img/asteroid_s.png";

		var MISSILE = "img/missile.png";

		var DEBUGGING_RECT = Context.context.rect(0,0,100,100);
		Context.context.stroke();

		var playerAmnt = 1;
		var player_1 = new Sprite(SHIP1, false);
		var player_2 = new Sprite(SHIP2, false);
		var far_bg1 = new Sprite(FAR_BG, false);
		var far_bg2 = new Sprite(FAR_BG, false);
		var background = new Sprite(BACKGROUND, false);
		var background2 = new Sprite(BACKGROUND, false);
		//Tutorial stuff:
			// var WALL = "http://www.unsplash.it/100/100";
			// var CRATE = "http://www.unsplash.it/36/36";
			
			// var image = new Sprite(WALL, false);
			// var image2 = new Sprite(CRATE, false);
			// var pattern = new Sprite(CRATE, true);
			// var angle = 0;



	//how many ships? 1 or 2?

	
	//variables to deal with in-game
	var asteroidCounterLimit = 50;
	var asteroidCounterLimitDifficulty = 0;
	var asteroidCounter = asteroidCounterLimit;
	var timeCounter = 0;
	var asteroidArray = [];
	var missileArray = [];
	var missileCounter = 0;
	var missileCounter2 = 0;
	var missileCounterLimit = 10;
	var playerDeg = 90;
	var playerPosX = 75;
	var playerPosY = 180;
	var playerSpeed = 0.1;
	var playerSpeedX = 1;
	var playerSpeedY = 0;

	var player2Deg = 90;
	var player2PosX = playerPosX;
	var player2PosY = playerPosY + 100;
	var player2Speed = playerSpeed;
	var player2SpeedX = 1;
	var player2SpeedY = 0;

	var playerAcceleration = 0.0001;
	var dead = false;
	var p1dead = false;
	var p2dead = true;
	var screenDimmer = 0;
	var playerScore = 0;
	var topSpeed = 0;
	// var bgShifter = 0;
	// var bgShifter2 = 0;
	var farBgShift = 0;
	var nearBgShift = 0;
	var asteroidSrc = new Sprite(ASTEROID_L, false);
	var missileSrc = new Sprite(MISSILE, false);

	if ($('input[name=amnt_of_players]:radio:checked').val() === "two_players"){
		console.log("Two players!");
		playerAmnt = 2;
		p2dead = false;
	} else {
		console.log("One player!");
		player2PosY = 1000;
	}


	setInterval(function(){
		if (timeCounter > 30){
			// console.log("Now we're at -300px!");
			// console.log(timeCounter);
			$('.game_start_screen').css('display','none');
		}
		//intro screen (to be implemented)
			


			//(future functions) difficulty:
					// easier - no friendly fire, reverse boosters
					// normal - friendly fire on, revserse boosters
					// harder - friendly fire on, no reverse boosters

		//Set the background in-game
			Context.context.fillStyle = "#000000";
			Context.context.fillRect(0,0,640,480);
			

			far_bg1.draw(farBgShift,0,640,480);
			far_bg2.draw(farBgShift+640,0,640,480);
			background.draw(nearBgShift,0,640,480);
			background2.draw(nearBgShift+640,0,640,480);

			farBgShift -= 1;
			nearBgShift -= 2;

			if (farBgShift < -640){
				farBgShift = 0;
			}
			if (nearBgShift < -640){
				nearBgShift = 0;
			}

			// bgShifter-=0.1;
			// if (bgShifter2 < -640){
			// 	bgShifter2 = 0;
			// }

			// bgShifter-= 0.2;
			// if (bgShifter < -640){
			// 	bgShifter = 0;
			// }
			// if (bgShifter % 10 === 0){
			// 	console.log("Bgshifter 1 is : " + bgShifter);
			// }
			// if (bgShifter2 % 10 === 0){
			// 	console.log("Bgshifter 2 is : " + bgShifter2);
			// }
		//Increase the overall timer
			timeCounter++;


		if(dead){
			if (screenDimmer < 0.8){
				screenDimmer = screenDimmer + 0.005;
				$('.game_over_screen').css('display','flex')
					.css('z-index','1000')
					.css('opacity',screenDimmer);
				$('#score_displayer').text(playerScore+'pts');
				$('#speed_displayer').text(topSpeed+'AU/H');
			}
		} else {
			//if ship(#) is pressing left, rotate ship left
			if (!p1dead){
				if (pressedKeys[68]){
					playerDeg+=3;
					if (playerDeg>360){
						playerDeg=0;
					}
					//console.log(playerDeg);
				//if ship(#) is pressing right, rotate ship right
				} else if (pressedKeys[65]){
					playerDeg-=3;
					if (playerDeg<0){
						playerDeg=360;
					}
					//console.log(playerDeg);
				}
				//if ship(#) is pressing up, move ship forward
				if (pressedKeys[87]){

					//NEED TOTAL DISTANCE TO CALCULATE 
					//	(note: this is also the /speed/ of the ship)
					playerSpeed = playerSpeed + playerAcceleration;

					var shipTravelHyp = playerSpeed;
					if (Math.abs(Math.floor(playerSpeedX+playerSpeedY)) > topSpeed){
						topSpeed = Math.abs(Math.floor(playerSpeedX+playerSpeedY));
						$('#top_speed_IG').text('Top speed: '+topSpeed+'AU/H');
						// <p id="points_earned_IG">Points: 0</p>
						// <p id="top_speed_IG">Top speed: 0AU/H</p>
					}

					// //we need to use radians instead of degrees for cosine and sine-_-
					var playerRads = playerDeg * (Math.PI / 180);

					playerSpeedX = playerSpeedX + (Math.sin(playerRads))*shipTravelHyp;
					playerSpeedY = playerSpeedY - (Math.cos(playerRads))*shipTravelHyp;
				}
				var moveShipX = playerSpeedX;
				var moveShipY = playerSpeedY;
							// //HOW MUCH TO INCREASE ON X AXIS
							// var moveShipX = (Math.sin(playerRads))*shipTravelHyp;
							// //console.log("Move ship X: " + moveShipX);

							// //HOW MUCH TO INCREASE ON Y AXIS (remember, Y is down)
							// var moveShipY = -(Math.cos(playerRads))*shipTravelHyp;
							// //console.log("Move ship Y: " + moveShipY);
							// //get that slidey space motion goin' on
				
				playerPosX += moveShipX;
				playerPosY += moveShipY;


				if (missileCounter > missileCounterLimit){
				//fire the missiles!
					if (pressedKeys[70]){
						var x = playerPosX;
						var y = playerPosY;
						var directionX = 0;
						var directionY = 0;

						
						//	(note: this is also the /speed/ of the ship)
						var shipTravelHyp = playerSpeed*2 + 3;
						//console.log("Missile speed: "+shipTravelHyp+"\nPlayer speed:"+playerSpeed);
						//we need to use radians instead of degrees for cosine and sine-_-
						var playerRads = playerDeg * (Math.PI / 180);

						
						directionX = (Math.sin(playerRads))*shipTravelHyp;
						directionY = -(Math.cos(playerRads))*shipTravelHyp;

						var newMissile = {x,y,directionX,directionY,missileSrc};
						//add an asteroid to the array
						missileArray.push(newMissile);

						missileCounter = 0;
					}
				}
				missileCounter++;

				//make sure the player stays on the page
				if (playerPosX > 640){
					playerPosX = 0;
				} else if (playerPosX < 0){
					playerPosX = 640;
				}
				if (playerPosY > 480){
					playerPosY = 0;
				} else if (playerPosY < 0){
					playerPosY = 480;
				}


				player_1.rotate(playerPosX, playerPosY, playerDeg);
			}


			if (!p2dead){
				if (pressedKeys[76]){
					player2Deg+=3;
					if (player2Deg>360){
						player2Deg=0;
					}
					//console.log(playerDeg);
				//if ship(#) is pressing right, rotate ship right
				} else if (pressedKeys[74]){
					player2Deg-=3;
					if (player2Deg<0){
						player2Deg=360;
					}
					//console.log(playerDeg);
				}
				//if ship(#) is pressing up, move ship forward
				if (pressedKeys[73]){

					//NEED TOTAL DISTANCE TO CALCULATE 
					//	(note: this is also the /speed/ of the ship)
					player2Speed = player2Speed + playerAcceleration;

					var shipTravelHyp = player2Speed;
					if (Math.abs(Math.floor(player2SpeedX+player2SpeedY)) > topSpeed){
						topSpeed = Math.abs(Math.floor(player2SpeedX+player2SpeedY));
						$('#top_speed_IG').text('Top speed: '+topSpeed+'AU/H');
						// <p id="points_earned_IG">Points: 0</p>
						// <p id="top_speed_IG">Top speed: 0AU/H</p>
					}

					// //we need to use radians instead of degrees for cosine and sine-_-
					var playerRads = player2Deg * (Math.PI / 180);

					player2SpeedX = player2SpeedX + (Math.sin(playerRads))*shipTravelHyp;
					player2SpeedY = player2SpeedY - (Math.cos(playerRads))*shipTravelHyp;
				}
				var moveShipX = player2SpeedX;
				var moveShipY = player2SpeedY;
							// //HOW MUCH TO INCREASE ON X AXIS
							// var moveShipX = (Math.sin(playerRads))*shipTravelHyp;
							// //console.log("Move ship X: " + moveShipX);

							// //HOW MUCH TO INCREASE ON Y AXIS (remember, Y is down)
							// var moveShipY = -(Math.cos(playerRads))*shipTravelHyp;
							// //console.log("Move ship Y: " + moveShipY);
							// //get that slidey space motion goin' on
				
				player2PosX += moveShipX;
				player2PosY += moveShipY;


				if (missileCounter2 > missileCounterLimit){
				//fire the missiles!
					if (pressedKeys[72]){
						var x = player2PosX;
						var y = player2PosY;
						var directionX = 0;
						var directionY = 0;

						
						//	(note: this is also the /speed/ of the ship)
						var shipTravelHyp = player2Speed*2 + 3;
						//console.log("Missile speed: "+shipTravelHyp+"\nPlayer speed:"+playerSpeed);
						//we need to use radians instead of degrees for cosine and sine-_-
						var playerRads = player2Deg * (Math.PI / 180);

						
						directionX = (Math.sin(playerRads))*shipTravelHyp;
						directionY = -(Math.cos(playerRads))*shipTravelHyp;

						var newMissile = {x,y,directionX,directionY,missileSrc};
						//add an asteroid to the array
						missileArray.push(newMissile);

						missileCounter2 = 0;
					}
				}
				missileCounter2++;

				//make sure the player stays on the page
				if (player2PosX > 640){
					player2PosX = 0;
				} else if (player2PosX < 0){
					player2PosX = 640;
				}
				if (player2PosY > 480){
					player2PosY = 0;
				} else if (player2PosY < 0){
					player2PosY = 480;
				}
				player_2.rotate(player2PosX, player2PosY, player2Deg);
			}
		}

		//Display asteroid(s)
			//check how much time has passed on the thingy
			asteroidCounter--;
			if (asteroidCounter <= 0){
				asteroidCounterLimit = 50 - asteroidCounterLimitDifficulty + Math.floor(Math.random()*25);
				//console.log("The counter lmt is set to: "+asteroidCounterLimit);
				if (asteroidCounterLimitDifficulty < 50){
					asteroidCounterLimitDifficulty +=2;
				}
				//console.log("Creating a new asteroid now!");
				//create an asteroid
				var x = 0;
				var y = 0;
				var directionX = 0;
				var directionY = 0;
				// give the array its source image
				///////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////
				
				///////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////
				///////////////////////////////////////////////////////////////

				//assign which wall asteroid will appear from
				var originWall = Math.floor(Math.random()*4);
				if (originWall === 0){
					//console.log("originate from top");
					x = Math.floor(Math.random()*640);
					y = -36;
					if (Math.random()>0.5){
						directionX = Math.floor(Math.random()*2+1);
					} else {
						directionX = -Math.floor(Math.random()*2+1);
					}
					directionY = Math.floor(Math.random()*2+1); //pos no.s go DOWN, RIGHT
				} else if (originWall === 1) {
					//console.log("originate from right");
					x = 640;
					y = Math.floor(Math.random()*480);
					directionX = -Math.floor(Math.random()*2+1);
					if (Math.random()>0.5){
						directionY = Math.floor(Math.random()*2+1);
					} else {
						directionY = -Math.floor(Math.random()*2+1);
					}
				} else if (originWall === 2) {
					//console.log("originate from bottom");
					x = Math.floor(Math.random()*640);
					y = 480;
					if (Math.random()>0.5){
						directionX = Math.floor(Math.random()*2+1);
					} else {
						directionX = -Math.floor(Math.random()*2+1);
					}
					directionY = -Math.floor(Math.random()*2+1);
				} else if (originWall === 3) {
					//console.log("originate from left");
					x = -36;
					y = Math.floor(Math.random()*480);
					directionX = Math.floor(Math.random()*2+1);
					if (Math.random()>0.5){
						directionY = Math.floor(Math.random()*2+1);
					} else {
						directionY = -Math.floor(Math.random()*2+1);
					}
				}


				var newAsteroid = {x,y,directionX,directionY,asteroidSrc};
				//add an asteroid to the array
				asteroidArray.push(newAsteroid);
				//reset the counter so we don't get an asteroid storm
				asteroidCounter = asteroidCounterLimit;
				//console.log(asteroidArray);
				//console.log(asteroidArray);
			}

			//manip and display exising asteroids
			for (i in asteroidArray){
				//move asteroids according to direction
				asteroidArray[i].x = asteroidArray[i].x + asteroidArray[i].directionX;
				asteroidArray[i].y = asteroidArray[i].y + asteroidArray[i].directionY;
				//if asteroids are off the screen, delete them from the array
					//!!!!!!!!!!!!!!!
				var oX = asteroidArray[i].x;
				var oY = asteroidArray[i].y;

					if ((asteroidArray[i].y < -36)&&(asteroidArray[i].directionY < 0)){//If too far up
						//asteroidArray.splice(i,1); 
					} else if ((asteroidArray[i].y > 480)&&(asteroidArray[i].directionY > 0)){//Too far down
						//asteroidArray.splice(i,1);
					} else if ((asteroidArray[i].x < -36 )&&(asteroidArray[i].directionX < 0)){//Too far left
						//asteroidArray.splice(i,1);
					} else if ((asteroidArray[i].x > 640)&&(asteroidArray[i].directionX > 640)){//Too far right
						//asteroidArray.splice(i,1);
					} else {
						//display all asteroids
						asteroidArray[i].asteroidSrc.draw(oX, oY, 36, 36);

					}

			}


			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			//For some reason this part of the source code was repeated.
			//Did I just CTRL+C, CTRL+V it? Weird... I wonder if it does anything...
			//I'll leave it commented just in case something weird happens...
			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////
			// for (i in missileArray){
			// 	//move missiles according to direction
			// 	missileArray[i].x = missileArray[i].x + missileArray[i].directionX;
			// 	missileArray[i].y = missileArray[i].y + missileArray[i].directionY;
			// 	//if missiles are off the screen, delete them from the array
			// 		//!!!!!!!!!!!!!!!


			// 	//display all missiles
			// 	var oX = missileArray[i].x;
			// 	var oY = missileArray[i].y;
			// 	missileArray[i].missileSrc.draw(oX, oY, 4, 4);
			// }

			//Tutorial stuff
				// image.draw(0,0,100,100);
				// image.draw(0,74,256,32);
				// pattern.draw(160,160,256,180);

				// image.rotate(115,160, angle += 4.0);
				// image2.rotate(115,260, -angle/2);
		
		//Display missile(s)
		for (i in missileArray){
			//move asteroids according to direction
			missileArray[i].x = missileArray[i].x + missileArray[i].directionX;
			missileArray[i].y = missileArray[i].y + missileArray[i].directionY;
			//if missiles are off the screen, delete them from the array
				//AND THE missiles ARE GOING IN THE RIGHT DIRECTION


			//display all asteroids
			var oX = missileArray[i].x;
			var oY = missileArray[i].y;
			missileArray[i].missileSrc.draw(oX, oY, 4, 4);
		}

		//how to handle different collisions
			//ship(#) w/ asteroid
			var plrX = Math.floor(playerPosX + 16);
			var plrY = Math.floor(playerPosY + 16);

			var plr2X = Math.floor(player2PosX + 16);
			var plr2Y = Math.floor(player2PosY + 16);

			for (i in asteroidArray){
				var astX;
				var astY;

				astX = Math.floor(asteroidArray[i].x) + 32; //get the center point of the asteroid
				astY = Math.floor(asteroidArray[i].y) + 32;
				if ((Math.abs(astX - plrX) < 32) && (Math.abs(astY - plrY) < 32)){
					
					// console.log("At time of explosion, the ship's position was "+plrX+","+plrY);
					// console.log("And the asteroid's position was "+astX+","+astY);
					// console.log("The distance between them was "+Math.abs(astX-plrX)+"x, "+Math.abs(astY-plrY)+"y");

					//Destroy player 1's ship
					p1dead = true;

					$('#explosion').css('z-index','1')
						.css('left',playerPosX - 16)
						.css('top',playerPosY - 16);

					//Destroy the asteroid
				}
				if ((Math.abs(astX - plr2X)<32)&&(Math.abs(astY - plr2Y) < 32)){
					p2dead = true;
					
					$('#explosion').css('z-index','1')
						.css('left',player2PosX - 16)
						.css('top',player2PosY - 16);

				}
			}
			//asteroid w/ missile
			var astX = 0;
			var astY = 0;
			var misX = 0;
			var mixY = 0;
			var spaceBtwnX = 100;
			var spaceBtwnY = 100;
			
			// console.log(asteroidArray[0].x);

			for (i in asteroidArray){
				for (z in missileArray){
					astX = asteroidArray[i].x + 16;
					astY = asteroidArray[i].y + 16;
					misX = missileArray[z].x + 4;
					mixY = missileArray[z].y + 4;

					spaceBtwnX = Math.abs(astX - misX);
					spaceBtwnY = Math.abs(astY - mixY);

					if ((spaceBtwnX < 20) && (spaceBtwnY < 20)){
						//console.log("Missile/Ast collision detected on X axis!");
						//make the asteroid blow up/disappear
						asteroidArray.splice(i,1);
						missileArray.splice(z,1);

						playerScore += 100;
						$('#points_earned_IG').text('Points: ' + playerScore);
						// <p id="points_earned_IG">Points: 0</p>
						// <p id="top_speed_IG">Top speed: 0AU/H</p>
					}

				}
			}

			//ship(#) w/ missile
		
		if (p1dead && p2dead) {
			dead = true;
		}
	}, 25);


});

$(document).keydown(function(e) {
	if (e.keyCode === 38){ //38 is the up arrow
		holdUp = true;
	}
	if (e.keyCode === 37){ //37 is the left arrow
		holdLeft = true;
	}
	if (e.keyCode === 39){ //39 is the right arrow
		holdRight = true;
	}
	if (e.keyCode === 32){
		holdSpace = true; //___ is the space bar
	}
});

$(document).keyup(function(e){
	if (e.keyCode === 38){ //38 is the up arrow
		holdUp = false;
	}
	if (e.keyCode === 37){ //37 is the left arrow
		holdLeft = false;
	}
	if (e.keyCode === 39){ //39 is the right arrow
		holdRight = false;
	}
	if (e.keyCode === 32){
		holdSpace = false;
	}
});