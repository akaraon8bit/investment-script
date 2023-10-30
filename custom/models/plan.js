// import { Schema, model, models } from "mongoose";
const { Schema, model } = require("mongoose");

const planSchema = new Schema(
  {
    planName: { type: String, required: true },

    minAmount: { type: Number, required: true },

    maxAmount: { type: Number, required: true },

    ROIDaily: { type: Number, required: true },

    totalROI: { type: Number, required: true },

    duration: { type: Number, required: true },

    referralBonus: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Plan = model("Plan", planSchema);

module.exports = Plan;
