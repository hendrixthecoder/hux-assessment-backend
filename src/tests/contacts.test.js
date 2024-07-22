import request from "supertest";
import Contact from "../models/Contact";
import mongoose from "mongoose";
import { server } from "../index"
import { describe, expect, test } from "@jest/globals";

jest.mock('../middleware/auth', () => ({
  authenticateJWT: jest.fn((req, res, next) => {
    const authHeader = req.cookies.session_token;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }), // Mock implementation
}));

jest.mock('../middleware/user', () => ({
  validateCreateUserParams: jest.fn((req, res, next) => next()), // Mock implementation
  validateLoginParams: jest.fn((req, res, next) => next())
}));

jest.mock("../middleware/contact", () => ({
  validateEditContactParams: jest.fn((req, res, next) => next()), // Mock implementation
}));

jest.mock("../controllers/contact", () => ({
  createNewContact: jest.fn((req, res, next) => next()), // Mock implementation
  fetchUserContact: jest.fn((req, res, next) => next()), // Mock implementation
  fetchUserContacts: jest.fn((req, res, next) => next()), // Mock implementation
  editUserContact: jest.fn((req, res, next) => next()),
  deleteUserContact: jest.fn((req, res, next) => next())
}));

jest.mock("../controllers/user", () => ({
  loginUser: jest.fn((req, res, next) => next()),
  createUser: jest.fn((req, res, next) => next())
}));


// Connect to a test database before running the tests
beforeAll(async () => {
  const mongoURI = 'mongodb://localhost:27017/testdb'; // Test DB
  await mongoose.connect(mongoURI);
});

// Clear the database after each test
afterEach(async () => {
  jest.clearAllMocks()
  await Contact.deleteMany({});
});

// Disconnect the database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

describe('POST /users/contacts', () => {
  test('should throw error when trying to create contact without auth', async () => {
    const newContact = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    };

    const response = await request(server)
      .post('/api/users/contacts')
      .send(newContact)
      .expect('Content-Type', /json/)
      .expect(401);
    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized")
  });
});
