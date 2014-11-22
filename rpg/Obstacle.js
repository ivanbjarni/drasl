// A generic constructor which accepts an arbitrary descriptor object
function Obstacle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Obstacle.prototype.halfWidth = 12;
Obstacle.prototype.halfHeight = 12;
Obstacle.prototype.color = "black";

Obstacle.prototype.update = function (du) {
    return "obs";
};

Obstacle.prototype.render = function (ctx,offsetX,offsetY) {
    var rx = Math.floor(this.cx - offsetX);
    var ry = Math.floor(this.cy - offsetY);

    ctx.fillStyle=this.color;

    ctx.fillRect(rx - this.halfWidth,
                 ry - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
};

Obstacle.prototype.getX = function()
{return this.cx;}
Obstacle.prototype.getY = function()
{return this.cy;}