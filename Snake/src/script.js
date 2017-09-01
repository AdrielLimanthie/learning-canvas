// Constants
var KEY_LEFT = 37
var KEY_UP = 38
var KEY_RIGHT = 39
var KEY_DOWN = 40

// The game object
var game = {
    // Game attributes
    canvas: document.getElementById("gameCanvas2"),
    width: 800,
    height: 480,
    prevTime: Date.now(),
    speed: 500,
    player: {},
    key: null,
    // Game methods
    start: function() {
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = this.canvas.getContext("2d")

        this.interval = setInterval(this.update.bind(this), 20)
        document.addEventListener("keydown", function(e) {
            var key = e.keyCode
            if (key === KEY_LEFT || key === KEY_UP || key === KEY_RIGHT || key === KEY_DOWN) {
                game.key = key
            }
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    update: function() {
        if (Date.now() - this.prevTime >= this.speed) {
            this.prevTime += this.speed
            if (this.key) {
                this.player.direction = this.key
                this.key = null
            }

            if (this.player.newPosition && this.player.update) {
                this.clear()
                this.player.newPosition(this.width / 10, this.height / 10)
                this.player.update()
            }
        }
    }
}

function snake(context, x, y) {
    this.width = 10
    this.height = 10
    this.x = x
    this.y = y
    // Direction - R = Right, L = Left, U = Up, D = Down
    this.direction = KEY_RIGHT

    this.update = function() {
        context.fillStyle = 'red'
        context.fillRect(this.x * 10, this.y * 10, this.width, this.height)
    }
    this.newPosition = function(maxX, maxY) {
        if (this.direction === KEY_RIGHT) {
            if (this.x + 1 < maxX) {
                this.x += 1
            } else {
                this.x = this.x + 1 - maxX
            }
        } else if (this.direction === KEY_LEFT) {
            if (this.x - 1 >= 0) {
                this.x -= 1
            } else {
                this.x = this.x - 1 + maxX
            }
        } else if (this.direction === KEY_DOWN) {
            if (this.y + 1 < maxY) {
                this.y += 1
            } else {
                this.y = this.y + 1 - maxY
            }
        } else if (this.direction === KEY_UP) {
            if (this.y - 1 >= 0) {
                this.y -= 1
            } else {
                this.y = this.y - 1 + maxY
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Player has to be instantiated after starting the game
    // Otherwise, it will break the game
    game.start()
    game.player = new snake(game.context, 1, 1)
})
