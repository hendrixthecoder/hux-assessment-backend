import request from "supertest";
import Contact from "../models/Contact";
import mongoose from "mongoose";

// Connect to a test database before running the tests
beforeAll(async () => {
  const mongoURI = 'mongodb://localhost:27017/testdb'; // Test DB
  await mongoose.connect(mongoURI);
});

// Clear the database after each test
afterEach(async () => {
  await Contact.deleteMany({});
});

// Disconnect the database after all tests
afterAll(async () => {
  await mongoose.disconnect();
});
