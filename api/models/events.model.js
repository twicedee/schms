import mongoose from "mongoose";

const eventDatesSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
});

const eventDates = mongoose.model("eventDates", eventDatesSchema);
export default eventDates;
