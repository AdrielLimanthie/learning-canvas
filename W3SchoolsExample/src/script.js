var game = {
    canvas : document.getElementById('gameCanvas1'),
    start : function() {
        this.canvas.width = 800
        this.canvas.height = 480
        this.context = this.canvas.getContext("2d")
        this.interval = setInterval(updateGame, 20)

        // Event listeners for keyboard arrows
        document.addEventListener('keydown', function (e) {
            game.keys = (game.keys || {})
            game.keys[e.keyCode] = true
        })
        window.addEventListener('keyup', function (e) {
            if (game.keys[e.keyCode]) {
                delete game.keys[e.keyCode]
            }
        })

        // Event listeners for on-screen controls
        this.canvas.addEventListener('mousedown', function (e) {
            game.x = e.pageX - this.canvas.offsetLeft
            game.y = e.pageY - this.canvas.offsetTop
        }.bind(this))
        this.canvas.addEventListener('mouseup', function (e) {
            game.x = false
            game.y = false
        }.bind(this))
        this.canvas.addEventListener('touchstart', function (e) {
            game.x = e.pageX - this.canvas.offsetLeft
            game.y = e.pageY - this.canvas.offsetTop
        }.bind(this))
        this.canvas.addEventListener('touchend', function (e) {
            game.x = false
            game.y = false
        }.bind(this))
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    keys: {}
}

var player
var myUpBtn
var myDownBtn
var myLeftBtn
var myRightBtn

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
    this.clicked = function() {
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var clicked = true
        if ((mybottom < game.y) || (mytop > game.y)
         || (myright < game.x) || (myleft > game.x)) {
            clicked = false
        }
        return clicked
    }
}

function updateGame() {
    game.clear()
    player.speedX = 0
    player.speedY = 0
    if (game.x && game.y) {
        if (myUpBtn.clicked()) {
            player.moveUp()
        }
        if (myDownBtn.clicked()) {
            player.moveDown()
        }
        if (myLeftBtn.clicked()) {
            player.moveLeft()
        }
        if (myRightBtn.clicked()) {
            player.moveRight()
        }
    } else {
        if (game.keys && game.keys[37]) { player.moveLeft() }
        if (game.keys && game.keys[39]) { player.moveRight() }
        if (game.keys && game.keys[38]) { player.moveUp() }
        if (game.keys && game.keys[40]) { player.moveDown() }
    }
    player.newPos()
    player.update()
    myUpBtn.update()
    myDownBtn.update()
    myLeftBtn.update()
    myRightBtn.update()
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
    player = new character(game.context, 30, 30, 100, 100, "red")
    myUpBtn = new character(game.context, 30, 30, 50, 10, "blue")
    myDownBtn = new character(game.context, 30, 30, 50, 70, "blue")
    myLeftBtn = new character(game.context, 30, 30, 20, 40, "blue")
    myRightBtn = new character(game.context, 30, 30, 80, 40, "blue")
})
