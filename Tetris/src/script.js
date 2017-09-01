// The game object
var game = {
    // Game attributes
    canvas: document.getElementById("gameCanvas3"),
    width: 800,
    height: 480,
    gameScreenX: 280,
    gameScreenWidth: 240,
    // Game methods
    start: function() {
        this.canvas.width = this.width,
        this.canvas.height = this.height
        this.context = this.canvas.getContext("2d")

        window.setInterval(this.update.bind(this), 20)
    },
    update: function() {
        // Render the game screen
        this.context.fillStyle = "#151515"
        this.context.fillRect(0, 0, this.width, this.height)
        this.context.fillStyle = "gainsboro"
        this.context.fillRect(this.gameScreenX, 0, this.gameScreenWidth, this.height)
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
})
