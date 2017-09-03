// The game object
var game = {
    // Game attributes
    canvas: document.getElementById("gameCanvas3"),
    width: 800,
    height: 480,
    gameScreenX: 280,
    gameScreenWidth: 240,
    prevTime: performance.now(),
    initialized: false,
    elements: [],
    // Game methods
    initialize: function() {
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = this.canvas.getContext("2d")
        this.initialized = true
    },
    start: function(timestamp) {
        // Initialize the game only once
        if (!this.initialized) {
            this.initialize()
        }

        // Calculate time difference between this cycle and the previous cycle
        var diff = timestamp - this.prevTime
        this.prevTime = timestamp

        // Update the game
        this.update()

        // Render the game
        this.render()

        // Go to the next cycle
        window.requestAnimationFrame(this.start.bind(this))
    },
    update: function () {
        // Update every game element
        this.elements.forEach(function(element) {
            element.update()
        })
    },
    render: function() {
        // Render the game screen
        this.context.fillStyle = "#151515"
        this.context.fillRect(0, 0, this.width, this.height)
        this.context.fillStyle = "gainsboro"
        this.context.fillRect(this.gameScreenX, 0, this.gameScreenWidth, this.height)

        // Render every game element
        this.elements.forEach(function(element) {
            element.render()
        })
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
})

// Want to make something like this
//
// function main() {
//     var totem = Totem(800, 480, "totemGame")

//     totem.addObject(0, 0, 30, 30, "blue")

//     totem.start()
// }
