import request from "supertest";
import Contact from "../models/Contact";
import mongoose from "mongoose";
import { server } from "../index"
import { describe, expect, test } from "@jest/globals";
import User from "../models/User";
import { response } from "express";


let authToken = "";

beforeAll(async () => {
  server.listen
  const mongoURI = 'mongodb://localhost:27017/testdb';
  await mongoose.connect(mongoURI);

  // Create a user and get the authentication token to use for all tests
  const newUser = {
    email: 'testuser@example.com',
    password: 'password123',
    phoneNumber: '1234567891',
    firstName: "Biobele",
    lastName: "Johnbull",
    password: "testing123"
  };

  const { body: { token } } = await request(server).post('/api/users/register').send(newUser);
  authToken = token; // Set token to be used for all auth requests
});

// Disconnect the database after all tests
afterAll(async () => {
  await Contact.deleteMany({});
  await User.deleteMany({})
  await mongoose.disconnect();
  server.close();
});

describe('POST /users/contacts', () => {
  test('should throw error when trying to create contact without auth', async () => {
    const newContact = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    };

    const response = await request(server)
      .post('/api/users/contacts')
      .send(newContact)
      .expect('Content-Type', /json/)
      .expect(401);
    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized")
  });

  test('should throw error when passing invalid payload', async () => {
    const invalidContact = {
      // Empty object so error will be thrown
    }

    const response = await request(server)
      .post('/api/users/contacts')
      .set("Cookie", `session_token=${authToken}`)
      .send(invalidContact)
      .expect('Content-Type', /json/)
      .expect(400)
    
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid request!")
  })

  test('should create contact when authenticated and passed correct payload', async () => {
    const newContact = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    };

    const response = await request(server)
      .post('/api/users/contacts')
      .set("Cookie", `session_token=${authToken}`)
      .send(newContact)
      .expect('Content-Type', /json/)
      .expect(201)
    
    // Check if the response body has the same structure and values as `newContact`
    expect(response.body).toEqual(expect.objectContaining(newContact));
  })

});
