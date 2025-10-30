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
    const updated = await Ticket.findByIdAndUpdate(
      ticketID,
      { userID },
      { new: true }
    ).exec();

    return updated ? true : false;
  } catch (error: any) {
    return false;
  }
}

export default updateTicketByUser;