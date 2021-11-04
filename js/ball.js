class Ball {
  constructor(ctx, posX, posY, width, height, speed) {
    this.ctx = ctx
    this.posX = posX
    this.posY = Math.floor(Math.random() * posY)
    this.width = width
    this.height = height
    this.speed = speed
    this.speedX = Math.floor(Math.random() * (speed * 1.2 - speed/2) + speed/2)
    this.speedY = speed / 2
    this.image = undefined
    this.goalLeft = false
    this.goalRight = false
    this.init()
  }
  init() {
    this.image = new Image()
    this.image.src = './image/ironhack.png'
  }

  draw() {
    this.ctx.drawImage(this.image, 100, 100, 200, 200, this.posX, this.posY, this.width, this.height)
  }

  moveUpwards() {
    if (this.posY < 0 || this.posY > game.height) {
      this.turnUpwards()
    }
    this.posY += this.speedY
  }

  movesIdeways(){
    if (this.posX < 0) {
      this.goalRight = true
    }
    if (this.posX > game.width - this.width) {
      this.goalLeft = true
    }
    this.posX += this.speedX
  }

  turnUpwards() {
    this.speedY = this.speedY * -1
  }

  turnSideways() {
    this.speedX += 1.1
    this.speedX = this.speedX * -1
  }
}