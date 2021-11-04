class Obstacle {
  constructor(ctx, posX, posY, width, height) {
    this.ctx = ctx
    this.posX = posX
    this.posY = posY
    this.width = width
    this.height = height
    this.init()
  }


  init() {
    this.image = new Image()
    this.image.src = './image/prohibido.png'
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

}