import User from '../models/User'
import connectDB from "../index";

async function createUser(
    name: string,
    age: number
) {
    try {
        await connectDB();
        const newUser = new User({ name, age });
        await newUser.save();
        return true; 
    } catch (error) {
        console.error("Error in createUser", error);
        throw error;
    }
}

export default createUser;