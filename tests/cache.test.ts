import mongoose, { model } from 'mongoose'
import CacheMongoose from '../src/plugin'

import type ICacheOptions from '../src/interfaces/ICacheMongooseOptions'

import UserSchema from './schemas/UserSchema'

const cacheOptions: ICacheOptions = {
  engine: 'memory'
}

describe('CacheMongoose', () => {
  const uri = `${globalThis.__MONGO_URI__}${globalThis.__MONGO_DB_NAME__}`

  const User = model('User', UserSchema)

  beforeAll(async () => {
    await mongoose.connect(uri)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await mongoose.connection.collection('users').deleteMany({})
  })

  it('should be defined', async () => {
    const cache = CacheMongoose.init(mongoose, cacheOptions)
    expect(cache).toBeDefined()

    const user = await User.create({
      name: 'John Doe',
      role: 'admin'
    })

    const cachedUser1 = await User.findById(user._id).cache().lean()
    console.log(cachedUser1)

    await User.updateOne({ _id: user._id }, { name: 'John Doe 2' })

    const cachedUser2 = await User.findById(user._id).cache()
    console.log(cachedUser2)

    expect(cachedUser1).not.toBeNull()
    expect(cachedUser2).not.toBeNull()
    expect(cachedUser1?._id).toEqual(cachedUser2?._id)
    expect(cachedUser1?.name).toEqual(cachedUser2?.name)
  })
})