// The game object
var game = {
    canvas: document.getElementById("gameCanvas2"),
    start: function() {
        this.canvas.width = 800
        this.canvas.height = 480
        this.context = this.canvas.getContext("2d")
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

var player

function snake(context, hor, ver) {
    this.width = 10
    this.height = 10
    this.x = hor * 10
    this.y = ver * 10
    context.fillStyle = 'red'
    context.fillRect(this.x, this.y, this.width, this.height)
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
    player = new snake(game.context, 1, 1)
})
