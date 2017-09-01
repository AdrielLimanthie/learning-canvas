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
    speed: 100,
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

        // Add event listener for losing/gaining focus on the page
        window.addEventListener("focus", function(e) {
            this.prevTime = Date.now()
            this.interval = setInterval(this.update.bind(this), 20)
        }.bind(this))
        window.addEventListener("blur", function(e) {
            clearInterval(this.interval)
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
            var moveResult
            if (this.player.move && this.player.update) {
                moveResult = this.player.move(this.width / 10, this.height / 10, this.food.x, this.food.y)
                this.player.update()
            }

            if (moveResult === 1) {
                // Generate new food in a random location
                this.food.x = Math.floor(Math.random() * this.width / 10)
                this.food.y = Math.floor(Math.random() * this.height / 10)

                // Add the length of the snake
                this.player.body.push({})

                // Increment score
                this.score += 1
            } else if (moveResult === 3) {
                // Stop the game
                clearInterval(this.interval)
                alert("You lose, please reload to try again.")
                window.location.reload()
            }

            // Update the food
            if (this.food.update) {
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

        // 1 = food eaten, 2 = food not eaten, 3 = game over
        head = this.body[0]
        var isSuicide = false
        for (var i = 1; i < this.body.length; i++) {
            var node = this.body[i]
            if (node.x === head.x && node.y === head.y) {
                isSuicide = true
            }
        }
        if (isSuicide) {
            return 3
        } else {
            if (head.x === foodX && head.y === foodY) {
                return 1
            } else {
                return 2
            }
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
