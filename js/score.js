class Score {
    constructor(ctx, posX, posY, width, heigth) {
      this.ctx = ctx

      this.posX = posX
      this.posY = posY
      
      this.width = width
      this.heigth = heigth
      
    }
    
    draw(scoreLeft, scoreRight) {
      this.ctx.fillStyle = '#2DC5FC'
      this.ctx.font = '90px Saira Condensed'
      this.ctx.fillText(scoreLeft, this.posX + (350 - this.posX), this.posY + 80)
      this.ctx.fillText(scoreRight, this.posX + (1125 - this.posX), this.posY + 80)
    }
  }