const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash("1234", salt);
  console.log(salt, hashedPass);
}
run();
