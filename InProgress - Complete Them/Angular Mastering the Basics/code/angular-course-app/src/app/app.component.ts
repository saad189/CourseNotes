import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-course-app';
  ngOnInit(): void {
    // console.log(this.numberToAccountString(undefined));
    // console.log(this.checkEquilibrium(3, [[3, -1, 7], [-5, 2, -4], [2, -1, -3]]));
    // console.log(this.checkPairs(9, 3));
    // console.log(this.checkPairs(14, 28));
    // console.log(this.checkPairs(4, 20));
    console.log('Adding Digits:', this.addingDigits(5, 4, 5));
    console.log('Adding Digits:', this.addingDigits(12, 11, 1));
    console.log('Adding Digits:', this.addingDigits(260, 150, 10));
  }
  checkEquilibrium(n: number, vectors: number[][]) {
    const lengthValue = 3;
    for (let dimension = 0; dimension < lengthValue; ++dimension) {
      let axisSum = 0;
      for (let index = 0; index < n; ++index) {
        axisSum += vectors[index][dimension];
      }
      if (axisSum !== 0) {
        return 'NO';
      }
    }

    return 'YES';
  }

  checkPairs(n: number, m: number): number {
    let pairCount = 0;
    const maxNum = m > n ? m : n;
    for (let i = 0; i < maxNum; ++i) {
      const a = i; const b = i;
      for (let aIter = a; aIter < maxNum; ++aIter) {
        if (this.checkM(aIter, b, m) && this.checkN(aIter, b, n)) {
          console.log('Pair Found:', { aIter, b });
          pairCount++;
        }
      }

      for (let bIter = b; bIter < maxNum; ++bIter) {
        if (this.checkM(a, bIter, m) && this.checkN(a, bIter, n)) {
          console.log('Pair Found:', { a, bIter });
          pairCount++;
        }
      }
    }
    return pairCount;
  }

  checkM(a, b, m) {
    return Math.pow(b, 2) + a === m;
  }
  checkN(a, b, n) {
    return Math.pow(a, 2) + b === n;
  }
  numberToAccountString(num: number): string {
    if (!num) { return; }
    return num < 0 ? `(${Math.abs(num)})` : num.toString();
  }

  addingDigits(a: number, b: number, n: number) {
    let str: string = a.toString();

    for (let i = 1; str.length < (a.toString().length + n) && !(i === 10 && str.length === a.toString().length); ++i) {
      if (Number(str + i) % b === 0) {
        str += i;
      }
      i = i === 10 ? 1 : i % 10;
    }
    return str === a.toString() ? '-1' : str;
  }

}
