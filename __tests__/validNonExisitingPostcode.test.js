const request = require("supertest");
const config = require("./data/config.json")

const testBody = {address: "B99 9AA"}

describe("Send valid non-existing postcode POST to the endpoint", () => {
  it("should respond with status code 433 and an informative error message", async () =>{
    const response = await request(config.uri)
      .post("/test/dots-eit-interview-api")
      .set("Accept", "application/json")
      .send(testBody)

      expect(response.statusCode).toEqual(433) 
      expect(response.headers['content-type']).toBe('text/plain; charset=utf-8')
      expect(response.text).toBe("postcode not recognised")
  })
});
