


export interface point {
    x: number;
    y: number;
    draw: () => void;
}

export class Point {

    // private x: number;
    // private y: number;
    // constructor(a?: number, b?: number) {
    //     this.x = a;
    //     this.y = b;
    // }
    constructor(private x?: number, private y?: number) { }
    draw() {
        console.log(`x: ${this.x}, y:${this.y}`);
    }
    getDistance(secondPoint: Point): number {
        let a = secondPoint.x - this.x;
        let b = secondPoint.y - this.y;
        let squareResult = Math.pow(a, 2) + Math.pow(b, 2);
        return Math.sqrt(squareResult);
    }

    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }
    set X(value) {
        this.x = value;
    }
    set Y(value) {
        this.y = value;
    }
}
