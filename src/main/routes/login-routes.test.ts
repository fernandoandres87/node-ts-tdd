import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('Post /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Fernando',
          email: 'fer@fer.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
  describe('Post /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 10)
      await accountCollection.insertOne({
        name: 'Fernando',
        email: 'fer@fer.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'fer@fer.com',
          password: '123'
        })
        .expect(200)
    })
    test('Should return 200 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'fer@fer.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
