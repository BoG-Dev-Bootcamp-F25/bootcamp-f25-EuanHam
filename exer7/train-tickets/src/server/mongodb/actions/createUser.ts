import User from '../models/User'

async function createUser(
    name: string,
    age: number
) {
    const newUser = new User(name, age);
    await newUser.save();
}