
// Objects:
import { Point, point } from './point';

enum Color { Red, Green, Blue, Purple };
let backColor = Color.Green;
let object = 'message';
(object as string).length;
//Functions:

function log(message) {
    console.log(message);
}

function doSomething() {
    for (let i = 0; i < 5; ++i) {
        console.log(i);
    }
}

let secondLogger = function (message) {
    console.log(message);
}

let doLog = (message) => console.log(message);
let doEmptyLog = () => console.log('Hello World');

let drawPoint = (point: point) => {
    console.log(`x: ${point.x}, y:${point.y}`);
}

//Calls:

log('Hello');
doSomething();
let PointA: Point = new Point(3, 40);
let PointB: Point = new Point(6, 14);
let PointC: Point = new Point();

console.log('Distance is :', PointA.getDistance(PointB).toFixed(4));





