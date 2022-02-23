const request = require("supertest");
const config = require("./data/config.json")

const testBody = { address: "adfgasdgaerg" };

describe("Given an invalid postcode", () => {
  it("then the API should respond with the appropriate status code and an informative error message", async () => {
    const response = await request(config.uri)
      .post("/test/dots-eit-interview-api")
      .set("Accept", "application/json")
      .send(testBody);

    expect(response.statusCode).toEqual(400);
    expect(response.headers["content-type"]).toBe(
      "text/plain; charset=utf-8"
    );
    expect(response.text).toBe("invalid postcode");
  });
});
