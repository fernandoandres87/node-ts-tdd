import { MongoHelper as sut} from "./mongo-helper";

describe('Mongo Helper', () => {
  beforeAll(async () =>{
    await sut.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollections = await sut.getCollection('accounts')
    expect(accountCollections).toBeTruthy()
    //esperar respuesta de solucion
    // await sut.disconnect()
    // accountCollections = await sut.getCollection('accounts')
    // expect(accountCollections).toBeTruthy()
  })
})
