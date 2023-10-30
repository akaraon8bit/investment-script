// import { Schema, model } from "mongoose";

const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    name: { type: String, trim: true, default: "not set" },
    baseUrl: { type: String, trim: true, default: "not set" },
    nowPaymentApi: {
      type: String,
      trim: true,
      default: "not set",
    },
    address: {
      type: String,
      trim: true,
      default: "408 Warren Rd - San Mateo, CA 94402",
    },
    lastInvestmentDailyCronJob: { type: Number, default: 0 },

    logo: {
      url: { type: String, default: "not set" },
      public_id: { type: String, default: "not set" },
      secure_url: { type: String, default: "not set" },
      format: { type: String, default: "not set" },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      bytes: { type: Number, default: 0 },
      original_filename: { type: String, default: "not set" },
      created_at: { type: String, default: "not set" },
      etag: { type: String, default: "not set" },
      thumbnail_url: { type: String, default: "not set" },
    },

    welcomeEmail: {
      status: { type: String, default: "off", enum: ["on", "off"] },
      emailMessage: { type: String, default: "Welcome" },
    },

    currency: {
      name: { type: String, default: "United States Dollar" },
      code: { type: String, default: "USD" },
      symbol: { type: String, default: "$" },
    },

    transfer: {
      minimum: { type: Number, default: 0 },
      maximum: { type: Number, default: 0 },
      percentToPay: { type: Number, default: 0 },
      mode: {
        type: String,
        default: "direct-mode",
        enum: ["direct-mode", "pending-mode"],
      },
      allowTransferIfPendingAvailable: {
        type: String,
        default: "yes",
        enum: ["yes", "no"],
      },
    },

    desposit: {
      minimum: { type: Number, default: 0 },
      maximum: { type: Number, default: 0 },
    },

    withdraw: {
      minimum: { type: Number, default: 0 },
      maximum: { type: Number, default: 0 },
    },

    signupBonus: {
      status: { type: String, default: "off", enum: ["on", "off"] },
      amount: { type: Number, default: 0 },
    },

    loan: {
      status: { type: String, default: "off", enum: ["on", "off"] },
      minimum: { type: Number, default: 0 },
      maximum: { type: Number, default: 0 },
    },

    payment: {
      bankTransfer: { type: String, default: "off", enum: ["on", "off"] },
      manualCoinPayment: { type: String, default: "off", enum: ["on", "off"] },
      automaticCoinPayment: {
        type: String,
        default: "off",
        enum: ["on", "off"],
      },
    },

    color: {
      primary: { type: String, trim: true, default: "#c32f27" },
      primaryLight: {
        type: String,
        trim: true,
        default: "#e35d56",
      },
      primaryVeryLight: {
        type: String,
        trim: true,
        default: "#f2dcdc",
      },
    },

    emailSetup: {
      host: { type: String, trim: true, default: "not set" },
      port: { type: Number, default: 0 },
      secure: { type: Boolean, default: true },
      from: { type: String, trim: true, default: "not set" },
      auth: {
        user: { type: String, default: "not set" },
        pass: { type: String, default: "not set" },
      },
    },
  },
  { timestamps: true }
);

const Company = model("Company", companySchema);

module.exports = Company;
