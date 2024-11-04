const supertest = require("supertest");
import { logger } from "../src/application/logging.js";
import { web } from "../src/application/web.js";
import { createTestUser, removeTestUser } from "./test-util.js";

describe("Register POST /api/users", function () {
  it("should can register new user", async function () {
    const result = supertest(web).post("/api/users").send({
      id: "test",
      password: "rahasia",
      name: "test",
    });

    logger.info((await result).body);

    expect((await result).status).toBe(200);
    expect((await result).body.data.name).toBe("test");
    expect((await result).body.data.id).toBe("test");
    expect((await result).body.data.password).toBeUndefined();
  });

  it("should be reject", async function () {
    const result = supertest(web).post("/api/users").send({
      id: "",
      password: "",
      name: "",
    });

    logger.info((await result).body);

    expect((await result).status).toBe(400);
    expect((await result).body.errors).toBeDefined();
  });
});


describe("Login POST /api/users/login", function () {

  afterEach(async () => {
    await removeTestUser()
  });


  it("should can login", async function () {
    const result = supertest(web).post("/api/users/login").send({
      id: "test",
      password: "rahasia"
    });

    logger.info((await result).body)

    expect((await result).status).toBe(200);
    expect((await result).body.data.token).toBeDefined()
    expect((await result).body.data.token).not.toBe("token")
  });

  
  it("should be reject login", async function () {
    const result = supertest(web).post("/api/users/login").send({
      id: "",
      password: ""
    });

    logger.info((await result).body)

    expect((await result).status).toBe(400);
    expect((await result).body.errors).toBeDefined()
  });


  
  it("should be reject with wrong password", async function () {
    const result = supertest(web).post("/api/users/login").send({
      id: "test",
      password: "gaktahu"
    });

    logger.info((await result).body)

    expect((await result).status).toBe(401);
    expect((await result).body.errors).toBeDefined()
  });


  it("should be reject with wrong id", async function () {
    const result = supertest(web).post("/api/users/login").send({
      id: "gatau",
      password: "rahasia"
    });

    logger.info((await result).body)

    expect((await result).status).toBe(401);
    expect((await result).body.errors).toBeDefined()
  });


});



describe("GET /api/users/current", function () {
  afterEach(async () => {
    await removeTestUser()
  });


  beforeEach(async () => {
    await createTestUser()
  });


  it("should can get current user data", async function () {
    const result = supertest(web).get("/api/users/current")
    .set("Authorization", "token")

    logger.info((await result).body)

    expect((await result).status).toBe(200);
    expect((await result).body.data.id).toBe("test")
    expect((await result).body.data.name).toBe("test")
  });



  it("should reject if Authorization wrong", async function () {
    const result = supertest(web).get("/api/users/current")
    .set("Authorization", "salah")

    logger.info((await result).body)

    expect((await result).status).toBe(401);
    expect((await result).body.errors).toBeDefined()
  });



});

