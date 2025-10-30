import User from '../models/User'

async function createUser(userData) {
    const newUser = new User(userData);
    await newUser.save();
}