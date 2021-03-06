function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from db....");
      resolve({ id: id, gitHubUsername: "saad189" });
    }, 2000);
  });
}

function getRepository(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading Repo");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

console.log("Before");

//   getUser(2)
//     .then((result) => getRepository(result))
//     .then((result) => console.log(result));

async function displayData() {
  try {
    const user = await getUser(2);
    console.log(user);
    const repo = await getRepository(user.gitHubUsername);
    console.log(repo);
  } catch (error) {
    console.log(error);
  }
}

displayData();
console.log("After");
