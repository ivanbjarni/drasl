// A generic constructor which accepts an arbitrary descriptor object
function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Player.prototype.halfWidth = 12;
Player.prototype.halfHeight = 12;
Player.prototype.speed = 4;
Player.prototype.velX = 0;
Player.prototype.velY = 0;

Player.prototype.update = function (du) {
    this.setVelocity(du);

    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = prevX + this.velX;
    var nextY = prevY + this.velY;

    var obs = entityManager.getObstacles();

    if(!this.collides(obs,nextX,this.cy))
    { this.cx=nextX; }
	if(!this.collides(obs,this.cx,nextY))
    { this.cy=nextY; }
};

Player.prototype.setVelocity = function(du)
{
	if(Math.abs(this.velX)<1){this.velX=0}else{this.velX *=0.85;}
	if(Math.abs(this.velY)<1){this.velY=0}else{this.velY *=0.85;}

	if (g_keys[this.GO_UP]) 
	 { this.velY = -this.speed * du; }
    if (g_keys[this.GO_DOWN]) 
     { this.velY = this.speed * du; }
    if (g_keys[this.GO_RIGHT]) 
     { this.velX = this.speed * du; }
    if (g_keys[this.GO_LEFT]) 
     { this.velX = -this.speed * du; }
}

Player.prototype.collides = function(array,nextX,nextY)
{
	for(var i=0; i<array.length;i++)
	{
		if(this.collidesWith(array[i],nextX,nextY))
			{return true;}
	}
	return false;
}

Player.prototype.collidesWith = function(obj,nextX,nextY)
{
	if( (Math.abs(nextX-obj.cx)<this.halfWidth+obj.halfWidth) &&
		(Math.abs(nextY-obj.cy)<this.halfHeight+obj.halfHeight) )
	{return true;}
	return false;
}

Player.prototype.render = function (ctx,offsetX,offsetY) {
	var rx = Math.floor(this.cx - offsetX)+0.5;
	var ry = Math.floor(this.cy - offsetY)+0.5;
	ctx.save();

	ctx.fillStyle= "#0055FF";
	ctx.strokeStyle = "001177";
    ctx.lineWidth = 3;

    ctx.fillRect(rx - this.halfWidth,
                 ry - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);

   

    ctx.strokeRect(rx - this.halfWidth,
                 ry - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);

    ctx.restore();
};

Player.prototype.getX = function()
{return this.cx;}
Player.prototype.getY = function()
{return this.cy;}