const request = require("supertest");
const config = require("./data/config.json");

const testBody = { address: "W6 0NW" };

describe("Given a valid existing postcode", () => {
  it("Then the API should respond with a 200 status code", async () => {
    const response = await request(config.uri)
      .post("/test/dots-eit-interview-api")
      .set("Accept", "application/json")
      .send(testBody);

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toBe(
      "application/json"
    );
  });

  it("Then the API should always contain a populated value for current Time, Temperature and Humidity", async () => {
    const response = await request(config.uri)
      .post("/test/dots-eit-interview-api")
      .set("Accept", "application/json")
      .send(testBody);

    const current = response.body;
    expect(current.time).toEqual(expect.any(String));
    expect(current.temp).toEqual(expect.any(String));
    expect(current.humidity).toEqual(expect.any(Number));
  });
});
