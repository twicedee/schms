import mongoose from "mongoose";

const eventDatesSchema = new mongoose.Schema({
    event: {type: String, enum: ["important", "term"],required: true,},
    date: {type: Date,},
    description: {type: String, },
    term: { type: String, enum: ["Term 1", "Term 2", "Term 3"]}, 
    startDate: { type: Date }, 
    endDate: { type: Date },
});

const eventDates = mongoose.model("eventDates", eventDatesSchema);
export default eventDates;
