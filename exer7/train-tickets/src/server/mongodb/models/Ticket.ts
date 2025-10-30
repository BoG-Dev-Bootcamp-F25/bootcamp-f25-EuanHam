import mongoose from "mongoose";
import User from "../models/User";

const Schema = mongoose.Schema;

const ticketSchema = new Schema ({
    lineColor: {
        type: String,
        required: true
    },
    station: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


export default mongoose.models?.Ticket || mongoose.model("ticket", ticketSchema);