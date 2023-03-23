const request = require('supertest');
const app = require('../server');
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const createToken = require("../helpers/createToken");

jest.mock("../models/userModel");
jest.mock("bcryptjs");
jest.mock("validator");
jest.mock("../helpers/createToken");
jest.mock("../helpers/sendMail");

describe("signupUser", () => {
    beforeAll(() => {
        User.findOne = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should return 400 if any field is missing", async () => {
        const res = await request(app).post("/signup").send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("msg", "Please fill in all fields.");
    });

    it("should return 400 if the email is not valid", async () => {
        validator.isEmail.mockReturnValue(false);
        const res = await request(app)
            .post("/signup")
            .send({ name: "John", email: "not_a_valid_email", password: "12345678" });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("msg", "Please enter a valid email address.");
    });

    it("should return 400 if the email is already registered", async () => {
        User.findOne = jest.fn().mockReturnValue({ email: "john@example.com" });
        const res = await request(app)
            .post("/signup")
            .send({ name: "John", email: "john@example.com", password: "12345678" });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty(
            "msg",
            "Please enter a valid email address."
        );
    });
});