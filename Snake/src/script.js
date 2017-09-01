// The game object
var game = {
    canvas: document.getElementById("gameCanvas2"),
    start: function() {
        this.canvas.width = 800
        this.canvas.height = 480
        this.context = this.canvas.getContext("2d")
        this.interval = setInterval(updateGame, 20)
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

var player

var prevTime = Date.now()

function snake(context, x, y) {
    this.width = 10
    this.height = 10
    this.x = x
    this.y = y
    // Direction - R = Right, L = Left, U = Up, D = Down
    this.direction = "R"
    this.update = function() {
        context.fillStyle = 'red'
        context.fillRect(this.x * 10, this.y * 10, this.width, this.height)
    }
    this.newPosition = function() {
        if (this.direction === "R") {
            this.x += 1
        } else if (this.direction === "L") {
            this.x -= 1
        } else if (this.direction === "U") {
            this.y += 1
        } else if (this.direction === "L") {
            this.y -= 1
        }
    }
}

function updateGame() {
    if (Date.now() - prevTime >= 500) {
        prevTime += 500
        game.clear()
        player.newPosition()
        player.update()
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
    player = new snake(game.context, 1, 1)
})
