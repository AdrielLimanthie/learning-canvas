var game = {
    canvas : document.getElementById('gameCanvas1'),
    start : function() {
        this.canvas.width = 800
        this.canvas.height = 480
        this.context = this.canvas.getContext("2d")
    }
}

function character(context, width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

document.addEventListener("DOMContentLoaded", function(event) {
    game.start()
    var player = new character(game.context, 30, 30, 10, 10, "red")
})
