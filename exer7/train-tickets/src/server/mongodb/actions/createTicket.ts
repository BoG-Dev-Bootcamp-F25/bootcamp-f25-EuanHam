import mongoose from "mongoose";
import Ticket from '../models/Ticket'
import User from '../models/User'

async function createTicket(
    lineColor: string,
    station: string,
    userID: mongoose.Types.ObjectId | string
) {
    const newTicket = new Ticket({ lineColor, station, userID });
    await newTicket.save();
}

export default createTicket;