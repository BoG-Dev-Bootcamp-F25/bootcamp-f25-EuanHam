import mongoose from "mongoose";
import Ticket from "../models/Ticket";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }
});

export default mongoose.models?.User || mongoose.model("user", userSchema);