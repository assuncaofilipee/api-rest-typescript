import { Application } from 'express';
import App from '../../../../src/app';
import request from 'supertest';
import testDbDefaultManager from '../../../testDbDefaultManager';
import { EntityManager } from 'typeorm';
import clearDatabase from '../../../helpers/clearDatabase';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'typeorm/persistence/Subject.js';

describe('CourseController Testing', () => {
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

  it('Should create a course ', async () => {
    const expectedStatus = 201;
    const expectedName = 'course name';

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    const response = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: expectedName,
        description: 'test',
        subjectId: subject.body.data.id
      });

    const content = response.body.data;
    expect(response.statusCode).toBe(expectedStatus);
    expect(content.name).toBe(expectedName);
  });

  it('Should return unprocessable entity when save empty course ', async () => {
    const expectedStatus = 422;

    const response = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should find course ', async () => {
    const expectedStatus = 200;

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    let response = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    let course = response.body.data;
    course['videos'] = [];

    const expected = {
      data: [course],
      pagination: {
        hasNextPage: false,
        currentPage: 1,
        totalPage: 1,
        recordPerPage: 20,
        totalRecords: 1
      }
    };

    response = await request(app)
      .get('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.body).toEqual(expected);
  });

  it('Should update course ', async () => {
    const expectedStatus = 200;
    const expectedUpadtedName = 'test Upated';

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    let response = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    response = await request(app)
      .put(`/v1/courses/${response.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: expectedUpadtedName });

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.body.name).toEqual(expectedUpadtedName);
  });

  it('Should return unprocessably entity when update course ', async () => {
    const expectedStatus = 422;
  
    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    let response = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    response = await request(app)
      .put(`/v1/courses/${response.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'a' });

    expect(response.statusCode).toBe(expectedStatus);
  });


  it('Should return not found entity when update course ', async () => {
    const expectedStatus = 404;
    const randomId = uuidv4();

    const response = await request(app)
      .put(`/v1/courses/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should delete course ', async () => {
    const expectedStatus = 204;

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    let response = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    response = await request(app)
      .delete(`/v1/courses/${response.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return unprocessable entity when delete course ', async () => {
    const expectedStatus = 422;

    const response = await request(app)
      .delete(`/v1/courses/invalidId`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return not content when delete course ', async () => {
    const expectedStatus = 204;
    const randomId = uuidv4();

    const response = await request(app)
      .delete(`/v1/courses/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });
});
