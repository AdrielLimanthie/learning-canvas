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
    height: 400,
    otherHeight: 80,
    prevTime: Date.now(),
    speed: 200,
    score: 0,
    key: null,
    player: {},
    food: {},
    scoreText: {},
    // Game methods
    start: function() {
        this.canvas.width = this.width
        this.canvas.height = this.height + this.otherHeight
        this.context = this.canvas.getContext("2d")
        this.player = new snake(this.context, 5, 5)
        this.food = new food(this.context, 30, 5)
        this.scoreText = new score(this.context, 20, this.height + this.otherHeight - 30, this.score)

        this.interval = setInterval(this.update.bind(this), 20)
        document.addEventListener("keydown", function(e) {
            var key = e.keyCode
            if (key === KEY_LEFT || key === KEY_UP || key === KEY_RIGHT || key === KEY_DOWN) {
                // prevent 180 degree turn
                if (Math.abs(this.player.direction - key) !== 2) {
                    this.key = key
                }
            }
        }.bind(this))
    },
    clear: function() {
        this.context.clearRect(0, 0, this.width, this.height)
    },
    update: function() {
        if (Date.now() - this.prevTime >= this.speed) {
            this.prevTime += this.speed
            this.clear()

            // Render menu area
            this.context.fillStyle = "darkseagreen"
            this.context.fillRect(0, this.height, this.width, this.otherHeight)

            // Update the direction
            if (this.key) {
                this.player.direction = this.key
                this.key = null
            }

            // Update the snake
            var foodEaten
            if (this.player.move && this.player.update) {
                foodEaten = this.player.move(this.width / 10, this.height / 10, this.food.x, this.food.y)
                this.player.update()
            }

            // Update the food
            if (this.food.update) {
                if (foodEaten) {
                    this.food.x = Math.floor(Math.random() * this.width / 10)
                    this.food.y = Math.floor(Math.random() * this.height / 10)
                    this.player.body.push({})
                    this.score += 1
                }
                this.food.update()
            }

            // Update the score
            if (this.scoreText.update) {
                this.scoreText.score = this.score
                this.scoreText.update()
            }
        }
    }
}

function snake(context, x, y) {
    this.width = 10
    this.height = 10
    this.body = [
        { x: x, y: y},
        { x: x - 1, y: y},
        { x: x - 2, y: y}
    ]
    // Direction - R = Right, L = Left, U = Up, D = Down
    this.direction = KEY_RIGHT

    this.update = function() {
        context.fillStyle = 'red'
        this.body.forEach(function(node) {
            context.fillRect(node.x * 10, node.y * 10, this.width, this.height)
        }.bind(this))
    }
    // This move method will return true if the head of the snake eats the food,
    // and false if it doesn't
    this.move = function(maxX, maxY, foodX, foodY) {
        this.body.pop()
        var head = this.body[0]
        if (this.direction === KEY_RIGHT) {
            if (head.x + 1 < maxX) {
                this.body.unshift({ x: head.x + 1, y: head.y })
            } else {
                this.body.unshift({ x: head.x + 1 - maxX, y: head.y })
            }
        } else if (this.direction === KEY_LEFT) {
            if (head.x - 1 >= 0) {
                this.body.unshift({ x: head.x - 1, y: head.y })
            } else {
                this.body.unshift({ x: head.x - 1 + maxX, y: head.y })
            }
        } else if (this.direction === KEY_DOWN) {
            if (head.y + 1 < maxY) {
                this.body.unshift({ x: head.x, y: head.y + 1 })
            } else {
                this.body.unshift({ x: head.x, y: head.y + 1 - maxY })
            }
        } else if (this.direction === KEY_UP) {
            if (head.y - 1 >= 0) {
                this.body.unshift({ x: head.x, y: head.y - 1 })
            } else {
                this.body.unshift({ x: head.x, y: head.y - 1 + maxY })
            }
        }

        if (this.body[0].x === foodX && this.body[0].y === foodY) {
            return true
        } else {
            return false
        }
    }
}

function food(context, x, y) {
    this.width = 10
    this.height = 10
    this.x = x
    this.y = y

    this.update = function() {
        context.fillStyle = 'white'
        context.fillRect(this.x * 10, this.y * 10, this.width, this.height)
    }
}

function score(context, x, y, score) {
    this.score = score

    this.update = function() {
        context.font = "32px sans-serif"
        context.strokeStyle = 'gray'
        context.strokeText("Score: " + this.score, x, y)
        context.fillStyle = 'white'
        context.fillText("Score: " + this.score, x, y)
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
})
