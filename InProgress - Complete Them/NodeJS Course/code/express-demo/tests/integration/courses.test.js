const { response } = require("express");
const { set } = require("lodash");
const request = require("supertest");
const { User } = require("../../modals/User");

let server;

describe("/api/courses", () => {
  beforeEach(async () => {
    server = require("../../index");
    await User.remove({});
  });
  afterEach(async () => {
    await User.remove({});
    await server.close();
  });
  describe("GET /", () => {
    it("should return all users", async () => {
      const result = await User.collection.insertMany([
        { name: "usernumber1", email: "email@gmail.com" },
        { name: "usernumber2", email: "email1@gmail.com" },
        { name: "usernumber3", email: "email2@gmail.com" },
      ]);
      const response = await request(server).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body.some((U) => U.name === "usernumber2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = new User({
        name: "user1",
        email: "email1@gmail.com",
        password: "1234567S",
      });
      await user.save();
      const response = await request(server).get("/api/users/" + user._id);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", user.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const response = await request(server).get("/api/users/1");
      expect(response.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;
    let email;
    let password;

    const exec = async () => {
      return await request(server)
        .post("/api/users/create")
        .set("x-auth-token", token)
        .send({
          name,
          email,
          password,
        });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "Saad Ahmed";
      email = "user189@gmail.com";
      password = "12345678";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const response = await exec();
      expect(response.status).toBe(401);
    });

    it("should return 400 if password is less than 8 characters", async () => {
      password = "1234";
      const response = await exec();
      expect(response.status).toBe(400);
    });

    it("should return 400 if name is more than 50 characters", async () => {
      name = new Array(52).join("a");
      const response = await exec();
      expect(response.status).toBe(400);
    });

    it("should save the user if it is valid", async () => {
      const response = await exec();

      const result = User.find({ email: "user189@gmail.com" });
      expect(response.status).toBe(200);
      expect(result).not.toBeNull();
    });

    it("should return User if it is valid", async () => {
      const response = await exec();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("email", "user189@gmail.com");
    });
  });
});
