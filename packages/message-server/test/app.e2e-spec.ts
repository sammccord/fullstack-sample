import request from 'supertest'
import { Test } from '@nestjs/testing'
import Ajv from 'ajv'
import { AppModule } from '../src/app.module'
import { INestApplication } from '@nestjs/common'
import schema from '@sammccord/message-client/dist/openapi.json'
const ajv = new Ajv({ strict: false })

ajv.addSchema(schema, 'openapi.json')

describe('AppController (e2e)', () => {
  let app: INestApplication
  // normally this would come from an external auth provider
  let testToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI0MDMwNzl9.TqpVJDs78Ht_LhUMNIeF07_qGVV-DAZkE2WHUJbbsLk'

  beforeAll(async () => {
    const mod = Test.createTestingModule({
      imports: [AppModule]
    })

    const moduleFixture = await mod.compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('Unauthorized /templates/email (GET)', () => {
    return request(app.getHttpServer())
      .get(`/templates/email`)
      .expect(401)
      .expect('Content-Type', /json/)
  })

  it('Bad Request /templates/email (GET)', () => {
    return request(app.getHttpServer())
      .get(`/templates/email`)
      .set('Authorization', `bearer ${testToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
  })

  it('/templates/EMAIL (GET)', (done) => {
    return request(app.getHttpServer())
      .get(`/templates/EMAIL`)
      .set('Authorization', `bearer ${testToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(
          ajv.validate(
            { $ref: 'openapi.json#/components/schemas/TemplateArray' },
            res.body
          )
        ).toBeTruthy()
        done()
      })
  })

  it('Bad Request /templates/EMAIL/na (GET)', () => {
    return request(app.getHttpServer())
      .get(`/templates/EMAIL/na`)
      .set('Authorization', `bearer ${testToken}`)
      .expect(404)
      .expect('Content-Type', /json/)
  })

  it('/templates/EMAIL/basic (GET)', (done) => {
    return request(app.getHttpServer())
      .get(`/templates/EMAIL`)
      .set('Authorization', `bearer ${testToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(
          ajv.validate(
            { $ref: 'openapi.json#/components/schemas/Template' },
            res.body
          )
        ).toBeTruthy()
        done()
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
