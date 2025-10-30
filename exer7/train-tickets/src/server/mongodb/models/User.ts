import mongoose from "mongoose";
import Ticket from "../models/Ticket";

const Schema = mongoose.Schema;

// can have multiple tickets
const userSchema = new Schema ({
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        default: []
    }]
});

export default mongoose.models?.User || mongoose.model("user", userSchema);