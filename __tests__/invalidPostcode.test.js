const request = require("supertest");
const config = require("./data/config.json")

const testBody = { address: "EC1A 1BB" };

describe("Given an invalid postcode", () => {
  it("then the API should respond with the appropriate status code and an informative error message", async () => {
    const response = await request(config.uri)
      .post("/api")
      .set("Accept", "application/json")
      .send(testBody);

    expect(response.statusCode).toEqual(435);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.body.errorMessage).toBe("Invalid Address");
  });
});
