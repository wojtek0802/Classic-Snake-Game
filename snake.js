var snake;
var scl = 40;
var food;
var gameOn = false;
var buttonStart;
var buttonReset;


function setup()
{
	let myCanvas = createCanvas(800,480);
	myCanvas.parent('board');
	snake = new Snake();
	frameRate(10);
	food = new Food();	

	buttonStart = createButton('rozpocznij grę');
	buttonStart.center();
	buttonStart.mousePressed(startGame);

	
}

function draw()
{
	if(gameOn)
		{
		background(50);
		snake.display();
		fill('white');
		rect(food.x, food.y, scl, scl);
		
		snake.move();
		fill('white`1');
		textSize(20);
		textStyle(BOLD);
		text('Aktualny wynik: ' + snake.tailLength,5,20);
		if(snake.checkIfDead())
		{
			gameOn = false;
			
			buttonReset = createButton('spróbuj jeszcze raz');
			buttonReset.center();
			buttonReset.mousePressed(resetGame);
			fill(0, 102, 153);
			textSize(40);
			textStyle(BOLD);
			text('PRZEGRAŁEŚ! Twój wynik to: ' + snake.tailLength,120,110);

		}
		snake.eatFood();			
		}
}

function startGame()
{
	gameOn = true;
	buttonStart.hide();	
}

function resetGame()
{
	snake = new Snake();
	food = new Food();
	gameOn = true;
	buttonReset.hide();
}

class Snake
{
	constructor()
	{
		this.x = scl;
		this.y = scl;
		this.xSpeed = 1;
		this.ySpeed = 0;
		this.currentDir = 'right';
		this.tail = [];
		this.tailLength = 1;
		this.tail[0] = createVector(this.x, this.y);

		
	}
	

	display()
	{
		fill('red');
		rect(this.x, this.y, scl, scl);
		for(var i=0; i<this.tailLength; i++)
		{
			fill('red');
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		noFill();
	}


	move()
	{
			for(var i = 0; i<this.tailLength; i++)
			{
				this.tail[i] = this.tail[i + 1];
			}


			
  			this.x = this.x+this.xSpeed*scl;
			this.y = this.y+this.ySpeed*scl;				
			this.x = constrain(this.x, 0, width - scl);
			this.y = constrain(this.y, 0, height - scl);

			this.tail[this.tailLength - 1] = createVector(this.x, this.y);
	}

	eatFood()
	{
		if(dist(this.x, this.y, food.x, food.y) == 0)
		{
			food = new Food();
			this.tailLength++;
			this.tail[this.tailLength - 1] = createVector(this.x, this.y);
			

		}
	}

	checkIfDead()
	{
		var isDead = false;
		for(var i=0; i<this.tail.length - 1 ;i++)	
		{
			if(dist(this.tail[this.tailLength -1].x, this.tail[this.tailLength -1].y,
				this.tail[i].x, this.tail[i].y)==0)
			{
				isDead = true;
			}
		}	
		return isDead;
	}

	turn(dir)
	{
		switch(dir)
		{
			case 'down':
				if(this.currentDir != 'up')
				{
					this.xSpeed = 0;
					this.ySpeed = 1;
					this.currentDir = 'down';
				}
				break;
			case 'up':
				if(this.currentDir != 'down')
				{
					this.xSpeed = 0;
					this.ySpeed = -1;
					this.currentDir = 'up';
					
				}
				break;
			case 'left':
				if(this.currentDir != 'right')
				{
					this.xSpeed = -1;
					this.ySpeed = 0;
					this.currentDir = 'left';
					
				}
				break;
			case 'right':
				if(this.currentDir != 'left')
				{
					this.xSpeed = 1;
					this.ySpeed = 0;
					this.currentDir = 'right';
					
				}
				break;
			default: break;				
		}
	}

}

function keyPressed()
{
	if(keyCode === DOWN_ARROW)
	{
		snake.turn('down')
	}
	if(keyCode === UP_ARROW)
	{
		snake.turn('up')
	}
	if(keyCode === LEFT_ARROW)
	{
		snake.turn('left')
	}
	if(keyCode === RIGHT_ARROW)
	{
		snake.turn('right')
	}
}


class Food
{
	constructor()
	{
		this.x = floor(random((width/scl))) * scl;
		this.y = floor(random((height/scl)))* scl;
	}

}
