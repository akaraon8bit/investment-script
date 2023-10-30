const User = require("../models/user.js");
const Transaction = require("../models/transaction.js");
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello boss");
});

router.get("/savings-interest", async (req, res) => {
  try {
    return res.status(200).send("Not available");
    const users = await User.find({});
    const percentage = 1.15;
    // const percentageAdded = 0.15;

    for (const user of users) {
      if (user.investBalance > 0) {
        const newInvestBal = user.investBalance * percentage;
        const balAdded = newInvestBal - user.investBalance;

        user.investBalance = newInvestBal; // Add 15% to the balance
        await user.save();

        const newTransaction = new Transaction({
          title: "Daily Interest",
          userId: user._id,
          category: "investment-topup",
          status: "successful",
          amount: balAdded,
        });

        await newTransaction.save();
      }
    }

    res.status(200).send({ msg: "Daily interest update successful." });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
