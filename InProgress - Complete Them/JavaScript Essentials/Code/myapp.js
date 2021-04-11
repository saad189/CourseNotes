//console.log( this );

var object = {
    prop: this,
    embed:
    {
        method: function () { return this; }
    }
};

var array = [
    this,
    function () { return this; }
];

function global() {
    return this;
}

// Normal invokation
global();
object.embed.method();
array[1]();

// Assign context
global.call(object);
object.embed.method.call(object);
array[1].call(object);

// New context
new global();
new object.embed.method(object);
new array[1]();

function Apple(x, y, color, score) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.score = score;
}


Apple.prototype = {
    // eat() { return "eating the apple" },
    eat() {return this},
    throw(){ return "throwing the apple" }
}

var first_apple = new Apple(10, 5, 'yellow', 5);
var second_apple = new Apple(10, 5, 'red', 5);
var third_apple = new Apple(10, 5, 'blue', 5);
console.log('First Apple:', first_apple);

