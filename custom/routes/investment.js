const { Router } = require("express");
const winston = require("winston");

const Investment = require("../models/investment.js");
const User = require("../models/user.js");
const { retunsEmail } = require("../utils/emailTemplate.js");
const sendEmail = require("../utils/sendEmail.js");
const Return = require("../models/return.js");
const Company = require("../models/company.js");
const logger = require("../utils/logger.js");
const router = Router();

router.get("/daily-invest", async (req, res) => {
  try {
    return res.status(200).send("Not available");
    //code logic
    const investments = await Investment.find({});

    const companies = await Company.find({});
    const company = companies[0];
    if (!company) throw new Error("No Comany info");

    for (const investment of investments) {
      const dailyPercent = investment.ROIDaily / 100;

      if (investment.duration > 0 && investment.status === "active") {
        const dailyProfit = investment.amountInvested * dailyPercent;

        await Investment.findByIdAndUpdate(investment._id, {
          $inc: {
            duration: -1,
            ROIReceived: dailyProfit,
          },
        });

        await User.findByIdAndUpdate(investment.userId, {
          $inc: {
            investProfitBalance: dailyProfit,
            investWithdrawableBalance: dailyProfit,
          },
        });

        const newReturn = new Return({
          title: "New Return",
          amount: dailyProfit,
          investmentId: investment._id,
        });
        await newReturn.save();

        const user = await User.findById(investment.userId);
        const updatedInvestment = await Investment.findById(investment._id);

        const formattedDate = new Intl.DateTimeFormat("en", {
          dateStyle: "medium",
          timeStyle: "medium",
        }).format(new Date());

        const returnEmailTemplate = retunsEmail(
          updatedInvestment.planName,
          newReturn.amount,
          user.fullname,
          updatedInvestment.ROIReceived,
          updatedInvestment._id,
          company,
          formattedDate
        );

        await sendEmail(
          user.email,
          "Investment Return",
          `You have a new return in your ${investment.planName} investment`,
          returnEmailTemplate
        );
      }

      if (investment.duration <= 0 && investment.status === "active") {
        await Investment.findByIdAndUpdate(investment._id, {
          status: "completed",
        });

        await User.findByIdAndUpdate(investment.userId, {
          $inc: {
            investBalance: -investment.amountInvested,
            investProfitBalance: -investment.ROIReceived,
            investWithdrawableBalance: investment.amountInvested,
          },
        });
      }
    }

    res.status(200).send({ message: "Investment Operation is Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

const dailyProfit = async () => {
  try {
    //code logic
    const investments = await Investment.find({ status: "active" });

    const companies = await Company.find({});
    const company = companies[0];
    if (!company) throw new Error("No Comany info");

    if (company.lastInvestmentDailyCronJob > Date.now()) {
      return logger.info("Cron Job Investment already ran for the day");
    }

    if (investments.length <= 0) {
      return logger.info("No Active Investments");
    }

    for (const investment of investments) {
      const dailyPercent = investment.ROIDaily / 100;

      if (investment.duration > 0) {
        const dailyProfit = investment.amountInvested * dailyPercent;

        await Investment.findByIdAndUpdate(investment._id, {
          $inc: {
            duration: -1,
            ROIReceived: dailyProfit,
          },
        });

        await User.findByIdAndUpdate(investment.userId, {
          $inc: {
            investProfitBalance: dailyProfit,
            investWithdrawableBalance: dailyProfit,
          },
        });

        const oneDay = 180000; //180000 86400000
        await Company.findByIdAndUpdate(company._id, {
          lastInvestmentDailyCronJob: Date.now() + oneDay,
        });

        const newReturn = new Return({
          title: "New Return",
          amount: dailyProfit,
          investmentId: investment._id,
        });
        await newReturn.save();

        const user = await User.findById(investment.userId);
        const updatedInvestment = await Investment.findById(investment._id);

        const formattedDate = new Intl.DateTimeFormat("en", {
          dateStyle: "medium",
          timeStyle: "medium",
        }).format(new Date());

        const returnEmailTemplate = retunsEmail(
          updatedInvestment.planName,
          newReturn.amount,
          user.fullname,
          updatedInvestment.ROIReceived,
          updatedInvestment._id,
          company,
          formattedDate
        );

        await sendEmail(
          user.email,
          "Investment Return",
          `You have a new return in your ${investment.planName} investment`,
          returnEmailTemplate,
          company
        );
      }

      if (investment.duration <= 0) {
        await Investment.findByIdAndUpdate(investment._id, {
          status: "completed",
        });

        await User.findByIdAndUpdate(investment.userId, {
          $inc: {
            investBalance: -investment.amountInvested,
            investProfitBalance: -investment.ROIReceived,
            investWithdrawableBalance: investment.amountInvested,
          },
        });
      }
    }

    logger.info("Investment Operation is Successfull");
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { router, dailyProfit };
