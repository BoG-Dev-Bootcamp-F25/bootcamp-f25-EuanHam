import mongoose from "mongoose"
import Ticket from "../models/Ticket";
import connectDB from "../index";


async function deleteTicket(ticketID: mongoose.Types.ObjectId | string) {
    try {
        await connectDB();

        if (!mongoose.isValidObjectId(ticketID)) {
            throw new Error("The ticket ID isn't valid");
        }

        // deleteOne Returns a Query instance containing a deleteOne operation by this document's _id.
        const result = await Ticket.deleteOne({ _id: ticketID });
        return result;
    } catch (error) {
        throw false;
    }
}

export default deleteTicket;