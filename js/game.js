const game = {
  name: 'Pong Game',
  description: 'Canvas app fro basic shapes drawing',
  version: '1.0.0',
  author: 'Guido y Analía',
  license: undefined,
  repository: undefined,
  ctx: undefined,
  canvasDOM: undefined,
  canvasSize: { width: undefined, height: undefined },
  lineHeight: 120,
  lineWidth: 15,
  height: 800,
  width: 1500,
  leftPosX: 80,
  leftPos: 340,
  rightPosX: 1500 - 80 - 15,
  rightPos: 340,
  score: undefined,
  scorePlayerLeft: 0,
  scorePlayerRight: 0,
  collidedRight: false,
  collidedLeft: false,
  collidedObsRight: false,
  collidedObsLeft: false,
  collidedObstacle: false,
  FPS: 80,
  framesCounter: 0,
  secondsCounter: 0,
  obstacleWidth: 100,
  obstableHeigt: 100,
  ballWidth: 40,
  ballHeight: 40,
  intervalId: 0,
  countdown: 3,



  init() {
    this.setContext()
    this.setListeners()
    this.createAll()
    this.start()
  },



  setContext() {
    this.canvasDOM = document.querySelector('#myCanvas')
    this.ctx = this.canvasDOM.getContext("2d")
  },



  start() {
    this.intervalId = setInterval(() => {        
      
      this.clearScreen()

      if (this.framesCounter !== 0 && this.framesCounter % this.FPS === 0) {
        this.countdown--;
      }

      this.drawCountdown()

      if(this.countdown <= 0) {        
        clearInterval(this.intervalId);

        this.intervalId = setInterval(() => {
          if(this.scorePlayerRight === 10) {
            this.gameOver(0)
          }
          if(this.scorePlayerLeft === 10) {
            this.gameOver(1)
          }
          
          this.clearScreen()
          if (this.framesCounter !== 0 && this.framesCounter % (this.FPS * 1) === 0) {
            this.createObstacle();
          }
          this.moveAll()
          this.detectCollision()
          this.drawAll()

          
          this.framesCounter++
        }, 1000 / this.FPS)
      }

      this.framesCounter++
    }, 1000 / this.FPS)
  },



  drawCountdown() {
    this.ctx.font = "100px Saira Condensed";
    this.ctx.fillText(this.countdown, this.width / 2, this.height / 2, 50);
  },
  drawAll() {
    this.drawTheLines()
    this.drawTheLineLeft()
    this.drawTheLineRigh()
    this.ball.draw()
    this.drawScore()
    this.drawObstacle()
  },
  drawTheLines() {
    this.ctx.lineWidth = 7
    this.ctx.strokeStyle = 'white'
    this.ctx.beginPath()
    this.ctx.setLineDash([10, 10])
    this.ctx.moveTo(750, 0)
    this.ctx.lineTo(750, 800)
    this.ctx.stroke()
  },

  drawTheLineLeft() {
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.leftPosX, this.leftPos, this.lineWidth, this.lineHeight)
  },

  drawTheLineRigh() {
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.rightPosX, this.rightPos, this.lineWidth, this.lineHeight)
  },

  drawScore() {
    this.score.draw(this.scorePlayerRight, this.scorePlayerLeft)
  },

  drawObstacle() {
    this.obstacle && this.obstacle.draw()
  },



  setListeners() {
      document.onkeydown = e => {
      e.key === 'ArrowUp' ? this.arrowUpPressed = true : null
      e.key === 'ArrowDown' ? this.arrowUDownPressed = true : null
      e.key === 'w' ? this.wKeyPressed = true : null
      e.key === 's' ? this.sKeyPressed = true : null
    }
    document.onkeyup = e => {
      e.key === 'ArrowUp' ? this.arrowUpPressed = false : null
      e.key === 'ArrowDown' ? this.arrowUDownPressed = false : null
      e.key === 'w' ? this.wKeyPressed = false : null
      e.key === 's' ? this.sKeyPressed = false : null
    }
  },


  moveAll() {

    this.arrowUpPressed ? this.moveRightUp() : null
    this.arrowUDownPressed ? this.moveRightDown() : null
    this.wKeyPressed ? this.moveLeftUp() : null
    this.sKeyPressed ? this.moveLeftDown() : null

    this.ball.moveUpwards()
    if (this.ball.posY < 0 || this.ball.posY > this.height) {
      this.collidedObstacle = false;
    }
    this.ball.movesIdeways()
  },

  moveLeftUp() {
    let newPos = this.leftPos - 20;
    this.leftPos = (newPos < 0) ? 0 : newPos;
  },

  moveLeftDown() {
    let newPos = this.leftPos + 20;
    this.leftPos = (newPos + this.lineHeight > this.height) ? this.height - this.lineHeight: newPos;
  },

  moveRightUp() {
    let newPos = this.rightPos - 20;
    this.rightPos = (newPos < 0) ? 0 : newPos;
  },

  moveRightDown() {
    let newPos = this.rightPos + 20;
    this.rightPos = (newPos + this.lineHeight > this.height) ? this.height - this.lineHeight : newPos;
  },

  createAll() {
    this.createBall()
    this.createScore()
  },

  createBall() {
    this.ball = new Ball(this.ctx, this.width / 2, this.height, this.ballWidth, this.ballHeight, 11)
  },

  createScore() {
    this.score = new Score(this.ctx, 40, 40)
  },

  createObstacle() {
    let obstacleWidth = 100
    let obstacleHeight = 100
    let obstacleX = Math.floor(Math.random() * (this.rightPosX - obstacleWidth - 400)) + 200;
    let obstacleY = Math.floor(Math.random() * ((this.height - obstacleHeight - 200) - 200 ) + 200)
    this.collidedObstacle = false;
    this.obstacle = new Obstacle(this.ctx, obstacleX, obstacleY, obstacleWidth, obstacleHeight)
  },

  detectCollision() {
    if (this.ball.goalRight) {
      this.createBall()
      this.scorePlayerLeft++
      this.collidedRight = false;
      this.collidedLeft = false;
    } else if (this.ball.goalLeft) {
      this.createBall()
      this.ball.turnSideways()
      this.scorePlayerRight++

      this.collidedRight = false;
      this.collidedLeft = false;
    }
    if (this.ball.posX + this.ball.width > this.rightPosX &&
      this.ball.posY < this.rightPos + this.lineHeight &&
      this.ball.posY + this.ball.height > this.rightPos &&
      this.ball.posX < this.rightPosX + this.lineWidth &&
      !this.collidedRight) {
      this.ball.turnSideways();
      this.collidedRight = true;
      this.collidedLeft = false;
    }

    if (this.ball.posX + this.ball.width > this.leftPosX &&
      this.ball.posY < this.leftPos + this.lineHeight &&
      this.ball.posY + this.ball.height > this.leftPos &&
      this.ball.posX < this.leftPosX + this.lineWidth &&
      !this.collidedLeft) {
      this.ball.turnSideways()
      this.collidedRight = false;
      this.collidedLeft = true;
    }
  
    if (this.obstacle) {
      if (this.ball.posX < this.obstacle.posX + this.obstacle.width &&
        this.ball.posX + this.ball.width > this.obstacle.posX &&
        this.ball.posY < this.obstacle.posY + this.obstacle.height &&
        this.ball.height + this.ball.posY > this.obstacle.posY) {
         if(this.collidedObsLeft && this.ball.posX < this.obstacle.posX){
           this.ball.turnSideways()
           this.collidedObsRight = true
           this.collidedObsLeft = false
          }

         if(this.collidedObsRight && this.ball.posX + this.ball.width > this.obstacle.posX + this.ball.width){
           this.ball.turnSideways()
           this.collidedObsRight = false
           this.collidedObsLeft = true
          }

          if(!this.collidedObstacle && this.ball.posY < this.obstacle.posY){
            this.ball.turnUpwards()
            this.collidedObstacle = true
          }
          
          if(!this.collidedObstacle && this.ball.posY + this.ball.height > this.obstacle.posY + this.ball.height){
            this.ball.turnUpwards()
            this.collidedObstacle = true
           }
      }
    }
  },



  clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  gameOver(winner) {
    clearInterval(this.intervalId)

    console.log(winner)
    
    if(winner === 1) {
      let winLeft = document.querySelector('.right')
      winLeft.style.display = 'block';
    } else if(winner === 0) {
      let winRight = document.querySelector('.left')
      winRight.style.display = 'block'; 
    }
  }


}