// import { Schema, model } from "mongoose";
const { Schema, model } = require("mongoose");

const investmentSchema = new Schema(
  {
    planName: { type: String, required: true },

    amountInvested: { type: Number, required: true },

    ROIReceived: { type: Number, default: 0 },

    duration: { type: Number, required: true },

    ROIDaily: { type: Number, required: true },

    totalROI: { type: Number, required: true },

    userId: { type: String, required: true },

    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  { timestamps: true }
);

const Investment = model("Investment", investmentSchema);

module.exports = Investment;
