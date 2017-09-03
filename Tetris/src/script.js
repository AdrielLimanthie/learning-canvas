const blockTypes = [
    {
        color: "red",
        shape: [                                                                // []
            [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],   // []
            [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }]    // []
        ]                                                                       // []
    },
    {
        color: "blue",
        shape: [                                                                // [][]
            [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }]    // [][]
        ]
    },
    {
        color: "yellow",
        shape: [
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }],   // [][]
            [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 3 }]    //   [][]
        ]
    },
    {
        color: "orange",
        shape: [
            [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],   //   [][]
            [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 3 }]    // [][]
        ]
    },
    {
        color: "green",
        shape: [
            [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],   //   []
            [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }],   // [][][]
            [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 3 }],
            [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
        ]
    },
    {
        color: "purple",
        shape: [
            [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 3 }],   // [][][]
            [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 3 }],   //     []
            [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
            [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]
        ]
    },
    {
        color: "pink",
        shape: [
            [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 1, y: 3 }],   // [][][]
            [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }],   // []
            [{ x: 3, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
            [{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 3 }]
        ]
    }
]

// The game object
var game = {
    // Game attributes
    canvas: document.getElementById("gameCanvas3"),
    width: 800,
    height: 480,
    gameScreenX: 280,
    gameScreenWidth: 240,
    prevTime: 0,
    cellSize: 24,
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
        var diff
        if (this.prevTime) {
            diff = timestamp - this.prevTime
            this.prevTime = timestamp
        } else {
            diff = 0
            this.prevTime = performance.now()
        }

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
            element.render(this.gameScreenX, 0, this.cellSize)
        }.bind(this))
    },
    add: function(element) {
        this.elements.push(element)
    }
}

function Block(context, x, y, type) {
    // Block attributes
    this.context = context
    this.x = x
    this.y = y
    this.variant = 0

    // Get other attributes of the block
    this.color = blockTypes[type].color
    this.shape = blockTypes[type].shape
    this.width = this.shape[this.variant].reduce(function(a, b) {
        if (b.x > a.x) { return b }
        else { return a }
    }, { x: 0, y: 0 }).x
    this.height = this.shape[this.variant].reduce(function(a, b) {
        if (b.y > a.y) { return b }
        else { return a }
    }, { x: 0, y: 0 }).y

    // Block methods
    this.update = function() {

    }.bind(this)
    this.render = function(xStart, yStart, size) {
        this.context.fillStyle = this.color
        this.context.strokeStyle = "white"
        this.shape[this.variant].forEach(function(cell) {
            var xRender = xStart + (cell.x - 1 + this.x) * size
            var yRender = yStart + (cell.y - 1 + this.y) * size
            this.context.fillRect(xRender, yRender, size, size, this.color)
            this.context.strokeRect(xRender, yRender, size, size)
        }.bind(this))
    }.bind(this)

    return this
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start(performance.now())

    var stickBlock = new Block(game.context, 0, 0, 0)
    game.add(stickBlock)
})

// Want to make something like this
//
// function main() {
//     var totem = Totem(800, 480, "totemGame")

//     totem.addObject(0, 0, 30, 30, "blue")

//     totem.start()
// }
