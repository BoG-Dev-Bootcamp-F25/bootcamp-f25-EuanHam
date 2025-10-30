import mongoose from "mongoose";
import Ticket from '../models/Ticket'
import User from '../models/User'
import connectDB from "../index";

async function createTicket(
    lineColor: string,
    station: string,
    userID: mongoose.Types.ObjectId | string
) {
    try {
        await connectDB();
        const newTicket = new Ticket({ lineColor, station, userID });
        await newTicket.save();
    } catch (error) {
        throw false;
    }
}

export default createTicket;