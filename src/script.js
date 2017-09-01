var game = {
    canvas : document.getElementById('gameCanvas1'),
    start : function() {
        this.canvas.width = 800
        this.canvas.height = 480
        this.context = this.canvas.getContext("2d")
        this.interval = setInterval(updateGame, 20)
        document.addEventListener('keydown', function (e) {
            game.key = e.keyCode
            game.keys = (game.keys || [])
            game.keys[e.keyCode] = true
        })
        window.addEventListener('keyup', function (e) {
            if (game.keys[e.keyCode]) {
                game.keys[e.keyCode] = false
            }
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

var player

function character(context, width, height, x, y, color) {
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.update = function() {
        context.fillStyle = color
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.moveUp = function() {
        this.speedY -= 1
    }
    this.moveDown = function() {
        this.speedY += 1
    }
    this.moveLeft = function() {
        this.speedX -= 1
    }
    this.moveRight = function() {
        this.speedX += 1
    }
}

function updateGame() {
    game.clear()
    player.speedX = 0
    player.speedY = 0
    if (game.keys && game.keys[37]) { player.moveLeft() }
    if (game.keys && game.keys[39]) { player.moveRight() }
    if (game.keys && game.keys[38]) { player.moveUp() }
    if (game.keys && game.keys[40]) { player.moveDown() }
    player.newPos()
    player.update()
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
    player = new character(game.context, 30, 30, 10, 10, "red")
})
