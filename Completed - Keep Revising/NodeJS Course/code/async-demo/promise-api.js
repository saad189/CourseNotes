const promise = Promise.resolve({ id: 1 });
promise.then((res) => console.log(res));

const promise_1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Op 1");
    resolve(1);
  }, 2000);
});

const promise_2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Op 2");
    resolve(2);
  }, 2000);
});

Promise.race([promise_1, promise_2]).then((result) => {
  console.log("One of them completed and it was:", result);
});

Promise.all([promise_1, promise_2]).then((result) => {
  console.log(result);
});
