const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Calculated");
    resolve(1); //--> send value to consumer
  }, 2000);

  //if failed:
  reject(new Error("error occured"));
});

promise
  .then((result) => {
    console.log("Result : ", result);
  })
  .catch((error) => {
    console.log(error.message);
  });
