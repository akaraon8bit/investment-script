// import { Schema, model } from "mongoose";
const { Schema, model } = require("mongoose");

const returnSchema = new Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    investmentId: { type: String, required: true },
  },
  { timestamps: true }
);

const Return = model("Return", returnSchema);

module.exports = Return;
