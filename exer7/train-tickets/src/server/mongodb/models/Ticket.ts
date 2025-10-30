import mongoose from "mongoose";
import User from "../models/User";

const Schema = mongoose.Schema;

const ticketSchema = new Schema ({
    train: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: User,
        required: true
    }
});

export default mongoose.models?.Ticket || mongoose.model("ticket", ticketSchema);