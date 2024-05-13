import { Application } from 'express';
import App from '../../../../src/app';
import request from 'supertest';
import testDbDefaultManager from '../../../testDbDefaultManager';
import { EntityManager } from 'typeorm';
import clearDatabase from '../../../helpers/clearDatabase';
import { v4 as uuidv4 } from 'uuid';

describe('VideoController Testing', () => {
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

  it('Should create a video', async () => {
    const expectedStatus = 201;
    const expectedTitle = 'test';

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    const course = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    const response = await request(app)
      .post('/v1/videos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: expectedTitle,
        url: 'test.com',
        courseId: course.body.data.id
      });

    const content = response.body.data;
    expect(response.statusCode).toBe(expectedStatus);
    expect(content.title).toBe(expectedTitle);
  });

  it('Should return unprocessable entity when save empty video ', async () => {
    const expectedStatus = 422;

    const response = await request(app)
      .post('/v1/videos')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should find video', async () => {
    const expectedStatus = 200;

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    const course = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    const video = await request(app)
      .post('/v1/videos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test',
        url: 'test.com',
        courseId: course.body.data.id
      });
    delete video.body.data.course;
    delete video.body.data.subject;

    const expected = {
      data: [video.body.data],
      pagination: {
        hasNextPage: false,
        currentPage: 1,
        totalPage: 1,
        recordPerPage: 20,
        totalRecords: 1
      }
    };

    const response = await request(app)
      .get('/v1/videos')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.body).toEqual(expected);
  });

  it('Should update video', async () => {
    const expectedStatus = 200;
    const expectedUpadtedtitle = 'test';

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    const course = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    const video = await request(app)
      .post('/v1/videos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test',
        url: 'test.com',
        courseId: course.body.data.id
      });

    const response = await request(app)
      .put(`/v1/videos/${video.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: expectedUpadtedtitle });

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.body.title).toEqual(expectedUpadtedtitle);
  });

  it('Should return not found entity when update video ', async () => {
    const expectedStatus = 404;
    const randomId = uuidv4();

    const response = await request(app)
      .put(`/v1/videos/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should delete video', async () => {
    const expectedStatus = 204;

    const subject = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test' });

    const course = await request(app)
      .post('/v1/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'test',
        description: 'test',
        subjectId: subject.body.data.id
      });

    const video = await request(app)
      .post('/v1/videos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'test',
        url: 'test.com',
        courseId: course.body.data.id
      });
    const response = await request(app)
      .delete(`/v1/videos/${video.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return unprocessable entity when delete video ', async () => {
    const expectedStatus = 422;

    const response = await request(app)
      .delete(`/v1/videos/invalidId`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });

  it('Should return not found entity when delete video ', async () => {
    const expectedStatus = 404;
    const randomId = uuidv4();

    const response = await request(app)
      .delete(`/v1/video/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(expectedStatus);
  });
});
