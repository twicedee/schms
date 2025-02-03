import mongoose from "mongoose";

const termDatesSchema = new mongoose.Schema({
  term: { 
    type: String, 
    required: true, 
    enum: ["Term 1", "Term 2", "Term 3"] 
},
  startDate: { 
    type: Date, 
    required: true 
},
  endDate: { 
    type: Date, 
    required: true 
},
});

const TermDates = mongoose.model("TermDates", termDatesSchema);
export default TermDates;
