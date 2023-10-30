// import { Schema, model, Types } from "mongoose";

const { Schema, model, Types } = require("mongoose");

const transactionSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    amount: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: true },

    senderName: { type: String },
    receiverName: { type: String },
    receiverEmail: { type: String },
    receiverPhoneNumber: { type: String },
    receiverAccountNumber: { type: String },
    receiverPaymentUsername: { type: String },

    note: String,
    amountToDeposit: Number,
    despositedAmount: Number,
    pendingBalance: Number,
    paymentTitle: { type: String },

    paymentProof: {
      url: { type: String },
      public_id: { type: String },
      secure_url: { type: String },
      format: { type: String },
      width: { type: Number },
      height: { type: Number },
      bytes: { type: Number },
      original_filename: { type: String },
      created_at: { type: String },
      etag: { type: String },
      thumbnail_url: { type: String },
    },

    linkedTransactionId: { type: Types.ObjectId },

    loanDuration: { type: String },
    loanReason: String,
    loanDurationDate: { type: Number },

    status: {
      type: String,
      required: true,
      enum: [
        "successful",
        "pending",
        "processing",
        "action-needed",
        "rejected",
      ],
    },

    category: {
      type: String,
      required: true,
      enum: [
        "money-received",
        "transfer",
        "deposit",
        "loan",
        "investment-topup",
        "investment-withdrawal",
      ],
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
