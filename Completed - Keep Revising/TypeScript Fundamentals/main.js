// Objects:
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Purple"] = 3] = "Purple";
})(Color || (Color = {}));
;
var backColor = Color.Green;
var object = 'message';
object.length;
var Point = /** @class */ (function () {
    function Point(a, b) {
        this.x = a;
        this.y = b;
    }
    Point.prototype.draw = function () {
    };
    Point.prototype.getDistance = function (secondPoint) {
        var a = secondPoint.x - this.x;
        var b = secondPoint.y - this.y;
        var squareResult = Math.pow(a, 2) + Math.pow(b, 2);
        return Math.sqrt(squareResult);
    };
    return Point;
}());
//Functions:
function log(message) {
    console.log(message);
}
function doSomething() {
    for (var i = 0; i < 5; ++i) {
        console.log(i);
    }
}
var secondLogger = function (message) {
    console.log(message);
};
var doLog = function (message) { return console.log(message); };
var doEmptyLog = function () { return console.log('Hello World'); };
var drawPoint = function (point) {
    console.log("x: " + point.x + ", y:" + point.y);
};
//Calls:
log('Hello');
doSomething();
var PointA = new Point(3, 40);
var PointB = new Point(6, 14);
console.log('Distance is :', PointA.getDistance(PointB).toFixed(4));
