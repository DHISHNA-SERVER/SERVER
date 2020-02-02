const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepUpSolo = new Schema(
    {
        name : String,
        phone : String,
        email : String,
        college : String,
        isSpot : String,
        isAttended : String
    }
);

module.exports = mongoose.model("StepUpSolo", StepUpSolo);