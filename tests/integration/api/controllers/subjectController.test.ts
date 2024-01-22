import { Application } from 'express';
import App from '../../../../src/app';
import request from 'supertest';
import testDbDefaultManager from '../../../testDbDefaultManager';
import { EntityManager } from 'typeorm';
import clearDatabase from '../../../helpers/clearDatabase';
import { v4 as uuidv4 } from 'uuid';

describe('SubjectController Testing', () => {
  let app: Application;
  const api: App = new App();
  let manager: EntityManager;
  let token: string;

  beforeAll(async () => {
    await api.initialize();
    app = api.express;
    manager = await testDbDefaultManager();

    await request(app).post('/v1/users').send({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    });

    const response = await request(app).post('/v1/auth/login').send({
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    });

    token = response.body.data.token;
  });

  afterEach(async () => {
    await clearDatabase(manager);
  });

  afterAll(async () => {
    manager.connection.destroy();
  });

  it('Should create a subject ', async () => {
    const expectedStatus = 201;
    const expectedName = 'test';

    const response = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: expectedName });

    const content = response.body.data;
    expect(response.statusCode).toBe(expectedStatus);
    expect(content.name).toBe(expectedName);
  });

  it('Should return unprocessable entity when save empty subject ', async () => {
    const expectedStatus = 422;

    const response = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should find subject ', async () => {
    const expectedStatus = 200;

    let response = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    const expected = {
      data: [
        response.body.data
      ],
      pagination: {
        hasNextPage: false,
        currentPage: 1,
        totalPage: 1,
        recordPerPage: 20,
        totalRecords: 1
      }
    }

    response = await request(app)
      .get('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.body).toEqual(expected);
  });

  it('Should update subject ', async () => {
    const expectedStatus = 200;
    const expectedUpadtedName = 'test Upated';

    let response = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    response = await request(app)
      .put(`/v1/subjects/${response.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({name: expectedUpadtedName});

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.body.data.name).toEqual(expectedUpadtedName);
  });


  it('Should return unprocessable entity when update subject ', async () => {
    const expectedStatus = 422;

    let response = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    response = await request(app)
      .put(`/v1/subjects/${response.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return not found entity when update subject ', async () => {
    const expectedStatus = 404;
    const randomId = uuidv4();

    const response = await request(app)
      .put(`/v1/subjects/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should delete subject ', async () => {
    const expectedStatus = 204;

    let response = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    response = await request(app)
      .delete(`/v1/subjects/${response.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return unprocessable entity when delete subject ', async () => {
    const expectedStatus = 422;

    const response = await request(app)
      .delete(`/v1/subjects/invalidId`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return not found entity when delete subject ', async () => {
    const expectedStatus = 404;
    const randomId = uuidv4();

    const response = await request(app)
      .delete(`/v1/subjects/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });
});
