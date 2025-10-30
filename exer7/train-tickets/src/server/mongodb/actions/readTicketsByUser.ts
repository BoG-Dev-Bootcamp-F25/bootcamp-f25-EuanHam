import mongoose from "mongoose"
import User from "../models/User";
import Ticket from "../models/Ticket";
import connectDB from "../index";


async function readTicketsByUser(userID: mongoose.Types.ObjectId | string) {
    try {
        if (!mongoose.isValidObjectId(userID)) {
            throw new Error("Invalid user ID");
        }
        // list tickets that have this user as its user
        // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();
        await connectDB();
        const tickets = await Ticket.find({ userID });
        return tickets;
    } catch (error) {
        throw false;
    }
}

export default readTicketsByUser;