import mongoose from "mongoose";
import Ticket from "../models/Ticket";
import connectDB from "../index";

async function updateTicketByUser(
  ticketID: mongoose.Types.ObjectId | string,
  userID: mongoose.Types.ObjectId | string
): Promise<boolean> {
  if (!mongoose.isValidObjectId(ticketID)) {
    throw new Error("Invalid ticket ID");
  }
  if (!mongoose.isValidObjectId(userID)) {
    throw new Error("Invalid user ID");
  }

  try {
    await connectDB();
    console.log("Updating ticket");
    const updated = await Ticket.findByIdAndUpdate(ticketID, { userID });

    console.log("Updated result");
    return updated ? true : false;
  } catch (error: any) {
    console.log("Error");
    return false;
  }
}

export default updateTicketByUser;