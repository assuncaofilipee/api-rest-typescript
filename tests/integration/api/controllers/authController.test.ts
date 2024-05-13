import { Application } from 'express';
import App from '../../../../src/app';
import request from 'supertest';
import testDbDefaultManager from '../../../testDbDefaultManager';
import { EntityManager } from 'typeorm';
import clearDatabase from '../../../helpers/clearDatabase';
import { v4 as uuidv4 } from 'uuid';

describe('AuthController Testing', () => {
  let app: Application;
  const api: App = new App();
  let manager: EntityManager;
  let token: string;

  beforeAll(async () => {
    await api.initialize();
    app = api.express;
    manager = await testDbDefaultManager();
  });

  afterEach(async () => {
    await clearDatabase(manager);
  });

  afterAll(async () => {
    manager.connection.destroy();
  });

  it('Should create user ', async () => {
    const expectedStatus = 201;
    const expectedName = 'test';

    const response = await request(app).post('/v1/users').send({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    });

    const content = response.body.data;
    expect(response.statusCode).toBe(expectedStatus);
    expect(content.name).toBe(expectedName);
  });

  it('Should login ', async () => {
    const expectedStatus = 200;

    await request(app).post('/v1/users').send({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    });

    const response = await request(app).post('/v1/auth/login').send({
      email: 'test@gmail.com',
      password: 'test'
    });

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return unprocessableEntity in login ', async () => {
    const response = await request(app).post('/v1/auth/login').send({});

    expect(response.statusCode).toBe(422);
  });

  it('Should return unauthorized in login ', async () => {
    const response = await request(app).post('/v1/auth/login').send({
      email: 'test@gmail.com',
      password: 'test'
    });

    expect(response.statusCode).toBe(401);
  });

  it('Should return unauthorized when passord if false in login ', async () => {
    await request(app).post('/v1/users').send({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    });

    const response = await request(app).post('/v1/auth/login').send({
      email: 'test@gmail.com',
      password: 'test1'
    });

    expect(response.statusCode).toBe(401);
  });
});
